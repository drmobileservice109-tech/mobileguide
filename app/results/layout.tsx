import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your AI Recommendations — Mobile-AI Guide',
  description: 'View your personalized smartphone recommendations with price comparisons and AI-powered buying advice.',
};

export default function ResultsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
