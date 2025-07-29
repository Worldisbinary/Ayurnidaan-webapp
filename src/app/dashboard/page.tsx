
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

const articles = [
  {
    title: 'Understanding Your Dosha',
    description: 'Learn about the three doshas (Vata, Pitta, Kapha) and how they influence your physical and mental well-being.',
    image: {
      src: 'https://placehold.co/600x400.png',
      hint: 'nature meditation'
    }
  },
  {
    title: 'The Principles of Ayurvedic Diet',
    description: 'Discover how to eat according to your dosha to improve digestion, boost immunity, and maintain balance.',
    image: {
      src: 'https://placehold.co/600x400.png',
      hint: 'healthy food'
    }
  },
  {
    title: 'Daily Rituals for a Balanced Life',
    description: 'Explore the practice of Dinacharya (daily routine) to align your body with the rhythms of nature.',
    image: {
      src: 'https://placehold.co/600x400.png',
      hint: 'yoga sunrise'
    }
  },
   {
    title: 'Herbs for Holistic Healing',
    description: 'An introduction to common Ayurvedic herbs like Ashwagandha, Turmeric, and Triphala and their benefits.',
    image: {
      src: 'https://placehold.co/600x400.png',
      hint: 'herbs spices'
    }
  },
];

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-8 p-4 md:p-8">
       <h2 className="text-3xl font-bold tracking-tight">Ayurvedic Insights</h2>
       <p className="text-muted-foreground">Explore articles and information on Ayurvedic principles and practices.</p>
       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {articles.map((article) => (
          <Card key={article.title}>
            <CardHeader className="p-0">
               <Image 
                src={article.image.src} 
                alt={article.title}
                data-ai-hint={article.image.hint}
                width={600}
                height={400}
                className="rounded-t-lg object-cover"
              />
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle className="text-xl font-headline mb-2">{article.title}</CardTitle>
              <p className="text-muted-foreground">{article.description}</p>
            </CardContent>
          </Card>
        ))}
       </div>
    </div>
  );
}
