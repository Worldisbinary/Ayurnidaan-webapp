
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import PaymentForm from './payment-form';

function PaymentFormSkeleton() {
    return (
        <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <Skeleton className="h-9 w-1/3" />
                <Skeleton className="h-9 w-24" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Skeleton className="h-96 w-full" />
                </div>
                <div className="lg:col-span-1">
                    <Skeleton className="h-64 w-full" />
                </div>
            </div>
        </div>
    )
}


export default function PaymentPage() {
  return (
    <Suspense fallback={<PaymentFormSkeleton />}>
      <PaymentForm />
    </Suspense>
  );
}
