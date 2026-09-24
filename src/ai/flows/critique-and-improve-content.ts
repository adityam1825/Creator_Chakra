'use server';
/**
 * @fileOverview A Genkit flow for critiquing and improving content.
 *
 * - critiqueAndImproveContent - A function that analyzes user-provided content
 *   for quality, provides a score breakdown, improvement suggestions,
 *   and an AI-improved version.
 * - CritiqueAndImproveContentInput - The input type for the critiqueAndImproveContent function.
 * - CritiqueAndImproveContentOutput - The return type for the critiqueAndImproveContent function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Input Schema
const CritiqueAndImproveContentInputSchema = z.object({
  content: z.string().describe('The original content provided by the user for analysis.'),
});
export type CritiqueAndImproveContentInput = z.infer<typeof CritiqueAndImproveContentInputSchema>;

// Output Schema
const CritiqueAndImproveContentOutputSchema = z.object({
  overallScore: z.number().min(0).max(100).describe('An overall quality score for the content out of 100, reflecting its general effectiveness and adherence to best practices.'),
  scoreBreakdown: z.object({
    grammar: z.number().min(0).max(100).describe('A score out of 100 representing the grammatical correctness and linguistic accuracy of the content.'),
    clarity: z.number().min(0).max(100).describe('A score out of 100 indicating how clear, concise, and easy to understand the content is.'),
    seo: z.number().min(0).max(100).describe('A score out of 100 assessing the content\'s optimization for search engines, including keyword usage and structure.'),
    emotionalTone: z.number().min(0).max(100).describe('A score out of 100 evaluating how effectively the content conveys its intended emotional tone and resonates with the target audience.'),
    hookStrength: z.number().min(0).max(100).optional().describe('A score out of 100 measuring the effectiveness of the content\'s opening or headline in grabbing attention.'),
    ctaQuality: z.number().min(0).max(100).optional().describe('A score out of 100 assessing the clarity, compelling nature, and placement of any call-to-action.'),
  }).describe('Detailed scores for specific aspects of the content, each out of 100.'),
  suggestions: z.array(z.string()).describe('A list of actionable suggestions to further improve the content\'s quality and effectiveness.'),
  improvedContent: z.string().describe('An AI-generated, improved version of the original content, incorporating the suggestions.'),
  beforeAfterComparison: z.string().describe('A summary highlighting the key differences, improvements, and rationale behind the changes made in the AI-improved version compared to the original.'),
});
export type CritiqueAndImproveContentOutput = z.infer<typeof CritiqueAndImproveContentOutputSchema>;

// Prompt definition
const critiqueAndImproveContentPrompt = ai.definePrompt({
  name: 'critiqueAndImproveContentPrompt',
  input: { schema: CritiqueAndImproveContentInputSchema },
  output: { schema: CritiqueAndImproveContentOutputSchema },
  prompt: `You are an expert content critic, editor, and SEO specialist. Your task is to thoroughly analyze the provided content and provide constructive feedback.

Analyze the content based on the following criteria:
- **Grammar**: Check for any errors in grammar, spelling, punctuation, and syntax.
- **Clarity**: Assess how clear, concise, and easy to understand the message is.
- **SEO**: Evaluate its potential for search engine optimization, including keyword usage, relevance, and structure.
- **Emotional Tone**: Determine if the content effectively conveys its intended emotional tone and resonates with the target audience.
- **Hook Strength (if applicable)**: If the content has a clear opening/headline, evaluate its ability to grab attention.
- **CTA Quality (if applicable)**: If the content includes a Call-to-Action, assess its clarity and compelling nature.

Based on your analysis, provide:
1.  **An overall quality score** out of 100.
2.  **A detailed score breakdown** for grammar, clarity, SEO, emotional tone, and optionally hook strength and CTA quality, each out of 100.
3.  **Actionable suggestions** for improvement.
4.  **An AI-improved version** of the original content.
5.  **A concise before-and-after comparison** highlighting the key changes and the reasoning behind them.

Ensure your output adheres strictly to the provided JSON schema.

Original Content:
{{{content}}}`,
});

// Flow definition
const critiqueAndImproveContentFlow = ai.defineFlow(
  {
    name: 'critiqueAndImproveContentFlow',
    inputSchema: CritiqueAndImproveContentInputSchema,
    outputSchema: CritiqueAndImproveContentOutputSchema,
  },
  async (input) => {
    const { output } = await critiqueAndImproveContentPrompt(input);
    if (!output) {
      throw new Error('Failed to get output from critiqueAndImproveContentPrompt');
    }
    return output;
  }
);

// Wrapper function
export async function critiqueAndImproveContent(
  input: CritiqueAndImproveContentInput
): Promise<CritiqueAndImproveContentOutput> {
  return critiqueAndImproveContentFlow(input);
}
