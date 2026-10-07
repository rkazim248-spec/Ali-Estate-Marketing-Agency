import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { 
      name, 
      phone, 
      email = '', 
      source = 'ai_chat', 
      purpose = 'buy', 
      budgetMin, 
      budgetMax, 
      preferredLocations, 
      bedrooms, 
      propertyTypes, 
      propertyId, 
      propertyTitle, 
      notes = '' 
    } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Name and Phone number are required' },
        { status: 400 }
      );
    }

    const newLead = db.leads.create({
      name: String(name).trim(),
      phone: String(phone).trim(),
      email: String(email).trim(),
      source: source as 'ai_chat' | 'website' | 'whatsapp' | 'phone',
      status: 'new',
      purpose: purpose as 'buy' | 'rent' | 'sell',
      budgetMin: budgetMin ? Number(budgetMin) : undefined,
      budgetMax: budgetMax ? Number(budgetMax) : undefined,
      preferredLocations: Array.isArray(preferredLocations) ? preferredLocations : preferredLocations ? [String(preferredLocations)] : [],
      bedrooms: bedrooms ? Number(bedrooms) : undefined,
      propertyTypes: Array.isArray(propertyTypes) ? propertyTypes : propertyTypes ? [String(propertyTypes)] : [],
      propertyId: propertyId ? String(propertyId) : undefined,
      propertyTitle: propertyTitle ? String(propertyTitle) : undefined,
      notes: notes ? String(notes) : undefined,
    });

    return NextResponse.json({
      success: true,
      message: 'Lead recorded successfully in CRM',
      lead: newLead,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to record lead';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function GET() {
  try {
    const leads = db.leads.findAll();
    return NextResponse.json({
      count: leads.length,
      leads,
    });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}
