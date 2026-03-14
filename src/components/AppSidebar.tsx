import { Link, useLocation } from 'react-router-dom'
import {
  Users,
  ShoppingCart,
  Calendar,
  DollarSign,
  MessageSquare,
  FileText,
  UserPlus,
  Settings,
  Home,
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Clientes', href: '/clientes', icon: Users },
  { name: 'Pedidos', href: '/pedidos', icon: ShoppingCart },
  { name: 'Agendamentos', href: '/agendamentos', icon: Calendar },
  { name: 'Comissões', href: '#comissoes', icon: DollarSign },
  { name: 'Chat WhatsApp', href: '#chat', icon: MessageSquare },
  { name: 'Relatórios', href: '#relatorios', icon: FileText },
  { name: 'Usuários', href: '#usuarios', icon: UserPlus },
  { name: 'Configurações', href: '#config', icon: Settings },
]

export function AppSidebar() {
  const location = useLocation()
  const { state } = useSidebar()

  const isActive = (path: string) => location.pathname === path && path !== '#'

  return (
    <Sidebar className="border-r border-slate-200 bg-white shadow-sm">
      <SidebarHeader className="h-16 flex items-center px-4 border-b border-slate-100 bg-white">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex-shrink-0 h-8 w-8 rounded bg-blue-600 flex items-center justify-center text-white font-bold shadow-sm">
            ID
          </div>
          {state === 'expanded' && (
            <span className="font-bold text-lg text-blue-900 truncate">Gestão Certi ID</span>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-white pt-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.href)}
                    tooltip={item.name}
                    className={cn(
                      'text-slate-600 hover:text-blue-700 hover:bg-blue-50 font-medium transition-colors mb-1',
                      isActive(item.href) && 'text-blue-700 bg-blue-50 shadow-sm',
                    )}
                  >
                    <Link to={item.href}>
                      <item.icon
                        className={cn(
                          'h-4 w-4 mr-2',
                          isActive(item.href) ? 'text-blue-600' : 'text-slate-400',
                        )}
                      />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
