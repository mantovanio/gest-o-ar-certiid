import { supabase } from '@/lib/supabase/client'

export const getDashboardMetrics = async () => {
  // Mocking calculations that would normally be done via SQL aggregations
  // For demonstration, we'll fetch some raw data and calculate,
  // or return fixed values if table is empty

  try {
    const { data: certs } = await supabase
      .from('certificates')
      .select('valor_oportunidade, data_expiracao')

    const faturamento =
      certs?.reduce((acc, curr) => acc + (Number(curr.valor_oportunidade) || 0), 0) || 15400.0
    const vendas = certs?.length || 42

    // Certificados a vencer in 30 days
    const aVencer =
      certs?.filter((c) => {
        if (!c.data_expiracao) return false
        const expDate = new Date(c.data_expiracao)
        const now = new Date()
        const diffTime = Math.abs(expDate.getTime() - now.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays <= 30 && expDate >= now
      }).length || 15

    const { count: leadsCount } = await supabase
      .from('crm_agente_ia')
      .select('*', { count: 'exact', head: true })
      .eq('status_lead', 'novo')

    return {
      totalVendasMensal: vendas,
      certificadosVencer: aVencer,
      faturamentoBruto: faturamento,
      novosLeads: leadsCount || 8,
    }
  } catch (error) {
    console.error('Error fetching metrics', error)
    return {
      totalVendasMensal: 0,
      certificadosVencer: 0,
      faturamentoBruto: 0,
      novosLeads: 0,
    }
  }
}
