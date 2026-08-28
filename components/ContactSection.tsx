import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import type { ContactContent, Locale } from '@/lib/types';
import { getDictionary } from '@/lib/dictionary';
import { localize } from '@/lib/locale';

export function ContactSection({ contact, locale }: { contact: ContactContent; locale: Locale }) {
  const t = getDictionary(locale);
  const phoneHref = contact.phone.replace(/[^+\d]/g, '');
  return (
    <section id="contact" className="section-space scroll-mt-24 border-t border-[var(--line)] bg-[var(--canvas)]">
      <div className="page-shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="mb-5 text-[10px] font-semibold tracking-[.11em] text-[var(--ink-muted)]">{t.contactEyebrow}</p>
            <h2 className="display-type max-w-[18ch] text-balance text-[clamp(2.6rem,6vw,6rem)] font-semibold leading-[.98] tracking-[-.04em]">{localize(locale, contact.title_zh, contact.title_en)}</h2>
            <p className="mt-7 max-w-[56ch] text-base leading-8 text-[var(--ink-soft)]">{localize(locale, contact.description_zh, contact.description_en)}</p>
          </div>
          <a className="group flex min-h-14 items-center justify-between border-b border-[var(--line-strong)] text-lg font-semibold text-[var(--accent-strong)] lg:col-span-4" href={`mailto:${contact.email}`}>
            {contact.email}<ArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" size={22} />
          </a>
        </div>

        <div className="mt-20 grid border-t border-[var(--line)] sm:grid-cols-3">
          <a className="flex min-h-24 items-center gap-4 border-b border-[var(--line)] py-5 text-sm sm:border-b-0 sm:border-r sm:px-5 sm:first:pl-0" href={`mailto:${contact.email}`}><Mail className="text-[var(--accent)]" size={20} /><span><small className="meta-label block">{t.email}</small><strong className="mt-2 block font-medium">{contact.email}</strong></span></a>
          <a className="flex min-h-24 items-center gap-4 border-b border-[var(--line)] py-5 text-sm sm:border-b-0 sm:border-r sm:px-5" href={`tel:${phoneHref}`}><Phone className="text-[var(--accent)]" size={20} /><span><small className="meta-label block">{t.phone}</small><strong className="mt-2 block font-medium">{contact.phone}</strong></span></a>
          <div className="flex min-h-24 items-center gap-4 py-5 text-sm sm:px-5"><MapPin className="text-[var(--accent)]" size={20} /><span><small className="meta-label block">{t.location}</small><strong className="mt-2 block font-medium">{localize(locale, contact.location_zh, contact.location_en)}</strong></span></div>
        </div>
      </div>
    </section>
  );
}
