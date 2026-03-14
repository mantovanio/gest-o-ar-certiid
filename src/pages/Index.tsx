import { useState } from 'react'
import { Users, ShoppingCart, DollarSign, MessageSquare } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const Index = () => {
  // Mocked data for the initial dashboard phase as requested
  const [metrics] = useState({
    totalClientes: 1250,
    pedidosPendentes: 45,
    comissoesPagar: 12450.5,
    mensagensNaoLidas: 12,
  })

  const formatBRL = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-blue-900">Dashboard</h2>
          <p className="text-muted-foreground text-sm">Visão geral do sistema e indicadores.</p>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm border-slate-200 bg-white hover:border-blue-200 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total de Clientes</CardTitle>
            <div className="bg-blue-100 p-2 rounded-full">
              <Users className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">{metrics.totalClientes}</div>
            <p className="text-xs text-muted-foreground mt-1">Clientes registrados</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200 bg-white hover:border-blue-200 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Pedidos Pendentes</CardTitle>
            <div className="bg-orange-100 p-2 rounded-full">
              <ShoppingCart className="h-4 w-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">{metrics.pedidosPendentes}</div>
            <p className="text-xs text-muted-foreground mt-1">Aguardando processamento</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200 bg-white hover:border-blue-200 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Comissões a Pagar</CardTitle>
            <div className="bg-emerald-100 p-2 rounded-full">
              <DollarSign className="h-4 w-4 text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">
              {formatBRL(metrics.comissoesPagar)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Acumulado do mês</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200 bg-white hover:border-blue-200 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Mensagens Não Lidas
            </CardTitle>
            <div className="bg-purple-100 p-2 rounded-full">
              <MessageSquare className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">{metrics.mensagensNaoLidas}</div>
            <p className="text-xs text-muted-foreground mt-1">Aguardando resposta no chat</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
export default Index
