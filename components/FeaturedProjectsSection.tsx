import { ArrowRight } from 'lucide-react';
import type { Locale, Project } from '@/lib/types';
import { getDictionary } from '@/lib/dictionary';
import { SectionHeading } from './SectionHeading';
import { ProjectCard } from './ProjectCard';

export function FeaturedProjectsSection({ projects, locale }: { projects: Project[]; locale: Locale }) {
  const t = getDictionary(locale);
  const featured = projects.filter((project) => project.published && project.featured).sort((a, b) => a.sort_order - b.sort_order).slice(0, 4);

  return (
    <section id="projects" className="section-space scroll-mt-24 border-t border-[var(--line)] bg-[var(--paper)]">
      <div className="page-shell">
        <SectionHeading
          title={t.selected}
          eyebrow={t.selectedEyebrow}
          action={<a className="text-link text-[var(--accent-strong)]" href={`/${locale}/projects`}>{t.allProjects}<ArrowRight size={16} /></a>}
        />
        <div className="scroll-reveal grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {featured.map((project, index) => <ProjectCard key={project.id} project={project} locale={locale} index={index} />)}
        </div>
      </div>
    </section>
  );
}
