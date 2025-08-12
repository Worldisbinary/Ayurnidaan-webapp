
'use server';

/**
 * @fileOverview This file defines a Genkit flow for determining a user's Ayurvedic Dosha.
 * - getDosha - A function that takes user characteristics and returns their Dosha.
 */
import { ai } from '@/ai/genkit';
import { GetDoshaInput, GetDoshaOutput } from '@/ai/schemas/dosha-schema';

export async function getDosha(input: GetDoshaInput): Promise<GetDoshaOutput> {
    // This flow is returning a static response to avoid requiring an API key for now.
    console.log("Returning static Dosha as billing is not enabled.");
    return {
        dosha: "Pitta",
        reasoning: "This is a static sample analysis. The combination of a medium frame, sensitive skin, and a strong appetite points towards a Pitta-dominant constitution. To get a live, personalized AI analysis, please ensure your Google Cloud project has billing enabled and a valid API key is configured.",
        dietaryRecommendations: [
            "Favor cooling foods like cucumbers, sweet fruits, and leafy greens.",
            "Avoid spicy, oily, and excessively sour or salty foods.",
            "Drink sweet lassi and coconut water to pacify internal heat.",
            "Eat at regular intervals and avoid skipping meals."
        ]
    };
}
