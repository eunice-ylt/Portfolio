import type { Locale } from './types';

export const locales: Locale[] = ['zh-TW', 'en'];
export const defaultLocale: Locale = 'zh-TW';

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function localize(locale: Locale, zh: string | null | undefined, en: string | null | undefined) {
  const fallback = zh?.trim() || en?.trim() || '';
  return locale === 'en' ? en?.trim() || fallback : zh?.trim() || en?.trim() || '';
}

export function switchLocalePath(pathname: string, locale: Locale) {
  const segments = pathname.split('/').filter(Boolean);
  if (segments[0] === 'zh-TW' || segments[0] === 'en') segments[0] = locale;
  else segments.unshift(locale);
  return `/${segments.join('/')}`;
}
