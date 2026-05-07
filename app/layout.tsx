import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Mobile-AI Guide 2026 — Best Smartphone Recommendations in India",
  description:
    "Free AI-powered mobile phone advisor for May 2026. Find the best gaming, camera, and budget phones under ₹10k, ₹20k, ₹30k, and ₹50k with real-time Amazon, Flipkart & Offline prices.",
  keywords: "best phones 2026 India, mobile AI guide, smartphone recommendation engine, best gaming phones under 30000, latest mobile prices May 2026, iPhone 17 price India, Samsung S26 price",
  authors: [{ name: "Mobile-AI Guide Team" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "Mobile-AI Guide — Absolute Latest Phones (May 2026)",
    description: "Get personalized smartphone picks in 60 seconds. Powered by AI with live market price tracking.",
    type: "website",
    locale: "en_IN",
    url: "https://mobileguide-ai.vercel.app", // User can change this to their real domain later
    siteName: "Mobile-AI Guide",
  },
  verification: {
    google: "bOS4yTkqbEVKPipxpKbf2w3O0RUrm34HrDajpSGKkIo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Phones in India 2026 — Mobile-AI Guide",
    description: "Don't buy a phone until you ask our AI. Real prices from Amazon, Flipkart & Offline markets.",
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
