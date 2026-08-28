import Image from 'next/image';
import { ArrowRight, Mail } from 'lucide-react';
import type { HeroContent, Locale } from '@/lib/types';
import { localize } from '@/lib/locale';

function resolveHref(locale: Locale, href: string) {
  if (href.startsWith('#') || href.startsWith('http') || href.startsWith(`/${locale}`)) return href;
  if (href.startsWith('/')) return `/${locale}${href}`;
  return href;
}

export function HeroSection({ hero, locale }: { hero: HeroContent; locale: Locale }) {
  return (
    <section id="top" className="relative isolate overflow-hidden border-b border-[var(--line)] bg-[var(--paper)]">
      <div className="spec-grid absolute inset-0 -z-10 opacity-80" />
      <div className="page-shell grid min-h-[calc(100dvh-72px)] items-center gap-14 py-12 lg:grid-cols-12 lg:gap-8 lg:py-16">
        <div className="lg:col-span-7 lg:pr-4">
          <p className="mb-8 flex items-center gap-4 text-[10px] font-semibold tracking-[.14em] text-[var(--accent)] sm:text-[11px]">
            <span aria-hidden="true" className="h-px w-10 bg-[var(--accent)]" /> {localize(locale, hero.eyebrow_zh, hero.eyebrow_en)}
          </p>
          <h1 className="display-type whitespace-pre-line text-balance text-[clamp(2.75rem,4.6vw,4.8rem)] font-semibold leading-[1.03] tracking-[-.04em]">
            {localize(locale, hero.title_zh, hero.title_en)}
          </h1>
          <p className="mt-7 max-w-[60ch] whitespace-pre-line text-[15px] leading-8 text-[var(--ink-soft)] sm:text-base">{localize(locale, hero.description_zh, hero.description_en)}</p>
          <div className="mt-9 flex flex-wrap gap-x-7 gap-y-2">
            <a className="inline-flex min-h-12 items-center gap-3 bg-[var(--accent-strong)] px-5 text-sm font-semibold text-white transition hover:bg-[var(--accent)] active:translate-y-px" href={resolveHref(locale, hero.primary_cta_url)}>
              {localize(locale, hero.primary_cta_label_zh, hero.primary_cta_label_en)} <ArrowRight size={17} />
            </a>
            <a className="text-link text-[var(--accent-strong)]" href={resolveHref(locale, hero.secondary_cta_url)}>
              <Mail size={17} /> {localize(locale, hero.secondary_cta_label_zh, hero.secondary_cta_label_en)}
            </a>
          </div>
        </div>

        <div className="portrait-frame relative mx-auto aspect-[4/5] w-[min(88%,560px)] lg:col-span-5 lg:mr-0 lg:w-[92%]">
          <div className="absolute inset-0 overflow-hidden bg-[#d9ded4]">
            {hero.image_url ? <Image unoptimized fill priority sizes="(max-width: 1023px) 88vw, 38vw" className="object-cover object-top" src={hero.image_url} alt={localize(locale, hero.image_alt_zh, hero.image_alt_en)} /> : <span className="display-type grid h-full place-items-center text-8xl font-semibold italic text-[color:rgb(39_95_61/55%)]">YL</span>}
          </div>
          <span aria-hidden="true" className="absolute -left-10 bottom-[18%] h-px w-24 bg-[var(--accent)]" />
        </div>
      </div>
    </section>
  );
}
