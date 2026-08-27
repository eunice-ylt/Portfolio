import { Github, Linkedin } from 'lucide-react';
import type { ContactContent, Locale } from '@/lib/types';
import { getDictionary } from '@/lib/dictionary';

export function Footer({ contact, locale }: { contact: ContactContent; locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <footer className="bg-[#113520] py-6 text-white/75">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-4 px-5 text-[11px] sm:flex-row sm:px-8 lg:px-10">
        <span>© {new Date().getFullYear()} 羅翊寧 Yi-Ning Lo. {t.copyright}</span>
        <div className="flex gap-3">
          {contact.linkedin && <a aria-label="LinkedIn" className="rounded-full border border-white/25 p-2 hover:text-white" href={contact.linkedin} rel="noreferrer" target="_blank"><Linkedin size={16} /></a>}
          {contact.github && <a aria-label="GitHub" className="rounded-full border border-white/25 p-2 hover:text-white" href={contact.github} rel="noreferrer" target="_blank"><Github size={16} /></a>}
        </div>
      </div>
    </footer>
  );
}
