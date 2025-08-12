
import { z } from 'zod';

export const GetDoshaInputSchema = z.object({
  bodyFrame: z.string().describe('User\'s body frame (e.g., Slim, Medium, Large).'),
  bodyWeight: z.string().describe('User\'s body weight (e.g., Low, Moderate, Heavy).'),
  skinType: z.string().describe('User\'s skin type (e.g., Dry, Sensitive, Oily).'),
  hairType: z.string().describe('User\'s hair type (e.g., Dry/Frizzy, Fine/Straight, Thick/Oily).'),
  appetite: z.string().describe('User\'s typical appetite (e.g., Irregular, Strong, Slow but steady).'),
  mood: z.string().describe('User\'s common mood (e.g., Enthusiastic/Anxious, Focused/Irritable, Calm/Lethargic).'),
  energyLevels: z.string().describe('User\'s energy levels (e.g., Bursts of energy, Consistent, Steady but slow to start).'),
});
export type GetDoshaInput = z.infer<typeof GetDoshaInputSchema>;

export const GetDoshaOutputSchema = z.object({
    dosha: z.enum(['Vata', 'Pitta', 'Kapha', 'Vata-Pitta', 'Pitta-Kapha', 'Vata-Kapha', 'Tridoshic'])
        .describe('The dominant Ayurvedic dosha or combination of doshas identified.'),
    reasoning: z.string()
        .describe('A brief explanation of why this dosha was determined based on the provided characteristics.'),
    dietaryRecommendations: z.array(z.string())
        .describe('A list of 3-4 brief dietary recommendations tailored to the identified dosha.'),
});
export type GetDoshaOutput = z.infer<typeof GetDoshaOutputSchema>;
