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
              <span className="font-outfit font-bold text-lg gradient-text-purple">Mobile-AI</span>
              <span className="font-outfit font-bold text-lg text-white">Guide</span>
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
            <h4 className="font-semibold text-white mb-4 text-sm">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/find-phone" className="text-[#8B8BA7] hover:text-white transition-colors text-sm" id="footer-find-phone">Find My Phone</Link></li>
              <li><Link href="/#how-it-works" className="text-[#8B8BA7] hover:text-white transition-colors text-sm">How It Works</Link></li>
              <li><Link href="/#testimonials" className="text-[#8B8BA7] hover:text-white transition-colors text-sm">Reviews</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Popular Searches</h4>
            <ul className="space-y-2">
              <li><Link href="/find-phone" className="text-[#8B8BA7] hover:text-white transition-colors text-sm">Best phone under ₹15k</Link></li>
              <li><Link href="/find-phone" className="text-[#8B8BA7] hover:text-white transition-colors text-sm">Best camera phone</Link></li>
              <li><Link href="/find-phone" className="text-[#8B8BA7] hover:text-white transition-colors text-sm">Gaming phone 2024</Link></li>
              <li><Link href="/find-phone" className="text-[#8B8BA7] hover:text-white transition-colors text-sm">Best 5G phone</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[rgba(108,71,255,0.1)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#8B8BA7] text-sm">
            © 2024 Mobile-AI Guide. All rights reserved.
          </p>
          <p className="text-[#8B8BA7] text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-[#FF6B35]" /> for Indian smartphone buyers
          </p>
        </div>
      </div>
    </footer>
  );
}
