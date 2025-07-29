
'use server';

/**
 * @fileOverview This file defines a Genkit flow for fetching recent articles and blogs about Ayurveda.
 * 
 * - fetchArticles - A function that returns a list of Ayurvedic articles.
 * - Article - The type for a single article.
 * - FetchArticlesOutput - The return type for the fetchArticles flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ArticleSchema = z.object({
  title: z.string().describe('The title of the article.'),
  description: z.string().describe('A short, engaging summary of the article.'),
  source: z.string().describe('The source website or publication of the article (e.g., "Times of India", "Wellbeing.com").'),
  imageHint: z.string().describe('One or two keywords for a relevant placeholder image (e.g., "herbal tea", "yoga pose").'),
});
export type Article = z.infer<typeof ArticleSchema>;

const FetchArticlesOutputSchema = z.object({
  articles: z.array(ArticleSchema),
});
export type FetchArticlesOutput = z.infer<typeof FetchArticlesOutputSchema>;

export async function fetchArticles(): Promise<FetchArticlesOutput> {
  return fetchArticlesFlow();
}

const prompt = ai.definePrompt({
  name: 'fetchArticlesPrompt',
  output: { schema: FetchArticlesOutputSchema },
  prompt: `You are an expert content curator for an Ayurvedic health platform. 
  
  Your task is to generate a list of 4 recent, interesting, and diverse news articles or blog posts related to Ayurveda. 
  
  For each article, provide a compelling title, a brief description, the source, and a hint for a placeholder image.
  
  Ensure the topics are varied, covering areas like modern research, lifestyle tips, herbal remedies, and dietary advice.`,
});


const fetchArticlesFlow = ai.defineFlow(
  {
    name: 'fetchArticlesFlow',
    outputSchema: FetchArticlesOutputSchema,
  },
  async () => {
    const { output } = await prompt();
    return output!;
  }
);
