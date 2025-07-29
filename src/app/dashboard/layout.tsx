
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
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarInset,
  SidebarFooter,
  SidebarTrigger,
} from '@/components/ui/sidebar';

import { 
  Leaf, 
  LogOut, 
  User, 
  BookText, 
  PlusCircle, 
  History, 
  Gem,
  Menu
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
                    tooltip="New Patient" 
                    onClick={() => router.push('/dashboard/new-patient')}
                  >
                   <PlusCircle />
                   <span>New Patient</span>
                 </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                 <SidebarMenuButton 
                    tooltip="Patient History"
                    onClick={() => router.push('/dashboard/patient-history')}
                  >
                   <History />
                   <span>Patient History</span>
                 </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
              <SidebarTrigger className="sm:hidden" />
              <div className="flex items-center gap-2">
                 <Leaf className="w-8 h-8 text-primary" />
                 <h1 className="text-2xl font-bold text-primary-foreground">AyurNidaan</h1>
              </div>
              <div className="ml-auto flex items-center gap-4">
                  <Button variant="ghost" className="hidden sm:flex">
                      <User className="mr-2" />
                      Profile
                  </Button>
                  <Button variant="ghost" className="hidden sm:flex">
                      <Gem className="mr-2" />
                      Premium
                  </Button>
                   <Button variant="ghost" className="hidden sm:flex">
                      <BookText className="mr-2" />
                      Ayurvedic Texts
                  </Button>
                  <Button variant="outline" onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                  </Button>
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
