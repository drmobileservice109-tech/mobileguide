'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ShoppingCart, Clock, CheckCircle, Trophy, Zap, Star,
  RotateCcw, ExternalLink, Sparkles
} from 'lucide-react';
import { RecommendationResponse, PhoneRecommendation, UserPreferences } from '@/lib/types';

const RANK_CONFIG = {
  'Best Value': {
    badge: '🏆 Best Value',
    color: '#00D4AA',
    gradient: 'from-[#00D4AA]/20 to-transparent',
    border: 'border-[#00D4AA]/40',
    glow: '0 0 30px rgba(0,212,170,0.2)',
  },
  'Performance King': {
    badge: '⚡ Performance King',
    color: '#6C47FF',
    gradient: 'from-[#6C47FF]/20 to-transparent',
    border: 'border-[#6C47FF]/40',
    glow: '0 0 30px rgba(108,71,255,0.2)',
  },
  'Premium Choice': {
    badge: '💎 Premium Choice',
    color: '#FF6B35',
    gradient: 'from-[#FF6B35]/20 to-transparent',
    border: 'border-[#FF6B35]/40',
    glow: '0 0 30px rgba(255,107,53,0.2)',
  },
};

const SCORE_LABELS: Record<string, string> = {
  camera: '📸 Camera',
  battery: '🔋 Battery',
  performance: '⚡ Performance',
  value: '💰 Value',
  display: '🖥️ Display',
};

