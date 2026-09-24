'use server';
/**
 * @fileOverview A Genkit flow for generating various types of content based on user prompts.
 *
 * - generatePromptedContent - A function that handles the content generation process.
 * - GeneratePromptedContentInput - The input type for the generatePromptedContent function.
 * - GeneratePromptedContentOutput - The return type for the generatePromptedContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePromptedContentInputSchema = z.object({
  topic: z.string().describe('The main subject or prompt for the content.'),
  platform: z
    .enum(['Instagram', 'LinkedIn', 'YouTube', 'Twitter/X', 'Blog', 'Email Newsletter'])
    .describe('The target platform for the content.'),
  tone: z
    .enum([
      'Motivational',
      'Funny',
      'Romantic',
      'Inspirational',
      'Luxury',
      'Gen Z',
      'Professional',
      'Informative',
      'Persuasive',
      'Casual'
    ])
    .describe('The desired tone or mood for the content.'),
  contentLength: z
    .enum(['brief', 'short', 'medium', 'long', 'detailed'])
    .describe('The desired length of the content.'),
});
export type GeneratePromptedContentInput = z.infer<
  typeof GeneratePromptedContentInputSchema
>;

const GeneratePromptedContentOutputSchema = z.object({
  mainContent: z
    .string()
    .describe('The primary generated content tailored to the platform and topic.'),
  hooks: z.array(z.string()).optional().describe('Optional catchy opening lines or hooks for the content.'),
  ctas: z.array(z.string()).optional().describe('Optional calls to action relevant to the content.'),
  hashtags: z.array(z.string()).optional().describe('Optional relevant hashtags for social media content.'),
});
export type GeneratePromptedContentOutput = z.infer<
  typeof GeneratePromptedContentOutputSchema
>;

export async function generatePromptedContent(
  input: GeneratePromptedContentInput
): Promise<GeneratePromptedContentOutput> {
  return generatePromptedContentFlow(input);
}

const generatePromptedContentPrompt = ai.definePrompt({
  name: 'generatePromptedContentPrompt',
  input: {schema: GeneratePromptedContentInputSchema},
  output: {schema: GeneratePromptedContentOutputSchema},
  prompt: `You are an expert content creator specializing in generating high-performing, viral content for various digital platforms. Your task is to craft tailored content based on the user's specific requirements.

**Input:**
Topic: {{{topic}}}
Platform: {{{platform}}}
Tone: {{{tone}}}
Content Length: {{{contentLength}}}

**Instructions:**
Generate content for the '{{{platform}}}' platform.
The content should be about '{{{topic}}}'.
Maintain a '{{{tone}}}' tone throughout the content.
Ensure the length is '{{{contentLength}}}'.

Adapt the content structure and elements based on the platform:
- For Instagram, Twitter/X, or LinkedIn: Generate concise 'mainContent' suitable for posts, and include relevant 'hashtags', 'hooks', and 'ctas' if appropriate.
- For YouTube: Generate a compelling script as 'mainContent', including suggestions for hooks and CTAs if applicable.
- For Blog: Generate a well-structured and engaging blog post as 'mainContent'. Hooks and CTAs might be relevant for the introduction/conclusion.
- For Email Newsletter: Generate engaging email copy as 'mainContent', including clear hooks and CTAs.

Your output MUST be a JSON object, adhering strictly to the following schema:
`,
});

const generatePromptedContentFlow = ai.defineFlow(
  {
    name: 'generatePromptedContentFlow',
    inputSchema: GeneratePromptedContentInputSchema,
    outputSchema: GeneratePromptedContentOutputSchema,
  },
  async (input) => {
    const {output} = await generatePromptedContentPrompt(input);
    return output!;
  }
);
