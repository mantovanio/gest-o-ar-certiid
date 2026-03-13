import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RefreshCcw } from 'lucide-react'
import { ComposedChart, CartesianGrid, XAxis, YAxis, Bar, Line } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'

const financeiroData = [
  { month: 'Jan', faturamento: 12000, comissao: 3600 },
  { month: 'Fev', faturamento: 15000, comissao: 4500 },
  { month: 'Mar', faturamento: 18000, comissao: 5400 },
  { month: 'Abr', faturamento: 17000, comissao: 5100 },
  { month: 'Mai', faturamento: 22000, comissao: 6600 },
  { month: 'Jun', faturamento: 25000, comissao: 7500 },
]

export default function FinanceiroGraficos() {
  const [loading, setLoading] = useState(false)

  const handleRefresh = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1000)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800">Gráficos Financeiros</h2>
          <p className="text-muted-foreground text-sm">
            Acompanhe faturamento e comissões geradas.
          </p>
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

      <div className="grid grid-cols-1 gap-6">
        <Card className="shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle>Faturamento Bruto vs Comissões</CardTitle>
            <CardDescription>
              Relação de entrada bruta e comissionamento de parceiros nos últimos meses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ChartContainer
                config={{
                  faturamento: { label: 'Faturamento Bruto (R$)', color: 'hsl(var(--chart-1))' },
                  comissao: { label: 'Comissões (R$)', color: 'hsl(var(--chart-2))' },
                }}
              >
                <ComposedChart
                  data={financeiroData}
                  margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis yAxisId="left" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar
                    yAxisId="left"
                    dataKey="faturamento"
                    fill="hsl(var(--chart-1))"
                    radius={[4, 4, 0, 0]}
                    barSize={40}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="comissao"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </ComposedChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
