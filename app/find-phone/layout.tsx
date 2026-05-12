import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Find Your Perfect Phone | AI-Powered Recommendation',
  description: 'Answer 4 quick questions and let our AI find the best smartphone for your budget and needs in India (2026).',
};

export default function FindPhoneLayout({ children }: { children: React.ReactNode }) {
  return children;
}
