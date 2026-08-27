'use client';

import { useEffect, useState } from 'react';
import { Mail, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { getDictionary } from '@/lib/dictionary';
import type { Locale } from '@/lib/types';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const pathname = usePathname();
  const onHome = pathname === `/${locale}` || pathname === `/${locale}/`;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('top');
  const homeBase = `/${locale}`;
  const links = [
    { id: 'top', label: t.home, href: onHome ? '#top' : homeBase },
    { id: 'about', label: t.about, href: `${homeBase}#about` },
    { id: 'projects', label: t.projects, href: `${homeBase}/projects` },
    { id: 'skills', label: t.skills, href: `${homeBase}#skills` },
    { id: 'contact', label: t.contact, href: `${homeBase}#contact` },
  ];

  useEffect(() => {
    if (!onHome) return;
    const sections = ['top', 'about', 'skills', 'projects', 'contact']
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: '-25% 0px -60% 0px', threshold: [0, 0.1, 0.4] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [onHome]);

  return (
    <header className="sticky top-0 z-50 border-b border-[#1f3b2f]/10 bg-[#fbfaf6]/92 backdrop-blur-xl">
      <div className="mx-auto flex h-[78px] max-w-[1440px] items-center justify-between px-5 lg:px-10">
        <a className="flex min-w-0 items-center gap-3" href={homeBase} aria-label={t.home}>
          <span className="font-serif text-4xl italic tracking-tight text-[#173f2a]">YL</span>
          <span className="min-w-0 border-l border-[#1f3b2f]/15 pl-3">
            <strong className="block truncate text-[13px] tracking-[.06em] sm:text-[15px]">羅翊寧 <span className="font-medium">Yi-Ning Lo</span></strong>
            <small className="mt-1 hidden text-[8px] font-semibold tracking-[.12em] text-[#516059] sm:block">PROJECT MANAGER / SYSTEM ANALYST</small>
          </span>
        </a>

        <nav className="hidden items-center gap-7 text-[13px] font-semibold xl:flex" aria-label="Primary navigation">
          {links.map((link) => (
            <a key={link.id} className={`nav-link ${active === link.id || (link.id === 'projects' && pathname?.includes('/projects')) ? 'active' : ''}`} href={link.href}>{link.label}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 xl:flex">
          <LanguageSwitcher locale={locale} />
          <a className="inline-flex items-center gap-2 rounded-md bg-[#153d27] px-5 py-3 text-xs font-semibold text-white transition hover:bg-[#205438]" href={`${homeBase}#contact`}>
            <Mail size={15} /> {t.contact}
          </a>
        </div>

        <button className="grid h-11 w-11 place-items-center rounded-md border border-[#23452f]/15 xl:hidden" type="button" aria-label={open ? t.close : t.menu} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-[#1f3b2f]/10 bg-[#fbfaf6] px-5 py-5 xl:hidden">
          <nav className="mx-auto flex max-w-[1440px] flex-col" aria-label="Mobile navigation">
            {links.map((link) => <a key={link.id} className="border-b border-[#1f3b2f]/10 py-4 text-sm font-semibold" href={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}
            <div className="pt-5"><LanguageSwitcher locale={locale} /></div>
          </nav>
        </div>
      )}
    </header>
  );
}
