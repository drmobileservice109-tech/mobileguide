'use client';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Rahul Sharma',
    role: 'Software Engineer, Bangalore',
    avatar: 'RS',
    avatarBg: 'from-[#6C47FF] to-[#8B6FFF]',
    rating: 5,
    review: 'Was confused between OnePlus and Samsung for weeks. PhoneAI gave me the perfect answer in 45 seconds! Got the Pixel 8a — best decision ever.',
    phone: 'Bought: Google Pixel 8a',
    savings: 'Saved ₹3,400 via Flipkart offer',
  },
  {
    name: 'Priya Menon',
    role: 'Content Creator, Mumbai',
    avatar: 'PM',
    avatarBg: 'from-[#FF6B35] to-[#FF8B65]',
    rating: 5,
    review: 'As a photographer, camera quality is everything. The AI understood my exact needs and recommended the best camera phone in my budget. Absolutely love it!',
    phone: 'Bought: Samsung Galaxy S23 FE',
    savings: 'Found ₹5,000 off HDFC offer',
  },
  {
    name: 'Arjun Kapoor',
    role: 'College Student, Delhi',
    avatar: 'AK',
    avatarBg: 'from-[#00D4AA] to-[#00A87A]',
    rating: 5,
    review: 'Budget was tight at ₹15k. PhoneAI not only recommended the best phone but also told me to wait 10 days for a sale — saved me ₹2,000 extra!',
    phone: 'Bought: Redmi Note 13 Pro',
    savings: 'Saved ₹2,000 by waiting for sale',
  },
  {
    name: 'Divya Nair',
    role: 'Marketing Manager, Hyderabad',
    avatar: 'DN',
    avatarBg: 'from-[#6C47FF] to-[#FF6B35]',
    rating: 5,
    review: 'Bought it as a gift for my dad. The "For Senior" use-case recommendation was spot on — easy to use, great battery, big display. Dad loves it!',
    phone: 'Bought: Moto G84 5G',
    savings: 'Best value pick in ₹20k range',
  },
  {
    name: 'Vikram Singh',
    role: 'Gaming Enthusiast, Pune',
    avatar: 'VS',
    avatarBg: 'from-[#FF6B35] to-[#6C47FF]',
    rating: 5,
    review: 'Gaming phone recommendation was perfect! The AI explained exactly why each phone was good for BGMI. Got the POCO X6 Pro — handles everything at max settings!',
    phone: 'Bought: POCO X6 Pro',
    savings: 'Saved ₹1,800 on Amazon',
  },
  {
    name: 'Sneha Patel',
    role: 'Doctor, Ahmedabad',
    avatar: 'SP',
    avatarBg: 'from-[#00D4AA] to-[#6C47FF]',
    rating: 5,
    review: 'Needed a reliable phone for calls and WhatsApp. Simple questions, perfect answer. The "Should I Wait?" feature told me to buy immediately before a price hike. Smart!',
    phone: 'Bought: Nothing Phone 2a',
    savings: 'Locked in before price hike',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-[#FF6B35] text-[#FF6B35]" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#6C47FF]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-[#FF6B35] text-sm font-semibold uppercase tracking-widest">Social Proof</span>
          <h2 className="font-outfit text-4xl sm:text-5xl font-bold mt-3 mb-4">
            Loved by <span className="gradient-text">2 Million+</span> Users
          </h2>
          <p className="text-[#8B8BA7] text-lg max-w-xl mx-auto">
            Real stories from people who found their perfect phone using PhoneAI
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative glass-card p-6 hover:border-[#6C47FF]/40 hover:shadow-[0_0_30px_rgba(108,71,255,0.1)] transition-all duration-300 group"
              id={`testimonial-${i + 1}`}
            >
              {/* Quote icon */}
              <Quote className="absolute top-4 right-4 w-8 h-8 text-[#6C47FF]/10 group-hover:text-[#6C47FF]/20 transition-colors" />

              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.avatarBg} flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-lg`}>
                  {t.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white text-sm truncate">{t.name}</div>
                  <div className="text-[#8B8BA7] text-xs truncate">{t.role}</div>
                </div>
                <StarRating rating={t.rating} />
              </div>

              {/* Review */}
              <p className="text-[#A8A8C0] text-sm leading-relaxed mb-5">
                &ldquo;{t.review}&rdquo;
              </p>

              {/* Phone + Savings */}
              <div className="border-t border-[rgba(108,71,255,0.1)] pt-4 flex flex-col gap-1.5">
                <div className="text-xs text-[#8B6FFF] font-medium flex items-center gap-1.5">
                  <span>📱</span>
                  <span>{t.phone}</span>
                </div>
                <div className="text-xs text-[#00D4AA] font-medium flex items-center gap-1.5">
                  <span>✅</span>
                  <span>{t.savings}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-12 grid grid-cols-3 gap-4 max-w-2xl mx-auto"
        >
          {[
            { value: '4.9★', label: 'Average Rating' },
            { value: '2M+', label: 'Happy Users' },
            { value: '98%', label: 'Would Recommend' },
          ].map((stat, i) => (
            <div key={i} className="text-center p-4 rounded-2xl bg-[#12121E] border border-white/5">
              <div className="font-outfit font-bold text-xl gradient-text-purple">{stat.value}</div>
              <div className="text-[#8B8BA7] text-xs mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
