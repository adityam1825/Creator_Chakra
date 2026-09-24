'use server';

const API = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export type ChakraGrowthInput = {
  niche: string;
  platform: string;
  currentFollowers: string;
  postsPerWeek: number;
  avgEngagementRate: string;
  biggestChallenge: string;
  goal: string;
};

export type ChakraGrowthOutput = {
  growthScore: number;
  growthVerdict: string;
  weeklyPlan: { day: string; action: string; contentType: string; priority: 'High' | 'Medium' | 'Low' }[];
  topRecommendations: { recommendation: string; impact: string; effort: string; timeframe: string }[];
  projectedGrowth: { oneMonth: string; threeMonths: string; sixMonths: string };
  contentMix: { educational: number; entertaining: number; personal: number; promotional: number };
  keyInsight: string;
};

export async function chakraGrowth(input: ChakraGrowthInput): Promise<ChakraGrowthOutput> {
  const res = await fetch(`${API}/chakragrowth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`ChakraGrowth API error ${res.status}: ${err}`);
  }
  return res.json();
}
