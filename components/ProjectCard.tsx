import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import type { Locale, Project } from '@/lib/types';
import { localize, sanitizeVisibleText } from '@/lib/locale';
import { getDictionary } from '@/lib/dictionary';

export function ProjectCard({ project, locale, index }: { project: Project; locale: Locale; index: number }) {
  const t = getDictionary(locale);
  const title = localize(locale, project.title_zh, project.title_en);
  return (
    <article className="project-card group flex h-full min-w-0 flex-col overflow-hidden">
      <a className="project-visual relative block aspect-[4/3]" href={`/${locale}/projects/${project.slug}`}>
        {project.cover_image ? (
          <Image unoptimized fill sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 25vw" className="object-cover" src={project.cover_image} alt={localize(locale, project.cover_alt_zh, project.cover_alt_en) || title} />
        ) : (
          <span className="display-type grid h-full place-items-center text-6xl font-semibold italic text-[color:rgb(39_95_61/45%)]">YL</span>
        )}
        <span className="absolute left-4 top-4 bg-[color:rgb(255_253_248/92%)] px-3 py-2 text-[10px] font-semibold tracking-[.1em] text-[var(--accent-strong)] backdrop-blur-sm">{t.caseLabel} {String(index + 1).padStart(2, '0')}</span>
      </a>
      <div className="flex flex-1 flex-col p-5 lg:p-6">
        <div className="flex items-center justify-between gap-4 text-[10px] font-semibold tracking-[.08em] text-[var(--ink-muted)]">
          <span>{sanitizeVisibleText(project.category)}</span>
          <span>{sanitizeVisibleText(project.project_period)}</span>
        </div>
        <h2 className="display-type mt-5 text-[clamp(1.35rem,2vw,1.8rem)] font-semibold leading-[1.2] tracking-[-.03em]"><a href={`/${locale}/projects/${project.slug}`}>{title}</a></h2>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[var(--ink-soft)]">{localize(locale, project.short_description_zh, project.short_description_en)}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => <span className="bg-[var(--mist)] px-2.5 py-1 text-[10px] font-medium text-[var(--ink-soft)]" key={tag}>{sanitizeVisibleText(tag)}</span>)}
        </div>
        <a aria-label={`${t.viewCase}: ${title}`} className="mt-auto flex min-h-11 items-center justify-between border-t border-[var(--line)] pt-5 text-xs font-semibold text-[var(--accent-strong)]" href={`/${locale}/projects/${project.slug}`}><span>{t.viewCase}</span><ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={17} /></a>
      </div>
    </article>
  );
}
