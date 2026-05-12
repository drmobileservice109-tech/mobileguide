'use client';
import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { UserPreferences } from '@/lib/types';

// Step 1 — Budget
const BUDGET_CHIPS = [
  { label: 'Under ₹10k', min: 5000, max: 10000 },
  { label: '₹10k - ₹15k', min: 10000, max: 15000 },
  { label: '₹15k - ₹25k', min: 15000, max: 25000 },
  { label: '₹25k - ₹40k', min: 25000, max: 40000 },
  { label: '₹40k - ₹70k', min: 40000, max: 70000 },
  { label: '₹70k+', min: 70000, max: 150000 },
];

// Step 2 — Use Cases
const USE_CASES = [
  { id: 'gaming', emoji: '🎮', label: 'Gaming', desc: 'BGMI, Call of Duty, Genshin' },
  { id: 'camera', emoji: '📸', label: 'Camera', desc: 'Reels, vlogs, photography' },
  { id: 'battery', emoji: '🔋', label: 'Battery Life', desc: 'All-day usage, less charging' },
  { id: 'professional', emoji: '💼', label: 'Professional', desc: 'Work, productivity, calls' },
  { id: 'social', emoji: '📱', label: 'Social Media', desc: 'Instagram, YouTube, streaming' },
  { id: 'gift', emoji: '🎁', label: 'Gift / Senior', desc: 'Easy to use, durable' },
];

// Step 3 — Brands
const BRANDS = [
  { id: 'samsung', name: 'Samsung', emoji: '🔵' },
  { id: 'apple', name: 'Apple', emoji: '🍎' },
  { id: 'oneplus', name: 'OnePlus', emoji: '⚡' },
  { id: 'xiaomi', name: 'Xiaomi', emoji: '🟠' },
  { id: 'realme', name: 'Realme', emoji: '🟡' },
  { id: 'vivo', name: 'Vivo', emoji: '🔷' },
  { id: 'oppo', name: 'OPPO', emoji: '🟢' },
  { id: 'google', name: 'Google', emoji: '🌈' },
  { id: 'motorola', name: 'Motorola', emoji: '⚙️' },
  { id: 'nothing', name: 'Nothing', emoji: '⬜' },
  { id: 'poco', name: 'POCO', emoji: '💥' },
  { id: 'iqoo', name: 'iQOO', emoji: '🏎️' },
];

// Step 4 — Extra
const STORAGE_OPTIONS = ['64GB', '128GB', '256GB', '512GB', 'No Preference'];

const STEPS = ['Budget', 'Usage', 'Brands', 'Extras'];

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir < 0 ? 300 : -300, opacity: 0 }),
};

