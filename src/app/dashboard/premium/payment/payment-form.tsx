
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, CreditCard, Lock, QrCode, Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from 'react';
import { createRazorpayOrder } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function PaymentForm() {
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan');
  
  const [isLoading, setIsLoading] = useState(false);
  const [upiId, setUpiId] = useState('');

  const planDetails = {
    monthly: { name: 'Monthly Plan', price: 3000, priceFormatted: '₹3,000' },
    yearly: { name: 'Yearly Plan', price: 28000, priceFormatted: '₹28,000' },
  };

  const currentPlan = plan === 'yearly' ? planDetails.yearly : planDetails.monthly;

  // Dynamically load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
        document.body.removeChild(script);
    }
  }, []);

  const handlePayment = async (method: 'card' | 'upi') => {
    if (method === 'upi' && !upiId) {
        toast({
            title: 'UPI ID Required',
            description: 'Please enter your UPI ID to proceed.',
            variant: 'destructive'
        });
        return;
    }
    
    setIsLoading(true);

    try {
        const order = await createRazorpayOrder({ amount: currentPlan.price });

        if (!order || !order.id) {
            throw new Error('Order creation failed.');
        }

        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Ayurnidaan Premium',
            description: `Payment for ${currentPlan.name}`,
            order_id: order.id,
            handler: function (response: any) {
                toast({
                    title: 'Payment Successful',
                    description: `Transaction ID: ${response.razorpay_payment_id}`
                });
                router.push('/dashboard');
            },
            prefill: {
                // You can prefill user details here if available
                name: 'Test User',
                email: 'test.user@example.com',
                contact: '9999999999',
            },
            notes: {
                plan: currentPlan.name,
            },
            theme: {
                color: '#F59E0B', // Corresponds to primary color
            },
            modal: {
                ondismiss: function() {
                    setIsLoading(false);
                    toast({
                        title: 'Payment Canceled',
                        description: 'The payment window was closed.',
                        variant: 'destructive'
                    });
                }
            },
            method: {
                upi: method === 'upi',
                card: method === 'card',
            },
            ...(method === 'upi' && {
                upi: {
                    flow: 'collect',
                    vpa: upiId,
                }
            })
        };

        const rzp = new window.Razorpay(options);
        rzp.open();

    } catch (error) {
      console.error(error);
      toast({
        title: 'Payment Error',
        description: (error as Error).message || 'An unexpected error occurred.',
        variant: 'destructive',
      });
      setIsLoading(false);
    }
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
              <CardDescription>All transactions are secure. Choose your payment method.</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="card" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="card">
                        <CreditCard className="mr-2 h-4 w-4" /> Card
                    </TabsTrigger>
                    <TabsTrigger value="upi">
                        <QrCode className="mr-2 h-4 w-4" /> UPI
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="card" className="pt-6">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="card-name">Name on Card</Label>
                            <Input id="card-name" placeholder="e.g., John Doe" disabled={isLoading} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="card-number">Card Number</Label>
                            <Input id="card-number" placeholder="XXXX XXXX XXXX XXXX" disabled={isLoading}/>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="expiry-date">Expiry Date</Label>
                                <Input id="expiry-date" placeholder="MM/YY" disabled={isLoading}/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cvc">CVC</Label>
                                <Input id="cvc" placeholder="XXX" disabled={isLoading}/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="country">Country</Label>
                                <Select disabled={isLoading}>
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
                        <Button onClick={() => handlePayment('card')} disabled={isLoading} className="w-full text-lg py-6 mt-4">
                           {isLoading ? <Loader2 className="mr-2 animate-spin" /> : <Lock className="mr-2" />}
                            Pay {currentPlan.priceFormatted} securely
                        </Button>
                    </div>
                </TabsContent>
                <TabsContent value="upi" className="pt-6">
                   <div className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="upi-id">UPI ID (VPA)</Label>
                            <Input 
                                id="upi-id" 
                                placeholder="yourname@bank" 
                                value={upiId}
                                onChange={(e) => setUpiId(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>
                        <p className="text-xs text-muted-foreground">
                            A payment request will be sent to your UPI app.
                        </p>
                        <Button onClick={() => handlePayment('upi')} disabled={isLoading} className="w-full text-lg py-6 mt-4">
                           {isLoading ? <Loader2 className="mr-2 animate-spin" /> : <Lock className="mr-2" />}
                            Pay {currentPlan.priceFormatted} via UPI
                        </Button>
                   </div>
                </TabsContent>
              </Tabs>
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
                        <span className="font-semibold">{currentPlan.priceFormatted}</span>
                    </div>
                     <div className="border-t border-border my-4"></div>
                     <div className="flex justify-between items-center text-lg">
                        <span className="font-bold">Total:</span>
                        <span className="font-bold text-primary">{currentPlan.priceFormatted}</span>
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
