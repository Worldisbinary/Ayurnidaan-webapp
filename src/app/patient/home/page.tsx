
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit, Gem, Video } from 'lucide-react';
import Image from 'next/image';

interface YogaVideo {
    title: string;
    description: string;
    imageHint: string;
    image: string;
}

const yogaVideos: YogaVideo[] = [
    {
        title: 'Surya Namaskar (Sun Salutation)',
        description: 'A sequence of 12 powerful yoga poses to improve strength and flexibility.',
        imageHint: 'yoga sun salutation',
        image: 'https://placehold.co/600x400.png'
    },
    {
        title: 'Pranayama (Breath Control)',
        description: 'Learn breathing techniques to calm your mind and energize your body.',
        imageHint: 'meditation breathing',
        image: 'https://placehold.co/600x400.png'
    },
     {
        title: 'Vrikshasana (Tree Pose)',
        description: 'Improve balance and stability with this foundational standing pose.',
        imageHint: 'yoga tree pose',
        image: 'https://placehold.co/600x400.png'
    },
     {
        title: 'Balasana (Child\'s Pose)',
        description: 'A gentle resting pose that helps to stretch the hips, thighs, and ankles.',
        imageHint: 'yoga childs pose',
        image: 'https://placehold.co/600x400.png'
    }
];


export default function PatientHomePage() {
  const router = useRouter();

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
            <div className="grid gap-6 md:grid-cols-2">
                {yogaVideos.map((video) => (
                    <Card key={video.title} className="overflow-hidden hover:shadow-xl transition-shadow">
                        <Image 
                            src={video.image}
                            alt={video.title}
                            data-ai-hint={video.imageHint}
                            width={600}
                            height={400}
                            className="object-cover w-full h-48"
                        />
                        <CardHeader>
                            <CardTitle>{video.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{video.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    </div>
  );
}
