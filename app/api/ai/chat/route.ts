import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { AI_AGENCY_KNOWLEDGE } from '@/lib/ai/knowledge/agency';
import { AI_SERVICES_KNOWLEDGE } from '@/lib/ai/knowledge/services';
import { AI_PROPERTIES_KNOWLEDGE, PublicPropertyCard } from '@/lib/ai/knowledge/properties';
import { AI_PROJECTS_KNOWLEDGE } from '@/lib/ai/knowledge/projects';
import { AI_AGENTS_KNOWLEDGE } from '@/lib/ai/knowledge/agents';
import { AI_AREAS_KNOWLEDGE } from '@/lib/ai/knowledge/areas';
import { AI_FAQS_KNOWLEDGE } from '@/lib/ai/knowledge/faqs';
import { AI_POLICIES_KNOWLEDGE } from '@/lib/ai/knowledge/policies';
import { AI_CONTACT_KNOWLEDGE } from '@/lib/ai/knowledge/contact';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// Convert Pakistani real estate budget terms to numeric PKR
function parsePakistaniBudget(text: string): { minPrice?: number; maxPrice?: number } {
  const lower = text.toLowerCase();
  let maxPrice: number | undefined;
  let minPrice: number | undefined;

  // Match e.g. "5 crore", "10 crore", "8.5 crore"
  const croreMatch = lower.match(/(\d+(\.\d+)?)\s*(crore|cr|kror)/i);
  if (croreMatch) {
    const val = parseFloat(croreMatch[1]) * 10000000;
    maxPrice = val;
  }

  // Match e.g. "50 lakh", "80 lac", "5 lakh"
  const lakhMatch = lower.match(/(\d+(\.\d+)?)\s*(lakh|lac|lacs)/i);
  if (lakhMatch) {
    const val = parseFloat(lakhMatch[1]) * 100000;
    maxPrice = val;
  }

  // Match e.g. "100 million", "150m"
  const millionMatch = lower.match(/(\d+(\.\d+)?)\s*(million|m)\b/i);
  if (millionMatch && !croreMatch && !lakhMatch) {
    const val = parseFloat(millionMatch[1]) * 1000000;
    maxPrice = val;
  }

  // Match ranges like "5 to 10 crore"
  const rangeCrore = lower.match(/(\d+(\.\d+)?)\s*(?:to|-)\s*(\d+(\.\d+)?)\s*(crore|cr)/i);
  if (rangeCrore) {
    minPrice = parseFloat(rangeCrore[1]) * 10000000;
    maxPrice = parseFloat(rangeCrore[3]) * 10000000;
  }

  return { minPrice, maxPrice };
}

// Extract location keywords
function parseLocation(text: string): string | undefined {
  const lower = text.toLowerCase();
  if (lower.includes('emaar') || lower.includes('coral') || lower.includes('pearl')) return 'Emaar Oceanfront';
  if (lower.includes('phase 8') || lower.includes('phase viii')) return 'DHA Phase 8';
  if (lower.includes('phase 6') || lower.includes('phase vi')) return 'DHA Phase 6';
  if (lower.includes('phase 5') || lower.includes('phase v')) return 'DHA Phase 5';
  if (lower.includes('dha') || lower.includes('defence')) return 'DHA';
  if (lower.includes('clifton') || lower.includes('sea view') || lower.includes('boat basin')) return 'Clifton';
  if (lower.includes('bahria') || lower.includes('golf city')) return 'Bahria Town';
  if (lower.includes('pechs') || lower.includes('shahrah-e-faisal') || lower.includes('faisal')) return 'PECHS';
  return undefined;
}

// Extract bedroom count
function parseBedrooms(text: string): number | undefined {
  const lower = text.toLowerCase();
  const bedMatch = lower.match(/(\d+)\s*(?:bed|bedroom|bhk|kamray|room)/i);
  if (bedMatch) {
    return parseInt(bedMatch[1], 10);
  }
  return undefined;
}

