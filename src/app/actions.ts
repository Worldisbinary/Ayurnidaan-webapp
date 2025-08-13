
'use server';

import { suggestDiagnoses, type SuggestDiagnosesInput, type SuggestDiagnosesOutput } from '@/ai/flows/suggest-diagnoses';
import { fetchArticles as fetchArticlesFlow, type Article } from '@/ai/flows/fetch-articles';
import { continueConversation as chatFlow } from '@/ai/flows/chat-flow';
import type { ChatHistory } from '@/ai/schemas/chat-schema';
import { getDosha as getDoshaFlow } from '@/ai/flows/get-dosha';
import { generateYogaVideo as generateYogaVideoFlow } from '@/ai/flows/generate-yoga-video';
import type { GenerateYogaVideoInput } from '@/ai/flows/generate-yoga-video';
import type { GetDoshaInput, GetDoshaOutput } from '@/ai/schemas/dosha-schema';
import Razorpay from 'razorpay';
import { randomUUID } from 'crypto';

export async function getDiagnosis(input: SuggestDiagnosesInput): Promise<SuggestDiagnosesOutput> {
  try {
    const result = await suggestDiagnoses(input);
    if (!result) {
        throw new Error('The AI returned an empty response.');
    }
    return result;
  } catch(error) {
    console.error("Error in getDiagnosis action:", error);
    // Re-throw the error to be caught by the client-side component
    if (error instanceof Error) {
        throw new Error(`AI Diagnosis Failed: ${error.message}`);
    }
    throw new Error('An unknown error occurred during AI diagnosis.');
  }
}

export async function fetchArticles(): Promise<Article[]> {
    const result = await fetchArticlesFlow();
    return result.articles;
}

export async function continueConversation(history: ChatHistory) {
    const stream = await chatFlow(history);
    
    // The ReadableStream object is not serializable, so we convert it to a different format.
    // This is a workaround to allow the client to read the stream.
    const transformStream = new TransformStream({
        transform(chunk, controller) {
            // The static chat flow now directly provides the object with a `text` property.
            controller.enqueue(chunk.text);
        },
    });

    return stream.pipeThrough(transformStream);
}

export async function getDosha(input: GetDoshaInput): Promise<GetDoshaOutput> {
    const result = await getDoshaFlow(input);
    if (!result) {
        throw new Error('The AI returned an empty response.');
    }
    return result;
}


export async function createRazorpayOrder({ amount }: { amount: number }) {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  });

  const options = {
    amount: amount * 100, // amount in the smallest currency unit
    currency: 'INR',
    receipt: `receipt_${randomUUID()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    return order;
  } catch (error) {
    console.error('RAZORPAY ERROR', error);
    throw new Error('Failed to create Razorpay order');
  }
}

export async function generateYogaVideo(input: GenerateYogaVideoInput): Promise<string> {
    const videoDataUri = await generateYogaVideoFlow(input);
    if (!videoDataUri) {
        throw new Error('The AI failed to generate a video.');
    }
    return videoDataUri;
}
