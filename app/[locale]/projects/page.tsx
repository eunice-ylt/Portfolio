import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { ProjectList } from '@/components/projects/ProjectList';
import { getPortfolioContent } from '@/lib/content';
import { getDictionary } from '@/lib/dictionary';
import { isLocale } from '@/lib/locale';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return { title: `${t.casesTitle}｜Yi-Ning Lo`, description: t.casesDescription, alternates: { languages: { 'zh-TW': '/zh-TW/projects', en: '/en/projects' } } };
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = await getPortfolioContent();
  const t = getDictionary(locale);
  const projects = content.projects.filter((project) => project.published).sort((a, b) => a.sort_order - b.sort_order);
  return (
    <main>
      <Header locale={locale} />
      <section className="relative overflow-hidden border-b border-[#1f3b2f]/10 bg-[#f7f6f1] py-20 lg:py-28">
        <div className="blueprint-grid absolute inset-0 opacity-45" />
        <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
          <p className="text-[10px] font-bold tracking-[.18em] text-[#52705c]">SELECTED WORK / PROJECT ARCHIVE</p>
          <h1 className="mt-5 text-5xl font-semibold tracking-[-.055em] sm:text-7xl">{t.casesTitle}</h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#56615b]">{t.casesDescription}</p>
        </div>
      </section>
      <section className="bg-[#fbfaf6] py-16 lg:py-24"><div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10"><ProjectList projects={projects} locale={locale} /></div></section>
      <ContactSection contact={content.contact} locale={locale} />
      <Footer contact={content.contact} locale={locale} />
    </main>
  );
}
