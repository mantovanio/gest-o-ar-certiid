import { useEffect, useState } from 'react'
import {
  TrendingUp,
  AlertTriangle,
  DollarSign,
  Users,
  PlusCircle,
  UserPlus,
  Activity,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getDashboardMetrics } from '@/services/dashboard'
import { CommunicationDrawer } from '@/components/CommunicationDrawer'

const Index = () => {
  const [metrics, setMetrics] = useState({
    totalVendasMensal: 0,
    certificadosVencer: 0,
    faturamentoBruto: 0,
    novosLeads: 0,
  })
  const [loading, setLoading] = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    getDashboardMetrics().then((data) => {
      setMetrics(data)
      setLoading(false)
    })
  }, [])

  const formatBRL = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800">Dashboard</h2>
          <p className="text-muted-foreground text-sm">Resumo gerencial das suas operações.</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-[#f97316] hover:bg-orange-600 text-white">
            <UserPlus className="mr-2 h-4 w-4" /> Cadastrar Cliente
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <PlusCircle className="mr-2 h-4 w-4" /> Lançar Nova Venda
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Total de Vendas Mensal
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">
              {loading ? '...' : metrics.totalVendasMensal}
            </div>
            <p className="text-xs text-muted-foreground mt-1">+12% em relação ao mês anterior</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Certificados a Vencer
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">
              {loading ? '...' : metrics.certificadosVencer}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Nos próximos 30 dias</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Faturamento Bruto</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">
              {loading ? '...' : formatBRL(metrics.faturamentoBruto)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">+8% em relação ao mês anterior</p>
          </CardContent>
        </Card>
        <Card
          className="shadow-sm border-slate-200 cursor-pointer"
          onClick={() => setDrawerOpen(true)}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Novos Leads</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">
              {loading ? '...' : metrics.novosLeads}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Aguardando contato</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
        <Card className="col-span-1 lg:col-span-4 shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-base">Últimas Interações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 border-b border-slate-100 pb-4 last:border-0 last:pb-0"
                >
                  <div className="mt-1 bg-green-100 p-2 rounded-full text-green-600">
                    <Activity className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">WhatsApp enviado para Cliente {i}</p>
                    <p className="text-sm text-muted-foreground">Lembrete de renovação enviado.</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <CommunicationDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
    </div>
  )
}
export default Index
