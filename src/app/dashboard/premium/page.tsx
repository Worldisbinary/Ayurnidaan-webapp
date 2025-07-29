
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, ChevronLeft, Gem } from 'lucide-react';

export default function PremiumPage() {
  const router = useRouter();

  const handleChoosePlan = (plan: string) => {
    router.push(`/dashboard/premium/payment?plan=${plan}`);
  };

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
        Unlock advanced diagnostic tools, in-depth analysis, and priority support, exclusively for students.
      </p>

      <div className="grid grid-cols-2 gap-4 mt-8">
        <Card className="shadow-lg border-2 border-primary/30 flex flex-col">
          <CardHeader className="text-center p-4">
            <CardTitle className="text-lg font-headline">Monthly Plan</CardTitle>
            <CardDescription className="text-xs">Perfect for getting started</CardDescription>
            <div className="text-2xl font-bold my-2">
              ₹3000<span className="text-xs font-normal text-muted-foreground">/mo</span>
            </div>
          </CardHeader>
          <CardContent className="p-4 space-y-2 flex-grow">
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Unlimited Diagnoses</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Advanced Reporting</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Email Support</span>
              </li>
            </ul>
          </CardContent>
          <div className="p-4 mt-auto">
            <Button className="w-full text-sm py-2" onClick={() => handleChoosePlan('monthly')}>Choose Monthly</Button>
          </div>
        </Card>
        
        <Card className="shadow-lg border-2 border-primary relative flex flex-col">
            <div className="absolute -top-3 right-2 bg-primary text-primary-foreground px-2 py-0.5 rounded-full text-xs font-bold">
                Best Value
            </div>
          <CardHeader className="text-center p-4">
            <CardTitle className="text-lg font-headline">Yearly Plan</CardTitle>
            <CardDescription className="text-xs">Save with annual plan</CardDescription>
             <div className="text-2xl font-bold my-2">
              ₹28000<span className="text-xs font-normal text-muted-foreground">/yr</span>
            </div>
          </CardHeader>
          <CardContent className="p-4 space-y-2 flex-grow">
            <ul className="space-y-1 text-xs text-muted-foreground">
               <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Unlimited Diagnoses</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Advanced Reporting</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Priority Support</span>
              </li>
               <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Beta Features</span>
              </li>
            </ul>
          </CardContent>
           <div className="p-4 mt-auto">
            <Button className="w-full text-sm py-2" onClick={() => handleChoosePlan('yearly')}>Choose Yearly</Button>
          </div>
        </Card>
      </div>

       <div className="text-center text-muted-foreground text-xs mt-8">
            <p>You can change your plan or cancel your subscription at any time.</p>
            <p>Payments are processed securely. By upgrading, you agree to our Terms of Service.</p>
        </div>
    </div>
  );
}
