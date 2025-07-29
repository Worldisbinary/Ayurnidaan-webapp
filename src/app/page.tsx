'use client';

import { useState } from 'react';
import type { SuggestDiagnosesOutput, SuggestDiagnosesInput } from '@/ai/flows/suggest-diagnoses';
import { Leaf } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { getDiagnosis } from '@/app/actions';
import { DiagnosisForm } from '@/components/diagnosis-form';
import { DiagnosisResults } from '@/components/diagnosis-results';

export default function Home() {
  const [result, setResult] = useState<SuggestDiagnosesOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleDiagnosis = async (data: SuggestDiagnosesInput) => {
    setIsLoading(true);
    setResult(null);
    try {
      const diagnosisResult = await getDiagnosis(data);
      setResult(diagnosisResult);
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-body flex flex-col">
      <header className="py-6 shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3">
          <Leaf className="w-8 h-8 text-primary" />
          <h1 className="text-4xl font-headline font-bold text-primary-foreground">AyurVision</h1>
        </div>
      </header>
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12 gap-8">
          <DiagnosisForm onDiagnose={handleDiagnosis} isLoading={isLoading} />
          <div className="space-y-8">
            <DiagnosisResults result={result} isLoading={isLoading} />
          </div>
        </div>
      </main>
      <footer className="text-center py-4 text-muted-foreground text-sm shrink-0">
        © {new Date().getFullYear()} AyurVision. All rights reserved.
      </footer>
    </div>
  );
}
