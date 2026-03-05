import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Header } from '@/components/layout/Header';

const euclidCircularB = localFont({
  src: '../../public/fonts/euclid-circular-b/Euclid-Circular-B-Regular.ttf',
  display: 'swap',
  weight: '400',
  style: 'normal',
  variable: '--font-euclid-circular-b',
  preload: true,
});

export const metadata: Metadata = {
  title: 'Carvago App',
  description: 'Carvago App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${euclidCircularB.variable} font-sans antialiased`}>
        <Header />
        <main className="py-5">
          <div className="container">{children}</div>
        </main>
      </body>
    </html>
  );
}
