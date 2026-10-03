import type { Metadata } from "next";
import localFont from "next/font/local";
import SmoothScroll from "@/components/SmoothScroll";
import RouteEffects from "@/components/RouteEffects";
import PrefetchMedia from "@/components/PrefetchMedia";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const ppNeueMontreal = localFont({
  src: "./fonts/PP Neue Montreal-Variable.ttf",
  display: "swap",
  variable: "--font-pp-neue-montreal",
  adjustFontFallback: "Arial",
});

const ppNeueMontrealMono = localFont({
  src: "./fonts/PPNeueMontrealMono-Book.otf",
  display: "swap",
  variable: "--font-pp-neue-montreal-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Construction & Engineering`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Construction & Engineering`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Construction & Engineering`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${ppNeueMontreal.variable} ${ppNeueMontrealMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background">
        <SmoothScroll>
          <PrefetchMedia />
          <RouteEffects />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
