
'use client';

import { useState, useEffect } from 'react';
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
  const [currentFormData, setCurrentFormData] = useState<DiagnosisFormValues | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  // Use an effect to track form data changes
  const handleFormChange = (data: DiagnosisFormValues) => {
    setCurrentFormData(data);
  };
  
  const handleDiagnosis = async () => {
    if (!currentFormData) {
       toast({
        title: "Error",
        description: "Please fill out the patient form before getting a diagnosis.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    const patientDetails = `Name: ${currentFormData.name}, Age: ${currentFormData.age}, Gender: ${currentFormData.gender}, Weight: ${currentFormData.weight}, Height: ${currentFormData.height}, Diet: ${currentFormData.diet}, Visit Date: ${currentFormData.visitDate.toISOString().split('T')[0]}, Location: ${currentFormData.location}`;
    
    const symptoms = `Stool (मल): ${currentFormData.mal}, Urine (मूत्र): ${currentFormData.mutra}, Appetite (क्षुधा): ${currentFormData.kshudha}, Thirst (तृष्णा): ${currentFormData.trishna}, Sleep (निद्रा): ${currentFormData.nidra}, Tongue (जिह्वा): ${currentFormData.jivha}, Mental State (मनो स्वभाव): ${currentFormData.manoSwabhav}, Other Complaints: ${currentFormData.otherComplaints}, Arsh (अर्श): ${currentFormData.arsh}, Ashmari (अश्मरी): ${currentFormData.ashmari}, Kushtha (कुष्ठ): ${currentFormData.kushtha}, Prameha (प्रमेह): ${currentFormData.prameha}, Grahani (ग्रहणी): ${currentFormData.grahani}, Shotha (शोथ): ${currentFormData.shotha}`;

    const actionInput: SuggestDiagnosesInput = {
      patientDetails,
      symptoms,
    };

    try {
      const diagnosisResult = await getDiagnosis(actionInput);
      setResult(diagnosisResult);
      toast({
        title: "Diagnosis Complete",
        description: "The AI analysis is complete.",
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
    if (!currentFormData) {
        toast({
            title: "Cannot Save Patient",
            description: "Please fill out the patient form before saving.",
            variant: "destructive",
        });
        return;
    }

    const newPatient = {
      id: uuidv4(),
      name: currentFormData.name,
      lastVisit: currentFormData.visitDate.toISOString().split('T')[0],
      dosha: result?.potentialImbalances || 'N/A', // Save diagnosis if available
      ...currentFormData,
      diagnosis: result, // Save the full diagnosis object
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
                onFormChange={handleFormChange}
                onDiagnose={handleDiagnosis} 
                onSave={handleSavePatient}
                isLoading={isLoading} 
            />
            <div className="space-y-8">
                <DiagnosisResults result={result} isLoading={isLoading} />
            </div>
        </div>
    </div>
  );
}
