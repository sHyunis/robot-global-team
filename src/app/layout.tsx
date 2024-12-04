import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layouts/Header';
import Providers from './providers';
import localFont from 'next/font/local';

export const metadata: Metadata = {
  title: 'Book store',
  description: 'online book store',
};

const SuitMedium = localFont({
  src: '../../public/fonts/SUIT-Medium.otf',
  variable: '--font-suit',
  weight: '100 900',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${SuitMedium.variable} antialiased`}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
