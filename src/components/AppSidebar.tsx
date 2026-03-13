import { Link, useLocation } from 'react-router-dom'
import { Home, DollarSign, ShoppingCart, BarChart2, Settings, ChevronRight } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar,
} from '@/components/ui/sidebar'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

const navigation = [
  { name: 'Início', href: '/', icon: Home },
  {
    name: 'Financeiro',
    icon: DollarSign,
    items: [
      { name: 'Pagar/Receber', href: '#' },
      { name: 'Extrato Split', href: '#' },
      { name: 'Extrato Safe2Pay', href: '#' },
    ],
  },
  {
    name: 'Vendas',
    icon: ShoppingCart,
    items: [
      { name: 'Lançar Vendas', href: '#' },
      { name: 'Clientes', href: '#' },
      { name: 'Renovações (CRM)', href: '/crm/renovacoes' },
      { name: 'Certificados Emitidos', href: '/vendas/certificados' },
    ],
  },
  {
    name: 'Gráficos',
    icon: BarChart2,
    items: [
      { name: 'Vendas', href: '/graficos/vendas' },
      { name: 'Financeiro', href: '/graficos/financeiro' },
    ],
  },
  {
    name: 'Configurações',
    icon: Settings,
    items: [
      { name: 'Mídias', href: '#' },
      { name: 'Entrada Mídias', href: '/configuracoes/entrada-midias' },
    ],
  },
]

export function AppSidebar() {
  const location = useLocation()
  const { state } = useSidebar()

  const isActive = (path: string) => location.pathname === path && path !== '#'

  return (
    <Sidebar className="border-r-0 shadow-lg">
      <SidebarHeader className="h-16 flex items-center px-4 border-b border-sidebar-border bg-sidebar">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex-shrink-0 h-8 w-8 rounded bg-brand-orange flex items-center justify-center text-white font-bold">
            ID
          </div>
          {state === 'expanded' && (
            <span className="font-bold text-lg text-white truncate">Gestão AR</span>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) =>
                item.items ? (
                  <Collapsible
                    key={item.name}
                    defaultOpen={item.items.some((sub) => isActive(sub.href))}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={item.name}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.name}</span>
                          <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.name}>
                              <SidebarMenuSubButton asChild isActive={isActive(subItem.href)}>
                                <Link to={subItem.href}>
                                  <span>{subItem.name}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild isActive={isActive(item.href)} tooltip={item.name}>
                      <Link to={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ),
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
