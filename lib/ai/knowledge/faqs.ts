/**
 * FAQs Knowledge Base for Ali Estate AI Assistant
 * Provides verified answers to common client questions.
 */

import { FAQS, FAQItem } from '@/lib/faqs';

export const AI_FAQS_KNOWLEDGE = {
  getAllFAQs(): FAQItem[] {
    return FAQS;
  },

  getFAQsFormatted(): string {
    return FAQS.map((f, i) => `Q${i + 1}: ${f.question}\nA: ${f.answer}`).join('\n\n');
  },

  searchFAQs(query: string): FAQItem[] {
    const q = query.toLowerCase();
    return FAQS.filter(
      (f) =>
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q)
    );
  }
};
