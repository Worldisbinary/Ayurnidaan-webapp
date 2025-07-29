
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchArticles, type Article } from '@/app/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

export default function DashboardPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadArticles() {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedArticles = await fetchArticles();
        setArticles(fetchedArticles);
      } catch (err) {
        setError('Failed to fetch articles. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadArticles();
  }, []);


  return (
    <div className="space-y-8">
       <div className="space-y-2">
         <h2 className="text-3xl font-bold tracking-tight">Explore the latest articles and insights in Ayurveda.</h2>
       </div>

      {isLoading && (
         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardHeader className="p-0">
                    <Skeleton className="w-full h-[250px] rounded-t-lg" />
                </CardHeader>
                <CardContent className="p-6 space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                   <Skeleton className="h-4 w-2/4" />
                </CardContent>
              </Card>
            ))}
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

       {!isLoading && !error && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {articles.map((article, index) => (
            <a key={index} href={article.url} target="_blank" rel="noopener noreferrer" className="block hover:ring-2 hover:ring-primary rounded-lg transition-shadow duration-300">
                <Card className="h-full">
                <CardHeader className="p-0">
                    <Image 
                    src={`https://placehold.co/600x400.png`} 
                    alt={article.title}
                    data-ai-hint={article.imageHint}
                    width={600}
                    height={400}
                    className="rounded-t-lg object-cover"
                    />
                </CardHeader>
                <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground mb-1">{article.source}</p>
                    <CardTitle className="text-xl font-headline mb-2">{article.title}</CardTitle>
                    <p className="text-muted-foreground">{article.description}</p>
                </CardContent>
                </Card>
            </a>
          ))}
       </div>
       )}
    </div>
  );
}
