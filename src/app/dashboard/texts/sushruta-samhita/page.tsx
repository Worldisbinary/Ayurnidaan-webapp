
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft } from 'lucide-react';

export default function SushrutaSamhitaPage() {
  const router = useRouter();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Sushruta Samhita (सुश्रुत संहिता)</h2>
        <Button variant="outline" onClick={() => router.back()}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Sutra Sthana, Chapter 1: Vedotpatti Adhyaya</CardTitle>
          <CardDescription>
            The Origin of the Veda (Knowledge)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="sanskrit" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="sanskrit">Sanskrit (संस्कृत)</TabsTrigger>
              <TabsTrigger value="english">English</TabsTrigger>
            </TabsList>
            <TabsContent value="sanskrit">
              <Card>
                <CardHeader>
                  <CardTitle>अथातो वेदोत्पत्तिमध्यायं व्याख्यास्यामः ||१||</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <ScrollArea className="h-96 w-full rounded-md border p-4">
                        <p className="text-lg leading-relaxed font-serif">
                            यथोवाच भगवान् धन्वन्तरिः ||२||<br/><br/>
                            
                            अथ खलु शल्यहर्तारमौपधेनववैतरणौरभ्रपौष्कलावतकरवीर्यगोपुररक्षितसुश्रुतप्रभृतयः काशिराजं दिवोदासं धन्वन्तरिं प्रोचुः ||३||<br/><br/>

                            वयमभिवदामः, भगवन्, अस्मान् शल्यज्ञानमध्यापय ||४||<br/><br/>

                            ... (Content continues)
                        </p>
                    </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="english">
              <Card>
                <CardHeader>
                  <CardTitle>Now we shall expound the chapter on the origin of the Veda (of medical science).</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <ScrollArea className="h-96 w-full rounded-md border p-4">
                        <p className="text-lg leading-relaxed">
                            As said by Lord Dhanvantari. ||2||<br/><br/>
                            
                            Then, the surgeons Aupadhenava, Vaitarana, Aurabhra, Paushkalavata, Karavirya, Gopurarakshita, Sushruta, and others approached Divodasa Dhanvantari, the king of Kashi, and said: ||3||<br/><br/>

                            "We pay our respects, O Lord. Teach us the knowledge of surgery." ||4||<br/><br/>

                            ... (Content continues)
                        </p>
                    </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
