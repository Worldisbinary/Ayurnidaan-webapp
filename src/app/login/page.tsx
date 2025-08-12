
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Leaf, Loader2, KeyRound, UserCheck, Briefcase, User } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { auth } from '@/lib/firebase';
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  onAuthStateChanged, 
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
  signInAnonymously
} from 'firebase/auth';
import { useToast } from "@/hooks/use-toast";

export default function UnifiedLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isPhoneLoading, setIsPhoneLoading] = useState(false);
  const [isGuestLoading, setIsGuestLoading] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

  // This effect redirects the user if they are already logged in.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoading(false);
        // If a user is logged in, we don't automatically redirect.
        // The choice of dashboard happens on role button clicks.
      } else {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLoginAndRedirect = async (loginAction: () => Promise<any>, role: 'doctor' | 'patient') => {
    // Set loading state for the specific login type if needed
    try {
      await loginAction();
      // On successful login, Firebase's onAuthStateChanged will trigger.
      // We can then redirect.
      if (role === 'doctor') {
        router.push('/dashboard');
      } else {
        router.push('/patient/home');
      }
      toast({ title: "Login Successful", description: "Redirecting..." });
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Login Failed",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive"
      });
    }
  };


  const handleGoogleLogin = (role: 'doctor' | 'patient') => {
    setIsGoogleLoading(true);
    const provider = new GoogleAuthProvider();
    handleLoginAndRedirect(() => signInWithPopup(auth, provider), role)
      .finally(() => setIsGoogleLoading(false));
  }

  const handleGuestLogin = (role: 'doctor' | 'patient') => {
    setIsGuestLoading(true);
    handleLoginAndRedirect(() => signInAnonymously(auth), role)
      .finally(() => setIsGuestLoading(false));
  }
  
  const handleSendOtp = async () => {
    if (!phoneNumber || !/^\+[1-9]\d{1,14}$/.test(phoneNumber)) {
        toast({ title: "Invalid Phone Number", description: "Please enter a valid phone number including the country code (e.g., +91...)", variant: "destructive"});
        return;
    }
    setIsPhoneLoading(true);
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': () => {},
      });
    }
    const appVerifier = (window as any).recaptchaVerifier;
    try {
        const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
        setConfirmationResult(result);
        toast({ title: "OTP Sent", description: "Please check your phone for the verification code." });
    } catch (error: any) {
        console.error(error);
        toast({ title: "Failed to Send OTP", description: error.message, variant: "destructive" });
    } finally {
        setIsPhoneLoading(false);
    }
  }

  const handleVerifyOtp = async (role: 'doctor' | 'patient') => {
    if (!otp || otp.length !== 6) {
        toast({ title: "Invalid OTP", description: "Please enter the 6-digit OTP.", variant: "destructive" });
        return;
    }
    if (!confirmationResult) {
        toast({ title: "Error", description: "Please send an OTP first.", variant: "destructive" });
        return;
    }
    setIsPhoneLoading(true);
    handleLoginAndRedirect(() => confirmationResult.confirm(otp), role)
      .finally(() => setIsPhoneLoading(false));
  }
  
  if (isLoading) {
      return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
             <div className="flex items-center gap-2 md:gap-4">
                <Leaf className="w-12 h-12 md:w-16 md:h-16 text-primary animate-pulse" />
                <h1 className="text-4xl md:text-6xl font-headline font-bold text-center">
                    Ayurnidaan
                </h1>
            </div>
            <p className="text-muted-foreground mt-4 text-center">
                Loading...
            </p>
        </div>
      )
  }

  const LoginCard = ({ role }: { role: 'doctor' | 'patient' }) => (
     <Card className="w-full max-w-md shadow-2xl border-primary/20">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center gap-3 mb-2">
            {role === 'doctor' ? <Briefcase className="w-10 h-10 text-primary" /> : <User className="w-10 h-10 text-primary" />}
          </div>
          <CardTitle className="text-2xl font-headline">
            {role === 'doctor' ? "Doctor's Portal" : "Patient's Portal"}
          </CardTitle>
          <CardDescription>Sign in or continue as a guest.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            {!confirmationResult ? (
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor={`phone-${role}`}>Phone Number</Label>
                        <div className="flex gap-2">
                            <Input 
                                id={`phone-${role}`}
                                type="tel" 
                                placeholder="+91 12345 67890" 
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                disabled={isPhoneLoading}
                            />
                            <Button onClick={handleSendOtp} disabled={isPhoneLoading}>
                                {isPhoneLoading ? <Loader2 className="animate-spin"/> : "Send OTP"}
                            </Button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="otp">Enter OTP</Label>
                        <Input 
                            id="otp" 
                            type="text" 
                            placeholder="123456"
                            onChange={(e) => setOtp(e.target.value)} 
                            disabled={isPhoneLoading}
                        />
                    </div>
                    <Button onClick={() => handleVerifyOtp(role)} className="w-full" disabled={isPhoneLoading}>
                        {isPhoneLoading ? <Loader2 className="mr-2 animate-spin" /> : <KeyRound className="mr-2" />}
                        Verify OTP & Sign In
                    </Button>
                </div>
            )}
            
             <div className="relative">
                <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or</span>
                </div>
            </div>

            <div className="space-y-2">
                <Button variant="outline" onClick={() => handleGoogleLogin(role)} disabled={isGoogleLoading || isGuestLoading} className="w-full">
                {isGoogleLoading ? <Loader2 className="mr-2 animate-spin" /> : <FcGoogle className="mr-2" />}
                Sign in with Google
                </Button>
                <Button variant="secondary" onClick={() => handleGuestLogin(role)} disabled={isGuestLoading || isGoogleLoading || isPhoneLoading} className="w-full">
                {isGuestLoading ? <Loader2 className="mr-2 animate-spin" /> : <UserCheck className="mr-2" />}
                Continue as Guest
                </Button>
            </div>
        </CardContent>
      </Card>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Leaf className="w-10 h-10 text-primary" />
            <h1 className="text-4xl font-headline font-bold">Ayurnidaan</h1>
          </div>
          <p className="text-muted-foreground">AI-Assisted Ayurvedic Diagnosis</p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <LoginCard role="doctor" />
        <LoginCard role="patient" />
      </div>
       
      <div id="recaptcha-container"></div>

       <footer className="text-center py-4 text-muted-foreground text-sm mt-8">
        © {new Date().getFullYear()} Ayurnidaan. All rights reserved.
      </footer>
    </div>
  );
}
