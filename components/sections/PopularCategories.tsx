'use client';
import { motion } from 'framer-motion';
import { Smartphone, Gamepad2, Camera, Battery, Laptop, Cpu } from 'lucide-react';
import Link from 'next/link';

const categories = [
  {
    title: 'Best Under ₹15,000',
    description: 'Budget-friendly champions with great value.',
    icon: <Smartphone className="w-6 h-6 text-blue-400" />,
    href: '/find-phone?budget=15000',
    color: 'from-blue-500/20 to-transparent'
  },
  {
    title: 'Gaming Beasts',
    description: 'High performance for BGMI, Free Fire & more.',
    icon: <Gamepad2 className="w-6 h-6 text-purple-400" />,
    href: '/find-phone?priority=gaming',
    color: 'from-purple-500/20 to-transparent'
  },
  {
    title: 'Camera Experts',
    description: 'Stunning photography for creators.',
    icon: <Camera className="w-6 h-6 text-emerald-400" />,
    href: '/find-phone?priority=camera',
    color: 'from-emerald-500/20 to-transparent'
  },
  {
    title: 'Flagship Killers',
    description: 'Premium features at mid-range prices.',
    icon: <Cpu className="w-6 h-6 text-orange-400" />,
    href: '/find-phone?budget=40000',
    color: 'from-orange-500/20 to-transparent'
  },
  {
    title: 'Big Battery Life',
    description: 'Phones that last 2+ days on single charge.',
    icon: <Battery className="w-6 h-6 text-yellow-400" />,
    href: '/find-phone?priority=battery',
    color: 'from-yellow-500/20 to-transparent'
  },
  {
    title: 'Best Productivity',
    description: 'For business, multi-tasking & clean OS.',
    icon: <Laptop className="w-6 h-6 text-indigo-400" />,
    href: '/find-phone?priority=productivity',
    color: 'from-indigo-500/20 to-transparent'
  }
];

export default function PopularCategories() {
  return (
    <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-outfit text-4xl sm:text-5xl font-bold mb-4">
          Popular <span className="gradient-text">Categories</span>
        </h2>
        <p className="text-[#8B8BA7] text-lg max-w-2xl mx-auto">
          Explore the most searched smartphone categories in India for 2026.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className={`relative group p-8 rounded-3xl bg-[#12121E] border border-white/5 hover:border-[#6C47FF]/50 transition-all overflow-hidden`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
            
            <div className="relative z-10">
              <div className="p-3 rounded-2xl bg-white/5 w-fit mb-6">
                {cat.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">{cat.title}</h3>
              <p className="text-[#8B8BA7] text-sm mb-6 leading-relaxed">
                {cat.description}
              </p>
              <Link 
                href={cat.href}
                className="text-sm font-semibold text-[#6C47FF] hover:text-[#8B6FFF] flex items-center gap-2 group-hover:gap-3 transition-all"
              >
                View Recommendations <span>→</span>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
