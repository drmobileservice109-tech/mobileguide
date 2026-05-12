'use client';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

const trendingPhones = [
  { name: 'iPhone 17 Pro', trend: '+15%' },
  { name: 'Samsung S25 Ultra', trend: '+22%' },
  { name: 'Nothing Phone (3)', trend: '+35%' },
  { name: 'Realme P10 Pro', trend: '+18%' },
  { name: 'Infinix GT 20 Pro', trend: '+42%' },
  { name: 'OnePlus 13R', trend: '+12%' },
  { name: 'Google Pixel 9a', trend: '+28%' },
  { name: 'Redmi Note 15 Pro', trend: '+55%' },
];

export default function TrendingTicker() {
  const items = [...trendingPhones, ...trendingPhones]; // Duplicate for seamless loop

  return (
    <div className="bg-[#0A0A1A] border-y border-[rgba(108,71,255,0.1)] py-3 overflow-hidden relative group">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0A0A1A] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0A0A1A] to-transparent z-10" />
      
      <div className="animate-marquee whitespace-nowrap">
        {items.map((phone, i) => (
          <div key={i} className="inline-flex items-center gap-2 mx-8 text-sm">
            <span className="text-[#8B8BA7] font-medium">{phone.name}</span>
            <div className="flex items-center gap-1 text-emerald-400 font-bold bg-emerald-400/10 px-1.5 py-0.5 rounded text-[10px]">
              <TrendingUp className="w-3 h-3" />
              {phone.trend}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
