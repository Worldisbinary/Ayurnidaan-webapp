
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { format } from "date-fns";
import type { SuggestDiagnosesOutput, SuggestDiagnosesInput } from '@/ai/flows/suggest-diagnoses';
import { useToast } from "@/hooks/use-toast";
import { getDiagnosis } from '@/app/actions';
import { DiagnosisForm, type DiagnosisFormValues } from '@/components/diagnosis-form';
import { DiagnosisResults } from '@/components/diagnosis-results';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

export default function NewPatientPage() {
  const [result, setResult] = useState<SuggestDiagnosesOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleDiagnosis = async (data: DiagnosisFormValues) => {
    setIsLoading(true);
    setResult(null);

    const patientDetails = `Name: ${data.name}, Age: ${data.age}, Gender: ${data.gender}, Weight: ${data.weight}, Height: ${data.height}, Diet: ${data.diet}, Visit Date: ${data.visitDate.toISOString().split('T')[0]}, Location: ${data.location}`;
    
    const symptoms = `Stool (मल): ${data.mal}, Urine (मूत्र): ${data.mutra}, Appetite (क्षुधा): ${data.kshudha}, Thirst (तृष्णा): ${data.trishna}, Sleep (निद्रा): ${data.nidra}, Tongue (जिह्वा): ${data.jivha}, Mental State (मनो स्वभाव): ${data.manoSwabhav}, Other Complaints: ${data.otherComplaints}, Arsh (अर्श): ${data.arsh}, Ashmari (अश्मरी): ${data.ashmari}, Kushtha (कुष्ठ): ${data.kushtha}, Prameha (प्रमेह): ${data.prameha}, Grahani (ग्रहणी): ${data.grahani}, Shotha (शोथ): ${data.shotha}`;


    const actionInput: SuggestDiagnosesInput = {
      patientDetails,
      symptoms,
    };

    try {
      const diagnosisResult = await getDiagnosis(actionInput);
      setResult(diagnosisResult);

      // Save patient to localStorage
      if (typeof window !== 'undefined') {
        const storedPatients = localStorage.getItem('patients');
        const patients = storedPatients ? JSON.parse(storedPatients) : [];
        const newPatient = {
          id: `PID-${String(patients.length + 1).padStart(3, '0')}`,
          name: data.name,
          lastVisit: format(data.visitDate, "yyyy-MM-dd"),
          dosha: diagnosisResult.potentialImbalances || 'N/A',
        };
        patients.push(newPatient);
        localStorage.setItem('patients', JSON.stringify(patients));
        toast({
            title: "Patient Saved",
            description: `${data.name} has been added to the patient list.`,
        });
      }

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
    <div className="space-y-4">
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
