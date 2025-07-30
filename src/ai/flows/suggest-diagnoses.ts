
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
    .describe('Potential Dosha imbalances based on the analysis.'),
  possibleDiseases: z
    .string()
    .describe('Possible disease classifications based on the analysis.'),
  reasoning: z
    .string()
    .describe(
      'The AI’s reasoning for prioritizing the likely diagnoses based on the entered symptoms.'
    ),
});
export type SuggestDiagnosesOutput = z.infer<typeof SuggestDiagnosesOutputSchema>;

export async function suggestDiagnoses(
  input: SuggestDiagnosesInput
): Promise<SuggestDiagnosesOutput> {
  console.log("Returning static diagnosis as billing is not enabled.");
  // We are returning a static diagnosis to avoid requiring an API key for now.
  return {
    potentialImbalances: "Vata-Pitta Imbalance (वात-पित्त असंतुलन)",
    possibleDiseases: "Amlapitta (Acidity/GERD), Grahani (IBS/Malabsorption)",
    reasoning: "This is a static sample diagnosis. The combination of symptoms like irregular appetite (Kshudha), disturbed sleep (Nidra), and a coated tongue (Saam Jivha) points towards a dual Dosha imbalance. To get a live AI-powered diagnosis, please ensure your Google Cloud project has billing enabled and a valid API key is configured in your .env file."
  };
}
