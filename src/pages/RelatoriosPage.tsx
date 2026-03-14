import { useState, useEffect, useCallback } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts'
import { Loader2, Printer, Filter } from 'lucide-react'
import { getRelatoriosData, getFilterOptions, RelatoriosFilters } from '@/services/relatorios'

const EmptyChart = () => (
  <div className="flex h-[280px] w-full items-center justify-center rounded-md border border-dashed border-slate-200 bg-slate-50/50">
    <span className="text-sm text-slate-500">Nenhum dado encontrado para o período</span>
  </div>
)

export default function RelatoriosPage() {
  const [filters, setFilters] = useState<RelatoriosFilters>({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      .toISOString()
      .split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    vendedorId: 'all',
    agenteId: 'all',
  })
  const [options, setOptions] = useState<{ vendedores: any[]; agentes: any[] }>({
    vendedores: [],
    agentes: [],
  })
  const [data, setData] = useState<any>({
    salesBySeller: [],
    commissionsByAgent: [],
    monthlyRevenue: [],
    statusTimeline: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getFilterOptions().then(setOptions)
  }, [])

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      const res = await getRelatoriosData(filters)
      setData(res)
    } catch (error) {
      console.error('Failed to load reports', error)
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <div className="space-y-6 animate-fade-in relative">
      <style>{`
        @media print {
          aside, header, nav, .no-print { display: none !important; }
          main { padding: 0 !important; margin: 0 !important; overflow: visible !important; }
          .print-break-inside-avoid { page-break-inside: avoid; }
          body { background: white !important; }
        }
      `}</style>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 no-print">
        <PageHeader title="Relatórios Gerenciais" module="Gestão" page="Relatórios" />
        <Button
          onClick={() => window.print()}
          className="bg-slate-800 hover:bg-slate-900 text-white shadow-sm"
        >
          <Printer className="mr-2 h-4 w-4" /> Exportar PDF
        </Button>
      </div>

      <Card className="bg-white border-slate-200 shadow-sm no-print">
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            <div className="space-y-1">
              <Label>Data Inicial</Label>
              <Input
                type="date"
                value={filters.startDate}
                onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <Label>Data Final</Label>
              <Input
                type="date"
                value={filters.endDate}
                onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
              />
            </div>
            <div className="space-y-1 lg:col-span-1">
              <Label>Vendedor</Label>
              <Select
                value={filters.vendedorId}
                onValueChange={(v) => setFilters({ ...filters, vendedorId: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {options.vendedores.map((u) => (
                    <SelectItem key={u.id} value={u.id}>
                      {u.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1 lg:col-span-1">
              <Label>Agente</Label>
              <Select
                value={filters.agenteId}
                onValueChange={(v) => setFilters({ ...filters, agenteId: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {options.agentes.map((u) => (
                    <SelectItem key={u.id} value={u.id}>
                      {u.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={loadData}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Filter className="mr-2 h-4 w-4" />
              )}{' '}
              Filtrar
            </Button>
          </div>
        </CardContent>
      </Card>

      {loading && (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      )}

      {!loading && (
        <div id="printable-report" className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
          <Card className="shadow-sm border-slate-200 print-break-inside-avoid">
            <CardHeader>
              <CardTitle className="text-base text-slate-700">Vendas por Vendedor</CardTitle>
            </CardHeader>
            <CardContent>
              {data.salesBySeller.length === 0 ? (
                <EmptyChart />
              ) : (
                <div className="h-[280px]">
                  <ChartContainer
                    config={{ total: { label: 'Vendas (R$)', color: 'hsl(var(--chart-1))' } }}
                  >
                    <BarChart
                      data={data.salesBySeller}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis
                        dataKey="name"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        fontSize={12}
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        fontSize={12}
                        tickFormatter={(v) => `R$ ${v}`}
                      />
                      <Tooltip
                        cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                        content={<ChartTooltipContent />}
                      />
                      <Bar dataKey="total" fill="var(--color-total)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ChartContainer>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200 print-break-inside-avoid">
            <CardHeader>
              <CardTitle className="text-base text-slate-700">Faturamento Mensal</CardTitle>
            </CardHeader>
            <CardContent>
              {data.monthlyRevenue.length === 0 ? (
                <EmptyChart />
              ) : (
                <div className="h-[280px]">
                  <ChartContainer
                    config={{ total: { label: 'Receita (R$)', color: 'hsl(var(--chart-2))' } }}
                  >
                    <BarChart
                      data={data.monthlyRevenue}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        fontSize={12}
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        fontSize={12}
                        tickFormatter={(v) => `R$ ${v}`}
                      />
                      <Tooltip
                        cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                        content={<ChartTooltipContent />}
                      />
                      <Bar dataKey="total" fill="var(--color-total)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ChartContainer>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200 print-break-inside-avoid">
            <CardHeader>
              <CardTitle className="text-base text-slate-700">Comissões por Agente</CardTitle>
            </CardHeader>
            <CardContent>
              {data.commissionsByAgent.length === 0 ? (
                <EmptyChart />
              ) : (
                <div className="h-[280px] flex justify-center items-center">
                  <ChartContainer
                    config={{ value: { label: 'Comissão (R$)' } }}
                    className="w-full h-full"
                  >
                    <PieChart>
                      <Pie
                        data={data.commissionsByAgent}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                      >
                        {data.commissionsByAgent.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend content={<ChartLegendContent />} verticalAlign="bottom" />
                    </PieChart>
                  </ChartContainer>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200 print-break-inside-avoid">
            <CardHeader>
              <CardTitle className="text-base text-slate-700">
                Status: Certificados Aprovados (Timeline)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {data.statusTimeline.length === 0 ? (
                <EmptyChart />
              ) : (
                <div className="h-[280px]">
                  <ChartContainer
                    config={{ count: { label: 'Aprovações', color: 'hsl(var(--chart-3))' } }}
                  >
                    <LineChart
                      data={data.statusTimeline}
                      margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        fontSize={12}
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        fontSize={12}
                        allowDecimals={false}
                      />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="count"
                        stroke="var(--color-count)"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ChartContainer>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
