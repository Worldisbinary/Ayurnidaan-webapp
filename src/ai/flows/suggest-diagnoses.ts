// Implemented the suggestDiagnoses flow, which analyzes patient data and suggests potential imbalances and diseases.

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
  medicalHistory: z
    .string()
    .describe(
      'Patient medical history, including previous illnesses, treatments, and known allergies.'
    ),
  symptoms: z
    .string()
    .describe('A comprehensive record of symptoms across different systems.'),
  physicalObservations: z
    .string()
    .describe(
      'Image-based assessment for tongue, nails, and skin analysis. As a text description.'
    ),
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
  return suggestDiagnosesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestDiagnosesPrompt',
  input: {schema: SuggestDiagnosesInputSchema},
  output: {schema: SuggestDiagnosesOutputSchema},
  prompt: `You are an expert Ayurvedic practitioner. Analyze the patient data provided below and suggest potential Dosha imbalances and possible diseases. Provide a reasoning for your diagnosis.

Patient Details: {{{patientDetails}}}
Medical History: {{{medicalHistory}}}
Symptoms: {{{symptoms}}}
Physical Observations: {{{physicalObservations}}}

Consider all information to prioritize likely diagnoses.`,
});

const suggestDiagnosesFlow = ai.defineFlow(
  {
    name: 'suggestDiagnosesFlow',
    inputSchema: SuggestDiagnosesInputSchema,
    outputSchema: SuggestDiagnosesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
