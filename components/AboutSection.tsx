import type { AboutContent, Locale, Trait } from '@/lib/types';
import { localize } from '@/lib/locale';
import { getDictionary } from '@/lib/dictionary';
import { Icon } from './ui/Icon';

export function TraitCard({ trait, locale }: { trait: Trait; locale: Locale }) {
  return (
    <article className="group grid gap-5 border-t border-[var(--line)] py-5 transition-colors hover:border-[var(--accent)] md:grid-cols-[44px_1fr_1.6fr] md:items-start">
      <Icon name={trait.icon} className="text-[var(--accent)]" size={23} />
      <h3 className="text-base font-semibold tracking-[-.015em]">{localize(locale, trait.title_zh, trait.title_en)}</h3>
      <p className="max-w-[52ch] text-sm leading-7 text-[var(--ink-soft)]">{localize(locale, trait.description_zh, trait.description_en)}</p>
    </article>
  );
}

export function AboutSection({ about, traits, locale }: { about: AboutContent; traits: Trait[]; locale: Locale }) {
  const t = getDictionary(locale);
  const paragraphs = localize(locale, about.content_zh, about.content_en).split(/\n\s*\n/).filter(Boolean);
  return (
    <section id="about" className="section-space scroll-mt-24 border-b border-[var(--line)] bg-[var(--paper)]">
      <div className="page-shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <h2 className="display-type text-[clamp(2.4rem,4.4vw,4.5rem)] font-semibold leading-[.95] tracking-[-.04em]">{localize(locale, about.title_zh, about.title_en)}</h2>
            <p className="mt-5 text-[10px] font-semibold tracking-[.11em] text-[var(--ink-muted)]">{t.aboutEyebrow}</p>
          </div>
          <div className="lg:col-span-5">
            {paragraphs[0] && <p className="text-balance text-[clamp(1.6rem,3vw,2.75rem)] font-medium leading-[1.28] tracking-[-.03em]">{paragraphs[0]}</p>}
            {localize(locale, about.note_zh, about.note_en) && <p className="mt-9 border-t border-[var(--line)] pt-5 text-sm font-medium italic leading-7 text-[var(--accent)]">{localize(locale, about.note_zh, about.note_en)}</p>}
          </div>
          <div className="text-[15px] leading-8 text-[var(--ink-soft)] lg:col-span-4 lg:pl-8">
            {paragraphs.slice(1).map((paragraph) => <p className="mb-5 last:mb-0" key={paragraph}>{paragraph}</p>)}
          </div>
        </div>

        <div className="scroll-reveal mt-20 grid gap-8 lg:mt-28 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <h3 className="text-lg font-semibold">{t.traits}</h3>
            <p className="mt-2 text-[10px] font-semibold tracking-[.11em] text-[var(--ink-muted)]">{t.traitsEyebrow}</p>
          </div>
          <div className="lg:col-span-9">
            {traits.filter((trait) => trait.is_active).sort((a, b) => a.sort_order - b.sort_order).map((trait) => <TraitCard key={trait.id} trait={trait} locale={locale} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
