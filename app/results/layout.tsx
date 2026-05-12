import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your AI Phone Recommendations | PhoneAI',
  description: 'View your personalized smartphone recommendations from PhoneAI with price comparisons from Amazon & Flipkart and AI-powered buying advice.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ResultsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
