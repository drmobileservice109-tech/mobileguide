'use client';
import { motion } from 'framer-motion';
import { Smartphone, Gamepad2, Camera, Battery, Laptop, Cpu } from 'lucide-react';
import Link from 'next/link';

const categories = [
  {
    title: 'Best Under ₹15,000',
    description: 'Budget-friendly champions with great value for money.',
    icon: <Smartphone className="w-6 h-6 text-blue-400" />,
    href: '/find-phone',
    color: 'from-blue-500/20 to-transparent',
    borderHover: 'hover:border-blue-500/40',
    label: 'Budget',
    emoji: '💰',
  },
  {
    title: 'Gaming Beasts',
    description: 'High performance for BGMI, Free Fire & more.',
    icon: <Gamepad2 className="w-6 h-6 text-purple-400" />,
    href: '/find-phone',
    color: 'from-purple-500/20 to-transparent',
    borderHover: 'hover:border-purple-500/40',
    label: 'Gaming',
    emoji: '🎮',
  },
  {
    title: 'Camera Experts',
    description: 'Stunning photography & video for creators.',
    icon: <Camera className="w-6 h-6 text-emerald-400" />,
    href: '/find-phone',
    color: 'from-emerald-500/20 to-transparent',
    borderHover: 'hover:border-emerald-500/40',
    label: 'Camera',
    emoji: '📸',
  },
  {
    title: 'Flagship Killers',
    description: 'Premium features at mid-range prices.',
    icon: <Cpu className="w-6 h-6 text-orange-400" />,
    href: '/find-phone',
    color: 'from-orange-500/20 to-transparent',
    borderHover: 'hover:border-orange-500/40',
    label: 'Flagship',
    emoji: '👑',
  },
  {
    title: 'Big Battery Life',
    description: 'Phones that last 2+ days on a single charge.',
    icon: <Battery className="w-6 h-6 text-yellow-400" />,
    href: '/find-phone',
    color: 'from-yellow-500/20 to-transparent',
    borderHover: 'hover:border-yellow-500/40',
    label: 'Battery',
    emoji: '🔋',
  },
  {
    title: 'Best Productivity',
    description: 'For business, multi-tasking & clean OS experience.',
    icon: <Laptop className="w-6 h-6 text-indigo-400" />,
    href: '/find-phone',
    color: 'from-indigo-500/20 to-transparent',
    borderHover: 'hover:border-indigo-500/40',
    label: 'Work',
    emoji: '💼',
  },
];

export default function PopularCategories() {
  return (
    <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <span className="text-[#00D4AA] text-sm font-semibold uppercase tracking-widest">Browse by Need</span>
        <h2 className="font-outfit text-4xl sm:text-5xl font-bold mt-3 mb-4">
          Popular <span className="gradient-text">Categories</span>
        </h2>
        <p className="text-[#8B8BA7] text-lg max-w-2xl mx-auto">
          Explore the most searched smartphone categories in India for 2026.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((cat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            whileHover={{ y: -4 }}
            className={`relative group p-7 rounded-3xl bg-[#0E0E1A] border border-white/5 ${cat.borderHover} transition-all duration-300 overflow-hidden cursor-pointer`}
            id={`category-${cat.label.toLowerCase()}`}
          >
            {/* Hover gradient fill */}
            <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

            <div className="relative z-10">
              {/* Icon + emoji label */}
              <div className="flex items-start justify-between mb-5">
                <div className="p-3 rounded-2xl bg-white/5 group-hover:bg-white/10 transition-colors w-fit">
                  {cat.icon}
                </div>
                <span className="text-2xl opacity-60 group-hover:opacity-100 transition-opacity">{cat.emoji}</span>
              </div>

              <h3 className="text-xl font-bold mb-2 text-[#E0E0F0] group-hover:text-white transition-colors">{cat.title}</h3>
              <p className="text-[#8B8BA7] text-sm mb-5 leading-relaxed">
                {cat.description}
              </p>
              <Link
                href={cat.href}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#6C47FF] group-hover:text-[#8B6FFF] transition-all"
                id={`category-link-${cat.label.toLowerCase()}`}
              >
                <span>Get AI Recommendation</span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  →
                </motion.span>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
