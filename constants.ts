
import { AdNetwork, Platform, AdFormat, NicheFactor, RegionFactor } from './types';

export const AD_NETWORKS: AdNetwork[] = [
  {
    id: 'adsense',
    name: 'Google AdSense',
    logo: 'https://www.gstatic.com/images/branding/product/1x/adsense_48dp.png',
    baseCPM: 2.5,
    baseCPC: 0.45,
    supportedPlatforms: [Platform.Website, Platform.Blog],
    supportedFormats: [AdFormat.Banner, AdFormat.Native, AdFormat.Video],
    description: 'The industry standard for high-quality display and search-linked ads.'
  },
  {
    id: 'adsterra',
    name: 'Adsterra',
    logo: 'https://picsum.photos/seed/adsterra/48/48',
    baseCPM: 1.8,
    baseCPC: 0.12,
    supportedPlatforms: [Platform.Website, Platform.Blog, Platform.MobileApp],
    supportedFormats: [AdFormat.Pop, AdFormat.Banner, AdFormat.Native, AdFormat.Interstitial],
    description: 'Specializes in high fill rates and aggressive pop-under monetization.'
  },
  {
    id: 'monetag',
    name: 'Monetag',
    logo: 'https://picsum.photos/seed/monetag/48/48',
    baseCPM: 1.5,
    baseCPC: 0.08,
    supportedPlatforms: [Platform.Website, Platform.MobileApp],
    supportedFormats: [AdFormat.Interstitial, AdFormat.Native, AdFormat.Pop],
    description: 'Great for multi-format monetization across all devices.'
  },
  {
    id: 'ezoic',
    name: 'Ezoic',
    logo: 'https://picsum.photos/seed/ezoic/48/48',
    baseCPM: 5.5, // Higher because it optimizes multiple networks
    baseCPC: 0.65,
    supportedPlatforms: [Platform.Website, Platform.Blog],
    supportedFormats: [AdFormat.Banner, AdFormat.Video, AdFormat.Native],
    description: 'AI-driven ad testing platform that typically boosts AdSense revenue.'
  },
  {
    id: 'unity',
    name: 'Unity Ads',
    logo: 'https://picsum.photos/seed/unity/48/48',
    baseCPM: 8.0,
    baseCPC: 0.0,
    supportedPlatforms: [Platform.Games, Platform.MobileApp],
    supportedFormats: [AdFormat.Rewarded, AdFormat.Interstitial, AdFormat.Video],
    description: 'Top-tier monetization for mobile games and interactive apps.'
  },
  {
    id: 'applovin',
    name: 'AppLovin',
    logo: 'https://picsum.photos/seed/applovin/48/48',
    baseCPM: 7.5,
    baseCPC: 0.0,
    supportedPlatforms: [Platform.MobileApp, Platform.Games],
    supportedFormats: [AdFormat.Rewarded, AdFormat.Interstitial, AdFormat.Banner],
    description: 'Leading platform for mobile app growth and monetization.'
  },
  {
    id: 'media-net',
    name: 'Media.net',
    logo: 'https://picsum.photos/seed/medianet/48/48',
    baseCPM: 2.2,
    baseCPC: 0.55,
    supportedPlatforms: [Platform.Website, Platform.Blog],
    supportedFormats: [AdFormat.Native, AdFormat.Banner],
    description: 'The Yahoo/Bing context-heavy ad network.'
  }
];

export const NICHES: NicheFactor[] = [
  { name: 'Finance & Insurance', multiplier: 2.8, suggestedCTR: 2.5 },
  { name: 'Technology & SaaS', multiplier: 2.2, suggestedCTR: 1.8 },
  { name: 'Health & Wellness', multiplier: 1.7, suggestedCTR: 1.5 },
  { name: 'Real Estate', multiplier: 2.0, suggestedCTR: 1.2 },
  { name: 'Gaming', multiplier: 1.1, suggestedCTR: 2.0 },
  { name: 'Education', multiplier: 1.4, suggestedCTR: 1.4 },
  { name: 'Entertainment', multiplier: 0.8, suggestedCTR: 1.0 },
  { name: 'News & Media', multiplier: 0.7, suggestedCTR: 0.8 },
  { name: 'General / Personal Blog', multiplier: 1.0, suggestedCTR: 1.2 }
];

export const REGIONS: RegionFactor[] = [
  { name: 'United States', tier: 1, multiplier: 1.2 },
  { name: 'United Kingdom / Canada', tier: 1, multiplier: 1.0 },
  { name: 'Western Europe', tier: 1, multiplier: 0.9 },
  { name: 'Australia / New Zealand', tier: 1, multiplier: 1.05 },
  { name: 'India', tier: 3, multiplier: 0.25 },
  { name: 'Southeast Asia', tier: 2, multiplier: 0.45 },
  { name: 'Latin America', tier: 2, multiplier: 0.4 },
  { name: 'Eastern Europe', tier: 2, multiplier: 0.5 },
  { name: 'Africa', tier: 3, multiplier: 0.15 },
  { name: 'Worldwide (Average)', tier: 2, multiplier: 0.6 }
];
