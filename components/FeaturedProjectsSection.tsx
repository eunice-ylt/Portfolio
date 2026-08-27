import { ArrowRight } from 'lucide-react';
import type { Locale, Project } from '@/lib/types';
import { getDictionary } from '@/lib/dictionary';
import { ProjectCard } from './ProjectCard';
import { SectionHeading } from './SectionHeading';

export function FeaturedProjectsSection({ projects, locale }: { projects: Project[]; locale: Locale }) {
  const t = getDictionary(locale);
  const featured = projects.filter((project) => project.published && project.featured).sort((a, b) => a.sort_order - b.sort_order).slice(0, 4);
  return (
    <section id="projects" className="scroll-mt-24 border-t border-[#1f3b2f]/10 bg-[#f7f6f1] py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <SectionHeading title={t.selected} eyebrow={t.selectedEyebrow} action={<a className="hidden items-center gap-2 text-xs font-bold text-[#355d40] sm:flex" href={`/${locale}/projects`}>{t.allProjects} <ArrowRight size={16} /></a>} />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">{featured.map((project, index) => <ProjectCard key={project.id} project={project} locale={locale} index={index} />)}</div>
        <a className="mt-8 inline-flex items-center gap-2 text-xs font-bold text-[#355d40] sm:hidden" href={`/${locale}/projects`}>{t.allProjects} <ArrowRight size={16} /></a>
      </div>
    </section>
  );
}
