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
      <section className="relative overflow-hidden border-b border-[var(--line)] bg-[var(--paper)] py-20 lg:py-32">
        <div className="spec-grid absolute inset-0 opacity-55" />
        <div className="page-shell relative grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h1 className="display-type text-balance text-[clamp(3.25rem,8vw,7.5rem)] font-semibold leading-[.92] tracking-[-.04em]">{t.casesTitle}</h1>
          </div>
          <div className="lg:col-span-4 lg:pb-2">
            <p className="text-[10px] font-semibold tracking-[.11em] text-[var(--ink-muted)]">{t.projectArchive}</p>
            <p className="mt-5 max-w-[58ch] text-base leading-8 text-[var(--ink-soft)]">{t.casesDescription}</p>
          </div>
        </div>
      </section>
      <section className="section-space bg-[var(--paper)]"><div className="page-shell"><ProjectList projects={projects} locale={locale} /></div></section>
      <ContactSection contact={content.contact} locale={locale} />
      <Footer contact={content.contact} locale={locale} />
    </main>
  );
}
