
'use client';

import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles, Bot, Stethoscope, HeartPulse, BrainCircuit, Leaf } from 'lucide-react';
import { getDosha, type GetDoshaOutput } from '@/app/actions';
import { GetDoshaInputSchema } from '@/ai/schemas/dosha-schema';
import { useToast } from "@/hooks/use-toast";

type GetDoshaFormValues = z.infer<typeof GetDoshaInputSchema>;

export default function CheckupPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<GetDoshaOutput | null>(null);
    const { toast } = useToast();

    const form = useForm<GetDoshaFormValues>({
        resolver: zodResolver(GetDoshaInputSchema),
        defaultValues: {
            bodyFrame: undefined,
            bodyWeight: undefined,
            skinType: undefined,
            hairType: undefined,
            appetite: undefined,
            mood: undefined,
            energyLevels: undefined,
        },
    });

    async function onSubmit(data: GetDoshaFormValues) {
        setIsLoading(true);
        setResult(null);
        try {
            const diagnosisResult = await getDosha(data);
            setResult(diagnosisResult);
            toast({
                title: "Analysis Complete",
                description: "Your Ayurvedic constitution (Dosha) has been analyzed.",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: (error as Error).message,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    }
    
    const questions = [
        { name: "bodyFrame", label: "Body Frame", options: ["Slim, light frame, thin", "Medium build, muscular", "Large build, well-developed"] },
        { name: "bodyWeight", label: "Body Weight", options: ["Low, hard to gain weight", "Moderate, easy to gain/lose", "Heavy, easy to gain weight"] },
        { name: "skinType", label: "Skin Type", options: ["Dry, rough, cool", "Sensitive, warm, prone to rashes", "Oily, smooth, cool"] },
        { name: "hairType", label: "Hair Type", options: ["Dry, frizzy, brittle", "Fine, straight, may grey early", "Thick, oily, wavy"] },
        { name: "appetite", label: "Appetite", options: ["Irregular, variable", "Strong, sharp, can't miss meals", "Slow but steady, can skip meals"] },
        { name: "mood", label: "General Mood", options: ["Enthusiastic, anxious, changeable", "Focused, intense, irritable", "Calm, steady, sometimes lethargic"] },
        { name: "energyLevels", label: "Energy Levels", options: ["Comes in bursts, variable", "Consistent, high output", "Steady, slow to start"] },
    ] as const;

    return (
        <div className="space-y-8">
            <Card className="bg-primary/10 border-primary/30 text-center p-8">
                <CardTitle className="text-3xl font-headline mb-2 flex items-center justify-center gap-2">
                    <Stethoscope className="w-8 h-8"/> AI-Powered Dosha Check-up
                </CardTitle>
                <CardDescription className="text-lg max-w-2xl mx-auto">
                    Answer a few questions about your physical and mental traits to discover your unique Ayurvedic constitution (Prakriti).
                </CardDescription>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle>Your Prakriti Questionnaire</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                {questions.map(q => (
                                     <FormField
                                        key={q.name}
                                        control={form.control}
                                        name={q.name}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{q.label}</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select the best description" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {q.options.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                ))}
                               <
                                Button type="submit" className="w-full text-lg py-6" disabled={isLoading}>
                                     {isLoading ? (
                                        <>
                                        <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                                        Analyzing...
                                        </>
                                    ) : (
                                        <>
                                        <Sparkles className="mr-2" />
                                        Find My Dosha
                                        </>
                                    )}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
                <div className="space-y-8">
                    {isLoading && (
                         <Card className="shadow-md h-full">
                            <CardHeader>
                                <Skeleton className="h-8 w-3/4" />
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-2/3" />
                                <Skeleton className="h-4 w-full" />
                            </CardContent>
                        </Card>
                    )}
                    {!isLoading && !result && (
                        <Card className="h-full flex flex-col items-center justify-center text-center p-8 bg-accent/20 border-2 border-dashed border-accent">
                            <Bot className="w-16 h-16 text-muted-foreground mb-4" />
                            <h3 className="text-xl font-headline text-muted-foreground">Your Results Await</h3>
                            <p className="text-muted-foreground">Complete the questionnaire and our AI will reveal your Dosha and personalized recommendations here.</p>
                        </Card>
                    )}
                    {result && (
                         <div className="space-y-6">
                            <Card className="shadow-lg bg-accent/30 border-accent">
                                <CardHeader className="flex-row items-center gap-4 space-y-0">
                                <HeartPulse className="w-8 h-8 text-accent-foreground" />
                                <CardTitle className="text-2xl font-headline text-accent-foreground">Your Primary Dosha</CardTitle>
                                </CardHeader>
                                <CardContent>
                                <p className="text-3xl font-bold text-accent-foreground">{result.dosha}</p>
                                </CardContent>
                            </Card>
                            <Card className="shadow-lg">
                                <CardHeader className="flex-row items-center gap-4 space-y-0">
                                <BrainCircuit className="w-8 h-8 text-primary" />
                                <CardTitle className="text-xl font-headline">AI Analysis</CardTitle>
                                </CardHeader>
                                <CardContent>
                                <p className="text-base leading-relaxed">{result.reasoning}</p>
                                </CardContent>
                            </Card>
                            <Card className="shadow-lg">
                                <CardHeader className="flex-row items-center gap-4 space-y-0">
                                <Leaf className="w-8 h-8 text-primary" />
                                <CardTitle className="text-xl font-headline">Dietary Tips</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                                        {result.dietaryRecommendations.map((tip, i) => <li key={i}>{tip}</li>)}
                                    </ul>
                                </CardContent>
                            </Card>
                         </div>
                    )}
                </div>
            </div>
        </div>
    );
}
