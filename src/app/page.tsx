
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Leaf } from 'lucide-react';

export default function SplashScreen() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500); // Splash screen visible for 1.5 seconds

    const redirectTimer = setTimeout(() => {
      router.push('/login');
    }, 2000); // Redirect after fade out

    return () => {
      clearTimeout(timer);
      clearTimeout(redirectTimer);
    };
  }, [router]);

  return (
    <div
      className={`min-h-screen bg-background flex flex-col items-center justify-center transition-opacity duration-500 p-4 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="flex flex-col items-center justify-center flex-grow-[2]">
        <div className="flex items-center gap-2 md:gap-4">
          <Leaf className="w-12 h-12 md:w-16 md:h-16 text-primary animate-pulse" />
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary-foreground text-center">
            Ayurnidaan
          </h1>
        </div>
        <p className="text-muted-foreground mt-4 text-center">
          AI-Assisted Ayurvedic Diagnosis
        </p>
      </div>
      <div className="flex-grow-[1]"></div>
    </div>
  );
}
