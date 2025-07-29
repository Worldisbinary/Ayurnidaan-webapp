
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChevronLeft } from 'lucide-react';

export default function SupplementsPage() {
  const router = useRouter();

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Supplements</h2>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Supplement Inventory</CardTitle>
          <CardDescription>
            Browse your inventory of Ayurvedic supplements.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground">No supplements are currently in the inventory.</p>
            <p className="text-sm text-muted-foreground">Supplements are managed via the backend.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
