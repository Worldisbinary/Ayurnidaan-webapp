
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Leaf, User, Phone, KeyRound, Loader2 } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { auth } from '@/lib/firebase';
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  onAuthStateChanged, 
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult
} from 'firebase/auth';
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isPhoneLoading, setIsPhoneLoading] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        toast({ title: "Success", description: "You are logged in." });
        router.push('/dashboard');
      } else {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router, toast]);

  const setupRecaptcha = () => {
    // Check if the verifier already exists to avoid re-rendering
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': (response: any) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          console.log("reCAPTCHA solved");
        },
        'expired-callback': () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            toast({ title: "reCAPTCHA Expired", description: "Please try sending the OTP again.", variant: "destructive" });
        }
      });
    }
  }

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // The onAuthStateChanged listener will handle the redirect
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Login Failed",
        description: error.message || "An unexpected error occurred with Google Sign-In.",
        variant: "destructive"
      });
    } finally {
      setIsGoogleLoading(false);
    }
  }
  
  const handleSendOtp = async () => {
    if (!phoneNumber || !/^\+[1-9]\d{1,14}$/.test(phoneNumber)) {
        toast({ title: "Invalid Phone Number", description: "Please enter a valid phone number including the country code (e.g., +91...)", variant: "destructive"});
        return;
    }
    setIsPhoneLoading(true);
    try {
        setupRecaptcha();
        const appVerifier = (window as any).recaptchaVerifier;
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

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
        toast({ title: "Invalid OTP", description: "Please enter the 6-digit OTP.", variant: "destructive" });
        return;
    }
    if (!confirmationResult) {
        toast({ title: "Error", description: "Please send an OTP first.", variant: "destructive" });
        return;
    }
    setIsPhoneLoading(true);
    try {
        await confirmationResult.confirm(otp);
        // onAuthStateChanged will handle successful login
    } catch (error: any) {
        console.error(error);
        toast({ title: "OTP Verification Failed", description: error.message, variant: "destructive" });
    } finally {
        setIsPhoneLoading(false);
    }
  }

  const handleGuestLogin = () => {
    router.push('/dashboard');
  };
  
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
            <h1 className="text-4xl font-headline font-bold">Ayurnidaan</h1>
          </div>
          <CardTitle className="text-2xl font-headline">Welcome Back</CardTitle>
          <CardDescription>Choose a sign-in method to continue.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <Button variant="outline" onClick={handleGuestLogin} className="w-full">
                <User className="mr-2" />
                Continue as Guest
            </Button>
            
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or sign in with</span>
                </div>
            </div>

            {!confirmationResult ? (
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="flex gap-2">
                            <Input 
                                id="phone" 
                                type="tel" 
                                placeholder="+91 12345 67890" 
                                value={phoneNumber}
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
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)} 
                            disabled={isPhoneLoading}
                        />
                    </div>
                    <Button onClick={handleVerifyOtp} className="w-full" disabled={isPhoneLoading}>
                        {isPhoneLoading ? <Loader2 className="mr-2 animate-spin" /> : <KeyRound className="mr-2" />}
                        Verify OTP & Sign In
                    </Button>
                </div>
            )}
            
            <div id="recaptcha-container"></div>
            
            <Button variant="outline" onClick={handleGoogleLogin} disabled={isGoogleLoading} className="w-full">
            {isGoogleLoading ? (
                <Loader2 className="mr-2 animate-spin" />
            ) : (
                <FcGoogle className="mr-2" />
            )}
            Google
            </Button>

        </CardContent>
      </Card>
       <footer className="text-center py-4 text-muted-foreground text-sm mt-8">
        © {new Date().getFullYear()} Ayurnidaan. All rights reserved.
      </footer>
    </div>
  );
}
