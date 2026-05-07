'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sparkles, TrendingUp, Zap, Shield } from 'lucide-react';

const stats = [
  { value: '50,000+', label: 'Phones Analyzed' },
  { value: '2M+', label: 'Happy Users' },
  { value: '99.2%', label: 'Accuracy Rate' },
  { value: '< 60s', label: 'Avg. Time' },
];

const floatingPhones = [
  { emoji: '📱', delay: 0, x: -20, size: 'text-4xl' },
  { emoji: '📱', delay: 0.5, x: 20, size: 'text-3xl' },
  { emoji: '🤖', delay: 1, x: -10, size: 'text-2xl' },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6C47FF]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FF6B35]/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-[#00D4AA]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236C47FF' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6C47FF]/10 border border-[#6C47FF]/30 text-sm text-[#8B6FFF] font-medium mb-6"
          id="hero-badge"
        >
          <Sparkles className="w-4 h-4" />
          <span>Powered by Gemini AI · India's #1 Phone Advisor</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-outfit text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-6"
          id="hero-headline"
        >
          Find Your{' '}
          <span className="gradient-text">Perfect Phone</span>
          <br />
          in{' '}
          <span className="relative">
            <span className="text-[#FF6B35]">60 Seconds</span>
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#FF6B35] to-[#6C47FF] rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            />
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-[#8B8BA7] text-lg sm:text-xl max-w-2xl mx-auto mb-8 leading-relaxed"
          id="hero-subheadline"
        >
          Tell us your budget & usage — our AI analyzes thousands of phones and delivers
          the <strong className="text-white">top 3 recommendations</strong> with real-time prices from Amazon, Flipkart & offline stores.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link href="/find-phone" id="hero-cta-primary" className="btn-primary text-lg px-8 py-4 flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Find My Perfect Phone →
          </Link>
          <a href="#how-it-works" id="hero-cta-secondary" className="btn-secondary text-lg px-8 py-4">
            See How It Works
          </a>
        </motion.div>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-16"
        >
          {[
            { icon: <TrendingUp className="w-4 h-4" />, label: 'Real-time Prices' },
            { icon: <Shield className="w-4 h-4" />, label: 'Unbiased Recommendations' },
            { icon: <Sparkles className="w-4 h-4" />, label: 'AI-Powered Analysis' },
          ].map((pill, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#12121E] border border-[rgba(108,71,255,0.2)] text-xs text-[#8B8BA7]"
            >
              <span className="text-[#6C47FF]">{pill.icon}</span>
              {pill.label}
            </div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          id="hero-stats"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="glass-card p-4 text-center"
            >
              <div className="font-outfit font-bold text-2xl gradient-text-purple">{stat.value}</div>
              <div className="text-[#8B8BA7] text-xs mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
