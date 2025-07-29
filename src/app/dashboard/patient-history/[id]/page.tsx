
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DiagnosisResults } from '@/components/diagnosis-results';
import { ChevronLeft, User, ClipboardList } from 'lucide-react';

// Define a comprehensive patient type
interface Patient {
  id: string;
  name: string;
  age: string;
  gender: string;
  weight: string;
  height: string;
  diet: string;
  visitDate: string;
  location: string;
  mal: string;
  mutra: string;
  kshudha: string;
  trishna: string;
  nidra: string;
  jivha: string;
  manoSwabhav: string;
  otherComplaints?: string;
  arsh: string;
  ashmari: string;
  kushtha: string;
  prameha: string;
  grahani: string;
  shotha: string;
  diagnosis: any; // Can be more specific if the diagnosis structure is known
}

export default function PatientDetailPage() {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (typeof window !== 'undefined' && id) {
      try {
        const storedPatients = localStorage.getItem('patients');
        if (storedPatients) {
          const patients = JSON.parse(storedPatients);
          const currentPatient = patients.find((p: Patient) => p.id === id);
          if (currentPatient) {
            setPatient(currentPatient);
          }
        }
      } catch (error) {
        console.error("Failed to retrieve patient data", error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [id]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-full">Loading patient details...</div>;
  }

  if (!patient) {
    return <div className="flex items-center justify-center h-full">Patient not found.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Patient Details</h2>
        <Button variant="outline" onClick={() => router.back()}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Patient List
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader className="flex-row items-center gap-4">
              <User className="w-8 h-8 text-primary" />
              <CardTitle className="text-2xl font-headline">Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><strong>ID:</strong> {patient.id}</p>
              <p><strong>Name:</strong> {patient.name}</p>
              <p><strong>Age:</strong> {patient.age}</p>
              <p><strong>Gender:</strong> {patient.gender}</p>
              <p><strong>Weight:</strong> {patient.weight} kg</p>
              <p><strong>Height:</strong> {patient.height} cm</p>
              <p><strong>Diet:</strong> {patient.diet}</p>
              <p><strong>Visit Date:</strong> {new Date(patient.visitDate).toLocaleDateString()}</p>
              <p><strong>Location:</strong> {patient.location}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center gap-4">
                <ClipboardList className="w-8 h-8 text-primary" />
                <CardTitle className="text-2xl font-headline">Symptoms</CardTitle>
            </CardHeader>
             <CardContent className="space-y-2 text-sm">
                <p><strong>Stool (मल):</strong> {patient.mal}</p>
                <p><strong>Urine (मूत्र):</strong> {patient.mutra}</p>
                <p><strong>Appetite (क्षुधा):</strong> {patient.kshudha}</p>
                <p><strong>Thirst (तृष्णा):</strong> {patient.trishna}</p>
                <p><strong>Sleep (निद्रा):</strong> {patient.nidra}</p>
                <p><strong>Tongue (जिह्वा):</strong> {patient.jivha}</p>
                <p><strong>Mental State (मनो स्वभाव):</strong> {patient.manoSwabhav}</p>
                <p><strong>Arsh (अर्श):</strong> {patient.arsh}</p>
                <p><strong>Ashmari (अश्मरी):</strong> {patient.ashmari}</p>
                <p><strong>Kushtha (कुष्ठ):</strong> {patient.kushtha}</p>
                <p><strong>Prameha (प्रमेह):</strong> {patient.prameha}</p>
                <p><strong>Grahani (ग्रहणी):</strong> {patient.grahani}</p>
                <p><strong>Shotha (शोथ):</strong> {patient.shotha}</p>
                {patient.otherComplaints && <p><strong>Other Complaints:</strong> {patient.otherComplaints}</p>}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
            <DiagnosisResults result={patient.diagnosis} isLoading={false} />
        </div>
      </div>
    </div>
  );
}
