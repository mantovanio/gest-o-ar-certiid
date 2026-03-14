import { supabase } from '@/lib/supabase/client'
import { format, parseISO } from 'date-fns'

export interface RelatoriosFilters {
  startDate?: string
  endDate?: string
  vendedorId?: string
  agenteId?: string
}

export const getFilterOptions = async () => {
  const { data } = await supabase
    .from('usuarios')
    .select('id, nome, tipo_usuario')
    .eq('ativo', true)
    .order('nome')

  const usuarios = data || []
  return {
    vendedores: usuarios.filter((u) =>
      ['vendedor', 'admin', 'agente'].includes(u.tipo_usuario || ''),
    ),
    agentes: usuarios.filter((u) => ['agente', 'admin'].includes(u.tipo_usuario || '')),
  }
}

export const getRelatoriosData = async (filters: RelatoriosFilters) => {
  let pQuery = supabase
    .from('pedidos')
    .select(
      '*, vendedor:usuarios!pedidos_vendedor_id_fkey(nome), agente:usuarios!pedidos_agente_id_fkey(nome)',
    )

  let cQuery = supabase
    .from('comissoes')
    .select('*, agente:usuarios!comissoes_agente_id_fkey(nome)')

  let sQuery = supabase
    .from('status_certificado')
    .select('id, status, data_atualizacao, pedidos!inner(vendedor_id, agente_id)')

  if (filters.startDate) {
    pQuery = pQuery.gte('data_pedido', filters.startDate)
    cQuery = cQuery.gte('data_calculo', filters.startDate)
    sQuery = sQuery.gte('data_atualizacao', filters.startDate)
  }
  if (filters.endDate) {
    pQuery = pQuery.lte('data_pedido', filters.endDate + 'T23:59:59.999Z')
    cQuery = cQuery.lte('data_calculo', filters.endDate + 'T23:59:59.999Z')
    sQuery = sQuery.lte('data_atualizacao', filters.endDate + 'T23:59:59.999Z')
  }
  if (filters.vendedorId && filters.vendedorId !== 'all') {
    pQuery = pQuery.eq('vendedor_id', filters.vendedorId)
    cQuery = cQuery.eq('vendedor_id', filters.vendedorId)
    sQuery = sQuery.eq('pedidos.vendedor_id', filters.vendedorId)
  }
  if (filters.agenteId && filters.agenteId !== 'all') {
    pQuery = pQuery.eq('agente_id', filters.agenteId)
    cQuery = cQuery.eq('agente_id', filters.agenteId)
    sQuery = sQuery.eq('pedidos.agente_id', filters.agenteId)
  }

  const [resPedidos, resComissoes, resStatus] = await Promise.all([pQuery, cQuery, sQuery])

  const pedidos = resPedidos.data || []
  const comissoes = resComissoes.data || []
  const statuses = resStatus.data || []

  const salesMap = new Map<string, number>()
  pedidos.forEach((p) => {
    const vName = (p.vendedor as any)?.nome || p.vendedor || 'Sem Vendedor'
    salesMap.set(vName, (salesMap.get(vName) || 0) + Number(p.valor_venda || 0))
  })
  const salesBySeller = Array.from(salesMap.entries())
    .map(([name, total]) => ({ name, total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 10)

  const commMap = new Map<string, number>()
  comissoes.forEach((c) => {
    const aName = (c.agente as any)?.nome || 'Sem Agente'
    const val = Number(c.valor_comissao_bruto || 0)
    if (val > 0) commMap.set(aName, (commMap.get(aName) || 0) + val)
  })
  const commissionsByAgent = Array.from(commMap.entries())
    .map(([name, value], i) => ({ name, value, fill: `hsl(var(--chart-${(i % 5) + 1}))` }))
    .sort((a, b) => b.value - a.value)

  const revMap = new Map<string, number>()
  pedidos.forEach((p) => {
    if (!p.data_pedido) return
    const month = p.data_pedido.substring(0, 7)
    revMap.set(month, (revMap.get(month) || 0) + Number(p.valor_final || p.valor_venda || 0))
  })
  const monthlyRevenue = Array.from(revMap.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([month, total]) => ({ month: `${month.split('-')[1]}/${month.split('-')[0]}`, total }))

  const timelineMap = new Map<string, number>()
  statuses.forEach((s) => {
    const status = s.status?.toLowerCase() || ''
    if (['aprovado', 'concluido', 'concluído', 'emitido'].includes(status) && s.data_atualizacao) {
      const date = s.data_atualizacao.substring(0, 10)
      timelineMap.set(date, (timelineMap.get(date) || 0) + 1)
    }
  })
  const statusTimeline = Array.from(timelineMap.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([date, count]) => ({ date: format(parseISO(date), 'dd/MM'), count }))

  return { salesBySeller, commissionsByAgent, monthlyRevenue, statusTimeline }
}
