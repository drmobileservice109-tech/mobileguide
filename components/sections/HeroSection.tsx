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
        {/* Floating elements */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-visible">
          {floatingPhones.map((p, i) => (
            <motion.div
              key={i}
              initial={{ y: 0, x: p.x, opacity: 0 }}
              animate={{ 
                y: [0, -30, 0],
                x: [p.x, p.x + 10, p.x],
                opacity: 0.15 
              }}
              transition={{ 
                duration: 5, 
                delay: p.delay, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className={`absolute left-1/2 top-1/2 ${p.size} blur-[1px]`}
              style={{ marginLeft: `${p.x * 10}px`, marginTop: `${(i - 1) * 150}px` }}
            >
              {p.emoji}
            </motion.div>
          ))}
        </div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6C47FF]/10 border border-[#6C47FF]/30 text-sm text-[#8B6FFF] font-medium mb-8 relative z-20"
          id="hero-badge"
        >
          <Sparkles className="w-4 h-4" />
          <span>PhoneAI · Powered by Gemini · India&apos;s #1 Phone Advisor</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-outfit text-5xl sm:text-7xl md:text-8xl font-black leading-[1.1] mb-8 relative z-20"
          id="hero-headline"
        >
          Find Your{' '}
          <span className="gradient-text drop-shadow-[0_0_30px_rgba(108,71,255,0.3)]">Perfect Phone</span>
          <br />
          in{' '}
          <span className="relative">
            <span className="text-[#FF6B35]">60 Seconds</span>
            <motion.div
              className="absolute -bottom-3 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FF6B35] to-[#6C47FF] rounded-full shadow-[0_0_15px_rgba(255,107,53,0.5)]"
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
          className="text-[#A8A8C0] text-lg sm:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed font-medium relative z-20"
          id="hero-subheadline"
        >
          Skip the research. Tell us your needs and let our AI scan{' '}
          <strong className="text-white">50,000+ phones</strong> to deliver your 
          top 3 picks with real-time market prices.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-20 relative z-20"
        >
          <Link href="/find-phone" id="hero-cta-primary" className="btn-primary text-xl px-10 py-5 flex items-center gap-3 shadow-[0_10px_40px_rgba(108,71,255,0.4)]">
            <Zap className="w-6 h-6 fill-current" />
            Find My Phone Now
          </Link>
          <a href="#how-it-works" id="hero-cta-secondary" className="btn-secondary text-xl px-10 py-5 bg-white/5 backdrop-blur-sm border-white/10 hover:border-[#6C47FF]/50 transition-all">
            See How It Works
          </a>
        </motion.div>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-20 relative z-20"
        >
          {[
            { icon: <TrendingUp className="w-5 h-5" />, label: 'Real-time Prices' },
            { icon: <Shield className="w-5 h-5" />, label: 'Unbiased Advice' },
            { icon: <Sparkles className="w-5 h-5" />, label: 'Gemini AI Analysis' },
          ].map((pill, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#12121E]/80 backdrop-blur-sm border border-white/5 text-sm text-[#A8A8C0] font-medium hover:border-[#6C47FF]/30 transition-colors"
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
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto relative z-20"
          id="hero-stats"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="glass-card p-6 text-center border-white/5 hover:border-[#6C47FF]/20 transition-all duration-300"
            >
              <div className="font-outfit font-black text-3xl gradient-text-purple mb-1">{stat.value}</div>
              <div className="text-[#8B8BA7] text-xs font-bold uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
