
'use client';

import type { SuggestDiagnosesOutput } from '@/ai/flows/suggest-diagnoses';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { HeartPulse, Stethoscope, BrainCircuit, Bot } from 'lucide-react';

interface DiagnosisResultsProps {
  result: SuggestDiagnosesOutput | null;
  isLoading: boolean;
}

export function DiagnosisResults({ result, isLoading }: DiagnosisResultsProps) {
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
      <Card className="shadow-lg bg-accent/30 border-accent">
        <CardHeader className="flex-row items-center gap-4 space-y-0">
          <HeartPulse className="w-8 h-8 text-accent-foreground" />
          <CardTitle className="text-2xl font-headline text-accent-foreground">Potential Imbalances (Doshas)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">{result.potentialImbalances}</p>
        </CardContent>
      </Card>

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
          <CardTitle className="text-2xl font-headline text-primary-foreground">AI Reasoning</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-base leading-relaxed">{result.reasoning}</p>
        </CardContent>
      </Card>
    </div>
  );
}
