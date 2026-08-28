'use client';

import { usePathname, useRouter } from 'next/navigation';
import { switchLocalePath } from '@/lib/locale';
import type { Locale } from '@/lib/types';

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();
  const change = (next: Locale) => router.push(switchLocalePath(pathname || `/${locale}`, next));

  return (
    <div className="flex items-center gap-0.5 text-[11px] font-bold" aria-label="Language">
      <button aria-pressed={locale === 'zh-TW'} onClick={() => change('zh-TW')} className={`grid min-h-11 min-w-11 place-items-center transition ${locale === 'zh-TW' ? 'text-[var(--accent)]' : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'}`} type="button">中</button>
      <span aria-hidden="true" className="text-[var(--line-strong)]">/</span>
      <button aria-pressed={locale === 'en'} onClick={() => change('en')} className={`grid min-h-11 min-w-11 place-items-center transition ${locale === 'en' ? 'text-[var(--accent)]' : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'}`} type="button">EN</button>
    </div>
  );
}
