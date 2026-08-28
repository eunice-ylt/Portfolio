import type { Metadata } from 'next';
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
        <header className="border-b border-[#1f3b2f]/10 bg-[#f7f6f1]">
          <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
            <a className="inline-flex items-center gap-2 text-xs font-bold text-[#3f6a4b]" href={`/${locale}/projects`}><ArrowLeft size={16} /> {t.back}</a>
            <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-end">
              <div>
                <span className="text-[10px] font-bold tracking-[.18em] text-[#52705c]">{sanitizeVisibleText(project.category)} / CASE STUDY</span>
                <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-[1.08] tracking-[-.05em] sm:text-6xl">{title}</h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-[#56615b]">{localize(locale, project.short_description_zh, project.short_description_en)}</p>
              </div>
              <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-[#1f3b2f]/10 bg-[#1f3b2f]/10 text-sm">
                <div className="bg-[#fbfaf6] p-5"><dt className="text-[9px] font-bold tracking-widest text-[#718078]">{t.category}</dt><dd className="mt-2 font-semibold">{sanitizeVisibleText(project.category)}</dd></div>
                <div className="bg-[#fbfaf6] p-5"><dt className="text-[9px] font-bold tracking-widest text-[#718078]">{t.role}</dt><dd className="mt-2 font-semibold">{localize(locale, project.role_zh, project.role_en)}</dd></div>
                <div className="col-span-2 bg-[#fbfaf6] p-5"><dt className="text-[9px] font-bold tracking-widest text-[#718078]">{t.period}</dt><dd className="mt-2 font-semibold">{sanitizeVisibleText(project.project_period)}</dd></div>
              </dl>
            </div>
          </div>
          {project.cover_image && <div className="mx-auto max-w-[1440px] px-5 pb-16 sm:px-8 lg:px-10"><img className="aspect-[16/7] w-full rounded-xl object-cover" src={project.cover_image} alt={localize(locale, project.cover_alt_zh, project.cover_alt_en) || title} /></div>}
        </header>
        <section className="bg-[#fbfaf6] py-16 lg:py-24">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <p className="text-[10px] font-bold tracking-[.18em] text-[#52705c]">{t.overview.toUpperCase()}</p>
            <div className="prose-portfolio mt-8"><ReactMarkdown>{localize(locale, project.content_zh, project.content_en)}</ReactMarkdown></div>
            <ProjectGallery images={project.gallery_images ?? []} title={title} />
          </div>
        </section>
      </article>
      <ContactSection contact={content.contact} locale={locale} />
      <Footer contact={content.contact} locale={locale} />
    </main>
  );
}
