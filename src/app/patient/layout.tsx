
'use client';

import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Leaf, 
  Home,
  Menu,
  User,
  HeartPulse,
  LogOut
} from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';


export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);


  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const getBottomNavLinkClass = (path: string) => {
    if (!isClient) {
      return 'text-muted-foreground';
    }
    const isActive = pathname === path;
    return isActive ? 'text-primary' : 'text-muted-foreground';
  }

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/login');
  };

  const mainNavLinks = [
    { href: '/patient/home', icon: <Home className="h-5 w-5" />, label: 'Home' },
    { href: '/patient/checkup', icon: <HeartPulse className="h-5 w-5" />, label: 'My Dosha' },
    { href: '/patient/profile', icon: <User className="h-5 w-5" />, label: 'Profile' },
  ];

  const bottomNavLinks = [
    { href: '/patient/home', icon: <Home className="h-6 w-6" />, label: 'Home' },
    { href: '/patient/checkup', icon: <HeartPulse className="h-6 w-6" />, label: 'My Dosha' },
    { href: '/patient/profile', icon: <User className="h-6 w-6" />, label: 'Profile' },
  ];
  
  const handleMobileLinkClick = (href: string) => {
    router.push(href);
    setIsSheetOpen(false);
  }

  return (
    <div className="flex flex-col min-h-screen w-full">
      <header className="flex h-16 items-center justify-between gap-4 border-b bg-muted/40 px-4 md:px-6 z-40 sticky top-0">
         {/* Mobile Sheet Trigger */}
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <SheetHeader>
                <SheetTitle className="sr-only">Main Menu</SheetTitle>
            </SheetHeader>
            <nav className="grid gap-2 text-lg font-medium">
               <Link
                  href="/patient/home"
                  className="flex items-center gap-2 text-lg font-semibold mb-4"
                  onClick={() => setIsSheetOpen(false)}
                >
                  <Leaf className="h-6 w-6 text-primary" />
                  <span >Ayurnidaan</span>
                </Link>
              {mainNavLinks.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => handleMobileLinkClick(link.href)}
                    className={`flex items-center gap-4 rounded-xl px-3 py-2 transition-colors hover:text-foreground ${pathname === link.href ? 'bg-muted text-foreground' : 'text-muted-foreground'}`}
                >
                    {link.icon}
                    {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto">
               <Button variant="outline" className="w-full justify-start gap-4" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                  Logout
              </Button>
            </div>
          </SheetContent>
        </Sheet>
        
        <div className="flex-1">
             <Link href="/patient/home" className="flex items-center gap-2 font-semibold">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="hidden md:inline-block text-xl font-headline">Ayurnidaan</span>
            </Link>
        </div>
        
        <div className="flex items-center gap-2">
           <span className="hidden sm:inline text-sm text-muted-foreground">
             {auth.currentUser?.displayName || auth.currentUser?.email || ''}
           </span>
           <Button variant="outline" size="icon" className="hidden md:inline-flex" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
           </Button>
        </div>


      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 md:pb-8 pb-24">
        {children}
      </main>
      
      {/* Bottom Navigation for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-background border-t z-50 flex items-center justify-around">
          {bottomNavLinks.map((link) => (
            <Link key={link.href} href={link.href} className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-colors ${getBottomNavLinkClass(link.href)}`}>
                  {link.icon}
                  <span className="text-xs">{link.label}</span>
            </Link>
          ))}
      </nav>

      <footer className="hidden md:block text-center py-4 text-muted-foreground text-sm shrink-0 border-t">
        © {new Date().getFullYear()} Ayurnidaan. All rights reserved.
      </footer>
    </div>
  );
}
