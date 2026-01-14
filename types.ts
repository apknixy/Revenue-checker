
export enum Platform {
  Website = 'Website',
  MobileApp = 'Mobile App',
  YouTube = 'YouTube',
  ShortsReels = 'Shorts/Reels',
  Games = 'Games',
  Blog = 'Blog'
}

export enum TrafficSource {
  Search = 'Search (Organic)',
  Social = 'Social Media',
  Direct = 'Direct Traffic',
  Referral = 'Referral'
}

export enum AdFormat {
  Banner = 'Display Banners',
  Native = 'Native Ads',
  Interstitial = 'Interstitials',
  Rewarded = 'Rewarded Video',
  Video = 'In-stream Video',
  Pop = 'Pop-under'
}

export interface AdNetwork {
  id: string;
  name: string;
  logo: string;
  baseCPM: number; // Tier 1 base
  baseCPC: number; // Tier 1 base
  supportedPlatforms: Platform[];
  supportedFormats: AdFormat[];
  description: string;
}

export interface CalculationInput {
  platform: Platform;
  adNetwork: string;
  monthlyTraffic: number;
  niche: string;
  region: string;
  trafficSource: TrafficSource;
  adFormat: AdFormat;
  ctr: number;
}

export interface CalculationResult {
  estimatedCPC: number;
  estimatedCPM: number;
  rpm: number;
  daily: number;
  monthly: number;
  yearly: number;
  confidence: 'Low' | 'Medium' | 'High';
}

export interface NicheFactor {
  name: string;
  multiplier: number;
  suggestedCTR: number;
}

export interface RegionFactor {
  name: string;
  tier: 1 | 2 | 3;
  multiplier: number;
}
