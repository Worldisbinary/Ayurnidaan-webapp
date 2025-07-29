
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, ChevronLeft, Gem } from 'lucide-react';

export default function PremiumPage() {
  const router = useRouter();

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Gem className="w-8 h-8 text-primary" />
            <span>Special Price for BAMS Students</span>
        </h2>
        <Button variant="outline" onClick={() => router.back()}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
        </Button>
      </div>
      
      <p className="text-lg text-muted-foreground">
        छात्रों के लिए विशेष मूल्य पर उन्नत नैदानिक ​​सुविधाओं, गहन विश्लेषण और प्राथमिकता समर्थन तक विशेष पहुंच प्राप्त करें।
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <Card className="shadow-lg border-2 border-primary/30 transform hover:scale-105 transition-transform duration-300">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-headline">Monthly Plan</CardTitle>
            <CardDescription>Perfect for getting started</CardDescription>
            <div className="text-4xl font-bold my-4">
              ₹3000<span className="text-base font-normal text-muted-foreground">/month</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Unlimited Patient Diagnoses</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Advanced Reporting</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Email Support</span>
              </li>
            </ul>
            <Button className="w-full text-lg py-6 mt-4">Choose Monthly</Button>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg border-2 border-primary transform hover:scale-105 transition-transform duration-300 relative">
            <div className="absolute -top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold">
                Best Value
            </div>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-headline">Yearly Plan</CardTitle>
            <CardDescription>Save big with our annual plan</CardDescription>
             <div className="text-4xl font-bold my-4">
              ₹28000<span className="text-base font-normal text-muted-foreground">/year</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-muted-foreground">
               <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Unlimited Patient Diagnoses</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Advanced Reporting</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Priority Phone & Email Support</span>
              </li>
               <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Access to Beta Features</span>
              </li>
            </ul>
            <Button className="w-full text-lg py-6 mt-4">Choose Yearly</Button>
          </CardContent>
        </Card>
      </div>

       <div className="text-center text-muted-foreground text-sm mt-8">
            <p>You can change your plan or cancel your subscription at any time.</p>
            <p>Payments are processed securely. By upgrading, you agree to our Terms of Service.</p>
        </div>
    </div>
  );
}


