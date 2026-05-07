import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Mobile-AI Guide — Find Your Perfect Phone in 60 Seconds",
  description:
    "AI-powered mobile phone recommendation engine. Tell us your budget & needs, get the top 3 phones with real price comparisons across Amazon, Flipkart, and offline stores.",
  keywords: "mobile phone recommendation, best phone under budget, AI phone guide, smartphone comparison India",
  openGraph: {
    title: "Mobile-AI Guide — Find Your Perfect Phone",
    description: "AI-powered smartphone recommendations tailored to your budget and needs.",
    type: "website",
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
