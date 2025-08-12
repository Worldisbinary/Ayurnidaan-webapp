
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit, Gem, Video, PlayCircle } from 'lucide-react';
import Image from 'next/image';

interface YogaVideo {
    title: string;
    description: string;
    imageHint: string;
    image: string;
    videoUrl: string;
}

const yogaVideos: YogaVideo[] = [
    {
        title: 'Surya Namaskar (Sun Salutation)',
        description: 'A foundational sequence of 12 powerful yoga poses that warms up the body and improves strength and flexibility.',
        imageHint: 'yoga sun salutation',
        image: 'https://placehold.co/600x400.png',
        videoUrl: '#',
    },
    {
        title: 'Pranayama (Breath Control)',
        description: 'Learn fundamental breathing techniques to calm your mind, reduce stress, and energize your body.',
        imageHint: 'meditation breathing',
        image: 'https://placehold.co/600x400.png',
        videoUrl: '#',
    },
     {
        title: 'Vrikshasana (Tree Pose)',
        description: 'Improve your balance, concentration, and stability with this foundational standing pose that mimics the stillness of a tree.',
        imageHint: 'yoga tree pose',
        image: 'https://placehold.co/600x400.png',
        videoUrl: '#',
    },
     {
        title: 'Balasana (Child\'s Pose)',
        description: 'A gentle and restorative resting pose that helps to stretch the hips, thighs, and ankles while calming the mind.',
        imageHint: 'yoga childs pose',
        image: 'https://placehold.co/600x400.png',
        videoUrl: '#',
    },
    {
        title: 'Trikonasana (Triangle Pose)',
        description: 'A great standing pose to stretch the sides of the body, open the hips, and improve core strength.',
        imageHint: 'yoga triangle pose',
        image: 'https://placehold.co/600x400.png',
        videoUrl: '#',
    },
    {
        title: 'Adho Mukha Svanasana (Downward-Facing Dog)',
        description: 'An all-in-one pose that rejuvenates the body, stretches the hamstrings and spine, and builds upper body strength.',
        imageHint: 'yoga downward dog',
        image: 'https://placehold.co/600x400.png',
        videoUrl: '#',
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
                    <a href={video.videoUrl} key={video.title} target="_blank" rel="noopener noreferrer" className="group block">
                        <Card className="overflow-hidden hover:shadow-xl hover:ring-2 hover:ring-primary/50 transition-all duration-300 h-full flex flex-col">
                            <div className="relative">
                                <Image 
                                    src={video.image}
                                    alt={video.title}
                                    data-ai-hint={video.imageHint}
                                    width={600}
                                    height={400}
                                    className="object-cover w-full h-48"
                                />
                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <PlayCircle className="w-16 h-16 text-white" />
                                </div>
                            </div>
                            <CardHeader>
                                <CardTitle>{video.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-muted-foreground">{video.description}</p>
                            </CardContent>
                        </Card>
                    </a>
                ))}
            </div>
        </div>
    </div>
  );
}
