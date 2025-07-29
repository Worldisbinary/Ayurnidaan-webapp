
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChevronLeft, User, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


export default function ProfilePage() {
  const router = useRouter();

  return (
    <div className="flex-1 space-y-4 pt-6 max-w-xl mx-auto">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
        <Button variant="outline" onClick={() => router.back()}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      <Card>
        <CardHeader className="items-center text-center">
            <Avatar className="w-24 h-24 mb-4">
                <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="user portrait" alt="User" />
                <AvatarFallback>U</AvatarFallback>
            </Avatar>
          <CardTitle className="text-2xl">Guest User</CardTitle>
          <CardDescription>
            guest.user@ayurnidaan.app
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-4">
          <Button variant="destructive" className="w-full" onClick={() => router.push('/login')}>
              <LogOut className="mr-2 h-4 w-4"/>
              Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
