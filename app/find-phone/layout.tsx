import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Find My Phone — Mobile-AI Guide',
  description: 'Answer 4 quick questions and get AI-powered smartphone recommendations tailored to your budget and needs.',
};

export default function FindPhoneLayout({ children }: { children: React.ReactNode }) {
  return children;
}
