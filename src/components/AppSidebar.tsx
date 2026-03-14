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
  ShieldCheck,
  Activity,
  MapPin,
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
import { usePermissions } from '@/hooks/use-permissions'
import { cn } from '@/lib/utils'

export function AppSidebar() {
  const location = useLocation()
  const { state } = useSidebar()
  const { hasPermission } = usePermissions()

  const isActive = (path: string) => location.pathname === path && path !== '#'

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home, show: true },
    { name: 'Clientes', href: '/clientes', icon: Users, show: hasPermission('ver_clientes') },
    { name: 'Pedidos', href: '/pedidos', icon: ShoppingCart, show: hasPermission('ver_pedidos') },
    {
      name: 'Rastreamento',
      href: '/rastreamento-certificados',
      icon: Activity,
      show: hasPermission('rastreamento'),
    },
    {
      name: 'Agendamentos',
      href: '/agendamentos',
      icon: Calendar,
      show: hasPermission('ver_agendamentos'),
    },
    {
      name: 'Comissões',
      href: '/comissoes',
      icon: DollarSign,
      show: hasPermission('ver_comissoes_proprias') || hasPermission('ver_comissoes_todas'),
    },
    {
      name: 'Chat WhatsApp',
      href: '#chat',
      icon: MessageSquare,
      show: hasPermission('ver_conversas'),
    },
    {
      name: 'Relatórios',
      href: '/relatorios',
      icon: FileText,
      show: hasPermission('ver_relatorios'),
    },
    { name: 'Usuários', href: '/usuarios', icon: UserPlus, show: hasPermission('ver_usuarios') },
    {
      name: 'Tabelas de Preço',
      href: '/tabelas-preco',
      icon: DollarSign,
      show: hasPermission('tabelas_preco'),
    },
    {
      name: 'Configurações',
      href: '#config',
      icon: Settings,
      show:
        hasPermission('tabelas_preco') || hasPermission('integracoes') || hasPermission('backup'),
    },
    {
      name: 'Config. Comissões',
      href: '/configuracao-comissoes',
      icon: Settings,
      show: hasPermission('metas_comissao'),
    },
    {
      name: 'Permissões',
      href: '/permissoes',
      icon: ShieldCheck,
      show: hasPermission('gerenciar_permissoes'),
    },
  ].filter((item) => item.show)

  return (
    <Sidebar className="border-r border-slate-200 bg-white shadow-sm print:hidden">
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
