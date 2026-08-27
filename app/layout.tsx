import type { Metadata } from 'next';
import './globals.css';

const origin = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(origin),
  title: { default: '羅翊寧 Yi-Ning Lo｜Product Manager & System Analyst', template: '%s' },
  description: '需求分析、系統規劃、規格設計與專案管理作品集。',
  openGraph: { title: '羅翊寧 Yi-Ning Lo', description: 'Product Manager × System Analyst', type: 'website', images: [{ url: '/og.png', width: 1200, height: 630, alt: '羅翊寧 Yi-Ning Lo — Product Manager × System Analyst' }] },
  twitter: { card: 'summary_large_image', title: '羅翊寧 Yi-Ning Lo', description: 'Product Manager × System Analyst', images: ['/og.png'] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-TW"><body>{children}</body></html>;
}