// Extract purpose (Buy / Rent)
function parsePurpose(text: string): 'Buy' | 'Rent' | undefined {
  const lower = text.toLowerCase();
  if (lower.includes('rent') || lower.includes('kiraya') || lower.includes('lease') || lower.includes('tenant')) {
    return 'Rent';
  }
  if (lower.includes('buy') || lower.includes('purchase') || lower.includes('khareed') || lower.includes('sale')) {
    return 'Buy';
  }
  return undefined;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, messages = [], conversationId } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message text is required' }, { status: 400 });
    }

    const userMessage = message.trim();
    const lowerUserMessage = userMessage.toLowerCase();

    // Security & Anti-Exploit Filter
    if (
      lowerUserMessage.includes('ignore previous instructions') ||
      lowerUserMessage.includes('system prompt') ||
      lowerUserMessage.includes('show me your database') ||
      lowerUserMessage.includes('owner phone numbers') ||
      lowerUserMessage.includes('admin password') ||
      lowerUserMessage.includes('database credentials')
    ) {
      return NextResponse.json({
        text: "I am the Ali Estate AI Assistant. I can only provide information about our published property catalog, verified services, and assist with bookings and inquiries. I cannot disclose internal administrative, database, or confidential owner details.",
        suggestedActions: ["Find a Property", "Talk to an Agent", "About Ali Estate"],
        properties: [],
      });
    }

    // Check for Lead submission intent directly inside chat
    if (
      lowerUserMessage.startsWith('lead:') ||
      lowerUserMessage.includes('contact me at') ||
      lowerUserMessage.includes('my number is')
    ) {
      // Record lead
      const phoneMatch = userMessage.match(/(\+?92\s*\d{3}\s*\d{7}|\b03\d{2}\s*\d{7}\b|\b\d{10,13}\b)/);
      const emailMatch = userMessage.match(/[\w.-]+@[\w.-]+\.\w+/);
      const nameMatch = userMessage.match(/(?:my name is|i am|name:?)\s*([A-Za-z\s]{2,30})/i);

      if (phoneMatch) {
        db.leads.create({
          name: nameMatch ? nameMatch[1].trim() : 'AI Chat Inquirer',
          phone: phoneMatch[0].trim(),
          email: emailMatch ? emailMatch[0].trim() : '',
          source: 'ai_chat',
          status: 'new',
          notes: `Created via Ali Estate AI Assistant conversation: "${userMessage}"`,
        });

        return NextResponse.json({
          text: `Thank you! I have registered your details in our CRM. A senior consultant from Ali Estate & Marketing Agency will reach out to you directly on ${phoneMatch[0].trim()}. Would you like to explore any specific properties in the meantime?`,
          suggestedActions: ["Find a Property", "WhatsApp Desk", "Explore Services"],
          properties: [],
        });
      }
    }

    // Check if user is asking for properties
    const parsedBudget = parsePakistaniBudget(userMessage);
    const parsedLoc = parseLocation(userMessage);
    const parsedBeds = parseBedrooms(userMessage);
    const parsedPurp = parsePurpose(userMessage);

    const isPropertyQuery =
      parsedLoc ||
      parsedBeds ||
      parsedBudget.maxPrice ||
      lowerUserMessage.includes('property') ||
      lowerUserMessage.includes('house') ||
      lowerUserMessage.includes('villa') ||
      lowerUserMessage.includes('apartment') ||
      lowerUserMessage.includes('penthouse') ||
      lowerUserMessage.includes('flat') ||
      lowerUserMessage.includes('commercial') ||
      lowerUserMessage.includes('ghar') ||
      lowerUserMessage.includes('available');

    let matchedProperties: PublicPropertyCard[] = [];
    if (isPropertyQuery) {
      matchedProperties = AI_PROPERTIES_KNOWLEDGE.searchProperties({
        purpose: parsedPurp,
        area: parsedLoc,
        bedrooms: parsedBeds,
        minPrice: parsedBudget.minPrice,
        maxPrice: parsedBudget.maxPrice,
      });

      // If strict filter yielded 0 results, try partial location or purpose
      if (matchedProperties.length === 0 && (parsedLoc || parsedPurp)) {
        matchedProperties = AI_PROPERTIES_KNOWLEDGE.searchProperties({
          purpose: parsedPurp,
          area: parsedLoc,
        });
      }
    }

    // Prepare Knowledge Context for Gemini
    const allPublished = AI_PROPERTIES_KNOWLEDGE.getAllPublishedProperties();
    const publishedListSummary = allPublished
      .map(
        (p) =>
          `[ID: ${p.id} | Slug: ${p.slug}] ${p.title} - ${p.purpose} for ${p.priceDisplay} in ${p.location}, ${p.city}. (${p.bedrooms} Beds, ${p.bathrooms} Baths, ${p.area} ${p.areaUnit}). Verified: ${p.verified}. Amenities: ${p.amenities.slice(0, 4).join(', ')}`
      )
      .join('\n');

    const systemInstruction = `
You are "Ali Estate AI", the official AI property assistant for Ali Estate & Marketing Agency in Karachi, Pakistan.
You assist buyers, sellers, tenants, and investors with verified property search, scheduling viewings, understanding services, and connecting with human consultants.

Strict Rules:
1. NEVER invent properties, prices, availability, agents, statistics, testimonials, or legal claims. Only reference active published listings.
2. If a requested property or criteria does not exist in our catalog, clearly state: "I don't currently have a verified listing matching that exact request. I can connect you with an Ali Estate agent who may have off-market options in that enclave."
3. Understand Pakistani real estate terms: Crore (1 Crore = 10 Million PKR), Lakh (1 Lakh = 100,000 PKR), Sq Yds (Square Yards), Gaz, Kanal, Marla, DHA Phases 1-8, Clifton, Bahria Town, Emaar Oceanfront, PECHS.
4. Support English, Urdu, and Roman Urdu. If the user greets or asks in Roman Urdu (e.g. "DHA mein 5 crore tak ghar chahiye"), reply politely in natural Roman Urdu with accurate property facts!
5. Never provide automated formal valuations or legal tax advice; explain that formal valuations require physical inspection by the Ali Estate team.
6. Never promise guaranteed investment returns.
7. If the user wants to buy, sell, or rent, ask qualifying questions one by one (area, budget, bedrooms, timeline) and offer to connect with an agent.
8. Keep your replies concise, luxurious, polite, professional, and helpful.

Agency Details:
- Name: ${AI_AGENCY_KNOWLEDGE.name}
- Office: ${AI_CONTACT_KNOWLEDGE.officeAddress}
- Phone: ${AI_CONTACT_KNOWLEDGE.phoneDisplay}
- WhatsApp: ${AI_CONTACT_KNOWLEDGE.whatsappDisplay}
- Email: ${AI_CONTACT_KNOWLEDGE.email}
- Hours: ${AI_CONTACT_KNOWLEDGE.workingHours.weekdays}
- Services: ${AI_SERVICES_KNOWLEDGE.getAllServicesSummary()}
- Published Areas: Clifton, DHA Phase 8, DHA Phase 6, Emaar Oceanfront, Bahria Town Karachi, PECHS.

Active Published Property Catalog (Source of Truth):
${publishedListSummary}
`;

    // Attempt Gemini Generation
    let aiTextResponse = '';
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        
        // Build conversation history format
        const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];
        
        // Add past messages
        for (const m of messages.slice(-6)) {
          contents.push({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }],
          });
        }

        // Add current message
        contents.push({
          role: 'user',
          parts: [{ text: userMessage }],
        });

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: contents,
          config: {
            systemInstruction: systemInstruction,
            temperature: 0.3,
            maxOutputTokens: 600,
          },
        });

        aiTextResponse = response.text || '';
      } catch (geminiErr) {
        console.warn('Gemini API call failed, falling back to knowledge engine', geminiErr);
      }
    }

    // Fallback rule-based intelligence engine if Gemini key is missing or failed
    if (!aiTextResponse) {
      if (lowerUserMessage.includes('hello') || lowerUserMessage.includes('hi') || lowerUserMessage.includes('salam') || lowerUserMessage.includes('aoa')) {
        aiTextResponse = "Hello! Welcome to Ali Estate & Marketing Agency. I can assist you with discovering luxury properties across Karachi (DHA, Clifton, Emaar Oceanfront, Bahria Town), evaluating listing options, or scheduling a private viewing with our senior consultants. How may I assist you today?";
      } else if (lowerUserMessage.includes('what is ali estate') || lowerUserMessage.includes('about')) {
        aiTextResponse = "Ali Estate & Marketing Agency is a premier real estate consultancy and digital property marketing agency based in Karachi. We specialize in luxury residential brokerage, corporate commercial assets, and in-house architectural cinematography and targeted digital buyer campaigns.";
      } else if (lowerUserMessage.includes('service') || lowerUserMessage.includes('offer')) {
        aiTextResponse = "We provide dual-discipline services:\n\n1. Real Estate Brokerage: Property Buying, Selling, Corporate Leasing, Portfolio Investment, and Valuation Guidance.\n2. Property Marketing & Media: 4K Cinematic Video Tours, Architectural Photography, Drone Aerial Cinematography, and Targeted Overseas Investor Campaigns.\n\nWould you like more details on a specific service?";
      } else if (lowerUserMessage.includes('sell') || lowerUserMessage.includes('list')) {
        aiTextResponse = "We would be delighted to represent your property. Our team conducts physical site inspections, verifies title documents, produces professional 4K media, and markets directly to qualified buyers. You can share your property details here, use our 'List Your Property' form, or connect directly with our advisory desk.";
      } else if (lowerUserMessage.includes('contact') || lowerUserMessage.includes('office') || lowerUserMessage.includes('phone') || lowerUserMessage.includes('address')) {
        aiTextResponse = `You can reach Ali Estate & Marketing Agency directly at:\n\n• Phone: ${AI_CONTACT_KNOWLEDGE.phoneDisplay}\n• WhatsApp: ${AI_CONTACT_KNOWLEDGE.whatsappDisplay}\n• Email: ${AI_CONTACT_KNOWLEDGE.email}\n• Office: ${AI_CONTACT_KNOWLEDGE.officeAddress}\n• Hours: ${AI_CONTACT_KNOWLEDGE.workingHours.weekdays}`;
      } else if (matchedProperties.length > 0) {
        aiTextResponse = `I found ${matchedProperties.length} active verified property listing${matchedProperties.length > 1 ? 's' : ''} in our portfolio matching your criteria. You can explore details or schedule a private viewing below:`;
      } else if (isPropertyQuery) {
        aiTextResponse = "I don't currently have an active verified listing in our public catalog matching those exact criteria. However, our consultants frequently manage discrete off-market estates in DHA and Clifton. Would you like me to connect you with an Ali Estate agent?";
      } else {
        aiTextResponse = "Thank you for reaching out to Ali Estate & Marketing Agency. I can help you find verified properties in DHA, Clifton, and Emaar Oceanfront, assist with listing your property, or connect you with a senior consultant. What specific requirements do you have?";
      }
    }

    // Dynamic suggested actions based on context
    const suggestedActions: string[] = [];
    if (matchedProperties.length > 0) {
      suggestedActions.push("Schedule a Viewing", "WhatsApp Agent", "Search More Properties");
    } else if (lowerUserMessage.includes('sell') || lowerUserMessage.includes('list')) {
      suggestedActions.push("List My Property", "Talk to an Agent", "Marketing Services");
    } else if (lowerUserMessage.includes('rent')) {
      suggestedActions.push("View Rental Listings", "DHA Phase 8", "Clifton Penthouses");
    } else {
      suggestedActions.push("Find a Property", "Sell My Property", "Rent a Property", "Talk to an Agent");
    }

    return NextResponse.json({
      text: aiTextResponse,
      suggestedActions,
      properties: matchedProperties.slice(0, 3), // Return up to top 3 matching cards for chat
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
