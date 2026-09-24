'use server';

const API = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export type ChakraBrainInput = {
  topic: string;
  niche: string;
  platform: 'Instagram' | 'YouTube' | 'TikTok' | 'YouTube Shorts';
  reelDuration: '15s' | '30s' | '60s' | '90s' | '3min';
  tone: 'Motivational' | 'Educational' | 'Entertaining' | 'Emotional' | 'Funny' | 'Inspirational' | 'Controversial';
  targetAudience?: string;
};

export type ChakraBrainOutput = {
  viralConcept: string;
  hook: string;
  fullScript: string;
  shotByShot: { shot: number; duration: string; visual: string; dialogue: string; cameraAngle: string }[];
  performanceTips: { facialExpressions: string; bodyLanguage: string; energyLevel: string; pacing: string };
  musicSuggestion: { trackType: string; mood: string; examples: string[]; timing: string };
  editingStyle: string;
  caption: string;
  hashtags: string[];
  cta: string;
  thumbnailText: string;
  viralPsychology: string;
  estimatedViralScore: number;
};

export async function chakraBrain(input: ChakraBrainInput): Promise<ChakraBrainOutput> {
  const res = await fetch(`${API}/chakrabrain`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`ChakraBrain API error ${res.status}: ${err}`);
  }
  return res.json();
}
