
'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Leaf, 
  BookText, 
  History, 
  Gem,
  PlusCircle,
  Pill,
  Package,
  Home,
  Menu,
  User,
  Bot,
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function DashboardLayout({
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

  const getLinkClass = (path: string, isSidebar: boolean = false) => {
    if (!isClient) {
      return isSidebar 
        ? 'text-foreground/70 hover:text-foreground' 
        : 'text-primary-foreground/70 hover:text-primary-foreground';
    }
    const isActive = pathname === path;
    if (isSidebar) {
      return isActive
        ? 'bg-muted text-primary font-semibold'
        : 'text-muted-foreground hover:text-primary';
    }
    return isActive
      ? 'bg-primary-foreground/10 text-primary-foreground rounded-full px-3 py-1' 
      : 'text-primary-foreground/70 hover:text-primary-foreground px-3 py-1';
  };
  
  const getBottomNavLinkClass = (path: string) => {
    if (!isClient) {
      return 'text-muted-foreground';
    }
    const isActive = pathname === path;
    return isActive ? 'text-primary' : 'text-muted-foreground';
  }

  const getDropdownClass = (isSidebar: boolean = false) => {
     if (!isClient) {
        return isSidebar 
        ? 'text-foreground/70 hover:text-foreground' 
        : 'text-primary-foreground/70 hover:text-primary-foreground';
    }
    const isActive = pathname.startsWith('/dashboard/texts');
     if (isSidebar) {
        return isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary';
     }
    return isActive ? 'text-primary' : 'text-primary-foreground/70 hover:text-primary-foreground';
  }

  const mainNavLinks = [
    { href: '/dashboard', icon: <Home className="h-5 w-5" />, label: 'Home' },
    { href: '/dashboard/chat', icon: <Bot className="h-5 w-5" />, label: 'Chat' },
    { href: '/dashboard/new-patient', icon: <PlusCircle className="h-5 w-5" />, label: 'New Patient' },
    { href: '/dashboard/patient-history', icon: <History className="h-5 w-5" />, label: 'Past Patients' },
    { href: '/dashboard/medicines', icon: <Pill className="h-5 w-5" />, label: 'Medicines' },
    { href: '/dashboard/supplements', icon: <Package className="h-5 w-5" />, label: 'Supplements' },
    { href: '/dashboard/profile', icon: <User className="h-5 w-5" />, label: 'Profile' },
  ];

  const bottomNavLinks = [
    { href: '/dashboard', icon: <Home className="h-6 w-6" />, label: 'Home' },
    { href: '/dashboard/chat', icon: <Bot className="h-6 w-6" />, label: 'Chat' },
    { href: '/dashboard/new-patient', icon: <PlusCircle className="h-6 w-6" />, label: 'New' },
    { href: '/dashboard/patient-history', icon: <History className="h-6 w-6" />, label: 'History' },
    { href: '/dashboard/profile', icon: <User className="h-6 w-6" />, label: 'You' },
  ]

  const textLinks = [
     { href: '/dashboard/texts/charaka-samhita', label: 'Charaka Samhita' },
     { href: '/dashboard/texts/sushruta-samhita', label: 'Sushruta Samhita' },
     { href: '/dashboard/texts/ashtanga-hridayam', label: 'Ashtanga Hridayam' },
  ];
  
  const handleMobileLinkClick = (href: string) => {
    router.push(href);
    setIsSheetOpen(false);
  }

  const DesktopSidebar = () => (
    <div className="hidden md:block border-r bg-muted/40">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-16 items-center border-b px-6">
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
              <Leaf className="h-6 w-6 text-primary" />
              <span>Ayurnidaan</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              {mainNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${getLinkClass(link.href, true)}`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
               <DropdownMenu>
                <DropdownMenuTrigger asChild>
                   <Button variant="ghost" className={`justify-start items-center gap-3 rounded-lg px-3 py-2 transition-all w-full ${getDropdownClass(true)}`}>
                     <BookText className="h-5 w-5" />
                      Ayurvedic Texts
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Ancient Scriptures</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        {textLinks.map((link) => (
                            <DropdownMenuItem key={link.href} onClick={() => router.push(link.href)}>
                                {link.label}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
                </DropdownMenu>
            </nav>
          </div>
        </div>
      </div>
  );

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <DesktopSidebar />
      <div className="flex flex-col">
        <header className="flex h-16 items-center gap-4 border-b bg-muted/40 px-4 md:px-6 z-40">
           {/* Mobile Sheet Trigger */}
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                 <Link
                    href="/dashboard"
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
                 <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className={`justify-start items-center gap-4 rounded-xl px-3 py-2 font-medium hover:text-foreground ${pathname.startsWith('/dashboard/texts') ? 'bg-muted text-foreground' : 'text-muted-foreground'}`}>
                       <BookText className="h-5 w-5" />
                        Ayurvedic Texts
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>Ancient Scriptures</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                          {textLinks.map((link) => (
                              <DropdownMenuItem key={link.href} onClick={() => handleMobileLinkClick(link.href)}>
                                  {link.label}
                              </DropdownMenuItem>
                          ))}
                      </DropdownMenuGroup>
                  </DropdownMenuContent>
                  </DropdownMenu>
              </nav>
            </SheetContent>
          </Sheet>

          <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <div className="flex-initial">
               <Button onClick={() => router.push('/dashboard/premium')}>
                     <Gem className="mr-2 h-4 w-4" />
                     Premium
              </Button>
            </div>
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
    </div>
  );
}
