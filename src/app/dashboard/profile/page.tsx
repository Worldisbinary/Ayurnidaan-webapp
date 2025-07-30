
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChevronLeft, User, LogOut, Users, Award } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth';


export default function ProfilePage() {
  const router = useRouter();
  const [patientCount, setPatientCount] = useState(0);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });

    if (typeof window !== 'undefined') {
      try {
        const storedPatients = localStorage.getItem('patients');
        if (storedPatients) {
          const patients = JSON.parse(storedPatients);
          setPatientCount(patients.length);
        }
      } catch (error) {
        console.error("Failed to parse patient data from localStorage", error);
      }
    }
    
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  
  const handleLogout = async () => {
    await auth.signOut();
    router.push('/login');
  };

  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  }


  return (
    <div className="flex-1 space-y-4 pt-6 max-w-xl mx-auto">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Your Profile</h2>
        <Button variant="outline" onClick={() => router.back()}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardHeader className="items-center text-center p-6">
            <Avatar className="w-24 h-24 mb-4 border-2 border-primary">
                <AvatarImage src={user?.photoURL || `https://placehold.co/100x100.png`} data-ai-hint="doctor portrait" alt={user?.displayName || 'User'} />
                <AvatarFallback>{user ? getInitials(user.displayName) : 'U'}</AvatarFallback>
            </Avatar>
          <CardTitle className="text-2xl font-headline">{user?.displayName || 'Welcome, User'}</CardTitle>
        </CardHeader>
        <CardContent className="p-6 pt-0 text-center">
            <p className="text-muted-foreground text-sm">{user?.email || user?.phoneNumber || 'No contact info available'}</p>
        </CardContent>
      </Card>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-headline">Statistics</CardTitle>
        </CardHeader>
        <CardContent 
          className="cursor-pointer"
          onClick={() => router.push('/dashboard/patient-history')}
        >
          <div className="flex justify-around text-center">
            <div className="flex flex-col items-center gap-2">
              <Users className="w-8 h-8 text-primary"/>
              <p className="text-2xl font-bold">{patientCount}</p>
              <p className="text-sm text-muted-foreground">Patients Registered</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
            <CardTitle className="text-xl font-headline">Account</CardTitle>
        </CardHeader>
        <CardContent className="mt-4">
          <Button variant="destructive" className="w-full" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4"/>
              Logout
          </Button>
        </CardContent>
      </Card>

    </div>
  );
}
