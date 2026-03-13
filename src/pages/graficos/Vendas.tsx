import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RefreshCcw } from 'lucide-react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'

const emissaoData = [
  { month: 'Jan', total: 120 },
  { month: 'Fev', total: 150 },
  { month: 'Mar', total: 180 },
  { month: 'Abr', total: 220 },
  { month: 'Mai', total: 250 },
  { month: 'Jun', total: 280 },
  { month: 'Jul', total: 310 },
  { month: 'Ago', total: 340 },
  { month: 'Set', total: 320 },
]

const tipoCertificadoData = [
  { month: 'Jan', a1: 80, a3: 40 },
  { month: 'Fev', a1: 90, a3: 60 },
  { month: 'Mar', a1: 110, a3: 70 },
  { month: 'Abr', a1: 130, a3: 90 },
  { month: 'Mai', a1: 160, a3: 90 },
  { month: 'Jun', a1: 180, a3: 100 },
]

export default function VendasGraficos() {
  const [loading, setLoading] = useState(false)

  const handleRefresh = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1000)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800">Gráficos de Vendas</h2>
          <p className="text-muted-foreground text-sm">Acompanhe a evolução das emissões.</p>
        </div>
        <Button
          onClick={handleRefresh}
          disabled={loading}
          variant="outline"
          className="text-blue-600 border-blue-200"
        >
          <RefreshCcw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Atualizar Dados
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle>Quantidade de Emissões</CardTitle>
            <CardDescription>Total de certificados emitidos por mês</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer
                config={{ total: { label: 'Total Emitido', color: 'hsl(var(--chart-1))' } }}
              >
                <AreaChart data={emissaoData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                  <Area
                    type="monotone"
                    dataKey="total"
                    stroke="hsl(var(--chart-1))"
                    fill="hsl(var(--chart-1))"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle>Emissões por Tipo de Certificado</CardTitle>
            <CardDescription>Comparativo A1 vs A3</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer
                config={{
                  a1: { label: 'Certificado A1', color: 'hsl(var(--chart-1))' },
                  a3: { label: 'Certificado A3', color: 'hsl(var(--chart-2))' },
                }}
              >
                <LineChart
                  data={tipoCertificadoData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Line
                    type="monotone"
                    dataKey="a1"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="a3"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
