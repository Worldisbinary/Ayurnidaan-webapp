
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

export async function chat(history: ChatHistory) {
  // This flow is returning a static response to avoid requiring an API key for now.
  const staticResponse = "This is a static response from AyurBot. To enable live chat, please ensure your Google Cloud project has billing enabled and a valid API key is in your .env file.";
  
  // Create a ReadableStream from the static response
  const stream = new ReadableStream({
    start(controller) {
      // Simulate streaming by breaking the message into chunks
      const chunks = staticResponse.split(' ');
      let i = 0;
      function pushChunk() {
        if (i < chunks.length) {
          const chunkText = i === 0 ? chunks[i] : ' ' + chunks[i];
          controller.enqueue({ text: chunkText });
          i++;
          setTimeout(pushChunk, 50); // Delay between chunks
        } else {
          controller.close();
        }
      }
      pushChunk();
    }
  });

  return stream;
}
