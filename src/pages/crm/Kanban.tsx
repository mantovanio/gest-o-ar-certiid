import React, { useEffect, useState } from 'react'
import { getLeads, updateLeadStatus, Lead } from '@/services/crm'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { CommunicationDrawer } from '@/components/CommunicationDrawer'
import { toast } from '@/hooks/use-toast'
import { Phone, CalendarIcon, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const COLUMNS = [
  { id: 'novo', title: 'Novo Lead', color: 'bg-slate-200' },
  { id: 'em_atendimento', title: 'Em Atendimento', color: 'bg-blue-100' },
  { id: 'aguardando_doc', title: 'Aguardando Doc.', color: 'bg-amber-100' },
  { id: 'em_emissao', title: 'Em Emissão', color: 'bg-purple-100' },
  { id: 'finalizado', title: 'Finalizado/Renovado', color: 'bg-green-100' },
]

export default function Kanban() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [draggedLeadId, setDraggedLeadId] = useState<string | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)

  useEffect(() => {
    fetchLeads()
  }, [])

  const fetchLeads = async () => {
    try {
      const data = await getLeads()
      setLeads(data)
    } catch (error) {
      toast({ title: 'Erro', description: 'Falha ao carregar leads.', variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedLeadId(id)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = async (e: React.DragEvent, columnId: string) => {
    e.preventDefault()
    if (!draggedLeadId) return

    const leadToMove = leads.find((l) => l.id === draggedLeadId)
    if (!leadToMove || leadToMove.status_lead === columnId) return

    // Optimistic UI update
    setLeads((prev) =>
      prev.map((l) => (l.id === draggedLeadId ? { ...l, status_lead: columnId } : l)),
    )

    try {
      await updateLeadStatus(draggedLeadId, columnId)
      toast({ title: 'Status Atualizado', description: `O card foi movido com sucesso.` })
    } catch (error) {
      // Revert on error
      fetchLeads()
      toast({ title: 'Erro', description: 'Falha ao atualizar status.', variant: 'destructive' })
    }
    setDraggedLeadId(null)
  }

  const openDrawer = (lead: Lead) => {
    setSelectedLead(lead)
    setDrawerOpen(true)
  }

  if (loading)
    return (
      <div className="flex justify-center p-12">
        <Loader2 className="animate-spin text-primary w-8 h-8" />
      </div>
    )

  return (
    <div className="h-full flex flex-col space-y-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-800">CRM de Renovações</h2>
        <p className="text-muted-foreground text-sm">
          Gerencie o fluxo de atendimento dos seus clientes.
        </p>
      </div>

      <div className="flex-1 flex gap-4 overflow-x-auto pb-4 pt-2 snap-x">
        {COLUMNS.map((col) => (
          <div
            key={col.id}
            className="flex-shrink-0 w-80 flex flex-col bg-slate-100 rounded-lg p-3 snap-start border border-slate-200 shadow-sm"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, col.id)}
          >
            <div className="flex items-center justify-between mb-3 px-1">
              <h3 className="font-semibold text-slate-700 text-sm uppercase tracking-wider">
                {col.title}
              </h3>
              <Badge variant="secondary" className="bg-white">
                {leads.filter((l) => l.status_lead === col.id).length}
              </Badge>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1 min-h-[150px]">
              {leads
                .filter((l) => l.status_lead === col.id)
                .map((lead) => (
                  <Card
                    key={lead.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, lead.id)}
                    onClick={() => openDrawer(lead)}
                    className="cursor-pointer hover:border-primary/50 hover:shadow-md transition-all active:scale-95 bg-white border-slate-200"
                  >
                    <CardContent className="p-3">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold text-sm line-clamp-1">
                          {lead.nome || 'Cliente sem nome'}
                        </span>
                        <Badge variant="outline" className={cn('text-[10px] py-0', col.color)}>
                          {lead.Produto || 'N/A'}
                        </Badge>
                      </div>

                      <div className="space-y-1.5 mt-3 text-xs text-slate-500">
                        {lead.whatsapp && (
                          <div className="flex items-center gap-1.5">
                            <Phone className="w-3 h-3" />
                            <span>{lead.whatsapp}</span>
                          </div>
                        )}
                        {lead.data_vencimento_certificado && (
                          <div className="flex items-center gap-1.5 text-orange-600 font-medium">
                            <CalendarIcon className="w-3 h-3" />
                            <span>
                              Vence:{' '}
                              {format(new Date(lead.data_vencimento_certificado), 'dd/MM/yyyy')}
                            </span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              {leads.filter((l) => l.status_lead === col.id).length === 0 && (
                <div className="h-full flex items-center justify-center text-sm text-slate-400 border-2 border-dashed border-slate-200 rounded-lg p-4 text-center">
                  Solte os cards aqui
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <CommunicationDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        clientData={
          selectedLead
            ? { name: selectedLead.nome || '', phone: selectedLead.whatsapp || '' }
            : null
        }
      />
    </div>
  )
}
