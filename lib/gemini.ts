import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.GEMINI_API_KEY || '';

let genAI: GoogleGenerativeAI | null = null;

export function getGeminiClient(): GoogleGenerativeAI {
  if (!genAI) {
    if (!API_KEY) {
      throw new Error('GEMINI_API_KEY environment variable is not set');
    }
    genAI = new GoogleGenerativeAI(API_KEY);
  }
  return genAI;
}

export function getModel() {
  const client = getGeminiClient();
  return client.getGenerativeModel({ model: 'gemini-1.5-flash' });
}
