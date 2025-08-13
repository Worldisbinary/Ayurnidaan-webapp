
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

export const ChatHistorySchema = z.array(MessageSchema);
export type ChatHistory = z.infer<typeof ChatHistorySchema>;


export async function continueConversation(history: ChatHistory) {
    // Check if the API key is available, which is a proxy for billing being enabled.
    if (!process.env.GEMINI_API_KEY) {
        console.log("Returning static chat response as billing is not enabled.");
        const staticResponse = "This is a static response from AyurBot. To enable live, AI-powered chat, please ensure your Google Cloud project has billing enabled and a valid API key is configured in your .env file.";
        
        // Create a ReadableStream from the static response
        const stream = new ReadableStream({
            start(controller) {
                controller.enqueue({ text: staticResponse });
                controller.close();
            }
        });
        
        // The ReadableStream object is not serializable, so we convert it to a different format.
        const transformStream = new TransformStream({
            transform(chunk, controller) {
                controller.enqueue(chunk.text);
            },
        });

        return stream.pipeThrough(transformStream);
    }
    
    try {
        const { stream } = ai.generateStream({
            model: 'googleai/gemini-1.5-flash-latest',
            prompt: {
                messages: history,
            },
            system: "You are AyurBot, a friendly and knowledgeable AI assistant specializing in Ayurveda. Answer the user's questions concisely and helpfully. You are not a medical professional and cannot give medical advice.",
        });

        // The ReadableStream object is not serializable, so we convert it to a different format.
        const transformStream = new TransformStream({
            transform(chunk, controller) {
                controller.enqueue(chunk.text);
            },
        });

        return stream.pipeThrough(transformStream);

    } catch (error) {
        console.error("Error during AI chat:", error);
        const errorMessage = `The AI chat service failed. This may be due to a configuration issue or a problem with the AI service. Please ensure your API key is correct and try again. Error details: ${(error as Error).message}`;
        
        const errorStream = new ReadableStream({
            start(controller) {
                controller.enqueue({ text: errorMessage });
                controller.close();
            }
        });
        
         const transformStream = new TransformStream({
            transform(chunk, controller) {
                controller.enqueue(chunk.text);
            },
        });

        return errorStream.pipeThrough(transformStream);
    }
}
