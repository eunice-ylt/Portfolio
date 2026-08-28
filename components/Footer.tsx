import { Github, Linkedin } from 'lucide-react';
import type { ContactContent, Locale } from '@/lib/types';
import { getDictionary } from '@/lib/dictionary';

export function Footer({ contact, locale }: { contact: ContactContent; locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--canvas)] py-8 text-[var(--ink-muted)]">
      <div className="page-shell flex flex-col items-start justify-between gap-5 text-[11px] sm:flex-row sm:items-center">
        <span>© {new Date().getFullYear()} 羅翊寧 Yi-Ning Lo. {t.copyright}</span>
        <div className="flex gap-2">
          {contact.linkedin && <a aria-label="LinkedIn" className="grid h-11 w-11 place-items-center border border-[var(--line-strong)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]" href={contact.linkedin} rel="noreferrer" target="_blank"><Linkedin size={16} /></a>}
          {contact.github && <a aria-label="GitHub" className="grid h-11 w-11 place-items-center border border-[var(--line-strong)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]" href={contact.github} rel="noreferrer" target="_blank"><Github size={16} /></a>}
        </div>
      </div>
    </footer>
  );
}
