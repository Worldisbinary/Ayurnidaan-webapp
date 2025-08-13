
'use server';

/**
 * @fileOverview This file defines the suggestDiagnoses flow, which analyzes patient data and suggests potential imbalances (Doshas) and possible diseases.
 *
 * - suggestDiagnoses - A function that handles the diagnosis suggestion process.
 * - SuggestDiagnosesInput - The input type for the suggestDiagnoses function.
 * - SuggestDiagnosesOutput - The return type for the suggestDiagnoses function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestDiagnosesInputSchema = z.object({
  patientDetails: z
    .string()
    .describe('Patient details including age, gender, location, and lifestyle.'),
  symptoms: z
    .string()
    .describe('A comprehensive record of symptoms including stool, urine, appetite, thirst, sleep, tongue, and mental state.'),
});
export type SuggestDiagnosesInput = z.infer<typeof SuggestDiagnosesInputSchema>;

const SuggestDiagnosesOutputSchema = z.object({
  potentialImbalances: z
    .string()
    .describe('Potential Dosha imbalances based on the analysis. Provide in English and in Hindi (Devanagari script) in parenthesis.'),
  possibleDiseases: z
    .string()
    .describe('Possible disease classifications based on the analysis. Provide in English and in Hindi (Devanagari script) in parenthesis.'),
  reasoning: z
    .string()
    .describe(
      'The AI’s reasoning for prioritizing the likely diagnoses based on the entered symptoms. Explain in a comprehensive but easy-to-understand manner.'
    ),
});
export type SuggestDiagnosesOutput = z.infer<typeof SuggestDiagnosesOutputSchema>;


const suggestDiagnosesPrompt = ai.definePrompt({
    name: 'suggestDiagnosesPrompt',
    input: { schema: SuggestDiagnosesInputSchema },
    output: { schema: SuggestDiagnosesOutputSchema },
    prompt: `You are an expert Ayurvedic Vaidya (physician). Your task is to analyze the provided patient information and suggest a preliminary diagnosis.

    Analyze the following patient data:
    - Patient Details: {{{patientDetails}}}
    - Symptoms: {{{symptoms}}}

    Based on your analysis, provide the following:
    1.  **Potential Imbalances:** Identify the most likely Dosha imbalances (e.g., Vata, Pitta, Kapha, or a combination).
    2.  **Possible Diseases:** Suggest potential Ayurvedic disease classifications (e.g., Amlapitta, Grahani).
    3.  **Reasoning:** Provide a clear and concise rationale for your conclusions, linking the symptoms directly to the potential imbalances and diseases.

    Your response must be structured according to the output schema.
    `,
});

const suggestDiagnosesFlow = ai.defineFlow(
  {
    name: 'suggestDiagnosesFlow',
    inputSchema: SuggestDiagnosesInputSchema,
    outputSchema: SuggestDiagnosesOutputSchema,
  },
  async (input) => {
    // Check if the API key is available, which is a proxy for billing being enabled.
    if (!process.env.GEMINI_API_KEY) {
        console.log("Returning static diagnosis as billing is not enabled.");
        // We are returning a static diagnosis to avoid requiring an API key for now.
        return {
            potentialImbalances: "Vata-Pitta Imbalance (वात-पित्त असंतुलन)",
            possibleDiseases: "Amlapitta (Acidity/GERD), Grahani (IBS/Malabsorption)",
            reasoning: "This is a static sample diagnosis. The combination of symptoms like irregular appetite (Kshudha), disturbed sleep (Nidra), and a coated tongue (Saam Jivha) points towards a dual Dosha imbalance. To get a live AI-powered diagnosis, please provide a valid API key for a billing-enabled Google Cloud project in your .env file."
        };
    }
    
    try {
        const { output } = await suggestDiagnosesPrompt(input);
        if (!output) {
            throw new Error('The AI returned an empty response.');
        }
        return output;
    } catch (error) {
        console.error("Error during AI diagnosis:", error);
        // Fallback to a static error response if the AI call fails
        return {
            potentialImbalances: "Error",
            possibleDiseases: "Could not determine",
            reasoning: `The AI diagnosis failed. This may be due to a configuration issue or a problem with the AI service. Please ensure your API key is correct and try again. Error details: ${(error as Error).message}`
        };
    }
  }
);


export async function suggestDiagnoses(
  input: SuggestDiagnosesInput
): Promise<SuggestDiagnosesOutput> {
    return await suggestDiagnosesFlow(input);
}
