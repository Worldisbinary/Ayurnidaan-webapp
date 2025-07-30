
'use server';

import { suggestDiagnoses, type SuggestDiagnosesInput } from '@/ai/flows/suggest-diagnoses';
import { fetchArticles as fetchArticlesFlow, type Article } from '@/ai/flows/fetch-articles';
import { chat, type ChatHistory } from '@/ai/flows/chat-flow';


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

export async function continueConversation(history: ChatHistory) {
    const stream = await chat(history);
    
    // The ReadableStream object is not serializable, so we convert it to a different format.
    // This is a workaround to allow the client to read the stream.
    const transformStream = new TransformStream({
        transform(chunk, controller) {
            controller.enqueue(chunk.text);
        },
    });

    return stream.pipeThrough(transformStream);
}
