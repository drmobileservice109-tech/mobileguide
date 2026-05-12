import HeroSection from '@/components/sections/HeroSection';
import HowItWorks from '@/components/sections/HowItWorks';
import Testimonials from '@/components/sections/Testimonials';
import PopularCategories from '@/components/sections/PopularCategories';
import Features from '@/components/sections/Features';
import FAQ from '@/components/sections/FAQ';
import TrendingTicker from '@/components/sections/TrendingTicker';
import Link from 'next/link';

export default function Home() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "PhoneAI",
      "url": "https://mobile-aiguide.mobimanager.shop",
      "description": "AI-powered mobile phone recommendation engine for the Indian market. Find the best smartphone in 60 seconds.",
      "applicationCategory": "ShoppingApplication",
      "operatingSystem": "Web",
      "inLanguage": "en-IN",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "2000000"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "PhoneAI",
      "url": "https://mobile-aiguide.mobimanager.shop",
      "description": "India's #1 AI-powered smartphone advisor",
      "areaServed": "IN"
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How does PhoneAI recommend phones?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "PhoneAI uses the Gemini AI API to analyze real-time market data, technical specifications, and thousands of user reviews to match your budget and usage patterns."
          }
        },
        {
          "@type": "Question",
          "name": "Are the prices shown accurate?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, PhoneAI tracks prices from major retailers like Amazon, Flipkart, and offline stores daily to ensure you get the most accurate and up-to-date information."
          }
        },
        {
          "@type": "Question",
          "name": "Is PhoneAI free to use?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, PhoneAI is completely free. No sign-up required. Just answer 4 quick questions and get your personalized phone recommendation instantly."
          }
        },
        {
          "@type": "Question",
          "name": "Which is the best phone under 15000 in India in 2026?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Use PhoneAI to get a personalized recommendation for the best phone under ₹15,000 based on your specific needs like camera, gaming, battery, or everyday use."
          }
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://mobile-aiguide.mobimanager.shop"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Find Phone",
          "item": "https://mobile-aiguide.mobimanager.shop/find-phone"
        }
      ]
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <TrendingTicker />
      <Features />
      <PopularCategories />
      <HowItWorks />
      <Testimonials />
      <FAQ />

      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-[#6C47FF]/10 via-transparent to-[#FF6B35]/10" />
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <h2 className="font-outfit text-4xl sm:text-5xl font-bold mb-4">
            Ready to find your <span className="gradient-text">dream phone</span>?
          </h2>
          <p className="text-[#8B8BA7] text-lg mb-8">
            Join 2 million+ smart buyers. Takes only 60 seconds.
          </p>
          <Link
            href="/find-phone"
            id="final-cta"
            className="btn-primary text-xl px-12 py-5 inline-flex items-center gap-2"
          >
            🚀 Get My AI Recommendation — Free
          </Link>
          <p className="text-[#8B8BA7] text-xs mt-4">No sign-up required · 100% Free · Powered by Gemini AI</p>
        </div>
      </section>
    </>
  );
}
