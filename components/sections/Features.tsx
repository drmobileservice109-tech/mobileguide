'use client';
import { motion } from 'framer-motion';
import { Shield, Zap, TrendingUp, Clock, Target, Cpu } from 'lucide-react';

const features = [
  {
    title: 'Real-time Price Tracking',
    description: 'We scan Amazon, Flipkart, and local store prices every 24 hours to ensure accuracy.',
    icon: <TrendingUp className="w-6 h-6" />,
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
  },
  {
    title: 'Sale Prediction Engine',
    description: 'Our AI analyzes historical sale patterns to tell you if you should buy now or wait for a price drop.',
    icon: <Clock className="w-6 h-6" />,
    color: 'text-orange-400',
    bg: 'bg-orange-400/10',
  },
  {
    title: 'Unbiased Benchmarking',
    description: 'We don\'t just look at specs; we analyze real-world performance scores for gaming, camera, and battery.',
    icon: <Cpu className="w-6 h-6" />,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
  },
  {
    title: 'Hardware Verification',
    description: 'Every recommendation is cross-referenced with actual hardware benchmarks from 50,000+ devices.',
    icon: <Shield className="w-6 h-6" />,
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
  },
  {
    title: 'Instant Comparison',
    description: 'See your top 3 picks side-by-side with a simplified comparison matrix.',
    icon: <Zap className="w-6 h-6" />,
    color: 'text-[#6C47FF]',
    bg: 'bg-[#6C47FF]/10',
  },
  {
    title: 'Offline Market Data',
    description: 'The only engine that factors in offline market prices to get you the absolute best deal.',
    icon: <Target className="w-6 h-6" />,
    color: 'text-red-400',
    bg: 'bg-red-400/10',
  },
];

export default function Features() {
  return (
    <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-outfit text-4xl sm:text-5xl font-bold mb-4">
          Why trust <span className="gradient-text">PhoneAI</span>?
        </h2>
        <p className="text-[#8B8BA7] text-lg max-w-2xl mx-auto">
          Built on Gemini 2.0 Flash, our engine combines raw data with intelligent analysis to save you hours of research.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-8 hover:border-[#6C47FF]/30 transition-all duration-300 group"
          >
            <div className={`w-12 h-12 rounded-2xl ${feature.bg} ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
            <p className="text-[#8B8BA7] text-sm leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
