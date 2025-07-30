
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Leaf, User, Key, Phone, LogIn } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { auth } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { useToast } from "@/hooks/use-toast";


export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isProcessingLogin, setIsProcessingLogin] = useState(true); // Start as true

  useEffect(() => {
    const processRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          // This means the user has just been redirected back from Google.
          toast({ title: "Success", description: "You have been successfully logged in with Google." });
          router.push('/dashboard');
        } else {
           setIsProcessingLogin(false); // No user, stop loading
        }
      } catch (error: any) {
        console.error("Error with Google redirect login:", error);
        toast({ 
         title: "Authentication Error", 
         description: `Google sign-in failed. Please ensure your domain is authorized and the OAuth consent screen is configured correctly. Error: ${error.code}`, 
         variant: "destructive" 
       });
       setIsProcessingLogin(false); // Error, stop loading
      }
    };
    
    processRedirectResult();
  }, [router, toast]);
  
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    // We are now using signInWithRedirect instead of signInWithPopup
    await signInWithRedirect(auth, provider);
  }

  const handleGuestLogin = () => {
    router.push('/dashboard');
  };
  
  if (isProcessingLogin) {
      return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
             <div className="flex items-center gap-2 md:gap-4">
                <Leaf className="w-12 h-12 md:w-16 md:h-16 text-primary animate-pulse" />
                <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary-foreground text-center">
                    Ayurnidaan
                </h1>
            </div>
            <p className="text-muted-foreground mt-4 text-center">
                Checking authentication status...
            </p>
        </div>
      )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-primary/20">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Leaf className="w-10 h-10 text-primary" />
            <h1 className="text-4xl font-headline font-bold text-primary-foreground">Ayurnidaan</h1>
          </div>
          <CardTitle className="text-2xl font-headline">Explore the App</CardTitle>
          <CardDescription>To see the full application, please continue as a guest or sign in with Google.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Button className="w-full text-lg py-6" onClick={handleGuestLogin}>
                <User className="mr-2" />
                Continue as Guest
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or sign in with</span>
            </div>
          </div>
          
           <div className="space-y-4">
            <Button variant="outline" className="w-full text-lg py-6" onClick={handleGoogleLogin}>
              <FcGoogle className="mr-2 w-6 h-6" />
              Google
            </Button>
          </div>

        </CardContent>
      </Card>
      <footer className="text-center py-4 text-muted-foreground text-sm mt-8">
        © {new Date().getFullYear()} Ayurnidaan. All rights reserved.
      </footer>
    </div>
  );
}
