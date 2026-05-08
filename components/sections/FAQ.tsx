'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "How does the AI recommend phones?",
    answer: "Our engine uses the Gemini 1.5 Pro API to analyze real-time market data, technical specifications, and thousands of user reviews. It matches your specific budget and usage patterns against the latest models available in India."
  },
  {
    question: "Are the prices accurate?",
    answer: "Yes, we track prices from major retailers like Amazon, Flipkart, and various offline chains across India. Prices are updated daily to ensure you get the most accurate information before buying."
  },
  {
    question: "Is this service really free?",
    answer: "100% free. We don't charge users for recommendations. Our goal is to simplify the complex mobile market so you can buy with confidence."
  },
  {
    question: "Which brands do you cover?",
    answer: "We cover all major brands including Apple, Samsung, OnePlus, Xiaomi, Realme, Vivo, Oppo, Google Pixel, and more."
  },
  {
    question: "How often is the phone database updated?",
    answer: "We update our database as soon as a new phone launches in India. You will always find the latest models, including those launched just yesterday."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-4 sm:px-6 max-w-4xl mx-auto" id="faq">
      <div className="text-center mb-16">
        <h2 className="font-outfit text-4xl sm:text-5xl font-bold mb-4">
          Frequently Asked <span className="gradient-text">Questions</span>
        </h2>
        <p className="text-[#8B8BA7] text-lg">
          Everything you need to know about Mobile-AI Guide.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div 
            key={i}
            className="rounded-2xl bg-[#12121E] border border-white/5 overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <span className="font-bold text-lg">{faq.question}</span>
              <ChevronDown className={`w-5 h-5 text-[#6C47FF] transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-6 pb-6 text-[#8B8BA7] leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
