'use server';

const API = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export type ChakraScoreInput = {
  mode: 'description' | 'video';
  content: string;
  niche?: string;
  platform?: string;
};

export type ChakraScoreOutput = {
  overallScore: number;
  verdict: string;
  breakdown: {
    hookStrength: number;
    retentionPotential: number;
    trendAlignment: number;
    emotionalImpact: number;
    clarityScore: number;
    ctaStrength: number;
  };
  strengths: string[];
  improvements: { issue: string; fix: string; impact: string }[];
  improvedHook: string;
  thumbnailSuggestion: string;
  retentionAdvice: string;
  contentIdeas: string[];
  predictedEngagement: { likes: string; comments: string; shares: string; saves: string };
};

export async function chakraScore(input: ChakraScoreInput): Promise<ChakraScoreOutput> {
  const res = await fetch(`${API}/chakrascore`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`ChakraScore API error ${res.status}: ${err}`);
  }
  return res.json();
}
