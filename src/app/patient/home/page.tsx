
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit, Gem, Video, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { generateYogaVideo } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';


interface YogaVideo {
    title: string;
    description: string;
    prompt: string;
    videoUrl?: string; // This will hold the base64 data URI
}

const initialYogaVideos: YogaVideo[] = [
    {
        title: 'Surya Namaskar (Sun Salutation)',
        description: 'A foundational sequence of 12 powerful yoga poses that warms up the body and improves strength and flexibility.',
        prompt: 'Surya Namaskar',
    },
    {
        title: 'Pranayama (Breath Control)',
        description: 'Learn fundamental breathing techniques to calm your mind, reduce stress, and energize your body.',
        prompt: 'Pranayama breathing exercise',
    },
     {
        title: 'Vrikshasana (Tree Pose)',
        description: 'Improve your balance, concentration, and stability with this foundational standing pose that mimics the stillness of a tree.',
        prompt: 'Vrikshasana (Tree Pose)',
    },
     {
        title: 'Balasana (Child\'s Pose)',
        description: 'A gentle and restorative resting pose that helps to stretch the hips, thighs, and ankles while calming the mind.',
        prompt: 'Balasana (Child\'s Pose)',
    },
];


export default function PatientHomePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [videos, setVideos] = useState<YogaVideo[]>(initialYogaVideos);
  const [isGenerating, setIsGenerating] = useState(true); // Manages the video generation process
  const [generationFailed, setGenerationFailed] = useState(false);

  useEffect(() => {
    const generateVideos = async () => {
      setIsGenerating(true);
      setGenerationFailed(false);
       toast({
          title: "Generating Yoga Videos...",
          description: "This may take a minute or two. Please be patient.",
        });
      try {
        const videoPromises = initialYogaVideos.map(video => 
            generateYogaVideo({ prompt: video.prompt })
        );
        const videoDataUris = await Promise.all(videoPromises);

        const updatedVideos = initialYogaVideos.map((video, index) => ({
          ...video,
          videoUrl: videoDataUris[index],
        }));

        setVideos(updatedVideos);
         toast({
          title: "Videos Ready!",
          description: "Your personalized yoga videos have been generated.",
        });
      } catch (error) {
        console.error("Failed to generate videos:", error);
        toast({
          title: "Video Generation Failed",
          description: (error as Error).message || "Could not generate yoga videos. Please try again later.",
          variant: "destructive",
        });
        setGenerationFailed(true);
        // Keep initial state so the page is still usable
        setVideos(initialYogaVideos);
      } finally {
        setIsGenerating(false);
      }
    };

    generateVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="space-y-8">
        <Card className="bg-primary/10 border-primary/30 text-center p-8">
            <CardTitle className="text-3xl font-headline mb-2">Welcome to Your Wellness Journey</CardTitle>
            <CardDescription className="text-lg max-w-2xl mx-auto">
                Discover personalized Ayurvedic insights, track your health, and find balance with our guided resources.
            </CardDescription>
        </Card>

        {/* Premium Consultation Section */}
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl font-headline">
                    <BrainCircuit className="w-8 h-8 text-primary" />
                    AI-Powered Self Check-up
                </CardTitle>
                <CardDescription>
                    Get a personalized Ayurvedic analysis and recommendations from our advanced AI. This is a premium feature.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button onClick={() => router.push('/dashboard/premium')}>
                    <Gem className="mr-2" />
                    Start Premium Check-up
                </Button>
            </CardContent>
        </Card>


        {/* Yoga Section */}
        <div>
            <h2 className="text-3xl font-bold tracking-tight mb-4 flex items-center gap-2">
                <Video className="w-8 h-8 text-primary"/>
                Yoga & Wellness
            </h2>
             {isGenerating && (
                 <div className="text-center p-4 bg-muted rounded-lg">
                    <Loader2 className="w-8 h-8 mx-auto animate-spin text-primary mb-2" />
                    <p className="text-muted-foreground">Our AI is generating your animated yoga videos...</p>
                    <p className="text-xs text-muted-foreground">This may take up to a minute.</p>
                </div>
            )}
            <div className="grid gap-6 md:grid-cols-2 mt-4">
               
                {videos.map((video, index) => (
                    <Card key={index} className="overflow-hidden hover:shadow-xl hover:ring-2 hover:ring-primary/50 transition-all duration-300 h-full flex flex-col">
                        {isGenerating || generationFailed ? (
                            <Skeleton className="w-full h-48" />
                        ) : (
                             <video 
                                src={video.videoUrl} 
                                controls 
                                className="w-full h-48 object-cover bg-black"
                            >
                                Your browser does not support the video tag.
                            </video>
                        )}
                        <CardHeader>
                           {isGenerating ? <Skeleton className="h-6 w-3/4" /> : <CardTitle>{video.title}</CardTitle>}
                        </CardHeader>
                        <CardContent className="flex-grow">
                             {isGenerating ? (
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-5/6" />
                                </div>
                             ) : (
                                <p className="text-muted-foreground">{video.description}</p>
                             )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    </div>
  );
}
