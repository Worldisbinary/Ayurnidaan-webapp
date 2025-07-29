
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, ChevronLeft } from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  lastVisit: string;
  dosha: string;
}

export default function PatientHistoryPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    // This effect now correctly fetches data from localStorage on mount.
    if (typeof window !== 'undefined') {
      const storedPatients = localStorage.getItem('patients');
      if (storedPatients) {
        try {
          const parsedPatients = JSON.parse(storedPatients);
          setPatients(parsedPatients);
          setFilteredPatients(parsedPatients);
        } catch (error) {
          console.error("Failed to parse patients from localStorage", error);
          setPatients([]);
          setFilteredPatients([]);
        }
      }
    }
  }, []); 

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    if (term) {
      const filtered = patients.filter(
        (patient) =>
          patient.name.toLowerCase().includes(term) ||
          patient.id.toLowerCase().includes(term)
      );
      setFilteredPatients(filtered);
    } else {
      setFilteredPatients(patients);
    }
  };

  const handleViewDetails = (patientId: string) => {
    router.push(`/dashboard/patient-history/${patientId}`);
  };
  
  return (
    <div className="space-y-4">
       <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Past Patients</h2>
             <Button variant="outline" onClick={() => router.back()}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
            </Button>
        </div>
      <Card>
        <CardHeader>
          <CardTitle>Registered Patients</CardTitle>
          <CardDescription>
            Search and view details of previously registered patients.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="mb-4 relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by name or ID..." className="pl-8" onChange={handleSearch} />
            </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead>Diagnosed Dosha</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>{patient.id}</TableCell>
                    <TableCell className="font-medium">{patient.name}</TableCell>
                    <TableCell>{patient.lastVisit}</TableCell>
                    <TableCell>{patient.dosha || 'N/A'}</TableCell>
                    <TableCell>
                      <Button variant="outline" onClick={() => handleViewDetails(patient.id)}>View Details</Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No patient records found. Add a patient from the 'New Patient' page.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
