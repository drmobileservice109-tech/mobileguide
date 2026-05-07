export interface UserPreferences {
  budgetMin: number;
  budgetMax: number;
  budgetLabel: string;
  useCase: string;
  brands: string[];
  needs5G: boolean;
  storage: string;
  wantsLegends: boolean;
  preferOffline: boolean; // Prefer local stores over online
}

export interface PhoneSpecs {
  ram: string;
  storage: string;
  battery: string;
  processor: string;
  display: string;
  camera: string;
  os: string;
}

export interface PhoneScores {
  camera: number;
  battery: number;
  performance: number;
  value: number;
  display: number;
}

export interface ShouldWait {
  wait: boolean;
  reason: string;
}

export interface PhoneRecommendation {
  rank: 'Best Value' | 'Performance King' | 'Premium Choice';
  name: string;
  brand: string;
  price: number;
  image?: string;
  specs: PhoneSpecs;
  scores: PhoneScores;
  amazonPrice: number;
  flipkartPrice: number;
  offlineTargetPrice: number;
  bankOffers: string[];
  shouldWait: ShouldWait;
  aiVerdict: string;
  pros: string[];
  cons: string[];
}

export interface RecommendationResponse {
  recommendations: PhoneRecommendation[];
  summary: string;
  totalAnalyzed: number;
}
