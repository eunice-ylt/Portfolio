import type { Metadata } from 'next';
import { Archivo } from 'next/font/google';
import { DocumentLanguage } from '@/components/DocumentLanguage';
import './globals.css';

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
});

const origin = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(origin),
  title: { default: '羅翊寧 Yi-Ning Lo｜Product Manager & System Analyst', template: '%s' },
  description: '需求分析、系統規劃、規格設計與專案管理作品集。',
  icons: { icon: '/favicon.svg' },
  openGraph: { title: '羅翊寧 Yi-Ning Lo', description: 'Product Manager × System Analyst', type: 'website', images: [{ url: '/og.png', width: 1200, height: 630, alt: '羅翊寧 Yi-Ning Lo - Product Manager × System Analyst' }] },
  twitter: { card: 'summary_large_image', title: '羅翊寧 Yi-Ning Lo', description: 'Product Manager × System Analyst', images: ['/og.png'] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-TW" data-scroll-behavior="smooth">
      <body className={archivo.variable}>
        <DocumentLanguage />
        <div
          aria-hidden="true"
          className="hidden"
          dangerouslySetInnerHTML={{
            __html: `<!--
THESIS: A system-planning dossier that makes complex work legible, refusing the card-grid portfolio template.
OWN-WORLD: Warm mineral paper, ink green, disciplined sans typography, thin rules, large documentary imagery, and precise metadata.
STORY: Visitors understand Yi-Ning's systems thinking, inspect project evidence, and reach a clear contact path.
FIRST VIEWPORT: An editorial title field anchors the left while a tall portrait and measured plan lines occupy the right; work and contact actions stay visible.
FORM: Architectural project dossier, grounded direction 3, seed 23752883.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
-->`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
