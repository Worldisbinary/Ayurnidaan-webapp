
'use server';

/**
 * @fileOverview This file defines a Genkit flow for determining a user's Ayurvedic Dosha.
 * - getDosha - A function that takes user characteristics and returns their Dosha, percentages, and recommendations.
 */
import { ai } from '@/ai/genkit';
import { GetDoshaInput, GetDoshaInputSchema, GetDoshaOutput, GetDoshaOutputSchema } from '@/ai/schemas/dosha-schema';

const getDoshaPrompt = ai.definePrompt({
  name: 'getDoshaPrompt',
  input: { schema: GetDoshaInputSchema },
  output: { schema: GetDoshaOutputSchema },
  prompt: `You are an expert Ayurvedic practitioner. Analyze the user's characteristics to determine their Prakriti (Ayurvedic constitution).

Based on the following inputs, determine the user's primary Dosha (Vata, Pitta, Kapha, or a combination).
- Body Frame: {{{bodyFrame}}}
- Body Weight: {{{bodyWeight}}}
- Skin Type: {{{skinType}}}
- Hair Type: {{{hairType}}}
- Appetite: {{{appetite}}}
- Mood: {{{mood}}}
- Energy Levels: {{{energyLevels}}}

Your response must include:
1.  **dosha**: The identified primary dosha(s).
2.  **doshaPercentages**: An estimated percentage breakdown for Vata, Pitta, and Kapha. These should add up to roughly 100.
3.  **reasoning**: A clear, concise explanation for your determination, linking the user's characteristics to the qualities of the identified dosha(s).
4.  **dietaryRecommendations**: 3-4 actionable dietary tips specifically for balancing the identified dosha.
`,
});

const getDoshaFlow = ai.defineFlow(
  {
    name: 'getDoshaFlow',
    inputSchema: GetDoshaInputSchema,
    outputSchema: GetDoshaOutputSchema,
  },
  async (input) => {
    // Check if the API key is available, which is a proxy for billing being enabled.
    if (!process.env.GEMINI_API_KEY) {
        console.log("Returning static Dosha as billing is not enabled.");
        // We are returning a static diagnosis to avoid requiring an API key for now.
        return {
            dosha: "Pitta",
            reasoning: "This is a static sample analysis. The combination of a medium frame, sensitive skin, and a strong appetite points towards a Pitta-dominant constitution. To get a live, personalized AI analysis, please ensure your Google Cloud project has billing enabled and a valid API key is configured.",
            dietaryRecommendations: [
                "Favor cooling foods like cucumbers, sweet fruits, and leafy greens.",
                "Avoid spicy, oily, and excessively sour or salty foods.",
                "Drink sweet lassi and coconut water to pacify internal heat.",
                "Eat at regular intervals and avoid skipping meals."
            ],
            doshaPercentages: {
                vata: 20,
                pitta: 60,
                kapha: 20,
            }
        };
    }
    
    try {
        const { output } = await getDoshaPrompt(input);
        if (!output) {
            throw new Error('The AI returned an empty response.');
        }
        return output;
    } catch (error) {
        console.error("Error during AI Dosha analysis:", error);
        // Fallback to a static error response if the AI call fails
        return {
            dosha: "Pitta",
            reasoning: `The AI analysis failed. This may be due to a configuration issue or a problem with the AI service. Please ensure your API key is correct and try again. Error details: ${(error as Error).message}`,
            dietaryRecommendations: [],
            doshaPercentages: { vata: 33, pitta: 34, kapha: 33 }
        };
    }
  }
);


export async function getDosha(input: GetDoshaInput): Promise<GetDoshaOutput> {
    return await getDoshaFlow(input);
}
