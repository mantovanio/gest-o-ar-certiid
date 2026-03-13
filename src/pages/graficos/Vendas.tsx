import { PageHeader } from '@/components/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts'
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'

const emissaoData = [
  { month: 'Jan', total: 120 },
  { month: 'Fev', total: 150 },
  { month: 'Mar', total: 180 },
  { month: 'Abr', total: 220 },
  { month: 'Mai', total: 250 },
  { month: 'Jun', total: 280 },
]
const pieData = [
  { name: 'e-CPF A1', value: 400, color: 'hsl(var(--chart-1))' },
  { name: 'e-CNPJ A1', value: 300, color: 'hsl(var(--chart-2))' },
  { name: 'e-CNPJ A3', value: 300, color: 'hsl(var(--chart-3))' },
  { name: 'Bird ID', value: 200, color: 'hsl(var(--chart-4))' },
]

export default function VendasGraficos() {
  return (
    <div className="space-y-4 animate-fade-in">
      <PageHeader title="Gráficos de Vendas" module="Gráficos" page="Vendas" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-700">Quantidade de Emissões X Mês/Ano</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer
                config={{ total: { label: 'Emissões', color: 'hsl(var(--chart-1))' } }}
              >
                <AreaChart data={emissaoData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                  <Tooltip content={<ChartTooltipContent indicator="line" />} />
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
            <CardTitle className="text-slate-700">Emissões por Tipos de Certificados</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center items-center">
            <div className="h-[300px] w-full">
              <ChartContainer config={{}}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
