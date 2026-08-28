import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { ProjectGallery } from '@/components/projects/ProjectGallery';
import { getPortfolioContent, getProjectBySlug } from '@/lib/content';
import { getDictionary } from '@/lib/dictionary';
import { isLocale, localize, sanitizeVisibleText } from '@/lib/locale';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  const title = localize(locale, project.title_zh, project.title_en);
  const description = localize(locale, project.short_description_zh, project.short_description_en);
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const image = project.cover_image && (project.cover_image.startsWith('http') ? project.cover_image : new URL(project.cover_image, origin).toString());
  return { title: `${title}｜Yi-Ning Lo`, description, openGraph: { title, description, images: image ? [{ url: image }] : [] }, twitter: { card: image ? 'summary_large_image' : 'summary', title, description, images: image ? [image] : [] } };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const [project, content] = await Promise.all([getProjectBySlug(slug), getPortfolioContent()]);
  if (!project?.published) notFound();
  const t = getDictionary(locale);
  const title = localize(locale, project.title_zh, project.title_en);
  return (
    <main>
      <Header locale={locale} />
      <article>
        <header className="border-b border-[var(--line)] bg-[var(--paper)]">
          <div className="page-shell py-14 lg:py-20">
            <a className="inline-flex min-h-11 items-center gap-2 text-xs font-semibold text-[var(--accent)]" href={`/${locale}/projects`}><ArrowLeft size={16} /> {t.back}</a>
            <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <span className="text-[10px] font-semibold tracking-[.11em] text-[var(--ink-muted)]">{sanitizeVisibleText(project.category)} / {t.caseStudyLabel}</span>
                <h1 className="display-type mt-5 max-w-5xl text-balance text-[clamp(2.8rem,6.7vw,6.5rem)] font-semibold leading-[.97] tracking-[-.04em]">{title}</h1>
                <p className="mt-7 max-w-[64ch] text-base leading-8 text-[var(--ink-soft)]">{localize(locale, project.short_description_zh, project.short_description_en)}</p>
              </div>
              <dl className="grid border-t border-[var(--line-strong)] text-sm lg:col-span-4">
                <div className="grid grid-cols-[6rem_1fr] border-b border-[var(--line)] py-4"><dt className="meta-label">{t.category}</dt><dd className="font-semibold">{sanitizeVisibleText(project.category)}</dd></div>
                <div className="grid grid-cols-[6rem_1fr] border-b border-[var(--line)] py-4"><dt className="meta-label">{t.role}</dt><dd className="font-semibold leading-6">{localize(locale, project.role_zh, project.role_en)}</dd></div>
                <div className="grid grid-cols-[6rem_1fr] border-b border-[var(--line)] py-4"><dt className="meta-label">{t.period}</dt><dd className="font-semibold">{sanitizeVisibleText(project.project_period)}</dd></div>
              </dl>
            </div>
          </div>
          {project.cover_image && <div className="page-shell pb-16"><div className="relative aspect-[16/8] overflow-hidden bg-[var(--mist)]"><Image unoptimized fill priority loading="eager" sizes="100vw" className="object-cover" src={project.cover_image} alt={localize(locale, project.cover_alt_zh, project.cover_alt_en) || title} /></div></div>}
        </header>
        <section className="section-space bg-[var(--paper)]">
          <div className="page-shell grid gap-10 lg:grid-cols-12">
            <aside className="lg:col-span-3">
              <p className="sticky top-28 text-[10px] font-semibold tracking-[.11em] text-[var(--ink-muted)]">{t.overview.toUpperCase()}</p>
            </aside>
            <div className="lg:col-span-8">
              <div className="prose-portfolio"><ReactMarkdown>{localize(locale, project.content_zh, project.content_en)}</ReactMarkdown></div>
              <ProjectGallery images={project.gallery_images ?? []} title={title} />
            </div>
          </div>
        </section>
      </article>
      <ContactSection contact={content.contact} locale={locale} />
      <Footer contact={content.contact} locale={locale} />
    </main>
  );
}
