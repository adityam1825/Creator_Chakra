'use server';
/**
 * @fileOverview A Genkit flow for generating viral content based on emotional moods.
 *
 * - generateMoodContent - A function that adapts content style to a specific mood.
 * - GenerateMoodContentInput - The input type for the generateMoodContent function.
 * - GenerateMoodContentOutput - The return type for the generateMoodContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMoodContentInputSchema = z.object({
  mood: z.enum([
    'Motivated',
    'Sad',
    'Happy',
    'Lonely',
    'Excited',
    'Confident',
    'Emotional',
    'Funny',
    'Inspirational'
  ]).describe('The current emotional state of the creator.'),
  platform: z.enum(['Instagram', 'YouTube', 'LinkedIn', 'Twitter/X']).describe('The target social media platform.'),
  contentType: z.enum(['Reel Script', 'Caption', 'Carousel', 'Thread', 'Story Idea']).describe('The format of the content.'),
  tone: z.enum(['Professional', 'Emotional', 'Viral', 'Funny', 'Inspirational']).describe('The desired tone for the generation.'),
});
export type GenerateMoodContentInput = z.infer<typeof GenerateMoodContentInputSchema>;

const GenerateMoodContentOutputSchema = z.object({
  viralHook: z.string().describe('A catchy opening line tailored to the mood and platform.'),
  mainContent: z.string().describe('The primary content body or script.'),
  hashtags: z.array(z.string()).describe('Suggested hashtags for reach.'),
  cta: z.string().describe('A compelling call to action.'),
  postingStrategy: z.string().describe('AI recommendation on when and how to post this.'),
  audienceTrigger: z.string().describe('The specific psychological trigger this content activates.'),
  viralScore: z.number().min(0).max(100).describe('Predicted virality score out of 100.'),
  explanation: z.string().describe('AI rationale for why this content works for the selected mood.'),
});
export type GenerateMoodContentOutput = z.infer<typeof GenerateMoodContentOutputSchema>;

export async function generateMoodContent(input: GenerateMoodContentInput): Promise<GenerateMoodContentOutput> {
  return generateMoodContentFlow(input);
}

const moodPrompt = ai.definePrompt({
  name: 'generateMoodContentPrompt',
  input: {schema: GenerateMoodContentInputSchema},
  output: {schema: GenerateMoodContentOutputSchema},
  prompt: `You are an expert emotionally-aware content strategist. Your goal is to help a creator who is feeling {{{mood}}} generate content for {{{platform}}}.

The user wants a {{{contentType}}} with a {{{tone}}} tone.

Instructions:
1. Deeply analyze the emotional state "{{{mood}}}". The content should feel authentic to this state—either by embracing it (e.g., sharing a struggle when "Sad") or using it as fuel (e.g., high energy when "Excited").
2. Format the content specifically for {{{platform}}}.
3. The "viralHook" must be a magnetic "pattern interrupt" that stops the scroll.
4. "audienceTrigger" should identify if this hits on FOMO, empathy, curiosity, or inspiration.
5. "viralScore" should be a realistic estimate based on how well this mood usually performs on {{{platform}}}.

Ensure the content feels human, not robotic. Use idioms and pacing appropriate for the mood.`,
});

const generateMoodContentFlow = ai.defineFlow(
  {
    name: 'generateMoodContentFlow',
    inputSchema: GenerateMoodContentInputSchema,
    outputSchema: GenerateMoodContentOutputSchema,
  },
  async (input) => {
    const {output} = await moodPrompt(input);
    if (!output) throw new Error('Failed to generate mood-based content');
    return output;
  }
);
