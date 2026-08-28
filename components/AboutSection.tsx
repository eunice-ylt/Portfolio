import type { AboutContent, Locale, Trait } from '@/lib/types';
import { localize } from '@/lib/locale';
import { getDictionary } from '@/lib/dictionary';
import { Icon } from './ui/Icon';

export function TraitCard({ trait, locale }: { trait: Trait; locale: Locale }) {
  return (
    <article className="group rounded-lg border border-[#1e4932]/10 bg-white/65 p-5 shadow-[0_8px_30px_rgba(23,63,42,.04)] transition hover:-translate-y-1 hover:shadow-[0_16px_35px_rgba(23,63,42,.08)]">
      <Icon name={trait.icon} className="text-[#29583b]" size={32} />
      <h3 className="mt-6 text-base font-bold">{localize(locale, trait.title_zh, trait.title_en)}</h3>
      <p className="mt-3 text-sm leading-7 text-[#59625e]">{localize(locale, trait.description_zh, trait.description_en)}</p>
    </article>
  );
}

export function AboutSection({ about, traits, locale }: { about: AboutContent; traits: Trait[]; locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <section id="about" className="scroll-mt-24 border-b border-[#1f3b2f]/10 bg-[#fbfaf6] py-20 lg:py-28">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-5 sm:px-8 lg:grid-cols-[.72fr_1.58fr] lg:px-10">
        <div>
          <div className="flex items-baseline gap-4">
            <h2 className="text-2xl font-bold tracking-[-.03em] sm:text-3xl">{localize(locale, about.title_zh, about.title_en)}</h2>
            <span className="text-[10px] font-bold tracking-[.16em] text-[#52705c]">{t.aboutEyebrow}</span>
          </div>
          <div className="mt-9 space-y-5 text-[15px] leading-8 text-[#46514c]">
            {localize(locale, about.content_zh, about.content_en).split(/\n\s*\n/).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          {localize(locale, about.note_zh, about.note_en) && <p className="mt-9 -rotate-2 font-serif text-lg italic text-[#486a4b]">{localize(locale, about.note_zh, about.note_en)}</p>}
        </div>

        <div>
          <div className="flex items-baseline gap-4">
            <h2 className="text-2xl font-bold tracking-[-.03em] sm:text-3xl">{t.traits}</h2>
            <span className="text-[10px] font-bold tracking-[.16em] text-[#52705c]">{t.traitsEyebrow}</span>
          </div>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {traits.filter((trait) => trait.is_active).sort((a, b) => a.sort_order - b.sort_order).map((trait) => <TraitCard key={trait.id} trait={trait} locale={locale} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
