'use client';
import { motion } from 'framer-motion';
import { MessageSquare, Brain, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: <MessageSquare className="w-7 h-7" />,
    step: '01',
    title: 'Answer 4 Quick Questions',
    description: 'Tell us your budget, how you use your phone (gaming, camera, battery), brand preference, and any special needs like 5G.',
    color: '#6C47FF',
    gradient: 'from-[#6C47FF]/20 to-[#6C47FF]/5',
  },
  {
    icon: <Brain className="w-7 h-7" />,
    step: '02',
    title: 'AI Analyzes 50,000+ Phones',
    description: 'Our Gemini AI processes thousands of phones, current market prices, bank offers, upcoming sales, and user reviews in real-time.',
    color: '#FF6B35',
    gradient: 'from-[#FF6B35]/20 to-[#FF6B35]/5',
  },
  {
    icon: <CheckCircle className="w-7 h-7" />,
    step: '03',
    title: 'Get Your Top 3 Deals',
    description: 'Receive a ranked list with price comparisons across Amazon, Flipkart & offline stores — plus a "Should I Buy Now?" verdict.',
    color: '#00D4AA',
    gradient: 'from-[#00D4AA]/20 to-[#00D4AA]/5',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-[#6C47FF] text-sm font-semibold uppercase tracking-widest">The Process</span>
          <h2 className="font-outfit text-4xl sm:text-5xl font-bold mt-3 mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-[#8B8BA7] text-lg max-w-xl mx-auto">
            From budget to best deal in three simple steps
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative glass-card p-8 group hover:scale-[1.02] transition-transform duration-300"
              id={`how-it-works-step-${i + 1}`}
            >
              {/* Step number */}
              <div className="absolute -top-4 -right-4 font-outfit font-black text-7xl opacity-5 text-white pointer-events-none select-none">
                {step.step}
              </div>

              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                style={{ border: `1px solid ${step.color}30`, color: step.color }}
              >
                {step.icon}
              </div>

              {/* Step badge */}
              <div
                className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-4"
                style={{ background: `${step.color}20`, color: step.color }}
              >
                Step {step.step}
              </div>

              <h3 className="font-outfit font-bold text-xl text-white mb-3">{step.title}</h3>
              <p className="text-[#8B8BA7] leading-relaxed">{step.description}</p>

              {/* Connector arrow (not on last) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <div className="w-8 h-8 bg-[#12121E] border border-[rgba(108,71,255,0.3)] rounded-full flex items-center justify-center text-[#6C47FF] text-sm">
                    →
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
