'use client';
import Link from 'next/link';
import { Smartphone, Heart, Globe, Code2, Camera } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(108,71,255,0.15)] bg-[#0A0A1A] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6C47FF] to-[#FF6B35] flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-white" />
              </div>
              <span className="font-outfit font-bold text-lg gradient-text-purple">Phone</span>
              <span className="font-outfit font-bold text-lg text-white">AI</span>
            </Link>
            <p className="text-[#8B8BA7] text-sm max-w-xs leading-relaxed">
              AI-powered mobile recommendation engine that finds your perfect phone based on budget and needs — in under 60 seconds.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <a href="#" className="text-[#8B8BA7] hover:text-[#6C47FF] transition-colors" id="footer-twitter"><Globe className="w-5 h-5" /></a>
              <a href="#" className="text-[#8B8BA7] hover:text-[#6C47FF] transition-colors" id="footer-github"><Code2 className="w-5 h-5" /></a>
              <a href="#" className="text-[#8B8BA7] hover:text-[#6C47FF] transition-colors" id="footer-instagram"><Camera className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Product</h4>
            <ul className="space-y-2">
              <li><Link href="/find-phone" className="text-[#8B8BA7] hover:text-white transition-colors text-sm" id="footer-find-phone">AI Recommendation</Link></li>
              <li><Link href="/#how-it-works" className="text-[#8B8BA7] hover:text-white transition-colors text-sm">Sale Predictor</Link></li>
              <li><Link href="/#testimonials" className="text-[#8B8BA7] hover:text-white transition-colors text-sm">User Reviews</Link></li>
              <li><Link href="/#faq" className="text-[#8B8BA7] hover:text-white transition-colors text-sm">Help Center</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-[#8B8BA7] hover:text-white transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-[#8B8BA7] hover:text-white transition-colors text-sm">Terms of Service</Link></li>
              <li><Link href="/cookies" className="text-[#8B8BA7] hover:text-white transition-colors text-sm">Cookie Policy</Link></li>
              <li><Link href="/disclaimer" className="text-[#8B8BA7] hover:text-white transition-colors text-sm">Price Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[rgba(108,71,255,0.1)] pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-3">
            <p className="text-[#8B8BA7] text-sm">
              © 2026 PhoneAI. All rights reserved. Built for India.
            </p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] uppercase tracking-wider text-emerald-500 font-bold">Market Status: Live</span>
              </div>
              <span className="text-[#3a3a5e] text-xs">Updated: {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-[#8B8BA7] text-sm">
            <span>Powered by</span>
            <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
              <div className="w-4 h-4 bg-gradient-to-br from-blue-400 to-purple-500 rounded-sm" />
              <span className="text-white font-medium">Gemini 2.0</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
