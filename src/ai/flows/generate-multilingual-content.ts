'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateMultilingualContentInputSchema = z.object({
  originalContent: z.string(),
  originalLanguage: z.string(),
  targetLanguage: z.string(),
  platform: z.string(),
  tone: z.string(),
});
export type GenerateMultilingualContentInput = z.infer<typeof GenerateMultilingualContentInputSchema>;

const GenerateMultilingualContentOutputSchema = z.object({
  translatedContent: z.string(),
  culturalToneAdaptationDescription: z.string(),
  localHashtags: z.array(z.string()),
});
export type GenerateMultilingualContentOutput = z.infer<typeof GenerateMultilingualContentOutputSchema>;

export async function generateMultilingualContent(
  input: GenerateMultilingualContentInput
): Promise<GenerateMultilingualContentOutput> {
  return generateMultilingualContentFlow(input);
}

const generateMultilingualContentPrompt = ai.definePrompt({
  name: 'generateMultilingualContentPrompt',
  input: { schema: GenerateMultilingualContentInputSchema },
  output: { schema: GenerateMultilingualContentOutputSchema },
  prompt: `You are an expert multilingual content creator. Return ONLY valid JSON matching the output schema.

Original Content: {{originalContent}}
From: {{originalLanguage}}
To: {{targetLanguage}}
Platform: {{platform}}
Tone: {{tone}}

translatedContent: Translate and culturally adapt the content to {{targetLanguage}}. Adjust idioms, references, and style to feel native to that culture on {{platform}}.

culturalToneAdaptationDescription: One paragraph explaining the key cultural changes made.

localHashtags: Array of 8-10 hashtags popular in the {{targetLanguage}} region for {{platform}}.`,
});

const generateMultilingualContentFlow = ai.defineFlow(
  {
    name: 'generateMultilingualContentFlow',
    inputSchema: GenerateMultilingualContentInputSchema,
    outputSchema: GenerateMultilingualContentOutputSchema,
  },
  async (input) => {
    try {
      const { output } = await generateMultilingualContentPrompt(input);
      if (!output) throw new Error('Gemini returned empty output. Check API key or quota.');
      return output;
    } catch (err: any) {
      throw new Error(`MultilingualContent: ${err?.message || String(err)}`);
    }
  }
);
