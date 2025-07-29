
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Leaf, User, Key, Phone, LogIn } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { auth } from '@/lib/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber, GoogleAuthProvider, signInWithPopup, type ConfirmationResult } from 'firebase/auth';
import { useToast } from "@/hooks/use-toast";

// Extend the Window interface to include recaptchaVerifier
declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
    confirmationResult?: ConfirmationResult;
  }
}

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [otpSent, setOtpSent] = useState(false);

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': (response: any) => {
          // reCAPTCHA solved.
        }
      });
    }
    return window.recaptchaVerifier;
  };

  const handlePhoneLogin = async () => {
    if (phone.length !== 10) {
        toast({ title: "Error", description: "Please enter a valid 10-digit phone number.", variant: "destructive" });
        return;
    }
    try {
        const appVerifier = setupRecaptcha();
        const formattedPhone = `+91${phone}`;
        const result = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
        setConfirmationResult(result);
        setOtpSent(true);
        toast({ title: "OTP Sent", description: "Please check your phone for the verification code." });
    } catch (error: any) {
        console.error("Error sending OTP:", error);
        toast({ title: "Error", description: `Failed to send OTP: ${error.message}`, variant: "destructive" });
    }
  };

  const handleVerifyOtp = async () => {
    if (!confirmationResult) {
        toast({ title: "Error", description: "Confirmation result not found. Please try sending OTP again.", variant: "destructive" });
        return;
    }
    if (otp.length !== 6) {
        toast({ title: "Error", description: "Please enter a valid 6-digit OTP.", variant: "destructive" });
        return;
    }
    try {
        await confirmationResult.confirm(otp);
        toast({ title: "Success", description: "You have been successfully logged in." });
        router.push('/dashboard');
    } catch (error: any) {
        console.error("Error verifying OTP:", error);
        toast({ title: "Error", description: `Failed to verify OTP: ${error.message}`, variant: "destructive" });
    }
  };
  
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast({ title: "Success", description: "You have been successfully logged in with Google." });
      router.push('/dashboard');
    } catch (error: any) {
       console.error("Error with Google login:", error);
       toast({ title: "Error", description: `Google sign-in failed: ${error.message}`, variant: "destructive" });
    }
  }

  const handleGuestLogin = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-primary/20">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Leaf className="w-10 h-10 text-primary" />
            <h1 className="text-4xl font-headline font-bold text-primary-foreground">Ayurnidaan</h1>
          </div>
          <CardTitle className="text-2xl font-headline">Welcome Back</CardTitle>
          <CardDescription>Sign in or continue as a guest.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Button variant="secondary" className="w-full text-lg py-6" onClick={handleGuestLogin}>
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
            {!otpSent ? (
              <>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter 10-digit mobile number"
                    className="pl-10"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <Button onClick={handlePhoneLogin} className="w-full text-lg py-6">
                  <LogIn className="mr-2" />
                  Send OTP
                </Button>
              </>
            ) : (
               <>
                <div className="relative">
                   <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                        id="otp"
                        type="text"
                        placeholder="Enter OTP"
                        className="pl-10"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                </div>
                <Button onClick={handleVerifyOtp} className="w-full text-lg py-6">
                  Verify OTP & Sign In
                </Button>
              </>
            )}
            
          </div>

          <div id="recaptcha-container"></div>

          <div className="grid grid-cols-1 gap-4">
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
