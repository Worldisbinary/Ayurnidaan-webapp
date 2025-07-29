
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { SuggestDiagnosesOutput, SuggestDiagnosesInput } from '@/ai/flows/suggest-diagnoses';
import { useToast } from "@/hooks/use-toast";
import { getDiagnosis } from '@/app/actions';
import { DiagnosisForm, type DiagnosisFormValues } from '@/components/diagnosis-form';
import { DiagnosisResults } from '@/components/diagnosis-results';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';


export default function NewPatientPage() {
  const [result, setResult] = useState<SuggestDiagnosesOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDiagnosisComplete, setIsDiagnosisComplete] = useState(false);
  const [currentFormData, setCurrentFormData] = useState<DiagnosisFormValues | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const handleDiagnosis = async (data: DiagnosisFormValues) => {
    setIsLoading(true);
    setResult(null);
    setIsDiagnosisComplete(false);
    setCurrentFormData(data);

    const patientDetails = `Name: ${data.name}, Age: ${data.age}, Gender: ${data.gender}, Weight: ${data.weight}, Height: ${data.height}, Diet: ${data.diet}, Visit Date: ${data.visitDate.toISOString().split('T')[0]}, Location: ${data.location}`;
    
    const symptoms = `Stool (मल): ${data.mal}, Urine (मूत्र): ${data.mutra}, Appetite (क्षुधा): ${data.kshudha}, Thirst (तृष्णा): ${data.trishna}, Sleep (निद्रा): ${data.nidra}, Tongue (जिह्वा): ${data.jivha}, Mental State (मनो स्वभाव): ${data.manoSwabhav}, Other Complaints: ${data.otherComplaints}, Arsh (अर्श): ${data.arsh}, Ashmari (अश्मरी): ${data.ashmari}, Kushtha (कुष्ठ): ${data.kushtha}, Prameha (प्रमेह): ${data.prameha}, Grahani (ग्रहणी): ${data.grahani}, Shotha (शोथ): ${data.shotha}`;

    const actionInput: SuggestDiagnosesInput = {
      patientDetails,
      symptoms,
    };

    try {
      const diagnosisResult = await getDiagnosis(actionInput);
      setResult(diagnosisResult);
      setIsDiagnosisComplete(true);
      toast({
        title: "Diagnosis Complete",
        description: "The AI analysis is complete. You can now save the patient.",
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
  };

  const handleSavePatient = () => {
    if (!result || !currentFormData) {
        toast({
            title: "Cannot Save Patient",
            description: "A diagnosis must be completed before saving the patient.",
            variant: "destructive",
        });
        return;
    }

    const newPatient = {
      id: uuidv4(),
      name: currentFormData.name,
      lastVisit: currentFormData.visitDate.toISOString().split('T')[0],
      dosha: result.potentialImbalances,
      ...currentFormData,
      diagnosis: result,
    };

    try {
        const existingPatients = JSON.parse(localStorage.getItem('patients') || '[]');
        const updatedPatients = [...existingPatients, newPatient];
        localStorage.setItem('patients', JSON.stringify(updatedPatients));
        
        toast({
            title: "Patient Saved",
            description: `${currentFormData.name} has been added to the patient history.`,
        });
        
        router.push('/dashboard/patient-history');

    } catch (error) {
        toast({
            title: "Error Saving Patient",
            description: "Could not save patient data to local storage.",
            variant: "destructive",
        });
    }
  };


  return (
    <div className="space-y-4">
        <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">New Patient Diagnosis</h2>
            <Button variant="outline" onClick={() => router.back()}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
            </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12 gap-8 mt-6">
            <DiagnosisForm 
                onDiagnose={handleDiagnosis} 
                onSave={handleSavePatient}
                isLoading={isLoading} 
                isDiagnosisComplete={isDiagnosisComplete}
            />
            <div className="space-y-8">
                <DiagnosisResults result={result} isLoading={isLoading} />
            </div>
        </div>
    </div>
  );
}
