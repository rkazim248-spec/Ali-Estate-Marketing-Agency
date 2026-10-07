/**
 * Published Agents & Consultants Knowledge Base
 * Exposes only public staff profiles, names, roles, specializations, and public desk info.
 * Strictly shields private phone numbers, notes, and commissions.
 */

import { TEAM_MEMBERS, TeamMember } from '@/lib/team';

export interface PublicAgentProfile {
  name: string;
  role: string;
  department: string;
  bio: string;
  publicDeskEmail: string;
  specialization: string;
}

export const AI_AGENTS_KNOWLEDGE = {
  getPublishedAgents(): PublicAgentProfile[] {
    return TEAM_MEMBERS.map((m) => ({
      name: m.name,
      role: m.role,
      department: m.department,
      bio: m.bio,
      publicDeskEmail: m.email,
      specialization: m.department === 'Creative & Marketing'
        ? 'Digital Property Marketing & Cinematic Media'
        : m.role.includes('Commercial')
        ? 'Commercial Real Estate & Office Towers'
        : 'Luxury Residential Estates (DHA & Clifton)'
    }));
  },

  getAgentsSummary(): string {
    return this.getPublishedAgents()
      .map((a) => `• ${a.name} (${a.role}): ${a.specialization}. Focus: ${a.bio}`)
      .join('\n');
  }
};
