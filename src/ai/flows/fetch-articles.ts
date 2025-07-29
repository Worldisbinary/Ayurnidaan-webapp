
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
  url: z.string().url().describe('The URL to the full article.'),
});
export type Article = z.infer<typeof ArticleSchema>;

const FetchArticlesOutputSchema = z.object({
  articles: z.array(ArticleSchema),
});
export type FetchArticlesOutput = z.infer<typeof FetchArticlesOutputSchema>;

export async function fetchArticles(): Promise<FetchArticlesOutput> {
  // We are returning a static list of articles to avoid requiring an API key for now.
  return {
    articles: [
      {
        title: "The Power of Turmeric: More Than Just a Spice",
        description: "Discover the anti-inflammatory and antioxidant benefits of this golden spice and how to incorporate it into your daily routine for optimal health.",
        source: "AyurvedaToday.com",
        imageHint: "turmeric spice",
        url: "https://www.ayurveda.com/recipes/turmeric-the-golden-goddess-of-spices"
      },
      {
        title: "Yoga for Digestion: 5 Poses to Soothe Your Gut",
        description: "Explore gentle yoga postures that can aid digestion, reduce bloating, and improve your overall gut health. Suitable for all levels.",
        source: "Wellbeing Journal",
        imageHint: "yoga pose",
        url: "https://www.yogajournal.com/practice-section/yoga-for-a-happy-belly/"
      },
      {
        title: "Understanding Your Dosha: A Beginner's Guide",
        description: "An introduction to the three doshas—Vata, Pitta, and Kapha—and how understanding your unique constitution can lead to a more balanced life.",
        source: "The Ayurvedic Path",
        imageHint: "meditation nature",
        url: "https://www.ayurveda.com/resources/articles/ayurveda-a-brief-introduction-and-guide"
      },
      {
        title: "Ashwagandha: The Stress-Busting Adaptogen",
        description: "Learn about the science behind Ashwagandha, an ancient herb known for its ability to reduce stress, improve energy, and enhance focus.",
        source: "Herbal Wisdom Magazine",
        imageHint: "herbal remedy",
        url: "https://www.verywellhealth.com/ashwagandha-benefits-uses-and-more-8645470"
      }
    ]
  };
}
