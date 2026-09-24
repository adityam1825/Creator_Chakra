'use server';

const API = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export type VoiceToContentInput = {
  transcript: string;
  platform: 'Instagram' | 'YouTube' | 'LinkedIn' | 'Twitter/X';
  contentType: 'Caption' | 'Reel Script' | 'Carousel' | 'Thread' | 'Blog Intro';
  language: string;
};

export type VoiceToContentOutput = {
  viralHook: string;
  mainContent: string;
  hashtags: string[];
  cta: string;
  viralityScore: number;
  recommendations: string[];
  toneAnalysis: string;
};

export async function voiceToContent(input: VoiceToContentInput): Promise<VoiceToContentOutput> {
  const res = await fetch(`${API}/voice-to-content`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`VoiceToContent API error ${res.status}: ${err}`);
  }
  return res.json();
}
