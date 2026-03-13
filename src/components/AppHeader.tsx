import { Link } from 'react-router-dom'
import { LogOut, Key, Phone, User as UserIcon } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function AppHeader() {
  const { signOut, user } = useAuth()

  return (
    <header className="h-16 flex items-center justify-between px-4 bg-white border-b shadow-sm z-10">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-slate-500 hover:text-slate-900" />
      </div>

      <div className="flex items-center gap-4">
        <a
          href="https://wa.me/551100000000"
          target="_blank"
          rel="noreferrer"
          className="hidden md:flex items-center gap-2 text-sm text-green-600 hover:text-green-700 font-medium"
        >
          <Phone className="h-4 w-4" />
          <span>Atendimento Gestão AR</span>
        </a>

        <div className="h-6 w-px bg-slate-200 hidden md:block"></div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 pl-2 pr-0 md:pr-2 rounded-full md:rounded-md hover:bg-slate-100"
            >
              <div className="hidden md:flex flex-col items-end text-sm">
                <span className="font-semibold text-slate-700">Alexandre Aparecido Mantovan</span>
                <span className="text-xs text-slate-500">AR CERTI ID</span>
              </div>
              <Avatar className="h-9 w-9 border border-slate-200">
                <AvatarImage src={`https://img.usecurling.com/ppl/thumbnail?gender=male&seed=1`} />
                <AvatarFallback className="bg-primary text-primary-foreground">AM</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Key className="mr-2 h-4 w-4" />
              <span>Trocar Senha</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer text-red-600 focus:text-red-700 focus:bg-red-50"
              onClick={signOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
