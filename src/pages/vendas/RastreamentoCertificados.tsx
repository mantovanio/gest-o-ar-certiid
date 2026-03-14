import { useState, useEffect } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Clock, Check, RefreshCw, Loader2, Info } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import { toast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

export default function RastreamentoPage() {
  const [pedidos, setPedidos] = useState<any[]>([])
  const [selectedPedido, setSelectedPedido] = useState<string>('')
  const [statuses, setStatuses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingStatuses, setLoadingStatuses] = useState(false)

  const STAGES = ['Solicitação', 'Validação', 'Emissão', 'Entrega', 'Renovação']

  useEffect(() => {
    loadPedidos()
  }, [])

  useEffect(() => {
    if (selectedPedido) {
      loadStatuses(selectedPedido)

      const channel = supabase
        .channel('status_changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'status_certificado',
            filter: `pedido_id=eq.${selectedPedido}`,
          },
          () => {
            loadStatuses(selectedPedido)
            toast({
              title: 'Timeline Atualizada',
              description: 'O status do certificado via Safeweb foi atualizado em tempo real.',
            })
          },
        )
        .subscribe()

      return () => {
        supabase.removeChannel(channel)
      }
    } else {
      setStatuses([])
    }
  }, [selectedPedido])

  const loadPedidos = async () => {
    try {
      const { data } = await supabase
        .from('pedidos')
        .select('id, protocolo_certificadora, cliente:clientes(nome)')
        .order('data_pedido', { ascending: false })
        .limit(100)
      if (data) setPedidos(data)
    } catch (e) {
      toast({
        title: 'Erro',
        description: 'Falha ao carregar os pedidos para rastreamento.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const loadStatuses = async (id: string) => {
    setLoadingStatuses(true)
    try {
      const { data } = await supabase
        .from('status_certificado')
        .select('*')
        .eq('pedido_id', id)
        .order('data_atualizacao', { ascending: true })
      if (data) setStatuses(data)
    } catch (e) {
      toast({
        title: 'Erro',
        description: 'Falha ao carregar o rastreamento do certificado.',
        variant: 'destructive',
      })
    } finally {
      setLoadingStatuses(false)
    }
  }

  const getStageStatus = (stage: string) => {
    const stageRecords = statuses.filter((s) => s.etapa?.toLowerCase() === stage.toLowerCase())
    if (stageRecords.length === 0) return 'pending'
    const last = stageRecords[stageRecords.length - 1]
    return last.status === 'aprovado' || last.status === 'concluido' ? 'completed' : 'current'
  }

  const getStageRecord = (stage: string) => {
    const stageRecords = statuses.filter((s) => s.etapa?.toLowerCase() === stage.toLowerCase())
    return stageRecords.length > 0 ? stageRecords[stageRecords.length - 1] : null
  }

  return (
    <div className="space-y-6 animate-fade-in h-full flex flex-col">
      <PageHeader
        title="Rastreamento de Certificados"
        module="Vendas"
        page="Timeline de Acompanhamento"
      />

      <Card className="bg-white border-slate-200 shadow-sm flex-1 flex flex-col min-h-[500px]">
        <CardContent className="p-4 sm:p-8 flex-1 flex flex-col">
          <div className="max-w-md w-full mb-8">
            <Label className="mb-2 block text-slate-700">Selecione o Pedido (Protocolo)</Label>
            {loading ? (
              <div className="flex items-center text-slate-500 text-sm">
                <Loader2 className="animate-spin mr-2 h-4 w-4 text-blue-600" /> Carregando base de
                pedidos...
              </div>
            ) : (
              <Select value={selectedPedido} onValueChange={setSelectedPedido}>
                <SelectTrigger className="border-slate-300">
                  <SelectValue placeholder="Selecione um pedido para visualizar..." />
                </SelectTrigger>
                <SelectContent>
                  {pedidos.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.protocolo_certificadora || 'Sem Protocolo'} -{' '}
                      {p.cliente?.nome || 'Desconhecido'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {selectedPedido && (
            <div className="flex-1 flex flex-col items-center w-full py-4">
              {loadingStatuses ? (
                <div className="flex justify-center my-12">
                  <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
                </div>
              ) : statuses.length === 0 ? (
                <div className="flex flex-col items-center justify-center my-12 text-slate-500 bg-slate-50 p-8 rounded-lg border border-slate-100 w-full max-w-2xl text-center">
                  <Info className="h-10 w-10 text-slate-400 mb-3" />
                  <p>Nenhum evento de rastreamento sincronizado para este pedido até o momento.</p>
                  <p className="text-xs mt-1">
                    As atualizações da Safeweb API aparecerão aqui automaticamente.
                  </p>
                </div>
              ) : (
                <div className="relative max-w-3xl w-full mx-auto">
                  {/* Vertical Line */}
                  <div className="absolute left-[27px] top-4 bottom-4 w-1 bg-slate-100 rounded-full"></div>

                  <div className="space-y-8 relative pb-10">
                    {STAGES.map((stage, idx) => {
                      const state = getStageStatus(stage)
                      const record = getStageRecord(stage)

                      return (
                        <div key={stage} className="flex gap-6 group">
                          <div
                            className={cn(
                              'relative z-10 flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center border-4 border-white shadow-sm transition-all duration-300',
                              state === 'completed'
                                ? 'bg-emerald-500 text-white'
                                : state === 'current'
                                  ? 'bg-blue-600 text-white shadow-md ring-4 ring-blue-50'
                                  : 'bg-slate-200 text-slate-400',
                            )}
                          >
                            {state === 'completed' ? (
                              <Check className="h-6 w-6" />
                            ) : state === 'current' ? (
                              <RefreshCw className="h-6 w-6 animate-spin" />
                            ) : (
                              <Clock className="h-6 w-6" />
                            )}
                          </div>

                          <div
                            className={cn(
                              'flex-1 p-5 rounded-lg border transition-all duration-300',
                              state === 'completed'
                                ? 'bg-white border-emerald-200 shadow-sm'
                                : state === 'current'
                                  ? 'bg-blue-50/50 border-blue-300 shadow-md transform scale-[1.02]'
                                  : 'bg-slate-50/50 border-slate-100 opacity-70',
                            )}
                          >
                            <h4
                              className={cn(
                                'text-lg font-bold mb-1 tracking-tight flex items-center justify-between',
                                state === 'completed'
                                  ? 'text-emerald-700'
                                  : state === 'current'
                                    ? 'text-blue-900'
                                    : 'text-slate-500',
                              )}
                            >
                              <span>
                                Etapa {idx + 1}: {stage}
                              </span>
                              {state === 'completed' && (
                                <span className="text-xs font-semibold px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full">
                                  Concluído
                                </span>
                              )}
                              {state === 'current' && (
                                <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-800 rounded-full animate-pulse">
                                  Em Andamento
                                </span>
                              )}
                            </h4>

                            {record ? (
                              <div className="text-sm space-y-2 mt-3 text-slate-600">
                                <p className="flex items-start">
                                  <strong className="text-slate-800 w-20">Evento:</strong>
                                  <span className="flex-1">
                                    {record.evento || 'Evento atualizado'}
                                  </span>
                                </p>
                                {record.descricao && (
                                  <p className="flex items-start">
                                    <strong className="text-slate-800 w-20">Detalhes:</strong>
                                    <span className="flex-1 bg-white p-2 rounded border border-slate-100 italic">
                                      {record.descricao}
                                    </span>
                                  </p>
                                )}
                                <div className="pt-2 border-t border-slate-100/60 mt-3">
                                  <p className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                                    <Clock className="h-3.5 w-3.5" />
                                    Data de Processamento:{' '}
                                    {new Date(record.data_atualizacao).toLocaleString('pt-BR')}
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <p className="text-sm text-slate-400 mt-2 italic">
                                Aguardando início desta etapa...
                              </p>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
