
'use server';

/**
 * @fileOverview A Genkit flow for generating animated yoga videos.
 * - generateYogaVideo - A function that takes a text prompt and returns a video.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/googleai';
import {z} from 'genkit';
import {MediaPart} from 'genkit/model';

const GenerateYogaVideoInputSchema = z.object({
  prompt: z.string().describe('The text prompt for the yoga video.'),
});

// The output will be a data URI string for the video, or a failure indicator.
const GenerateYogaVideoOutputSchema = z.string();

export type GenerateYogaVideoInput = z.infer<
  typeof GenerateYogaVideoInputSchema
>;
export type GenerateYogaVideoOutput = z.infer<
  typeof GenerateYogaVideoOutputSchema
>;

async function downloadVideo(video: MediaPart): Promise<string> {
  // node-fetch is required here because the default fetch does not support Buffers
  // which are necessary for base64 encoding.
  const fetch = (await import('node-fetch')).default;
  if (!process.env.GEMINI_API_KEY) {
    throw new Error(
      'GEMINI_API_KEY environment variable not set. Please add it to your .env file.'
    );
  }
  const videoDownloadResponse = await fetch(
    `${video.media!.url}&key=${process.env.GEMINI_API_KEY}`
  );
  if (
    !videoDownloadResponse ||
    videoDownloadResponse.status !== 200 ||
    !videoDownloadResponse.body
  ) {
    throw new Error('Failed to fetch video');
  }

  const buffer = await videoDownloadResponse.buffer();
  return buffer.toString('base64');
}

export const generateYogaVideoFlow = ai.defineFlow(
  {
    name: 'generateYogaVideoFlow',
    inputSchema: GenerateYogaVideoInputSchema,
    outputSchema: GenerateYogaVideoOutputSchema,
  },
  async ({prompt}) => {
    
    // Check if the API key is available, which is a proxy for billing being enabled.
    if (!process.env.GEMINI_API_KEY) {
      console.log("Skipping video generation as billing is not enabled.");
      // Return a specific failure code that the frontend can handle.
      return "GENERATION_FAILED";
    }

    try {
      let {operation} = await ai.generate({
        model: googleAI.model('veo-2.0-generate-001'),
        prompt: `An animated, minimalist instructional video of the yoga pose: ${prompt}. Clean, white background.`,
        config: {
          durationSeconds: 5,
          aspectRatio: '16:9',
        },
      });

      if (!operation) {
        throw new Error('Expected the model to return an operation');
      }

      // Wait until the operation completes. This may take up to a minute.
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        operation = await ai.checkOperation(operation);
      }

      if (operation.error) {
        throw new Error('failed to generate video: ' + operation.error.message);
      }

      const video = operation.output?.message?.content.find(p => !!p.media);
      if (!video) {
        throw new Error('Failed to find the generated video');
      }

      const videoBase64 = await downloadVideo(video);

      // Return as a data URI
      return `data:video/mp4;base64,${videoBase64}`;
    } catch (error) {
        console.error(`Video generation failed for prompt "${prompt}":`, error);
        return "GENERATION_FAILED";
    }
  }
);

export async function generateYogaVideo(
  input: GenerateYogaVideoInput
): Promise<GenerateYogaVideoOutput> {
  return await generateYogaVideoFlow(input);
}
