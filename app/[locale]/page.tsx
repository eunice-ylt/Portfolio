import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AboutSection } from '@/components/AboutSection';
import { ContactSection } from '@/components/ContactSection';
import { CoreSkillsSection } from '@/components/CoreSkillsSection';
import { FeaturedProjectsSection } from '@/components/FeaturedProjectsSection';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { getPortfolioContent } from '@/lib/content';
import { isLocale, localize, locales } from '@/lib/locale';

export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const content = await getPortfolioContent();
  return {
    title: locale === 'en' ? 'Yi-Ning Lo | Product Manager & System Analyst' : '羅翊寧 Yi-Ning Lo｜產品經理・系統分析師',
    description: localize(locale, content.hero.description_zh, content.hero.description_en),
    alternates: { languages: { 'zh-TW': '/zh-TW', en: '/en' } },
  };
}

export default async function PortfolioHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = await getPortfolioContent();
  return (
    <main>
      <Header locale={locale} />
      <HeroSection hero={content.hero} locale={locale} />
      <AboutSection about={content.about} traits={content.traits} locale={locale} />
      <CoreSkillsSection skills={content.skills} locale={locale} />
      <FeaturedProjectsSection projects={content.projects} locale={locale} />
      <ContactSection contact={content.contact} locale={locale} />
      <Footer contact={content.contact} locale={locale} />
    </main>
  );
}
