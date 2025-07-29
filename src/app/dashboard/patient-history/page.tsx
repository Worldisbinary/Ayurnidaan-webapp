
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search } from 'lucide-react';

const patients = [
    { id: 'PID-001', name: 'Rohan Sharma', lastVisit: '2024-07-15', dosha: 'Pitta-Kapha' },
    { id: 'PID-002', name: 'Priya Patel', lastVisit: '2024-07-12', dosha: 'Vata' },
    { id: 'PID-003', name: 'Amit Singh', lastVisit: '2024-07-10', dosha: 'Kapha' },
    { id: 'PID-004', name: 'Sunita Devi', lastVisit: '2024-07-08', dosha: 'Pitta' },
];

export default function PatientHistoryPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
       <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Past Patients</h2>
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
                <Input placeholder="Search by name or ID..." className="pl-8" />
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
              {patients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>{patient.id}</TableCell>
                  <TableCell className="font-medium">{patient.name}</TableCell>
                  <TableCell>{patient.lastVisit}</TableCell>
                  <TableCell>{patient.dosha}</TableCell>
                  <TableCell>
                    <Button variant="outline">View Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
