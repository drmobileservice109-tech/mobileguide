import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Mobile-AI Guide 2026 — India's Best Smartphone AI Advisor",
  description:
    "Find your perfect smartphone in 60 seconds. Our AI analyzes real-time prices from Amazon, Flipkart & Offline stores to recommend the best mobile for your budget.",
  keywords: "best phones 2026 India, mobile AI guide, smartphone recommendation engine, best gaming phones under 30000, latest mobile prices May 2026, iPhone 17 price India, Samsung S26 price",
  authors: [{ name: "Mobile-AI Guide Team" }],
  manifest: "/manifest.json",
  robots: "index, follow",
  alternates: {
    canonical: "https://mobile-aiguide.mobimanager.shop",
  },
  openGraph: {
    title: "Mobile-AI Guide — Get Your Perfect Phone Recommendation",
    description: "Personalized smartphone picks in 60 seconds. Powered by Gemini AI with live market price tracking.",
    type: "website",
    locale: "en_IN",
    url: "https://mobile-aiguide.mobimanager.shop",
    siteName: "Mobile-AI Guide",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mobile-AI Guide 2026",
      },
    ],
  },
  verification: {
    google: ["bOS4yTkqbEVKPipxpKbf2w3O0RUrm34HrDajpSGKkIo", "rtIiEwmEmo5n0b-a5yIRtzb-akhICrhPtec8Gu50rAU"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Phones in India 2026 — Mobile-AI Guide",
    description: "Don't buy a phone until you ask our AI. Real prices from Amazon, Flipkart & Offline markets.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="bg-[#0A0A1A] text-white antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
