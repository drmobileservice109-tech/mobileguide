import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://mobile-aiguide.mobimanager.shop"),
  title: {
    default: "PhoneAI — Best Mobile Recommendation in India 2026",
    template: "%s | PhoneAI",
  },
  description:
    "PhoneAI finds your perfect smartphone in 60 seconds. AI-powered recommendations with real-time prices from Amazon, Flipkart & offline stores. Best phone for any budget in India.",
  keywords: [
    "best phone recommendation India 2026",
    "PhoneAI",
    "smartphone AI advisor India",
    "best mobile under 15000 India",
    "best phone under 20000 2026",
    "best gaming phone India 2026",
    "best camera phone under 30000",
    "iPhone 17 price India",
    "Samsung S25 price India",
    "AI mobile advisor",
    "best 5G phone India",
    "OnePlus vs Samsung 2026",
    "Flipkart Amazon phone deals",
  ],
  authors: [{ name: "PhoneAI Team" }],
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://mobile-aiguide.mobimanager.shop",
  },
  openGraph: {
    title: "PhoneAI — Find Your Perfect Phone in 60 Seconds",
    description: "India's #1 AI-powered smartphone advisor. Get personalized phone picks with live Amazon & Flipkart prices. Free, instant, unbiased.",
    type: "website",
    locale: "en_IN",
    url: "https://mobile-aiguide.mobimanager.shop",
    siteName: "PhoneAI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PhoneAI — AI Phone Advisor India",
      },
    ],
  },
  verification: {
    google: ["bOS4yTkqbEVKPipxpKbf2w3O0RUrm34HrDajpSGKkIo", "rtIiEwmEmo5n0b-a5yIRtzb-akhICrhPtec8Gu50rAU"],
  },
  twitter: {
    card: "summary_large_image",
    title: "PhoneAI — Best Phone Recommendations in India 2026",
    description: "Don't buy a phone without asking our AI first. Real-time prices from Amazon, Flipkart & local markets. 100% free.",
    images: ["/og-image.png"],
  },
  icons: {
    apple: "/favicon.ico",
  },
  category: "technology",
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
        <Analytics />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(registration) {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                  }, function(err) {
                    console.log('ServiceWorker registration failed: ', err);
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
