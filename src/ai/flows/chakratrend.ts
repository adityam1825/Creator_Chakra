'use server';

const API = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export type ChakraTrendInput = {
  niche: string;
  platform: 'Instagram' | 'YouTube' | 'TikTok' | 'All Platforms';
};

export type ChakraTrendOutput = {
  topTrends: { trend: string; category: string; velocity: string; peakWindow: string; howToUse: string; exampleAngle: string }[];
  trendingAudio: { trackName: string; mood: string; bestFor: string; usageCount: string }[];
  trendingFormats: { format: string; description: string; engagementBoost: string }[];
  trendingHashtags: { hashtag: string; reach: string; competition: string }[];
  nextBigTrend: string;
  contentIdea: string;
  urgencyLevel: 'Post Now' | 'Post This Week' | 'Plan Ahead';
};

export async function chakraTrend(input: ChakraTrendInput): Promise<ChakraTrendOutput> {
  const res = await fetch(`${API}/chakratrend`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`ChakraTrend API error ${res.status}: ${err}`);
  }
  return res.json();
}
