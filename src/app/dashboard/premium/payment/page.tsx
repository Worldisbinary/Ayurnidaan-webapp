
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, CreditCard, Lock } from 'lucide-react';

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan');

  const planDetails = {
    monthly: { name: 'Monthly Plan', price: '₹3,000' },
    yearly: { name: 'Yearly Plan', price: '₹28,000' },
  };

  const currentPlan = plan === 'yearly' ? planDetails.yearly : planDetails.monthly;

  const handlePayment = () => {
    // Placeholder for payment processing logic
    alert('Payment successful! (This is a demo)');
    router.push('/dashboard');
  };

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
         <h2 className="text-3xl font-bold tracking-tight">Complete Your Purchase</h2>
        <Button variant="outline" onClick={() => router.back()}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl font-headline">
                <CreditCard className="w-8 h-8 text-primary" />
                Payment Information
              </CardTitle>
              <CardDescription>Enter your payment details below. All transactions are secure.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="card-name">Name on Card</Label>
                <Input id="card-name" placeholder="e.g., John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input id="card-number" placeholder="XXXX XXXX XXXX XXXX" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="expiry-date">Expiry Date</Label>
                    <Input id="expiry-date" placeholder="MM/YY" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="XXX" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select>
                        <SelectTrigger id="country">
                            <SelectValue placeholder="Select Country" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="IN">India</SelectItem>
                            <SelectItem value="US">United States</SelectItem>
                            <SelectItem value="CA">Canada</SelectItem>
                             <SelectItem value="GB">United Kingdom</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
              </div>
               <Button onClick={handlePayment} className="w-full text-lg py-6 mt-4">
                <Lock className="mr-2" />
                Pay {currentPlan.price} securely
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
            <Card className="shadow-lg bg-accent/30">
                <CardHeader>
                    <CardTitle className="text-xl font-headline">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Selected Plan:</span>
                        <span className="font-semibold">{currentPlan.name}</span>
                    </div>
                     <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Price:</span>
                        <span className="font-semibold">{currentPlan.price}</span>
                    </div>
                     <div className="border-t border-border my-4"></div>
                     <div className="flex justify-between items-center text-lg">
                        <span className="font-bold">Total:</span>
                        <span className="font-bold text-primary">{currentPlan.price}</span>
                    </div>
                     <p className="text-xs text-muted-foreground text-center pt-4">
                        By completing your purchase, you agree to our Terms of Service.
                    </p>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
