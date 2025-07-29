
'use server';

import { suggestDiagnoses, type SuggestDiagnosesInput } from '@/ai/flows/suggest-diagnoses';
import { fetchArticles as fetchArticlesFlow, type Article } from '@/ai/flows/fetch-articles';


export async function getDiagnosis(input: SuggestDiagnosesInput): Promise<any> {
  try {
    const result = await suggestDiagnoses(input);
    return result;
  } catch (error) {
    console.error("Error in getDiagnosis action:", error);
    // Let the client handle the error message display
    throw new Error('The AI failed to provide a diagnosis. Please check your input and try again.');
  }
}

export async function fetchArticles(): Promise<Article[]> {
    const result = await fetchArticlesFlow();
    return result.articles;
}