export default function FindPhonePage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form state
  const [selectedBudget, setSelectedBudget] = useState<typeof BUDGET_CHIPS[0] | null>(null);
  const [customBudget, setCustomBudget] = useState(25000);
  const [useCustom, setUseCustom] = useState(false);
  const [useCase, setUseCase] = useState('');
  const [brands, setBrands] = useState<string[]>([]);
  const [needs5G, setNeeds5G] = useState(false);
  const [storage, setStorage] = useState('No Preference');
  const [wantsLegends, setWantsLegends] = useState(false);
  const [preferOffline, setPreferOffline] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('🤖 AI is analyzing...');

  const LOADING_MESSAGES = [
    '🤖 AI is analyzing your preferences...',
    '📦 Checking Amazon & Flipkart inventory...',
    '🏪 Scanning local shop bargain prices...',
    '📉 Tracking 30-day price history...',
    '💳 Searching for best bank offers...',
    '✨ Curating your perfect top 3 picks...'
  ];

  useEffect(() => {
    let interval: any;
    if (loading) {
      let i = 0;
      interval = setInterval(() => {
        i = (i + 1) % LOADING_MESSAGES.length;
        setLoadingMsg(LOADING_MESSAGES[i]);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const go = (delta: number) => {
    setDir(delta);
    setStep(s => s + delta);
  };

  const toggleBrand = (id: string) => {
    setBrands(prev =>
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  };

  const canNext = () => {
    if (step === 0) return selectedBudget !== null || useCustom;
    if (step === 1) return useCase !== '';
    return true;
  };

  const getPrefs = useCallback((): UserPreferences => {
    const budget = useCustom
      ? { min: customBudget * 0.8, max: customBudget * 1.2, label: `₹${customBudget.toLocaleString()} range` }
      : { min: selectedBudget!.min, max: selectedBudget!.max, label: selectedBudget!.label };

    return {
      budgetMin: Math.round(budget.min),
      budgetMax: Math.round(budget.max),
      budgetLabel: budget.label,
      useCase,
      brands: brands.map(id => BRANDS.find(b => b.id === id)?.name || id),
      needs5G,
      storage,
      wantsLegends,
      preferOffline,
    };
  }, [selectedBudget, useCustom, customBudget, useCase, brands, needs5G, storage, wantsLegends, preferOffline]);

  const handleSubmit = async () => {
    setLoading(true);
    const prefs = getPrefs();
    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prefs),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      // Store in sessionStorage for results page
      sessionStorage.setItem('phoneResults', JSON.stringify(data));
      sessionStorage.setItem('userPrefs', JSON.stringify(prefs));
      router.push('/results');
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert('Something went wrong. Please check your API key and try again.');
    }
  };

  const progressPct = ((step) / STEPS.length) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-24 px-4">
      <div className="w-full max-w-2xl">

        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-5">
            {STEPS.map((s, i) => (
              <div key={i} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <motion.div
                    animate={{
                      background: i < step ? '#6C47FF' : i === step ? 'linear-gradient(135deg,#6C47FF,#FF6B35)' : '#1A1A2E',
                      borderColor: i <= step ? '#6C47FF' : '#2a2a4e',
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-9 h-9 rounded-full border-2 flex items-center justify-center font-bold text-sm mb-1"
                    style={{
                      background: i < step ? '#6C47FF' : i === step ? 'linear-gradient(135deg,#6C47FF,#FF6B35)' : '#1A1A2E',
                      borderColor: i <= step ? '#6C47FF' : '#2a2a4e',
                      color: i <= step ? 'white' : '#3a3a5e',
                    }}
                  >
                    {i < step ? '✓' : i + 1}
                  </motion.div>
                  <span className={`text-[10px] font-semibold transition-colors ${i <= step ? 'text-[#6C47FF]' : 'text-[#3a3a5e]'}`}>
                    {s}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="flex-1 h-0.5 mx-2 mb-4 rounded-full overflow-hidden bg-[#1A1A2E]">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#6C47FF] to-[#FF6B35]"
                      animate={{ width: i < step ? '100%' : '0%' }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="glass-card p-8 overflow-hidden min-h-[420px] flex flex-col">
          <AnimatePresence mode="wait" custom={dir}>
            {/* STEP 0: Budget */}
            {step === 0 && (
              <motion.div
                key="step-budget"
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="flex flex-col flex-1"
                id="step-budget"
              >
                <h2 className="font-outfit text-2xl font-bold text-white mb-2">What&apos;s your budget? 💰</h2>
                <p className="text-[#8B8BA7] text-sm mb-6">Select a range or use the slider for a custom budget</p>

                {/* Quick chips */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                  {BUDGET_CHIPS.map((chip) => (
                    <button
                      key={chip.label}
                      id={`budget-chip-${chip.label.replace(/\s+/g, '-').toLowerCase()}`}
                      onClick={() => { setSelectedBudget(chip); setUseCustom(false); }}
                      className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                        !useCustom && selectedBudget?.label === chip.label
                          ? 'border-[#6C47FF] bg-[#6C47FF]/20 text-white'
                          : 'border-[rgba(108,71,255,0.2)] bg-[#1A1A2E] text-[#8B8BA7] hover:border-[#6C47FF]/50 hover:text-white'
                      }`}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>

                {/* Custom slider */}
                <div className="border-t border-[rgba(108,71,255,0.1)] pt-5">
                  <div className="flex justify-between mb-2">
                    <span className="text-[#8B8BA7] text-sm">Custom Budget</span>
                    <span className={`font-bold text-sm ${useCustom ? 'text-[#6C47FF]' : 'text-[#8B8BA7]'}`}>
                      ₹{customBudget.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={5000}
                    max={150000}
                    step={1000}
                    value={customBudget}
                    id="budget-slider"
                    onChange={(e) => {
                      setCustomBudget(Number(e.target.value));
                      setUseCustom(true);
                      setSelectedBudget(null);
                    }}
                    className="w-full"
                    style={{ '--range-progress': `${((customBudget - 5000) / (150000 - 5000)) * 100}%` } as React.CSSProperties}
                  />
                  <div className="flex justify-between text-xs text-[#3a3a5e] mt-1">
                    <span>₹5,000</span>
                    <span>₹1,50,000</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 1: Use Case */}
            {step === 1 && (
              <motion.div
                key="step-usecase"
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="flex flex-col flex-1"
                id="step-usecase"
              >
                <h2 className="font-outfit text-2xl font-bold text-white mb-2">How will you mainly use it? 🎯</h2>
                <p className="text-[#8B8BA7] text-sm mb-6">Pick one — this helps the AI fine-tune its recommendation</p>

                <div className="grid grid-cols-2 gap-3 flex-1">
                  {USE_CASES.map((uc) => (
                    <button
                      key={uc.id}
                      id={`usecase-${uc.id}`}
                      onClick={() => setUseCase(uc.id)}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        useCase === uc.id
                          ? 'border-[#6C47FF] bg-[#6C47FF]/20'
                          : 'border-[rgba(108,71,255,0.2)] bg-[#1A1A2E] hover:border-[#6C47FF]/50'
                      }`}
                    >
                      <div className="text-2xl mb-2">{uc.emoji}</div>
                      <div className={`font-semibold text-sm ${useCase === uc.id ? 'text-white' : 'text-[#8B8BA7]'}`}>{uc.label}</div>
                      <div className="text-[#8B8BA7] text-xs mt-1">{uc.desc}</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 2: Brands */}
            {step === 2 && (
              <motion.div
                key="step-brands"
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="flex flex-col flex-1"
                id="step-brands"
              >
                <h2 className="font-outfit text-2xl font-bold text-white mb-2">Brand preference? 🏷️</h2>
                <p className="text-[#8B8BA7] text-sm mb-6">Select any brands you prefer (or skip for unbiased picks)</p>

                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-6 flex-1">
                  {BRANDS.map((brand) => (
                    <button
                      key={brand.id}
                      id={`brand-${brand.id}`}
                      onClick={() => toggleBrand(brand.id)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        brands.includes(brand.id)
                          ? 'border-[#6C47FF] bg-[#6C47FF]/20'
                          : 'border-[rgba(108,71,255,0.2)] bg-[#1A1A2E] hover:border-[#6C47FF]/50'
                      }`}
                    >
                      <div className="text-xl mb-1">{brand.emoji}</div>
                      <div className={`text-xs font-medium ${brands.includes(brand.id) ? 'text-white' : 'text-[#8B8BA7]'}`}>{brand.name}</div>
                    </button>
                  ))}
                </div>

                {brands.length > 0 && (
                  <button
                    onClick={() => setBrands([])}
                    className="text-xs text-[#8B8BA7] hover:text-white transition-colors underline mt-2"
                    id="clear-brands"
                  >
                    Clear selection (show all brands)
                  </button>
                )}
              </motion.div>
            )}

            {/* STEP 3: Extras */}
            {step === 3 && (
              <motion.div
                key="step-extras"
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="flex flex-col flex-1"
                id="step-extras"
              >
                <h2 className="font-outfit text-2xl font-bold text-white mb-2">Any special requirements? ✨</h2>
                <p className="text-[#8B8BA7] text-sm mb-6">Optional — helps us refine the recommendation further</p>

                {/* 5G Toggle */}
                <div className="glass-card p-5 mb-4" style={{ borderRadius: '16px' }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white">5G Required?</div>
                      <div className="text-[#8B8BA7] text-sm">Future-proof your purchase</div>
                    </div>
                    <button
                      id="toggle-5g"
                      onClick={() => setNeeds5G(!needs5G)}
                      className={`relative w-14 h-7 rounded-full transition-colors ${needs5G ? 'bg-[#6C47FF]' : 'bg-[#2a2a4e]'}`}
                    >
                      <motion.div
                        className="absolute top-1 w-5 h-5 bg-white rounded-full shadow"
                        animate={{ left: needs5G ? 30 : 2 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    </button>
                  </div>
                </div>

                {/* Storage preference */}
                <div className="glass-card p-5 mb-4" style={{ borderRadius: '16px' }}>
                  <div className="font-semibold text-white mb-3">Storage Preference</div>
                  <div className="flex flex-wrap gap-2">
                    {STORAGE_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        id={`storage-${opt.replace(' ', '-').toLowerCase()}`}
                        onClick={() => setStorage(opt)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                          storage === opt
                            ? 'border-[#6C47FF] bg-[#6C47FF]/20 text-white'
                            : 'border-[rgba(108,71,255,0.2)] bg-[#1A1A2E] text-[#8B8BA7] hover:border-[#6C47FF]/50'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Legends / Flagship Toggle */}
                <motion.div
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    wantsLegends
                      ? 'border-[#FFB800] bg-gradient-to-br from-[#FFB800]/15 to-[#FF6B35]/10'
                      : 'border-[rgba(255,184,0,0.2)] bg-[#1A1A2E] hover:border-[#FFB800]/50'
                  }`}
                  onClick={() => setWantsLegends(!wantsLegends)}
                  id="toggle-legends"
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">👑</span>
                      <div>
                        <div className={`font-bold text-base ${wantsLegends ? 'text-[#FFB800]' : 'text-white'}`}>
                          Show Flagship Legends
                        </div>
                        <div className="text-[#8B8BA7] text-xs mt-0.5">
                          iPhone 16, S25 Ultra, OnePlus 13 — premium flagships include karo
                        </div>
                      </div>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${
                        wantsLegends ? 'bg-[#FFB800] border-[#FFB800]' : 'border-[#8B8BA7]'
                      }`}
                    >
                      {wantsLegends && <span className="text-black text-xs font-bold">✓</span>}
                    </div>
                  </div>
                  {wantsLegends && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-3 pt-3 border-t border-[#FFB800]/20 text-xs text-[#FFB800]/80"
                    >
                      ✨ AI will include top flagship phones like iPhone, Galaxy Ultra, OnePlus Pro series
                    </motion.div>
                  )}
                </motion.div>

                {/* Offline Buyer Toggle */}
                <motion.div
                  className={`mt-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    preferOffline
                      ? 'border-[#00D4AA] bg-[#00D4AA]/10'
                      : 'border-[rgba(0,212,170,0.1)] bg-[#1A1A2E] hover:border-[#00D4AA]/40'
                  }`}
                  onClick={() => setPreferOffline(!preferOffline)}
                  id="toggle-offline"
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">🏪</span>
                      <div>
                        <div className={`font-bold text-base ${preferOffline ? 'text-[#00D4AA]' : 'text-white'}`}>
                          Local Store Buyer
                        </div>
                        <div className="text-[#8B8BA7] text-xs mt-0.5">
                          Offline shop se lena hai? Best local market price dhundho
                        </div>
                      </div>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${
                        preferOffline ? 'bg-[#00D4AA] border-[#00D4AA]' : 'border-[#8B8BA7]'
                      }`}
                    >
                      {preferOffline && <span className="text-black text-xs font-bold">✓</span>}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-[rgba(108,71,255,0.1)]">
            <button
              onClick={() => go(-1)}
              disabled={step === 0}
              id="btn-prev"
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                step === 0
                  ? 'text-white/10 cursor-not-allowed'
                  : 'text-[#8B8BA7] hover:text-white hover:bg-white/5'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>

            {step < STEPS.length - 1 ? (
              <button
                onClick={() => go(1)}
                disabled={!canNext()}
                id="btn-next"
                className={`btn-primary flex items-center gap-2 px-8 py-3 text-sm ${!canNext() ? 'opacity-30 grayscale cursor-not-allowed' : 'shadow-[0_4px_20px_rgba(108,71,255,0.3)]'}`}
              >
                Continue
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                id="btn-find-phone"
                className="btn-primary flex items-center gap-3 px-10 py-3 text-sm shadow-[0_4px_20px_rgba(108,71,255,0.3)]"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-current" />
                    Get My Recommendation
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Loading overlay — rendered outside the card as a portal-like fixed overlay */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-[#0A0A1A]/80 backdrop-blur-sm flex flex-col items-center justify-center z-50"
        >
          <div className="glass-card p-10 text-center max-w-sm border-[#6C47FF]/30">
            <div className="w-16 h-16 border-4 border-[#6C47FF]/30 border-t-[#6C47FF] rounded-full animate-spin mx-auto mb-6" />
            <h3 className="font-outfit font-bold text-xl text-white mb-2">{loadingMsg}</h3>
            <p className="text-[#8B8BA7] text-sm">Please wait while we scan 50,000+ phones to find your absolute best match for May 2026...</p>
            <div className="mt-4 flex justify-center gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-[#6C47FF] rounded-full"
                  animate={{ y: [-4, 0, -4] }}
                  transition={{ duration: 0.6, delay: i * 0.2, repeat: Infinity }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
