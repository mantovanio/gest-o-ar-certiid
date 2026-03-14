import { Link } from 'react-router-dom'
import { LogOut, Key, Phone, User as UserIcon } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'

export function AppHeader() {
  const { signOut, user } = useAuth()

  return (
    <header className="h-16 flex items-center justify-between px-4 bg-white border-b border-slate-200 shadow-sm z-10">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-slate-500 hover:text-slate-900" />
      </div>

      <div className="flex items-center gap-3 sm:gap-6">
        <a
          href="https://wa.me/551100000000"
          target="_blank"
          rel="noreferrer"
          className="hidden sm:flex items-center gap-2 text-sm text-green-600 hover:text-green-700 font-medium"
        >
          <Phone className="h-4 w-4" />
          <span>Atendimento Gestão Certi ID</span>
        </a>

        <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex flex-col items-end text-sm">
            <span className="font-semibold text-slate-700">Administrador Certi ID</span>
            <span className="text-xs text-slate-500">{user?.email}</span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="text-slate-600 hover:bg-slate-100"
            title="Trocar Senha"
          >
            <Key className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-red-600 hover:bg-red-50 hover:text-red-700"
            onClick={signOut}
            title="Logout"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
