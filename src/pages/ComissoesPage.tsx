import { useState, useEffect, useCallback } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { toast } from '@/hooks/use-toast'
import { Calculator, CheckCircle2, RefreshCw } from 'lucide-react'
import {
  getComissoes,
  markComissaoAsPaid,
  calculateComissoes,
  ComissaoData,
} from '@/services/comissoes'
import { usePermissions } from '@/hooks/use-permissions'
import { useAuth } from '@/hooks/use-auth'

export default function ComissoesPage() {
  const { hasPermission } = usePermissions()
  const { user } = useAuth()

  const canSeeAll = hasPermission('ver_comissoes_todas')
  const canCalculate = hasPermission('calcular_comissoes')
  const canPay = hasPermission('pagar_comissoes')

  const [data, setData] = useState<ComissaoData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCalculating, setIsCalculating] = useState(false)
  const [statusFilter, setStatusFilter] = useState('todos')

  const loadData = useCallback(async () => {
    if (!user?.email) return
    setIsLoading(true)
    try {
      const result = await getComissoes(user.email, canSeeAll)
      setData(result)
    } catch (error: any) {
      toast({ title: 'Erro', description: 'Falha ao carregar comissões.', variant: 'destructive' })
    } finally {
      setIsLoading(false)
    }
  }, [user?.email, canSeeAll])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleCalculate = async () => {
    setIsCalculating(true)
    try {
      const generated = await calculateComissoes()
      toast({
        title: 'Cálculo concluído',
        description:
          generated > 0
            ? `${generated} novas comissões geradas.`
            : 'Nenhuma nova comissão para calcular.',
      })
      if (generated > 0) loadData()
    } catch (error: any) {
      toast({ title: 'Erro', description: 'Falha ao calcular comissões.', variant: 'destructive' })
    } finally {
      setIsCalculating(false)
    }
  }

  const handleMarkAsPaid = async (id: string) => {
    if (!canPay) return
    try {
      await markComissaoAsPaid(id)
      toast({ title: 'Sucesso', description: 'Comissão marcada como paga.' })
      setData((prev) =>
        prev.map((c) =>
          c.id === id ? { ...c, status: 'Pago', data_pagamento: new Date().toISOString() } : c,
        ),
      )
    } catch (error: any) {
      toast({ title: 'Erro', description: 'Falha ao atualizar status.', variant: 'destructive' })
    }
  }

  const formatBRL = (val: any) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(val) || 0)
  const formatDate = (val: any) => (val ? new Date(val).toLocaleDateString('pt-BR') : '-')

  const filteredData = data.filter(
    (c) => statusFilter === 'todos' || c.status?.toLowerCase() === statusFilter.toLowerCase(),
  )

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Gestão de Comissões" module="Financeiro" page="Comissões" />

      <Card className="bg-white border-slate-200 shadow-sm">
        <CardContent className="p-4 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Status</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="pago">Pago</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" onClick={loadData} disabled={isLoading}>
                <RefreshCw
                  className={`h-4 w-4 text-slate-600 ${isLoading ? 'animate-spin' : ''}`}
                />
              </Button>
            </div>
            {canCalculate && (
              <Button
                onClick={handleCalculate}
                disabled={isCalculating}
                className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
              >
                <Calculator className="mr-2 h-4 w-4" />
                {isCalculating ? 'Calculando...' : 'Calcular Comissões'}
              </Button>
            )}
          </div>

          <div className="rounded-md border border-slate-200 overflow-hidden">
            <Table className="table-zebra">
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead>Vendedor / Agente</TableHead>
                  <TableHead>Pedido</TableHead>
                  <TableHead>Valor Venda</TableHead>
                  <TableHead>% Com.</TableHead>
                  <TableHead>Bruto</TableHead>
                  <TableHead>Imposto</TableHead>
                  <TableHead>Líquido</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Pagamento</TableHead>
                  {canPay && <TableHead className="text-right">Ação</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={canPay ? 10 : 9} className="text-center py-8">
                      Carregando...
                    </TableCell>
                  </TableRow>
                ) : filteredData.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={canPay ? 10 : 9}
                      className="text-center py-8 text-slate-500"
                    >
                      Nenhuma comissão encontrada.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="font-medium">
                        {row.vendedor?.nome || row.agente?.nome || '-'}
                      </TableCell>
                      <TableCell>
                        {row.pedido?.numero_pedido || row.pedido?.protocolo_certificadora || '-'}
                      </TableCell>
                      <TableCell>{formatBRL(row.valor_venda)}</TableCell>
                      <TableCell>{row.percentual_comissao || 0}%</TableCell>
                      <TableCell>{formatBRL(row.valor_comissao_bruto)}</TableCell>
                      <TableCell className="text-red-600">
                        {formatBRL(row.imposto_retido)}
                      </TableCell>
                      <TableCell className="font-semibold text-emerald-600">
                        {formatBRL(row.valor_comissao_liquido)}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${row.status === 'Pago' ? 'bg-emerald-100 text-emerald-800' : 'bg-orange-100 text-orange-800'}`}
                        >
                          {row.status || 'Pendente'}
                        </span>
                      </TableCell>
                      <TableCell className="text-xs text-slate-500">
                        {formatDate(row.data_pagamento)}
                      </TableCell>
                      {canPay && (
                        <TableCell className="text-right">
                          {row.status !== 'Pago' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleMarkAsPaid(row.id)}
                              className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                            >
                              <CheckCircle2 className="mr-1 h-4 w-4" /> Pagar
                            </Button>
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
