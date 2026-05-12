import { NextRequest, NextResponse } from 'next/server';
import { UserPreferences, RecommendationResponse } from '@/lib/types';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '';
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = 'google/gemini-2.0-flash-001'; // Confirmed available on OpenRouter

export async function POST(req: NextRequest) {
  try {
    const prefs: UserPreferences = await req.json();

    if (!OPENROUTER_API_KEY) {
      throw new Error('OPENROUTER_API_KEY environment variable is not set');
    }

    // Legends/flagship rule based on user selection
    const legendsRule = prefs.wantsLegends
      ? `FLAGSHIP LEGENDS ALLOWED: The user has explicitly requested flagship phones. You MAY include iPhones (iPhone 15/16 series), Samsung Galaxy S24/S25 series, OnePlus 13, Google Pixel 9 Pro etc. IF they fit the budget.`
      : `NO FLAGSHIP LEGENDS: Do NOT recommend flagship phones like iPhone, Samsung Galaxy S-series, OnePlus flagship (not 13R), Google Pixel Pro. Stick to mid-range and value phones only.`;

    const today = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    const currentMonth = new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });

    const prompt = `You are PhoneAI, an expert Indian mobile phone advisor. 

USER PREFERENCES:
- Budget: ₹${prefs.budgetMin.toLocaleString()} - ₹${prefs.budgetMax.toLocaleString()}
- Use Case: ${prefs.useCase}
- Brand: ${prefs.brands.length > 0 ? prefs.brands.join(', ') : 'Any'}
- 5G: ${prefs.needs5G ? 'Required' : 'Optional'}
- Wants Flagship: ${prefs.wantsLegends ? 'YES' : 'NO'}

CRITICAL RULES:
1. Return ONLY valid JSON.
2. ${legendsRule}
3. Use Hinglish for aiVerdict.
4. If a phone is in the "MARKET PRICE TABLE" below, you MUST use those EXACT prices. DO NOT use your own knowledge for those phones.
5. For phones NOT in the table, estimate based on CURRENT May 2026 launch prices (e.g., iPhone 17 is ₹89,900, Samsung S25 is ₹79,999). NEVER show prices from 2024 or 2025.

MARKET PRICE TABLE (MAY 2026 — INDIA):
# Under ₹15k
- Redmi 14C 5G (6/128): Amazon ₹9,499 | Flipkart ₹9,299 | Offline ₹9,000
- Moto G45 5G (8/128): Amazon ₹10,999 | Flipkart ₹10,499 | Offline ₹10,000
- Samsung Galaxy A16 5G (8/128): Amazon ₹14,499 | Flipkart ₹13,999 | Offline ₹13,500

# ₹15k - ₹25k
- iQOO Z10 (8/128): Amazon ₹19,999 | Flipkart ₹20,499 | Offline ₹18,900
- Redmi Note 14 Pro (8/256): Amazon ₹21,999 | Flipkart ₹20,999 | Offline ₹20,000
- Samsung Galaxy A36 5G (8/128): Amazon ₹22,999 | Flipkart ₹21,999 | Offline ₹21,000

# ₹25k - ₹50k
- Samsung Galaxy A56 5G (8/256): Amazon ₹47,999 | Flipkart ₹46,999 | Offline ₹45,000
- OnePlus Nord 5 (8/256): Amazon ₹34,999 | Flipkart ₹33,999 | Offline ₹32,500
- Vivo V35 Pro (12/256): Amazon ₹38,999 | Flipkart ₹37,499 | Offline ₹36,500
- Poco F7 (12/256): Amazon ₹29,999 | Flipkart ₹28,999 | Offline ₹28,000

# ₹50k+ (Flagship)
- Samsung Galaxy S25 (12/256): Amazon ₹79,999 | Flipkart ₹78,999 | Offline ₹76,000
- iPhone 17 (256GB): Amazon ₹89,900 | Flipkart ₹88,500 | Offline ₹86,000
- OnePlus 13 (16/512): Amazon ₹69,999 | Flipkart ₹68,999 | Offline ₹67,000
- Nothing Phone (3) (12/256): Amazon ₹54,999 | Flipkart ₹53,999 | Offline ₹52,000

JSON STRUCTURE:
{
  "recommendations": [
    {
      "rank": "Best Value",
      "name": "Full Name",
      "brand": "Brand",
      "price": 24999,
      "specs": { "ram": "8GB", "storage": "256GB", "battery": "5000mAh", "processor": "Chip Name", "display": "Screen", "camera": "Camera", "os": "Android 15" },
      "scores": { "camera": 85, "battery": 90, "performance": 80, "value": 95, "display": 85 },
      "amazonPrice": 24499,
      "flipkartPrice": 24999,
      "offlineTargetPrice": 23500,
      "bankOffers": ["HDFC Bank: Rs 2000 off"],
      "shouldWait": { "wait": false, "reason": "Stable price" },
      "aiVerdict": "Yeh phone kamaal ka hai...",
      "priceStatus": "Low",
      "pros": ["Pro 1"],
      "cons": ["Con 1"]
    }
  ],
  "summary": "Expert summary...",
  "totalAnalyzed": 50000
}

FINAL COMMAND: Replace placeholders with 3 REAL phones matching the budget. Use EXACT prices from the table if the phone exists there.`;

    const response = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://mobile-aiguide.mobimanager.shop',
        'X-Title': 'PhoneAI',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'user', content: prompt },
        ],
        temperature: 0.6,
        max_tokens: 3500,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`OpenRouter error ${response.status}: ${errText}`);
    }

    const apiResult = await response.json();
    const text: string = apiResult.choices?.[0]?.message?.content || '';

    if (!text) {
      throw new Error('Empty response from OpenRouter');
    }

    // Strip markdown code fences if present
    const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    // Extract JSON object
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON in AI response');
    }

    const data: RecommendationResponse = JSON.parse(jsonMatch[0]);

    if (!data.recommendations || data.recommendations.length < 3) {
      throw new Error('Invalid recommendation structure from AI');
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Recommendation API error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Failed to get recommendations: ${message}` },
      { status: 500 }
    );
  }
}
