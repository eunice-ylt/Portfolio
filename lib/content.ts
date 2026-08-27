import { seedContent } from '@/data/seed';
import { getSupabaseClient } from './supabase';
import type { PortfolioContent, Project, SkillCategory, SkillItem } from './types';

function cloneSeed(): PortfolioContent {
  return JSON.parse(JSON.stringify(seedContent)) as PortfolioContent;
}

export async function getPortfolioContent(): Promise<PortfolioContent> {
  const supabase = getSupabaseClient();
  if (!supabase) return cloneSeed();

  try {
    const [hero, about, traits, categories, items, projects, contact] = await Promise.all([
      supabase.from('hero').select('*').limit(1).maybeSingle(),
      supabase.from('about').select('*').limit(1).maybeSingle(),
      supabase.from('traits').select('*').eq('is_active', true).order('sort_order'),
      supabase.from('skill_categories').select('*').eq('is_active', true).order('sort_order'),
      supabase.from('skill_items').select('*').order('sort_order'),
      supabase.from('projects').select('*').eq('published', true).order('sort_order'),
      supabase.from('contact').select('*').limit(1).maybeSingle(),
    ]);
    const anyError = [hero, about, traits, categories, items, projects, contact].some((result) => result.error);
    if (anyError || !hero.data || !about.data || !contact.data) return cloneSeed();

    const skillItems = (items.data ?? []) as SkillItem[];
    const skills = ((categories.data ?? []) as Omit<SkillCategory, 'skill_items'>[]).map((category) => ({
      ...category,
      skill_items: skillItems.filter((item) => item.category_id === category.id),
    }));

    return {
      hero: hero.data,
      about: about.data,
      traits: traits.data ?? [],
      skills,
      projects: (projects.data ?? []) as Project[],
      contact: contact.data,
    } as PortfolioContent;
  } catch {
    return cloneSeed();
  }
}

export async function getProjectBySlug(slug: string) {
  const content = await getPortfolioContent();
  return content.projects.find((project) => project.slug === slug) ?? null;
}
