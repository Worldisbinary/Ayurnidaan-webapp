
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
  const router = useRouter();

  useEffect(() => {
    // We are adding this key to the dependency array to force a re-render 
    // when the user navigates back to this page.
    const key = Math.random();

    if (typeof window !== 'undefined') {
      const storedPatients = localStorage.getItem('patients');
      if (storedPatients) {
        const parsedPatients = JSON.parse(storedPatients);
        setPatients(parsedPatients);
        setFilteredPatients(parsedPatients);
      }
    }
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm) {
      const filtered = patients.filter(
        (patient) =>
          patient.name.toLowerCase().includes(searchTerm) ||
          patient.id.toLowerCase().includes(searchTerm)
      );
      setFilteredPatients(filtered);
    } else {
      setFilteredPatients(patients);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedPatients = localStorage.getItem('patients');
      if (storedPatients) {
        const parsedPatients = JSON.parse(storedPatients);
        setPatients(parsedPatients);
        setFilteredPatients(parsedPatients);
      }
    }
  }, [router]);

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
                    <TableCell>{patient.dosha}</TableCell>
                    <TableCell>
                      <Button variant="outline">View Details</Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No patient records found.
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
