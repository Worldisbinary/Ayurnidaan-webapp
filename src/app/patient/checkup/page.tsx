
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
import { Loader2, Sparkles, Bot, Stethoscope, HeartPulse, BrainCircuit, Leaf, BarChart2 } from 'lucide-react';
import { getDosha, type GetDoshaOutput } from '@/app/actions';
import { GetDoshaInputSchema } from '@/ai/schemas/dosha-schema';
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from '@/components/ui/skeleton';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

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
        { name: "bodyFrame", label: "Body Frame (शारीरिक बनावट)", options: ["Slim, light frame, thin (पतला, हल्का)", "Medium build, muscular (मध्यम, मांसल)", "Large build, well-developed (बड़ा, सुडौल)"] },
        { name: "bodyWeight", label: "Body Weight (शारीरिक वजन)", options: ["Low, hard to gain weight (कम, वजन बढ़ना मुश्किल)", "Moderate, easy to gain/lose (मध्यम, वजन आसानी से बढ़ता/घटता है)", "Heavy, easy to gain weight (भारी, वजन आसानी से बढ़ता है)"] },
        { name: "skinType", label: "Skin Type (त्वचा का प्रकार)", options: ["Dry, rough, cool (सूखी, खुरदरी, ठंडी)", "Sensitive, warm, prone to rashes (संवेदनशील, गर्म, दानों की प्रवृत्ति)", "Oily, smooth, cool (तैलीय, चिकनी, ठंडी)"] },
        { name: "hairType", label: "Hair Type (बालों का प्रकार)", options: ["Dry, frizzy, brittle (रूखे, उलझे, भंगुर)", "Fine, straight, may grey early (पतले, सीधे, जल्दी सफेद हो सकते हैं)", "Thick, oily, wavy (घने, तैलीय, लहरदार)"] },
        { name: "appetite", label: "Appetite (भूख)", options: ["Irregular, variable (अनियमित, परिवर्तनशील)", "Strong, sharp, can't miss meals (तेज, तीव्र, भोजन नहीं छोड़ सकते)", "Slow but steady, can skip meals (धीमी लेकिन स्थिर, भोजन छोड़ सकते हैं)"] },
        { name: "mood", label: "General Mood (सामान्य मनोदशा)", options: ["Enthusiastic, anxious, changeable (उत्साही, चिंतित, परिवर्तनशील)", "Focused, intense, irritable (केंद्रित, तीव्र, चिड़चिड़ा)", "Calm, steady, sometimes lethargic (शांत, स्थिर, कभी-कभी सुस्त)"] },
        { name: "energyLevels", label: "Energy Levels (ऊर्जा का स्तर)", options: ["Comes in bursts, variable (अचानक ऊर्जा आना, परिवर्तनशील)", "Consistent, high output (लगातार, उच्च उत्पादन)", "Steady, slow to start (स्थिर, शुरू करने में धीमा)"] },
    ] as const;

    const chartData = result ? [
        { name: 'Vata', value: result.doshaPercentages.vata, fill: 'var(--color-vata)' },
        { name: 'Pitta', value: result.doshaPercentages.pitta, fill: 'var(--color-pitta)' },
        { name: 'Kapha', value: result.doshaPercentages.kapha, fill: 'var(--color-kapha)' },
    ] : [];

    return (
        <div className="space-y-8">
            <style jsx global>{`
              :root {
                --color-vata: hsl(var(--chart-1));
                --color-pitta: hsl(var(--chart-2));
                --color-kapha: hsl(var(--chart-4));
              }
            `}</style>
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
                        <CardTitle>Your Prakriti Questionnaire (प्रकृति प्रश्नावली)</CardTitle>
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
                                                            <SelectValue placeholder="Select the best description (सबसे अच्छा विवरण चुनें)" />
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
                                <Button type="submit" className="w-full text-lg py-6" disabled={isLoading}>
                                     {isLoading ? (
                                        <>
                                        <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                                        Analyzing... (विश्लेषण हो रहा है...)
                                        </>
                                    ) : (
                                        <>
                                        <Sparkles className="mr-2" />
                                        Find My Dosha (मेरा दोष खोजें)
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
                            <CardContent className="space-y-4 pt-6">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                                <Skeleton className="h-40 w-full" />
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
                                <CardContent className="pt-6">
                                <p className="text-3xl font-bold text-accent-foreground">{result.dosha}</p>
                                </CardContent>
                            </Card>

                            <Card className="shadow-lg">
                                <CardHeader className="flex-row items-center gap-4 space-y-0">
                                    <BarChart2 className="w-8 h-8 text-primary" />
                                    <CardTitle className="text-xl font-headline">Dosha Composition</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-6 h-60">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={chartData} layout="vertical" margin={{ left: 10 }}>
                                            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                            <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                                            <YAxis type="category" dataKey="name" width={60} stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                            <Tooltip
                                                cursor={{ fill: 'transparent' }}
                                                content={({ active, payload }) => {
                                                    if (active && payload && payload.length) {
                                                        return (
                                                            <div className="rounded-lg border bg-background p-2 shadow-sm">
                                                                <p className="text-sm font-bold">{`${payload[0].payload.name}: ${payload[0].value}%`}</p>
                                                            </div>
                                                        );
                                                    }
                                                    return null;
                                                }}
                                            />
                                            <Bar dataKey="value" radius={[0, 4, 4, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>

                            <Card className="shadow-lg">
                                <CardHeader className="flex-row items-center gap-4 space-y-0">
                                <BrainCircuit className="w-8 h-8 text-primary" />
                                <CardTitle className="text-xl font-headline">AI Analysis</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-6">
                                <p className="text-base leading-relaxed">{result.reasoning}</p>
                                </CardContent>
                            </Card>
                            <Card className="shadow-lg">
                                <CardHeader className="flex-row items-center gap-4 space-y-0">
                                <Leaf className="w-8 h-8 text-primary" />
                                <CardTitle className="text-xl font-headline">Dietary Tips</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-6">
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
