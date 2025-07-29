
'use client';

import { useState } from 'react';
import type { SuggestDiagnosesOutput, SuggestDiagnosesInput } from '@/ai/flows/suggest-diagnoses';
import { useToast } from "@/hooks/use-toast";
import { getDiagnosis } from '@/app/actions';
import { DiagnosisForm, type DiagnosisFormValues } from '@/components/diagnosis-form';
import { DiagnosisResults } from '@/components/diagnosis-results';

export default function NewPatientPage() {
  const [result, setResult] = useState<SuggestDiagnosesOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleDiagnosis = async (data: DiagnosisFormValues) => {
    setIsLoading(true);
    setResult(null);

    const patientDetails = `Name: ${data.name}, Age: ${data.age}, Gender: ${data.gender}, Weight: ${data.weight}, Height: ${data.height}, Diet: ${data.diet}, Visit Date: ${data.visitDate.toISOString().split('T')[0]}, Location: ${data.location}, Lifestyle: ${data.lifestyle}`;

    const actionInput: SuggestDiagnosesInput = {
      patientDetails,
      medicalHistory: data.medicalHistory,
      symptoms: data.symptoms,
      physicalObservations: data.physicalObservations,
    };

    try {
      const diagnosisResult = await getDiagnosis(actionInput);
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
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">New Patient Diagnosis</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12 gap-8 mt-6">
            <DiagnosisForm onDiagnose={handleDiagnosis} isLoading={isLoading} />
            <div className="space-y-8">
                <DiagnosisResults result={result} isLoading={isLoading} />
            </div>
        </div>
    </div>
  );
}
