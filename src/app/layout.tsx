import type { Metadata } from "next";
import { Geist_Mono, Instrument_Serif, Inter } from "next/font/google";
import StructuredData from "@/components/StructuredData";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const SITE_URL = "https://help-estudio.es";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Help Estudio — Global Digital Product Architect",
    template: "%s | Help Estudio — Global Digital Product Architect",
  },
  description:
    "Help Estudio is a Global Digital Product Architect and Next.js expert based in Madrid. We build SaaS products and deliver high-end digital production for tier-1 agencies including Havas, Dentsu, and Wunderman. Product engineering, technical leadership, and creative execution since 2012.",
  keywords: [
    "Next.js Expert",
    "SaaS Builder",
    "Digital Product Architect",
    "Product Engineering",
    "Digital Production Agency",
    "Havas",
    "Dentsu",
    "Wunderman",
    "Ad Delivery",
    "Madrid",
    "España",
    "Help Estudio",
    "Javier Blanco",
  ],
  authors: [{ name: "Javier Blanco", url: "https://www.linkedin.com/in/jjavierblanco" }],
  creator: "Help Estudio",
  publisher: "Help Estudio",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "es_ES",
    url: SITE_URL,
    siteName: "Help Estudio",
    title: "Help Estudio — Global Digital Product Architect",
    description:
      "Next.js expert and product architect. SaaS products, high-performance ad delivery for Havas, Dentsu, Wunderman. Based in Madrid, operating globally since 2012.",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Help Estudio — Global Digital Product Architect",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Help Estudio — Global Digital Product Architect",
    description:
      "Next.js expert and product architect. SaaS products, high-performance ad delivery for Havas, Dentsu, Wunderman. Based in Madrid, operating globally since 2012.",
    images: ["/assets/og-image.png"],
    creator: "@helpestudio",
    site: "@helpestudio",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistMono.variable} ${instrumentSerif.variable} ${inter.variable}`}
    >
      <body>
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
