'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
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
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[color:rgb(255_253_248/94%)] backdrop-blur-md">
      <div className="page-shell flex h-[72px] items-center justify-between gap-6">
        <a className="flex min-w-0 items-center gap-3" href={homeBase} aria-label="Yi-Ning Lo - Home">
          <span className="display-type text-[1.75rem] font-semibold italic tracking-[-.04em] text-[var(--accent-strong)]">YL</span>
          <span className="min-w-0 border-l border-[var(--line)] pl-3">
            <strong className="block truncate text-[12px] font-semibold tracking-[.025em] sm:text-[13px]">羅翊寧 <span className="font-normal">Yi-Ning Lo</span></strong>
            <small className="mt-1 hidden text-[8px] font-semibold tracking-[.1em] text-[var(--ink-muted)] sm:block">PROJECT MANAGER / SYSTEM ANALYST</small>
          </span>
        </a>

        <nav className="hidden items-center gap-4 text-[12px] font-semibold lg:flex xl:gap-7" aria-label="Primary navigation">
          {links.map((link) => {
            const isActive = onHome ? active === link.id : link.id === 'projects' && pathname?.includes('/projects');
            return <a key={link.id} className={`nav-link ${isActive ? 'active' : ''}`} href={link.href}>{link.label}</a>;
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <LanguageSwitcher locale={locale} />
          <a className="hidden min-h-11 items-center gap-2 border border-[var(--accent-strong)] bg-[var(--accent-strong)] px-4 text-[11px] font-semibold text-white transition hover:bg-[var(--accent)] xl:inline-flex" href={`${homeBase}#contact`}>
            {t.contact} <ArrowUpRight size={14} />
          </a>
        </div>

        <button className="grid h-11 w-11 place-items-center border border-[var(--line-strong)] lg:hidden" type="button" aria-label={open ? t.close : t.menu} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)}>
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-[var(--line)] bg-[var(--paper)] py-4 lg:hidden">
          <nav id="mobile-navigation" className="page-shell flex flex-col" aria-label="Mobile navigation">
            {links.map((link) => <a key={link.id} className="flex min-h-14 items-center justify-between border-b border-[var(--line)] text-sm font-semibold" href={link.href} onClick={() => setOpen(false)}>{link.label}<ArrowUpRight size={15} /></a>)}
            <div className="pt-5"><LanguageSwitcher locale={locale} /></div>
          </nav>
        </div>
      )}
    </header>
  );
}
