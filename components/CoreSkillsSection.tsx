import type { Locale, SkillCategory } from '@/lib/types';
import { getDictionary } from '@/lib/dictionary';
import { localize } from '@/lib/locale';
import { Icon } from './ui/Icon';

export function SkillCategoryCard({ skill, locale, index }: { skill: SkillCategory; locale: Locale; index: number }) {
  const borderClass = index === 3
    ? 'md:border-b-0 lg:border-r-0'
    : index === 2
      ? 'md:border-b-0 md:border-r lg:border-b-0'
      : index === 1
        ? 'md:border-r-0 lg:border-b-0 lg:border-r'
        : 'md:border-r lg:border-b-0';

  return (
    <article className={`group relative flex min-h-[310px] flex-col border-b border-white/15 px-6 py-8 transition-colors duration-300 hover:bg-white/[.045] md:min-h-[340px] md:px-8 md:py-10 lg:min-h-[390px] ${borderClass}`}>
      <span aria-hidden="true" className="absolute -top-[5px] left-6 h-2.5 w-2.5 rounded-full bg-[var(--sand)] ring-4 ring-[var(--accent-strong)] md:left-8" />
      <div className="flex items-start justify-between gap-5">
        <span className="display-type text-[clamp(3.6rem,5vw,5.5rem)] font-semibold leading-none tracking-[-.06em] text-white/12">{skill.number}</span>
        <span className="grid h-12 w-12 place-items-center rounded-full border border-white/25 text-[var(--sand)] transition-transform duration-300 group-hover:-rotate-3 group-hover:border-[var(--sand)]">
          <Icon name={skill.icon} size={25} />
        </span>
      </div>
      <h3 className="display-type mt-8 max-w-[12ch] text-[clamp(1.45rem,2vw,2rem)] font-semibold leading-[1.15] tracking-[-.03em] text-white">{localize(locale, skill.title_zh, skill.title_en)}</h3>
      <ul className="mt-auto space-y-3 border-t border-white/15 pt-6 text-sm leading-6 text-white/70">
        {skill.skill_items.sort((a, b) => a.sort_order - b.sort_order).map((item) => <li className="flex items-center gap-3" key={item.id}><span aria-hidden="true" className="h-px w-4 bg-[var(--sand)]" />{localize(locale, item.name_zh, item.name_en)}</li>)}
      </ul>
    </article>
  );
}

export function CoreSkillsSection({ skills, locale }: { skills: SkillCategory[]; locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <section id="skills" className="section-space relative isolate scroll-mt-24 overflow-hidden bg-[var(--accent-strong)] text-white">
      <div aria-hidden="true" className="capability-map-grid absolute inset-0 -z-10" />
      <div className="page-shell">
        <div className="mb-12 border-b border-white/20 pb-6 lg:mb-16">
          <div className="flex flex-wrap items-end gap-x-5 gap-y-2">
            <h2 className="display-type text-[clamp(2.75rem,5.3vw,5.6rem)] font-semibold leading-[.95] tracking-[-.055em] text-white">{t.skills}</h2>
            <span className="pb-1 text-[10px] font-semibold tracking-[.14em] text-[var(--sand)]">{t.skillsEyebrow}</span>
          </div>
        </div>
        <div className="scroll-reveal relative grid border-y border-white/20 md:grid-cols-2 lg:grid-cols-4">
          <span aria-hidden="true" className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-[var(--sand)] via-white/20 to-transparent" />
          {skills.filter((skill) => skill.is_active).sort((a, b) => a.sort_order - b.sort_order).map((skill, index) => <SkillCategoryCard key={skill.id} skill={skill} locale={locale} index={index} />)}
        </div>
      </div>
    </section>
  );
}
