
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';

export default function SupplementsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Supplements</h2>
        <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Supplement
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Supplement Inventory</CardTitle>
          <CardDescription>
            Manage your inventory of Ayurvedic supplements.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground">No supplements added yet.</p>
            <p className="text-sm text-muted-foreground">Click "Add Supplement" to get started.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
