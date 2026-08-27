import { ArrowRight } from 'lucide-react';
import type { Locale, Project } from '@/lib/types';
import { localize } from '@/lib/locale';
import { getDictionary } from '@/lib/dictionary';

export function ProjectCard({ project, locale, index }: { project: Project; locale: Locale; index: number }) {
  const t = getDictionary(locale);
  return (
    <article className="project-card group overflow-hidden rounded-lg border border-[#1f3b2f]/10 bg-white/75">
      <a className="block h-full" href={`/${locale}/projects/${project.slug}`}>
        <div className="relative aspect-[16/10] overflow-hidden bg-[#dfe4dc]">
          {project.cover_image ? <img className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]" src={project.cover_image} alt={localize(locale, project.cover_alt_zh, project.cover_alt_en) || localize(locale, project.title_zh, project.title_en)} /> : <span className="grid h-full place-items-center font-serif text-6xl italic text-[#31563c]/50">YL</span>}
          <span className="absolute left-4 top-4 text-[9px] font-bold tracking-[.12em] text-white drop-shadow">CASE {String(index + 1).padStart(2, '0')}</span>
        </div>
        <div className="flex min-h-[245px] flex-col p-5">
          <span className="text-[10px] font-bold tracking-[.14em] text-[#63806b]">{project.category}</span>
          <h3 className="mt-3 text-lg font-bold leading-snug tracking-[-.02em]">{localize(locale, project.title_zh, project.title_en)}</h3>
          <p className="mt-3 line-clamp-3 text-sm leading-7 text-[#59625e]">{localize(locale, project.short_description_zh, project.short_description_en)}</p>
          <div className="mt-5 flex flex-wrap gap-2">{project.tags.map((tag) => <span className="rounded bg-[#eef1ea] px-2.5 py-1 text-[10px] font-semibold text-[#486050]" key={tag}>{tag}</span>)}</div>
          <span className="mt-auto flex items-center gap-2 pt-6 text-[10px] font-bold tracking-[.12em] text-[#244d32]">{t.viewCase} <ArrowRight className="transition group-hover:translate-x-1" size={15} /></span>
        </div>
      </a>
    </article>
  );
}
