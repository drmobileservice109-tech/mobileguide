import HeroSection from '@/components/sections/HeroSection';
import HowItWorks from '@/components/sections/HowItWorks';
import Testimonials from '@/components/sections/Testimonials';
import PopularCategories from '@/components/sections/PopularCategories';
import FAQ from '@/components/sections/FAQ';
import Link from 'next/link';

export default function Home() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Mobile-AI Guide",
      "url": "https://mobile-aiguide.mobimanager.shop",
      "description": "AI-powered mobile phone recommendation engine for the Indian market.",
      "applicationCategory": "ShoppingApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How does the AI recommend phones?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our engine uses the Gemini 1.5 Pro API to analyze real-time market data, technical specifications, and thousands of user reviews to match your budget and usage patterns."
          }
        },
        {
          "@type": "Question",
          "name": "Are the prices accurate?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we track prices from major retailers like Amazon, Flipkart, and offline stores daily to ensure you get the most accurate information."
          }
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
