
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft } from 'lucide-react';

export default function CharakaSamhitaPage() {
  const router = useRouter();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Charaka Samhita (चरक संहिता)</h2>
        <Button variant="outline" onClick={() => router.back()}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Sutra Sthana, Chapter 1: Deerghanjiviteeya Adhyaya</CardTitle>
          <CardDescription>
            The Quest for Longevity
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
                  <CardTitle>अथातो दीर्घञ्जीवितीयमध्यायं व्याख्यास्यामः ||१||</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <ScrollArea className="h-96 w-full rounded-md border p-4">
                        <p className="text-lg leading-relaxed font-serif">
                            इति ह स्माहुरात्रेयादयो महर्षयः ||२||<br/><br/>
                            
                            अथातो दीर्घञ्जीवितीयं नामाध्यायं व्याख्यास्यामः, यथोवाच भगवानात्रेयः ||३||<br/><br/>

                            दीर्घं जीवितमन्विच्छन् भरद्वाज उपागमत् |<br/>
                            इन्द्रमुग्रतपा बुद्ध्वा शरण्यममरेश्वरम् ||४||<br/><br/>

                            ब्रह्मणा हि यथाप्रोक्तमायुर्वेदं प्रजापतिः |<br/>
                            जग्राह निखिलेनादावश्विनौ तु पुनस्ततः ||५||<br/><br/>

                            अश्विभ्यां भगवान् शक्रः प्रतिपेदे ह केवलम् |<br/>
                            ऋषिप्रोक्तो भरद्वाजस्तस्माच्छक्रमुपागमत् ||६||<br/><br/>
                            
                            ... (Content continues)
                        </p>
                    </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="english">
              <Card>
                <CardHeader>
                  <CardTitle>Now we shall expound the chapter on the quest for longevity.</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <ScrollArea className="h-96 w-full rounded-md border p-4">
                        <p className="text-lg leading-relaxed">
                            Thus said the great sages, Atreya and others. ||2||<br/><br/>
                            
                            Now we shall explain the chapter named "Deerghanjivitiya" (The Quest for Longevity), as spoken by the revered Atreya. ||3||<br/><br/>

                            Seeking a long life, Bharadwaja, known for his rigorous penance, approached Indra, recognizing him as the refuge and the lord of the immortals. ||4||<br/><br/>

                            Prajapati first received the entire Ayurveda as propounded by Brahma. From him, the Ashvins received it. ||5||<br/><br/>

                            From the Ashvins, Lord Shakra (Indra) received the complete knowledge. Therefore, Bharadwaja, instructed by the sages, approached Indra. ||6||<br/><br/>
                            
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
