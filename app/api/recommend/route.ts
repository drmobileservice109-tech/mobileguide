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

    const prompt = `You are PhoneAI, an expert Indian mobile phone advisor specializing in the ABSOLUTE LATEST smartphone market in India. 
CURRENT STATUS: ${today}. Focus: ${currentMonth} releases and trends.

CRITICAL RULES — MUST FOLLOW STRICTLY:
1. ONLY recommend phones available as of ${today}. 
2. PRIORITIZE phones launched in the LAST 30-60 DAYS. 
3. If a new phone launched THIS WEEK or THIS MONTH (${currentMonth}), it MUST be considered.
4. If a phone was launched in 2024 or early 2025, it is now "OLD" unless it's a legendary bestseller. 
5. ${legendsRule}
4. ${prefs.preferOffline ? 'OFFLINE FOCUS: The user wants to buy from a physical local store. Focus on phones with great offline availability (Samsung, Vivo, OPPO, Xiaomi, Motorola) and realistic offline target prices (BARGAINING PRICE).' : 'ONLINE FOCUS: Standard Amazon/Flipkart pricing.'}
5. BANNED: iPhone 14/15, S23, Moto G84, Pixel 8, or anything launched before Jan 2025 (unless legends allowed).

USER PREFERENCES:
- Budget: ₹${prefs.budgetMin.toLocaleString()} - ₹${prefs.budgetMax.toLocaleString()} (${prefs.budgetLabel})
- Primary Use: ${prefs.useCase}
- Brand Preference: ${prefs.brands.length > 0 ? prefs.brands.join(', ') : 'No preference'}
- 5G Required: ${prefs.needs5G ? 'YES' : 'No strict preference'}
- Storage Preference: ${prefs.storage || 'No preference'}
- Wants Flagship Legends: ${prefs.wantsLegends ? 'YES' : 'NO'}
- Prefer Offline: ${prefs.preferOffline ? 'YES — show best local store deals' : 'NO'}

ACTUAL MARKET PRICE REFERENCE TABLE (MAY 2026 — India):
Use these EXACT prices. These are verified real prices:

# Budget (Under ₹15,000)
- Redmi 14C 5G (6/128): Amazon ₹9,499 | Flipkart ₹9,299 | Offline ₹9,000
- Realme Narzo 70 Pro (8/128): Amazon ₹11,999 | Flipkart ₹11,499 | Offline ₹11,000
- Redmi Note 13 (6/128): Amazon ₹12,499 | Flipkart ₹11,999 | Offline ₹11,500
- Moto G45 5G (8/128): Amazon ₹10,999 | Flipkart ₹10,499 | Offline ₹10,000
- Realme P1 5G (6/128): Amazon ₹11,999 | Flipkart ₹11,499 | Offline ₹11,000
- Samsung Galaxy A16 5G (8/128): Amazon ₹14,499 | Flipkart ₹13,999 | Offline ₹13,500

# Mid-range (₹15,000 - ₹25,000)
- Realme P10 5G (6/128): Amazon ₹14,999 | Flipkart ₹14,499 | Offline ₹14,000
- Infinix GT 20 Pro (8/128): Amazon ₹24,999 | Flipkart ₹24,999 | Offline ₹23,500
- iQOO Z10 (8/128): Amazon ₹19,999 | Flipkart ₹20,499 | Offline ₹18,900
- Motorola Edge 60 Fusion (8/256): Amazon ₹20,900 | Flipkart ₹24,999 | Offline ₹19,500
- Redmi Note 14 Pro (8/256): Amazon ₹21,999 | Flipkart ₹20,999 | Offline ₹20,000
- Poco X7 Pro (8/256): Amazon ₹23,999 | Flipkart ₹22,999 | Offline ₹22,000
- Samsung Galaxy A36 5G (8/128): Amazon ₹22,999 | Flipkart ₹21,999 | Offline ₹21,000
- Nothing Phone (2a) Plus (12/256): Amazon ₹24,999 | Flipkart ₹24,999 | Offline ₹23,500

# Upper Mid-range (₹25,000 - ₹45,000)
- Samsung Galaxy M56 5G (8/128): Amazon ₹21,998 | Flipkart ₹21,999 | Offline ₹21,000
- OnePlus Nord 5 (8/256): Amazon ₹33,999 | Flipkart ₹32,999 | Offline ₹31,500
- Redmi Note 15 Pro (8/256): Amazon ₹33,999 | Flipkart ₹31,487 | Offline ₹31,000
- Vivo V35 Pro (12/256): Amazon ₹31,999 | Flipkart ₹32,499 | Offline ₹30,500
- Samsung Galaxy A56 5G (8/256): Amazon ₹36,999 | Flipkart ₹35,999 | Offline ₹35,000
- iQOO Neo 10 (12/256): Amazon ₹34,999 | Flipkart ₹33,999 | Offline ₹33,000
- Poco F7 (12/256): Amazon ₹29,999 | Flipkart ₹28,999 | Offline ₹28,000

# Premium (₹45,000+)
- Samsung Galaxy S25 (12/256): Amazon ₹67,999 | Flipkart ₹69,999 | Offline ₹65,000
- iPhone 17 (256GB): Amazon ₹82,900 | Flipkart ₹81,500 | Offline ₹79,000
- OnePlus 13 (16/512): Amazon ₹69,999 | Flipkart ₹68,999 | Offline ₹67,000
- Nothing Phone (3) (12/256): Amazon ₹79,999 | Flipkart ₹79,999 | Offline ₹76,000
- Google Pixel 9 (256GB): Amazon ₹72,999 | Flipkart ₹71,999 | Offline ₹70,000

INSTRUCTIONS:
1. Rank: first = "Best Value", second = "Performance King", third = "Premium Choice"
2. CRITICAL PRICE RULE: You MUST use the EXACT prices from the reference table above for any listed phone. For phones NOT in the table, use realistic current Indian market prices — NEVER fabricate unrealistically low prices. If a phone costs ₹20,000 in market, set that price, not ₹10,000.
3. The "price" field = MRP/original price. amazonPrice/flipkartPrice = current discounted sale price (from table or realistic estimate). offlineTargetPrice = typical offline negotiated price (slightly below online).
4. SALE AWARENESS: Mention "Sasa Lele Sale" (starts May 9) if relevant to wait time.
5. VARIANT: Always specify RAM/Storage variant (e.g. "Samsung Galaxy M56 5G (8/128)").
6. shouldWait.wait = true ONLY if a sale is coming within 2 weeks or price drop expected

Return ONLY valid JSON, no markdown, no explanation:
{
  "recommendations": [
    {
      "rank": "Best Value",
      "name": "Exact Phone Model Name (RAM/Storage variant)",
      "brand": "Brand Name",
      "price": 24999,
      "specs": {
        "ram": "8GB",
        "storage": "256GB",
        "battery": "5500mAh",
        "processor": "Snapdragon 7s Gen 3",
        "display": "6.67 inch AMOLED 120Hz",
        "camera": "200MP + 8MP + 2MP",
        "os": "Android 15"
      },
      "scores": {
        "camera": 88,
        "battery": 92,
        "performance": 82,
        "value": 96,
        "display": 87
      },
      "amazonPrice": 24499,
      "flipkartPrice": 24999,
      "offlineTargetPrice": 23500,
      "bankOffers": ["HDFC Bank: Rs 2000 instant discount", "SBI Card: 10% cashback up to Rs 1500"],
      "shouldWait": {
        "wait": false,
        "reason": "Price is stable and near all-time low. Great time to buy!"
      },
      "aiVerdict": "Yaar, is budget mein yeh phone sabse best deal hai! Processor fast hai aur camera bhi kamaal ka.",
      "pros": ["Excellent camera for the price", "Large battery", "Fast processor"],
      "cons": ["Plastic build", "No wireless charging"]
    },
    {
      "rank": "Performance King",
      "name": "Exact Phone Model Name (RAM/Storage variant)",
      "brand": "Brand Name",
      "price": 29999,
      "specs": {
        "ram": "12GB",
        "storage": "256GB",
        "battery": "5000mAh",
        "processor": "Snapdragon 8s Gen 3",
        "display": "6.74 inch AMOLED 144Hz",
        "camera": "50MP + 50MP + 2MP",
        "os": "Android 15"
      },
      "scores": {
        "camera": 90,
        "battery": 85,
        "performance": 95,
        "value": 83,
        "display": 92
      },
      "amazonPrice": 29499,
      "flipkartPrice": 29999,
      "offlineTargetPrice": 28000,
      "bankOffers": ["ICICI Bank: Rs 1500 off", "Flipkart Axis Card: 5% cashback"],
      "shouldWait": {
        "wait": false,
        "reason": "Competitive pricing. Buy now for best experience."
      },
      "aiVerdict": "Bhai gaming ke liye yeh number one choice hai! Snapdragon chip se BGMI aur Genshin bhi max settings pe chal jayega.",
      "pros": ["Fastest chip in segment", "Smooth 144Hz display", "Excellent for gaming"],
      "cons": ["Gets warm under heavy load", "Average base camera"]
    },
    {
      "rank": "Premium Choice",
      "name": "Exact Phone Model Name (RAM/Storage variant)",
      "brand": "Brand Name",
      "price": 34999,
      "specs": {
        "ram": "12GB",
        "storage": "256GB",
        "battery": "5500mAh",
        "processor": "Snapdragon 8 Gen 3",
        "display": "6.78 inch LTPO AMOLED 120Hz",
        "camera": "50MP + 48MP + 10MP",
        "os": "Android 15"
      },
      "scores": {
        "camera": 94,
        "battery": 90,
        "performance": 97,
        "value": 79,
        "display": 95
      },
      "amazonPrice": 34999,
      "flipkartPrice": 33999,
      "offlineTargetPrice": 33000,
      "bankOffers": ["HDFC Bank: Rs 3000 cashback", "Axis Bank: Rs 2500 instant discount"],
      "shouldWait": {
        "wait": false,
        "reason": "Best price seen in last 3 months. Go for it!"
      },
      "aiVerdict": "Premium experience chahiye toh yeh ek hi option hai. Camera itna acha hai ki professional photographers bhi impress ho jayein.",
      "pros": ["Top flagship processor", "Pro-grade camera system", "Premium glass build"],
      "cons": ["Expensive", "No expandable storage"]
    }
  ],
  "summary": "2025 ke latest phones mein se aapke liye best picks!",
  "totalAnalyzed": 52841
}

IMPORTANT: Replace ALL placeholder phones above with REAL, ACTUAL 2024-2025 phones that match: budget ₹${prefs.budgetMin.toLocaleString()}-₹${prefs.budgetMax.toLocaleString()}, use case: ${prefs.useCase}${prefs.wantsLegends ? ', flagships/legends ALLOWED' : ', mid-range only (NO flagships)'}.`;

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
