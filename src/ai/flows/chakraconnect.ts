'use server';

const API = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export type ChakraConnectInput = {
  niche: string;
  platform: string;
  followerCount: string;
  contentStyle: string;
  collabGoal: 'Grow Audience' | 'Brand Deals' | 'Cross-Niche' | 'Viral Collab' | 'Educational Series';
};

export type ChakraConnectOutput = {
  matches: { creatorType: string; nicheDescription: string; matchPercentage: number; audienceOverlap: string; whyTheyMatch: string; collabIdea: string; expectedReach: string; approachScript: string }[];
  bestCollabFormat: string;
  collabScript: string;
  reelIdeas: string[];
  growthPotential: string;
};

export async function chakraConnect(input: ChakraConnectInput): Promise<ChakraConnectOutput> {
  const res = await fetch(`${API}/chakraconnect`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`ChakraConnect API error ${res.status}: ${err}`);
  }
  return res.json();
}
