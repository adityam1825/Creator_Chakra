'use server';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export type RepurposeLongFormContentInput = {
  content: string;
  targetFormats: string[];
  tone?: string;
  language?: string;
};

export type RepurposeLongFormContentOutput = Record<string, string>;

export async function repurposeLongFormContent(
  input: RepurposeLongFormContentInput
): Promise<RepurposeLongFormContentOutput> {
  const res = await fetch(`${API}/repurpose`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Repurpose API error ${res.status}: ${err}`);
  }
  return res.json();
}
