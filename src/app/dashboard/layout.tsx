
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
  Menu
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

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getLinkClass = (path: string) => {
    // On the server or before hydration, return a default class
    if (!isClient) {
      return 'text-primary-foreground/70 hover:text-primary-foreground px-3 py-1';
    }
    // On the client, determine the class based on the current path
    const isActive = pathname === path;
    return isActive
      ? 'bg-primary-foreground/10 text-primary-foreground rounded-full px-3 py-1' 
      : 'text-primary-foreground/70 hover:text-primary-foreground px-3 py-1';
  };

  const getDropdownClass = () => {
     if (!isClient) {
      return 'text-primary-foreground/70 hover:text-primary-foreground';
    }
    const isActive = pathname.startsWith('/dashboard/texts');
    return isActive ? 'text-primary-foreground' : 'text-primary-foreground/70 hover:text-primary-foreground';
  }

  const navLinks = [
    { href: '/dashboard', icon: <Home className="h-5 w-5" />, label: 'Home' },
    { href: '/dashboard/new-patient', icon: <PlusCircle className="h-5 w-5" />, label: 'New Patient' },
    { href: '/dashboard/patient-history', icon: <History className="h-5 w-5" />, label: 'Past Patients' },
    { href: '/dashboard/medicines', icon: <Pill className="h-5 w-5" />, label: 'Medicines' },
    { href: '/dashboard/supplements', icon: <Package className="h-5 w-5" />, label: 'Supplements' },
  ];

  const textLinks = [
     { href: '/dashboard/texts/charaka-samhita', label: 'Charaka Samhita' },
     { href: '/dashboard/texts/sushruta-samhita', label: 'Sushruta Samhita' },
     { href: '/dashboard/texts/ashtanga-hridayam', label: 'Ashtanga Hridayam' },
  ]

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b border-primary-foreground/20 bg-primary text-primary-foreground px-4 md:px-6 z-50">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 md:flex-nowrap">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-lg font-semibold md:text-base text-primary-foreground"
          >
            <Leaf className="h-6 w-6" />
            <span className="sr-only">Ayurnidaan</span>
          </Link>
          {navLinks.map((link) => (
             <Link
              key={link.href}
              href={link.href}
              className={`transition-colors whitespace-nowrap ${getLinkClass(link.href)}`}
            >
              {link.label}
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <Button variant="link" className={`transition-colors p-0 h-auto whitespace-nowrap ${getDropdownClass()}`}>
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
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden bg-primary text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Leaf className="h-6 w-6 text-primary" />
                <span >Ayurnidaan</span>
              </Link>
              {navLinks.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-4 transition-colors hover:text-foreground ${getLinkClass(link.href).replace('text-primary-foreground/70', 'text-muted-foreground').replace('text-primary-foreground', 'text-foreground')}`}
                >
                    {link.icon}
                    {link.label}
                </Link>
              ))}
               <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className={`justify-start items-center gap-4 transition-colors hover:text-foreground p-0 h-auto font-medium ${getDropdownClass()}`}>
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
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <div className="ml-auto flex-1 sm:flex-initial">
             <Button variant="outline" className="bg-primary text-primary-foreground hover:bg-primary-foreground/10" onClick={() => router.push('/dashboard/premium')}>
                   <Gem className="mr-2 h-4 w-4" />
                   Premium
            </Button>
          </div>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {children}
      </main>
      <footer className="text-center py-4 text-muted-foreground text-sm shrink-0 border-t">
        © {new Date().getFullYear()} Ayurnidaan. All rights reserved.
      </footer>
    </div>
  );
}
