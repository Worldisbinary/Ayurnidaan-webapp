
'use server';

import { suggestDiagnoses, type SuggestDiagnosesInput } from '@/ai/flows/suggest-diagnoses';
import { fetchArticles as fetchArticlesFlow, type Article } from '@/ai/flows/fetch-articles';
import { chat, type ChatHistory } from '@/ai/flows/chat-flow';
import Razorpay from 'razorpay';
import { randomUUID } from 'crypto';

export async function getDiagnosis(input: SuggestDiagnosesInput): Promise<any> {
  // By removing the try/catch, the original error from the AI flow will be
  // propagated to the client, giving us a more specific error message.
  const result = await suggestDiagnoses(input);
  if (!result) {
      throw new Error('The AI returned an empty response.');
  }
  return result;
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
            // The static chat flow now directly provides the object with a `text` property.
            controller.enqueue(chunk.text);
        },
    });

    return stream.pipeThrough(transformStream);
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
