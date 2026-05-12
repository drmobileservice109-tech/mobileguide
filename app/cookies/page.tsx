import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Understand how we use cookies and session storage to provide your AI results.',
};

export default function CookiePolicy() {
  return (
    <div className="min-h-screen py-24 px-4 bg-[#0A0A1A]">
      <div className="max-w-3xl mx-auto text-[#8B8BA7]">
        <h1 className="font-outfit text-4xl font-bold text-white mb-8">Cookie Policy</h1>
        
        <p className="mb-6">Last Updated: May 12, 2026</p>
        
        <section className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">What are cookies?</h2>
          <p>Cookies are small text files stored on your device. We use them to ensure the website works correctly and to remember your AI session results.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Types of cookies we use</h2>
          <p><strong>Essential Cookies:</strong> Required for basic site navigation.</p>
          <p><strong>Session Storage:</strong> Used to pass your questionnaire answers to the results page without needing a database.</p>
        </section>

        <Link href="/" className="text-[#6C47FF] hover:underline font-semibold flex items-center gap-2 mt-12">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
