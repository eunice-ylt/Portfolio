'use client';

import { useMemo, useState } from 'react';
import type { Locale, Project } from '@/lib/types';
import { getDictionary } from '@/lib/dictionary';
import { ProjectCard } from '@/components/ProjectCard';

export function ProjectList({ projects, locale }: { projects: Project[]; locale: Locale }) {
  const t = getDictionary(locale);
  const [category, setCategory] = useState<string>(t.all);
  const categories = useMemo(() => [t.all, ...Array.from(new Set(projects.map((project) => project.category)))], [projects, t.all]);
  const visible = category === t.all ? projects : projects.filter((project) => project.category === category);
  return (
    <>
      <div className="mb-12 flex flex-wrap gap-x-7 gap-y-1 border-b border-[var(--line)] pb-2" role="group" aria-label="Project categories">
        {categories.map((item) => <button className={`filter-button ${category === item ? 'active' : ''}`} key={item} onClick={() => setCategory(item)} type="button">{item}</button>)}
      </div>
      <div aria-live="polite" className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{visible.map((project, index) => <ProjectCard key={project.id} project={project} locale={locale} index={index} />)}</div>
    </>
  );
}
