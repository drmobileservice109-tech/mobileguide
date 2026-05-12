'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "How does PhoneAI recommend phones?",
    answer: "PhoneAI uses the Gemini AI API to analyze real-time market data, technical specifications, and thousands of user reviews. It matches your specific budget and usage patterns against the latest models available in India."
  },
  {
    question: "Are the prices accurate?",
    answer: "Yes, we track prices from major retailers like Amazon, Flipkart, and various offline chains across India. Prices are updated daily to ensure you get the most accurate information before buying."
  },
  {
    question: "Is PhoneAI really free?",
    answer: "100% free. No sign-up, no credit card, no hidden charges. Our goal is to simplify the complex mobile market so you can buy with confidence."
  },
  {
    question: "Which brands do you cover?",
    answer: "We cover all major brands including Apple, Samsung, OnePlus, Xiaomi, Realme, Vivo, Oppo, Google Pixel, Motorola, Nothing, POCO, iQOO and more — over 50+ brands."
  },
  {
    question: "How often is the phone database updated?",
    answer: "We update our database as soon as a new phone launches in India. You will always find the latest models, including those launched just yesterday."
  },
  {
    question: "Can PhoneAI help me find offline store prices?",
    answer: "Yes! In the last step of the questionnaire, select 'Local Store Buyer' and PhoneAI will factor in offline market prices and availability near you."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 px-4 sm:px-6 max-w-4xl mx-auto" id="faq">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6C47FF]/10 border border-[#6C47FF]/30 text-[#8B6FFF] text-sm font-medium mb-4">
          <HelpCircle className="w-4 h-4" />
          <span>{faqs.length} Common Questions</span>
        </div>
        <h2 className="font-outfit text-4xl sm:text-5xl font-bold mb-4">
          Frequently Asked <span className="gradient-text">Questions</span>
        </h2>
        <p className="text-[#8B8BA7] text-lg">
          Everything you need to know about <span className="text-white font-semibold">PhoneAI</span>.
        </p>
      </motion.div>

      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
              openIndex === i
                ? 'bg-[#12121E] border-[#6C47FF]/40 shadow-[0_0_20px_rgba(108,71,255,0.1)]'
                : 'bg-[#0E0E1A] border-white/5 hover:border-[#6C47FF]/20'
            }`}
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 group"
              id={`faq-toggle-${i}`}
            >
              <div className="flex items-center gap-3">
                <span className={`text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                  openIndex === i ? 'bg-[#6C47FF] text-white' : 'bg-[#1A1A2E] text-[#6C47FF]'
                }`}>
                  {i + 1}
                </span>
                <span className={`font-semibold text-base transition-colors ${openIndex === i ? 'text-white' : 'text-[#C8C8D8] group-hover:text-white'}`}>
                  {faq.question}
                </span>
              </div>
              <ChevronDown className={`w-5 h-5 text-[#6C47FF] shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-[#8B8BA7] leading-relaxed pl-[52px]">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
