export type Locale = 'zh-TW' | 'en';

export type HeroContent = {
  id: string;
  eyebrow_zh: string;
  eyebrow_en: string;
  title_zh: string;
  title_en: string;
  description_zh: string;
  description_en: string;
  image_url: string | null;
  image_alt_zh: string;
  image_alt_en: string;
  primary_cta_label_zh: string;
  primary_cta_label_en: string;
  primary_cta_url: string;
  secondary_cta_label_zh: string;
  secondary_cta_label_en: string;
  secondary_cta_url: string;
};

export type AboutContent = {
  id: string;
  title_zh: string;
  title_en: string;
  content_zh: string;
  content_en: string;
  note_zh: string;
  note_en: string;
};

export type Trait = {
  id: string;
  title_zh: string;
  title_en: string;
  description_zh: string;
  description_en: string;
  icon: string;
  sort_order: number;
  is_active: boolean;
};

export type SkillItem = {
  id: string;
  category_id: string;
  name_zh: string;
  name_en: string;
  sort_order: number;
};

export type SkillCategory = {
  id: string;
  number: string;
  title_zh: string;
  title_en: string;
  icon: string;
  sort_order: number;
  is_active: boolean;
  skill_items: SkillItem[];
};

export type Project = {
  id: string;
  title_zh: string;
  title_en: string;
  slug: string;
  short_description_zh: string;
  short_description_en: string;
  content_zh: string;
  content_en: string;
  cover_image: string | null;
  cover_alt_zh: string;
  cover_alt_en: string;
  gallery_images: string[];
  category: string;
  tags: string[];
  role_zh: string;
  role_en: string;
  project_period: string;
  featured: boolean;
  published: boolean;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
};

export type ContactContent = {
  id: string;
  title_zh: string;
  title_en: string;
  description_zh: string;
  description_en: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  location_zh: string;
  location_en: string;
};

export type PortfolioContent = {
  hero: HeroContent;
  about: AboutContent;
  traits: Trait[];
  skills: SkillCategory[];
  projects: Project[];
  contact: ContactContent;
};

export type EditableTable = 'hero' | 'about' | 'traits' | 'skill_categories' | 'skill_items' | 'projects' | 'contact';
