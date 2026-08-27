import { ArrowRight } from 'lucide-react';
import type { Locale, SkillCategory } from '@/lib/types';
import { getDictionary } from '@/lib/dictionary';
import { localize } from '@/lib/locale';
import { Icon } from './ui/Icon';
import { SectionHeading } from './SectionHeading';

const cardStyles = [
  'from-[#f0f0e9] to-[#f8f7f1] text-[#234b2f]',
  'from-[#eaf0f7] to-[#f6f8fb] text-[#1d4b76]',
  'from-[#fbf1e3] to-[#fdf9f3] text-[#a65d00]',
  'from-[#efedf7] to-[#f8f7fb] text-[#3a2e83]',
];

export function SkillCategoryCard({ skill, locale, index }: { skill: SkillCategory; locale: Locale; index: number }) {
  return (
    <article className={`group flex min-h-[340px] flex-col rounded-xl border border-white/70 bg-gradient-to-br p-6 sm:p-7 ${cardStyles[index % cardStyles.length]}`}>
      <span className="text-3xl font-light">{skill.number}</span>
      <h3 className="mt-3 text-sm font-bold tracking-[.06em]">{localize(locale, skill.title_zh, skill.title_en).toUpperCase()}</h3>
      <Icon name={skill.icon} className="mt-8" size={48} />
      <ul className="mt-8 space-y-3 border-t border-current/15 pt-6 text-sm text-[#26312c]">
        {skill.skill_items.sort((a, b) => a.sort_order - b.sort_order).map((item) => <li className="flex items-center gap-3" key={item.id}><span className="h-1 w-1 rounded-full bg-current" />{localize(locale, item.name_zh, item.name_en)}</li>)}
      </ul>
      <ArrowRight className="mt-auto self-end transition group-hover:translate-x-1" size={20} />
    </article>
  );
}

export function CoreSkillsSection({ skills, locale }: { skills: SkillCategory[]; locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <section id="skills" className="scroll-mt-24 bg-[#fbfaf6] py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <SectionHeading title={t.skills} eyebrow={t.skillsEyebrow} />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {skills.filter((skill) => skill.is_active).sort((a, b) => a.sort_order - b.sort_order).map((skill, index) => <SkillCategoryCard key={skill.id} skill={skill} locale={locale} index={index} />)}
        </div>
      </div>
    </section>
  );
}
