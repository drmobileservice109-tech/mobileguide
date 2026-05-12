import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn about how PhoneAI handles your data and protects your privacy.',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen py-24 px-4 bg-[#0A0A1A]">
      <div className="max-w-3xl mx-auto text-[#8B8BA7]">
        <h1 className="font-outfit text-4xl font-bold text-white mb-8">Privacy Policy</h1>
        
        <p className="mb-6">Effective Date: May 12, 2026</p>
        
        <section className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">1. Information We Collect</h2>
          <p>We do not collect personal identification information like your name, email, or phone number. We only collect anonymized data related to your phone preferences (budget, usage, brand preference) to provide recommendations.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">2. Cookies</h2>
          <p>We use session storage and minimal cookies to remember your preferences during your session. We do not use tracking cookies for advertising.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">3. Third-Party Links</h2>
          <p>Our website contains links to Amazon and Flipkart. Once you click these links, you are subject to their respective privacy policies.</p>
        </section>

        <Link href="/" className="text-[#6C47FF] hover:underline font-semibold flex items-center gap-2 mt-12">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
