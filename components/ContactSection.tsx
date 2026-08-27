import { Mail, MapPin, Phone } from 'lucide-react';
import type { ContactContent, Locale } from '@/lib/types';
import { getDictionary } from '@/lib/dictionary';
import { localize } from '@/lib/locale';

export function ContactSection({ contact, locale }: { contact: ContactContent; locale: Locale }) {
  const t = getDictionary(locale);
  const phoneHref = contact.phone.replace(/[^+\d]/g, '');
  return (
    <section id="contact" className="scroll-mt-24 border-t border-[#1f3b2f]/10 bg-[#fbfaf6] py-14">
      <div className="mx-auto grid max-w-[1440px] gap-7 px-5 sm:px-8 lg:grid-cols-[1.1fr_2fr] lg:px-10">
        <div>
          <h2 className="text-xl font-bold">{localize(locale, contact.title_zh, contact.title_en)}</h2>
          <p className="mt-3 text-sm leading-7 text-[#5b645f]">{localize(locale, contact.description_zh, contact.description_en)}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <a className="contact-item" href={`mailto:${contact.email}`}><Mail size={22} /><span><small>{t.email}</small><strong>{contact.email}</strong></span></a>
          <a className="contact-item" href={`tel:${phoneHref}`}><Phone size={22} /><span><small>{t.phone}</small><strong>{contact.phone}</strong></span></a>
          <div className="contact-item"><MapPin size={22} /><span><small>{t.location}</small><strong>{localize(locale, contact.location_zh, contact.location_en)}</strong></span></div>
        </div>
      </div>
    </section>
  );
}