function ScoreBar({ label, value, color, delay }: { label: string; value: number; color: string; delay: number }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-[#8B8BA7]">{SCORE_LABELS[label] || label}</span>
        <span className="font-bold" style={{ color }}>{value}/100</span>
      </div>
      <div className="h-2 bg-[#1A1A2E] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}99, ${color})` }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}


function PhoneCard({ phone, index, prefs }: { phone: PhoneRecommendation; index: number; prefs: UserPreferences | null }) {
  const cfg = RANK_CONFIG[phone.rank as keyof typeof RANK_CONFIG] || RANK_CONFIG['Best Value'];
  const lowestPrice = Math.min(phone.amazonPrice, phone.flipkartPrice, phone.offlineTargetPrice);
  const prioritizeOffline = prefs?.preferOffline && (phone.offlineTargetPrice <= lowestPrice * 1.05);
  const bestSource = prioritizeOffline ? 'Local Store' : (phone.amazonPrice === lowestPrice ? 'Amazon' : phone.flipkartPrice === lowestPrice ? 'Flipkart' : 'Offline');
  const displayBestPrice = prioritizeOffline ? phone.offlineTargetPrice : lowestPrice;
  const overallScore = Math.round(Object.values(phone.scores).reduce((a, b) => a + b, 0) / Object.values(phone.scores).length);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`glass-card border ${cfg.border} overflow-hidden`}
      style={{ boxShadow: cfg.glow }}
      id={`phone-card-${index + 1}`}
    >
      {/* Card Header Gradient */}
      <div className={`bg-gradient-to-br ${cfg.gradient} p-6 pb-5`}>
        {/* Rank Badge + Score */}
        <div className="flex items-center justify-between mb-4">
          <div
            className="inline-block text-xs font-bold px-3 py-1.5 rounded-full"
            style={{ background: `${cfg.color}20`, color: cfg.color, border: `1px solid ${cfg.color}40` }}
          >
            {cfg.badge}
          </div>
          <div className="flex flex-col items-center">
            <div className="text-2xl font-black font-outfit" style={{ color: cfg.color }}>{overallScore}</div>
            <div className="text-[9px] text-[#8B8BA7] uppercase tracking-widest">Score</div>
          </div>
        </div>

        {/* Phone Name */}
        <h3 className="font-outfit font-bold text-xl text-white mb-0.5">{phone.name}</h3>
        <p className="text-[#8B8BA7] text-sm mb-4">{phone.brand}</p>

        {/* Price + Buy CTAs together */}
        <div className="bg-[#0A0A1A]/40 rounded-2xl p-4 mb-3">
          <div className="flex items-end justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-outfit font-black text-3xl text-white">₹{displayBestPrice.toLocaleString()}</span>
                {phone.priceStatus === 'Low' && (
                  <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">🔥 Best Price</span>
                )}
                {phone.priceStatus === 'High' && (
                  <span className="text-[10px] font-bold bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full border border-red-500/30">⚠️ Price High</span>
                )}
              </div>
              <span className="text-[#8B8BA7] text-xs line-through">₹{phone.price.toLocaleString()}</span>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-[#FFB800] text-[10px] font-bold bg-[#FFB800]/10 px-1.5 py-0.5 rounded">AI Estimate</span>
                <span className="text-[#8B8BA7] text-[10px]">verify before buying</span>
              </div>
            </div>
          </div>
          {/* Buy buttons — prominent at top */}
          <div className="grid grid-cols-2 gap-2">
            <a
              href={`https://www.amazon.in/s?k=${encodeURIComponent(phone.name)}&tag=${process.env.NEXT_PUBLIC_AMAZON_TAG || 'default-tag-21'}`}
              target="_blank" rel="noopener noreferrer"
              id={`buy-amazon-${index}`}
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-bold text-sm bg-[#FF9900] text-black hover:bg-[#FFB700] hover:scale-[1.02] transition-all"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              Amazon
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href={`https://www.flipkart.com/search?q=${encodeURIComponent(phone.name)}&affid=${process.env.NEXT_PUBLIC_FLIPKART_ID || 'default-id'}`}
              target="_blank" rel="noopener noreferrer"
              id={`buy-flipkart-${index}`}
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-bold text-sm bg-[#2874f0] text-white hover:bg-[#3a84ff] hover:scale-[1.02] transition-all"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              Flipkart
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Quick Specs */}
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Processor', value: phone.specs.processor },
            { label: 'RAM', value: phone.specs.ram },
            { label: 'Storage', value: phone.specs.storage },
            { label: 'Battery', value: phone.specs.battery },
            { label: 'Display', value: phone.specs.display },
            { label: 'Camera', value: phone.specs.camera },
          ].map((spec) => (
            <div key={spec.label} className="bg-[#1A1A2E] rounded-lg p-3">
              <div className="text-[#8B8BA7] text-xs mb-0.5">{spec.label}</div>
              <div className="text-white text-xs font-semibold leading-tight">{spec.value}</div>
            </div>
          ))}
        </div>

        {/* Score Bars */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-3">Performance Scores</h4>
          {Object.entries(phone.scores).map(([key, val], i) => (
            <ScoreBar
              key={key}
              label={key}
              value={val}
              color={cfg.color}
              delay={0.3 + i * 0.1}
            />
          ))}
        </div>

        {/* Price Comparison */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-3">Price Comparison</h4>
          <div className="space-y-2">
            {[
              { label: 'Amazon', price: phone.amazonPrice, emoji: '📦' },
              { label: 'Flipkart', price: phone.flipkartPrice, emoji: '🛍️' },
              { label: 'Offline / Target', price: phone.offlineTargetPrice, emoji: '🏪' },
            ].map((item) => (
              <div
                key={item.label}
                className={`flex justify-between items-center p-3 rounded-lg transition-colors ${
                  item.price === lowestPrice ? 'bg-[#00D4AA]/10 border border-[#00D4AA]/30' : 'bg-[#1A1A2E]'
                }`}
              >
                <span className="text-[#8B8BA7] text-sm">{item.emoji} {item.label}</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">₹{item.price.toLocaleString()}</span>
                  {item.price === lowestPrice && (
                    <span className="text-[#00D4AA] text-xs font-bold">BEST</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bank Offers */}
        {phone.bankOffers.length > 0 && (
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">💳 Bank Offers</h4>
            <div className="space-y-1">
              {phone.bankOffers.map((offer, i) => (
                <div key={i} className="text-sm text-[#00D4AA] flex items-center gap-2 bg-[#00D4AA]/10 rounded-lg px-3 py-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  {offer}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Should I Wait? */}
        <div className={`p-4 rounded-xl border flex items-start gap-3 ${
          phone.shouldWait.wait
            ? 'bg-[#FF6B35]/10 border-[#FF6B35]/30'
            : 'bg-[#00D4AA]/10 border-[#00D4AA]/30'
        }`}>
          {phone.shouldWait.wait ? (
            <Clock className="w-5 h-5 text-[#FF6B35] shrink-0 mt-0.5" />
          ) : (
            <CheckCircle className="w-5 h-5 text-[#00D4AA] shrink-0 mt-0.5" />
          )}
          <div>
            <div className={`font-bold text-sm ${phone.shouldWait.wait ? 'text-[#FF6B35]' : 'text-[#00D4AA]'}`}>
              {phone.shouldWait.wait ? '⏳ Wait a bit!' : '✅ Buy Now!'}
            </div>
            <div className="text-[#8B8BA7] text-xs mt-1">{phone.shouldWait.reason}</div>
          </div>
        </div>

        {/* AI Verdict — always visible */}
        <div className="border-t border-[rgba(108,71,255,0.1)] pt-4">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 text-[#FF6B35]" />
            <span className="text-white font-semibold text-sm">AI Verdict</span>
          </div>
          <p className="text-[#8B8BA7] text-sm leading-relaxed italic mb-4">
            &ldquo;{phone.aiVerdict}&rdquo;
          </p>

          {/* Pros/Cons */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#00D4AA]/5 rounded-xl p-3 border border-[#00D4AA]/20">
              <div className="text-[#00D4AA] text-xs font-bold mb-2">✅ Pros</div>
              {phone.pros.map((p, i) => (
                <div key={i} className="text-[#A8A8C0] text-xs mb-1.5 flex items-start gap-1"><span className="text-[#00D4AA] mt-0.5">·</span>{p}</div>
              ))}
            </div>
            <div className="bg-[#FF6B35]/5 rounded-xl p-3 border border-[#FF6B35]/20">
              <div className="text-[#FF6B35] text-xs font-bold mb-2">⚠️ Cons</div>
              {phone.cons.map((c, i) => (
                <div key={i} className="text-[#A8A8C0] text-xs mb-1.5 flex items-start gap-1"><span className="text-[#FF6B35] mt-0.5">·</span>{c}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ResultsPage() {
  const router = useRouter();
  const [data, setData] = useState<RecommendationResponse | null>(null);
  const [prefs, setPrefs] = useState<UserPreferences | null>(null);

  useEffect(() => {
    const storedData = sessionStorage.getItem('phoneResults');
    const storedPrefs = sessionStorage.getItem('userPrefs');
    if (!storedData) {
      router.push('/find-phone');
      return;
    }
    setData(JSON.parse(storedData));
    if (storedPrefs) setPrefs(JSON.parse(storedPrefs));
  }, [router]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#6C47FF]/30 border-t-[#6C47FF] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
          id="results-header"
        >
          {/* Price disclaimer banner */}
          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FFB800]/10 border border-[#FFB800]/30 text-[#FFB800] text-sm font-medium mb-6 max-w-2xl mx-auto">
            <span className="text-base shrink-0">⚠️</span>
            <span className="text-[#FFB800]/90 text-xs text-left">
              <strong>Prices are AI estimates.</strong> Always click Amazon/Flipkart to confirm the real price before buying.
            </span>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00D4AA]/10 border border-[#00D4AA]/30 text-[#00D4AA] text-sm font-medium mb-6">
            <Trophy className="w-4 h-4" />
            <span>AI Analysis Complete</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D4AA] animate-ping" />
          </div>

          <h1 className="font-outfit text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
            Your Top <span className="gradient-text">3 Phones</span> Are Ready!
          </h1>

          <p className="text-[#8B8BA7] text-lg max-w-2xl mx-auto mb-4">
            {data.summary}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#6C47FF]/10 border border-[#6C47FF]/20 text-sm">
              <Zap className="w-3.5 h-3.5 text-[#6C47FF]" />
              <span className="text-[#8B8BA7]">Analyzed <span className="text-white font-bold">{data.totalAnalyzed?.toLocaleString() || '47,832'}</span> phones</span>
            </div>
            {prefs && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FF6B35]/10 border border-[#FF6B35]/20 text-sm">
                <span className="text-[#FF6B35]">💰</span>
                <span className="text-[#8B8BA7]">Budget: <span className="text-white font-bold">₹{prefs.budgetMin.toLocaleString()}–₹{prefs.budgetMax.toLocaleString()}</span></span>
              </div>
            )}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#00D4AA]/10 border border-[#00D4AA]/20 text-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#00D4AA]" />
              <span className="text-[#8B8BA7]">Updated <span className="text-white font-bold">{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span></span>
            </div>
          </div>
        </motion.div>

        {/* Phone Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {data.recommendations.map((phone, i) => (
            <PhoneCard key={i} phone={phone} index={i} prefs={prefs} />
          ))}
        </div>

        {/* Quick Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="glass-card mb-12 overflow-hidden"
          style={{ borderRadius: '24px' }}
        >
          <div className="p-6 border-b border-[rgba(108,71,255,0.1)] bg-[#1A1A2E]/50">
            <h3 className="font-outfit font-bold text-xl text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#FFB800]" />
              Quick Comparison Matrix
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#1A1A2E]/30">
                  <th className="p-4 text-[#8B8BA7] text-xs font-bold uppercase tracking-widest border-b border-[rgba(108,71,255,0.05)]">Feature</th>
                  {data.recommendations.map((phone, i) => (
                    <th key={i} className="p-4 text-white text-sm font-bold border-b border-[rgba(108,71,255,0.05)]">
                      {phone.name.split(' (')[0]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  { label: 'Processor', key: 'processor', isSpec: true },
                  { label: 'Display', key: 'display', isSpec: true },
                  { label: 'Camera Score', key: 'camera', isScore: true },
                  { label: 'Battery Score', key: 'battery', isScore: true },
                  { label: 'Perf. Score', key: 'performance', isScore: true },
                  { label: 'Best Price', key: 'best', custom: true },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 text-[#8B8BA7] font-medium border-b border-[rgba(108,71,255,0.05)]">{row.label}</td>
                    {data.recommendations.map((phone, j) => {
                      let val: any = '';
                      if (row.isSpec) val = (phone.specs as any)[row.key];
                      if (row.isScore) val = `${(phone.scores as any)[row.key]}/100`;
                      if (row.custom) val = `₹${Math.min(phone.amazonPrice, phone.flipkartPrice, phone.offlineTargetPrice).toLocaleString()}`;
                      
                      return (
                        <td key={j} className="p-4 text-white border-b border-[rgba(108,71,255,0.05)]">
                          {row.isScore ? (
                            <span className="font-bold text-[#00D4AA]">{val}</span>
                          ) : (
                            val
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'My AI Phone Recommendation',
                  text: 'Check out the phones PhoneAI recommended for me!',
                  url: window.location.href,
                });
              } else {
                alert('URL copied to clipboard!');
                navigator.clipboard.writeText(window.location.href);
              }
            }}
            className="btn-secondary flex items-center gap-2 px-8 py-4 bg-white/5 border-white/10"
            id="btn-share"
          >
            <Sparkles className="w-4 h-4" />
            Share Recommendation
          </button>
          <button
            onClick={() => alert('PDF Report generation is coming soon!')}
            className="btn-secondary flex items-center gap-2 px-8 py-4 bg-white/5 border-white/10"
            id="btn-download"
          >
            <ExternalLink className="w-4 h-4" />
            Download PDF Report
          </button>
        </motion.div>

        {/* Search Again */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="text-center"
        >
          <button
            onClick={() => {
              sessionStorage.clear();
              router.push('/find-phone');
            }}
            id="btn-search-again"
            className="flex items-center gap-2 mx-auto text-[#8B8BA7] hover:text-white transition-colors text-sm font-medium"
          >
            <RotateCcw className="w-4 h-4" />
            Search Again with Different Preferences
          </button>
        </motion.div>
      </div>
    </div>
  );
}
