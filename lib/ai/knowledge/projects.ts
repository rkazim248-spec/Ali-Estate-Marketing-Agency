/**
 * Projects / Developments Knowledge Base
 * Sourced from verified developments represented by Ali Estate
 */

import { PROJECTS, ProjectDevelopment } from '@/lib/projects';

export const AI_PROJECTS_KNOWLEDGE = {
  getAllProjects(): ProjectDevelopment[] {
    return PROJECTS;
  },

  getProjectBySlug(slug: string): ProjectDevelopment | undefined {
    return PROJECTS.find((p) => p.slug === slug);
  },

  getProjectsSummary(): string {
    return PROJECTS.map(
      (p) =>
        `• ${p.name} (${p.location}): Developer ${p.developer}. Starting price: ${p.startingPrice}. Types: ${p.propertyTypes.join(', ')}. Status: ${p.status}.`
    ).join('\n');
  }
};
