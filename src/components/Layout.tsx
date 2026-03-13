import { Outlet } from 'react-router-dom'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from './AppSidebar'
import { AppHeader } from './AppHeader'

export default function Layout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-[hsl(var(--background))] overflow-hidden font-sans">
        <AppSidebar />
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden relative">
          <AppHeader />
          <main className="flex-1 overflow-auto p-4 md:p-6 pb-20">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
