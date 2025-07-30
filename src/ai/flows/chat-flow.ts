
'use server';

/**
 * @fileOverview This file defines a Genkit flow for a conversational chatbot.
 * - chat - A function that takes the chat history and returns a streaming response.
 * - ChatHistory - The type for the chat history.
 */
import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

const ChatHistorySchema = z.array(MessageSchema);
export type ChatHistory = z.infer<typeof ChatHistorySchema>;

export async function chat(history: ChatHistory) {
  const { stream } = await ai.generate({
    model: 'gemini-2.0-flash',
    prompt: {
        messages: history,
        // The "system" prompt provides high-level instructions to the model.
        system: `You are a helpful Ayurvedic chatbot. Your name is AyurBot.
        Converse with the user and answer their questions about Ayurveda.
        Be friendly, knowledgeable, and concise.`
    },
    // We are requesting the response to be streamed back to the client.
    stream: true,
  });
  return stream;
}
