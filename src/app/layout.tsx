import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Geist } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const euclidCircularB = localFont({
  src: "../../public/fonts/euclid-circular-b/Euclid-Circular-B-Regular.ttf",
  display: "swap",
  weight: "400",
  style: "normal",
  variable: "--font-euclid-circular-b",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    template: "%s | Carvago",
    default: "Carvago — Největší výběr ojetých aut",
  },
  description: "Největší evropská online služba pro nákup ojetých aut",
  openGraph: {
    siteName: "Carvago",
    locale: "cs_CZ",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={`${euclidCircularB.variable} font-sans antialiased`}>
        <Header />
        <Toaster />
        <main className="py-5">
          <div className="container">{children}</div>
        </main>
      </body>
    </html>
  );
}
