'use client';

import { usePathname, useRouter } from 'next/navigation';
import { switchLocalePath } from '@/lib/locale';
import type { Locale } from '@/lib/types';

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();
  const change = (next: Locale) => router.push(switchLocalePath(pathname || `/${locale}`, next));

  return (
    <div className="flex items-center gap-1 text-xs font-bold" aria-label="Language">
      <button onClick={() => change('zh-TW')} className={locale === 'zh-TW' ? 'text-[#1f633e]' : 'text-[#768079]'} type="button">中</button>
      <span className="text-[#b4b8b5]">/</span>
      <button onClick={() => change('en')} className={locale === 'en' ? 'text-[#1f633e]' : 'text-[#768079]'} type="button">EN</button>
    </div>
  );
}
