
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft } from 'lucide-react';

export default function AshtangaHridayamPage() {
  const router = useRouter();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Ashtanga Hridayam (अष्टाङ्गहृदयम्)</h2>
        <Button variant="outline" onClick={() => router.back()}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Sutra Sthana, Chapter 1: Ayushkamiya Adhyaya</CardTitle>
          <CardDescription>
            Desire for a Long Life
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
                  <CardTitle>अथातो आयुषकामीयमध्यायं व्याख्यास्यामः ||१||</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <ScrollArea className="h-96 w-full rounded-md border p-4">
                        <p className="text-lg leading-relaxed font-serif">
                            इति ह स्माहुरात्रेयादयो महर्षयः ||२||<br/><br/>
                            
                            रागदिरोगान् सततानुषक्तान्<br/>
                            अशेषकायप्रसृतान् अशेषान् |<br/>
                            औत्सुक्यमोहारतिदान् जघान<br/>
                            योऽपूर्ववैद्याय नमोऽस्तु तस्मै ||३||<br/><br/>

                            आयुः कामयमानेन धर्मार्थसुखसाधनम् |<br/>
                            आयुर्वेदोपदेशेषु विधेयः परमादरः ||४||<br/><br/>

                            ... (Content continues)
                        </p>
                    </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="english">
              <Card>
                <CardHeader>
                  <CardTitle>Now we shall expound the chapter on the desire for a long life.</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <ScrollArea className="h-96 w-full rounded-md border p-4">
                        <p className="text-lg leading-relaxed">
                            Thus said the great sages, Atreya and others. ||2||<br/><br/>
                            
                            Salutations to that Unprecedented Physician who destroyed all diseases like attachment (raga), which are constantly associated, which have spread throughout the body, and which cause eagerness, delusion, and distress. ||3||<br/><br/>

                            One who desires a long life, which is the means to attain Dharma (righteousness), Artha (wealth), and Sukha (happiness), should have the utmost respect for the teachings of Ayurveda. ||4||<br/><br/>
                            
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
