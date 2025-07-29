
'use client';

import { useState } from 'react';
import type { SuggestDiagnosesOutput, SuggestDiagnosesInput } from '@/ai/flows/suggest-diagnoses';
import { Leaf, UserPlus, Users, LogOut } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { getDiagnosis } from '@/app/actions';
import { DiagnosisForm } from '@/components/diagnosis-form';
import { DiagnosisResults } from '@/components/diagnosis-results';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';

function RegisteredPatientsTab() {
  // Placeholder for registered patients list
  return (
    <Card>
      <CardHeader>
        <CardTitle>Registered Patients</CardTitle>
      </CardHeader>
      <CardContent>
        <p>A list of registered patients will be displayed here in the future.</p>
        {/* Example patient list item */}
        <div className="flex items-center justify-between p-4 mt-4 border rounded-lg">
          <div>
            <p className="font-semibold">John Doe</p>
            <p className="text-sm text-muted-foreground">Last visit: 2024-07-20</p>
          </div>
          <Button variant="outline">View Details</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const [result, setResult] = useState<SuggestDiagnosesOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

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
  
  const handleLogout = () => {
    router.push('/login');
  };


  return (
    <div className="min-h-screen bg-background text-foreground font-body flex flex-col">
      <header className="py-4 shrink-0 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
           <div className="flex items-center gap-3">
             <Leaf className="w-8 h-8 text-primary" />
             <h1 className="text-3xl font-headline font-bold text-primary-foreground">AyurVision Dashboard</h1>
           </div>
           <Button variant="ghost" onClick={handleLogout}>
             <LogOut className="mr-2 h-5 w-5" />
             Logout
           </Button>
        </div>
      </header>
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="new-patient">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="new-patient">
              <UserPlus className="mr-2" /> New Patient Entry
            </TabsTrigger>
            <TabsTrigger value="registered-patients">
              <Users className="mr-2" /> Registered Patients
            </TabsTrigger>
          </TabsList>
          <TabsContent value="new-patient">
             <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12 gap-8 mt-6">
                <DiagnosisForm onDiagnose={handleDiagnosis} isLoading={isLoading} />
                <div className="space-y-8">
                  <DiagnosisResults result={result} isLoading={isLoading} />
                </div>
              </div>
          </TabsContent>
          <TabsContent value="registered-patients">
            <RegisteredPatientsTab />
          </TabsContent>
        </Tabs>
      </main>
      <footer className="text-center py-4 text-muted-foreground text-sm shrink-0 border-t">
        © {new Date().getFullYear()} AyurVision. All rights reserved.
      </footer>
    </div>
  );
}
