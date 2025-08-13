
'use client';

import type { SuggestDiagnosesOutput } from '@/ai/flows/suggest-diagnoses';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { HeartPulse, Stethoscope, BrainCircuit, Bot, BarChart2 } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface DiagnosisResultsProps {
  result: SuggestDiagnosesOutput | null;
  isLoading: boolean;
}

export function DiagnosisResults({ result, isLoading }: DiagnosisResultsProps) {
  const chartData = result?.doshaPercentages ? [
        { name: 'Vata', value: result.doshaPercentages.vata, fill: 'var(--color-vata)' },
        { name: 'Pitta', value: result.doshaPercentages.pitta, fill: 'var(--color-pitta)' },
        { name: 'Kapha', value: result.doshaPercentages.kapha, fill: 'var(--color-kapha)' },
    ] : [];

  if (isLoading) {
    return (
      <div className="space-y-8">
        <Card className="shadow-md">
          <CardHeader>
            <Skeleton className="h-8 w-3/4" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader>
            <Skeleton className="h-8 w-3/4" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader>
            <Skeleton className="h-8 w-3/4" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!result) {
    return (
      <Card className="h-full flex flex-col items-center justify-center text-center p-8 bg-accent/20 border-2 border-dashed border-accent">
        <Bot className="w-16 h-16 text-muted-foreground mb-4" />
        <h3 className="text-xl font-headline text-muted-foreground">Diagnostic Insights</h3>
        <p className="text-muted-foreground">Fill out the patient form and click "Get AI Diagnosis" to see the analysis here.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
       <style jsx global>{`
          :root {
            --color-vata: hsl(var(--chart-1));
            --color-pitta: hsl(var(--chart-2));
            --color-kapha: hsl(var(--chart-4));
          }
        `}</style>
      <Card className="shadow-lg bg-accent/30 border-accent">
        <CardHeader className="flex-row items-center gap-4 space-y-0">
          <HeartPulse className="w-8 h-8 text-accent-foreground" />
          <CardTitle className="text-2xl font-headline text-accent-foreground">Potential Imbalances (Doshas)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">{result.potentialImbalances}</p>
        </CardContent>
      </Card>

      {result.doshaPercentages && (
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
      )}

      <Card className="shadow-lg bg-secondary">
        <CardHeader className="flex-row items-center gap-4 space-y-0">
          <Stethoscope className="w-8 h-8 text-secondary-foreground" />
          <CardTitle className="text-2xl font-headline text-secondary-foreground">Possible Diseases</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">{result.possibleDiseases}</p>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader className="flex-row items-center gap-4 space-y-0">
          <BrainCircuit className="w-8 h-8 text-primary" />
          <CardTitle className="text-2xl font-headline">AI Reasoning</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-base leading-relaxed">{result.reasoning}</p>
        </CardContent>
      </Card>
    </div>
  );
}
