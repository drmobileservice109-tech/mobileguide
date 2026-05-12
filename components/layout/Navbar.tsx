'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Smartphone, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0A0A1A]/70 backdrop-blur-md border-b border-[rgba(108,71,255,0.1)]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group" id="nav-logo">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6C47FF] to-[#FF6B35] flex items-center justify-center group-hover:scale-110 transition-transform">
            <Smartphone className="w-5 h-5 text-white" />
          </div>
          <span className="font-outfit font-bold text-lg gradient-text-purple">Phone</span>
          <span className="font-outfit font-bold text-lg text-white">AI</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/#how-it-works" className="text-[#8B8BA7] hover:text-white transition-colors text-sm font-medium" id="nav-how-it-works">
            How It Works
          </Link>
          <Link href="/#testimonials" className="text-[#8B8BA7] hover:text-white transition-colors text-sm font-medium" id="nav-testimonials">
            Reviews
          </Link>
          <Link
            href="/find-phone"
            id="nav-find-phone"
            className="btn-primary py-2 px-6 text-sm"
          >
            Find My Phone →
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          id="nav-mobile-menu-btn"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#12121E] border-b border-[rgba(108,71,255,0.2)] px-4 pb-4"
          >
            <div className="flex flex-col gap-4 pt-4">
              <Link href="/#how-it-works" className="text-[#8B8BA7] hover:text-white transition-colors" onClick={() => setMenuOpen(false)}>How It Works</Link>
              <Link href="/#testimonials" className="text-[#8B8BA7] hover:text-white transition-colors" onClick={() => setMenuOpen(false)}>Reviews</Link>
              <Link href="/find-phone" className="btn-primary text-center py-3" onClick={() => setMenuOpen(false)}>
                Find My Phone →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
