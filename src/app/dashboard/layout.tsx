
'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubContent,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarInset,
  SidebarFooter,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { 
  Leaf, 
  LogOut, 
  User, 
  BookText, 
  History, 
  Gem,
  Bot,
  Pill
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
         <Sidebar collapsible="icon" className="group-data-[collapsible=icon]:border-r">
          <SidebarHeader>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Leaf className="h-6 w-6 text-primary" />
              </Button>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                 <SidebarMenuButton 
                    tooltip="AI Diagnosis" 
                    onClick={() => router.push('/dashboard/new-patient')}
                  >
                   <Bot />
                   <span className="font-bold text-base">AI Diagnosis</span>
                 </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                 <SidebarMenuButton 
                    tooltip="Past Patients"
                    onClick={() => router.push('/dashboard/patient-history')}
                  >
                   <History />
                   <span>Past Patients</span>
                 </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                 <SidebarMenuButton 
                    tooltip="Medicines"
                    onClick={() => { /* router.push('/dashboard/medicines') */ }}
                  >
                   <Pill />
                   <span>Medicines</span>
                 </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuSub>
                  <SidebarMenuSubButton tooltip="Ayurvedic Texts">
                    <BookText />
                    <span>Ayurvedic Texts</span>
                  </SidebarMenuSubButton>
                  <SidebarMenuSubContent>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        onClick={() => {
                          /* router.push('/dashboard/texts/charaka') */
                        }}
                      >
                        Charaka Samhita
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        onClick={() => {
                          /* router.push('/dashboard/texts/sushruta') */
                        }}
                      >
                        Sushruta Samhita
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        onClick={() => {
                          /* router.push('/dashboard/texts/ashtanga') */
                        }}
                      >
                        Ashtanga Hridayam
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSubContent>
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-10 flex items-center gap-4 border-b bg-background px-4 py-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
              <SidebarTrigger className="sm:hidden" />
              <div className="flex items-center gap-2">
                 <Leaf className="w-8 h-8 text-primary" />
                 <h1 className="text-2xl font-bold text-primary-foreground">AyurNidaan</h1>
              </div>
              <div className="ml-auto flex items-center gap-4">
                <Button variant="outline">
                   <Gem className="mr-2 h-4 w-4" />
                   Premium
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="overflow-hidden rounded-full"
                    >
                      <Avatar>
                        <AvatarImage src="https://placehold.co/32x32.png" alt="User avatar" data-ai-hint="user avatar" />
                        <AvatarFallback>
                          <User />
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
          </header>
          <main className="flex-1">
            <SidebarInset>
              {children}
            </SidebarInset>
          </main>
           <footer className="text-center py-4 text-muted-foreground text-sm shrink-0 border-t">
              © {new Date().getFullYear()} AyurNidaan. All rights reserved.
           </footer>
        </div>
      </div>
    </SidebarProvider>
  );
}
