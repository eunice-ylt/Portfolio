import { ArrowRight, Mail, Network } from 'lucide-react';
import type { HeroContent, Locale } from '@/lib/types';
import { localize } from '@/lib/locale';

function resolveHref(locale: Locale, href: string) {
  if (href.startsWith('#') || href.startsWith('http') || href.startsWith(`/${locale}`)) return href;
  if (href.startsWith('/')) return `/${locale}${href}`;
  return href;
}

export function HeroSection({ hero, locale }: { hero: HeroContent; locale: Locale }) {
  return (
    <section id="top" className="relative isolate overflow-hidden border-b border-[#1f3b2f]/10">
      <div className="blueprint-grid absolute inset-0 -z-10 opacity-55" />
      <div className="mx-auto grid min-h-[680px] max-w-[1440px] items-center gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1.04fr_.96fr] lg:px-10 lg:py-20">
        <div className="max-w-2xl">
          <p className="mb-7 flex items-center gap-3 text-[10px] font-bold tracking-[.2em] text-[#3f6f50] sm:text-xs">
            <span className="h-px w-8 bg-[#739279]" /> {localize(locale, hero.eyebrow_zh, hero.eyebrow_en)}
          </p>
          <h1 className="whitespace-pre-line text-balance text-[clamp(2.8rem,5.6vw,5.7rem)] font-semibold leading-[1.05] tracking-[-.055em]">
            {localize(locale, hero.title_zh, hero.title_en)}
          </h1>
          <p className="mt-7 max-w-xl whitespace-pre-line text-[15px] leading-8 text-[#48534e] sm:text-base">{localize(locale, hero.description_zh, hero.description_en)}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a className="inline-flex items-center gap-3 rounded-md bg-[#153d27] px-6 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#205438]" href={resolveHref(locale, hero.primary_cta_url)}>
              {localize(locale, hero.primary_cta_label_zh, hero.primary_cta_label_en)} <ArrowRight size={17} />
            </a>
            <a className="inline-flex items-center gap-3 rounded-md border border-[#173f2a]/45 bg-white/60 px-6 py-4 text-sm font-semibold transition hover:bg-white" href={resolveHref(locale, hero.secondary_cta_url)}>
              <Mail size={17} /> {localize(locale, hero.secondary_cta_label_zh, hero.secondary_cta_label_en)}
            </a>
          </div>
        </div>

        <div className="relative mx-auto aspect-[4/4.2] w-full max-w-[620px]">
          <div className="absolute inset-[6%_2%_0_13%] overflow-hidden rounded-t-[170px] border border-[#1e4932]/15 bg-[#d9ded4] shadow-[0_30px_90px_rgba(20,54,34,.16)] sm:rounded-t-[220px]">
            {hero.image_url ? <img className="h-full w-full object-cover object-top" src={hero.image_url} alt={localize(locale, hero.image_alt_zh, hero.image_alt_en)} /> : <span className="grid h-full place-items-center font-serif text-8xl italic text-[#214b32]/65">YL</span>}
          </div>
          <div className="system-card absolute left-0 top-[8%] w-[42%] max-w-52">
            <span className="text-[8px] font-bold tracking-widest text-[#577061]">REQUIREMENT</span>
            <div className="mt-4 space-y-3">{[80, 65, 72].map((width) => <span key={width} className="block h-1.5 rounded bg-[#91a38f]" style={{ width: `${width}%` }} />)}</div>
          </div>
          <div className="system-card absolute bottom-[10%] right-0 w-[46%] max-w-56">
            <span className="flex items-center gap-2 text-[8px] font-bold tracking-widest text-[#577061]"><Network size={13} /> FLOWCHART</span>
            <div className="mt-5 flex items-center justify-between text-[#31563c]"><span className="h-6 w-9 border border-current" /><span className="h-px w-4 bg-current" /><span className="h-7 w-7 rotate-45 border border-current" /><span className="h-px w-4 bg-current" /><span className="h-6 w-9 border border-current" /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
