import { PageHeader } from '@/components/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ComposedChart, Area, CartesianGrid, XAxis, YAxis, Line, Tooltip } from 'recharts'
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'

const financeiroData = [
  { month: 'Jan', faturamento: 12000, comissao: 3600 },
  { month: 'Fev', faturamento: 15000, comissao: 4500 },
  { month: 'Mar', faturamento: 18000, comissao: 5400 },
  { month: 'Abr', faturamento: 17000, comissao: 5100 },
]

export default function FinanceiroGraficos() {
  return (
    <div className="space-y-4 animate-fade-in">
      <PageHeader title="Gráficos Financeiros" module="Gráficos" page="Financeiro" />

      <div className="grid grid-cols-1 gap-6">
        <Card className="shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-700">
              Faturamento (Receita Bruta X Comissões)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ChartContainer
                config={{
                  faturamento: { label: 'Faturamento Bruto', color: 'hsl(var(--chart-1))' },
                  comissao: { label: 'Comissões', color: 'hsl(var(--chart-2))' },
                }}
              >
                <ComposedChart
                  data={financeiroData}
                  margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                  <Tooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Area
                    type="monotone"
                    dataKey="faturamento"
                    fill="hsl(var(--chart-1))"
                    stroke="hsl(var(--chart-1))"
                    fillOpacity={0.2}
                  />
                  <Line
                    type="monotone"
                    dataKey="comissao"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={3}
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
