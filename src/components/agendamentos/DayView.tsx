import { useMemo } from 'react'
import { format, isSameDay, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { cn } from '@/lib/utils'

interface DayViewProps {
  currentDate: Date
  events: any[]
  onDateClick: (date: Date) => void
  onEventClick: (event: any, e: React.MouseEvent) => void
}

export function DayView({ currentDate, events, onDateClick, onEventClick }: DayViewProps) {
  const getStatusColor = (status?: string) => {
    if (status === 'aprovado') return 'bg-emerald-100 text-emerald-800 border-emerald-200'
    if (status === 'cancelado' || status === 'rejeitado')
      return 'bg-red-100 text-red-800 border-red-200'
    return 'bg-amber-100 text-amber-800 border-amber-200'
  }

  const dayEvents = useMemo(() => {
    return events
      .filter((ev) => ev.data_pedido && isSameDay(parseISO(ev.data_pedido), currentDate))
      .sort((a, b) => new Date(a.data_pedido).getTime() - new Date(b.data_pedido).getTime())
  }, [events, currentDate])

  return (
    <div className="flex flex-col h-full bg-white rounded-md border border-slate-200 overflow-hidden">
      <div className="border-b border-slate-200 bg-slate-50 p-4 text-center">
        <h3 className="text-lg font-semibold text-slate-800 capitalize">
          {format(currentDate, "EEEE, d 'de' MMMM", { locale: ptBR })}
        </h3>
      </div>
      <div
        className="flex-1 p-4 overflow-y-auto cursor-pointer min-h-[500px]"
        onClick={() => onDateClick(currentDate)}
      >
        {dayEvents.length === 0 ? (
          <div className="h-full flex items-center justify-center text-slate-400">
            Nenhum agendamento para este dia. Clique para adicionar.
          </div>
        ) : (
          <div className="flex flex-col gap-3 max-w-3xl mx-auto">
            {dayEvents.map((ev) => (
              <div
                key={ev.id}
                onClick={(e) => onEventClick(ev, e)}
                className={cn(
                  'p-4 rounded-lg border cursor-pointer hover:shadow-sm transition-all flex flex-col sm:flex-row gap-4 sm:items-center justify-between',
                  getStatusColor(ev.status_pedido),
                )}
              >
                <div className="flex items-center gap-4">
                  <div className="text-xl font-bold opacity-90 w-16 text-center shrink-0">
                    {format(parseISO(ev.data_pedido), 'HH:mm')}
                  </div>
                  <div className="w-px h-10 bg-black/10 hidden sm:block"></div>
                  <div>
                    <div className="font-bold text-base">{ev.cliente?.nome || 'Sem Cliente'}</div>
                    <div className="text-sm opacity-90">
                      {ev.produto?.nome || 'Produto não informado'}
                    </div>
                    {ev.observacoes && (
                      <div className="text-xs opacity-75 mt-1 line-clamp-1">
                        {ev.observacoes.split('\n')[0]}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="px-2.5 py-1 bg-black/5 rounded-full text-xs font-semibold capitalize border border-black/5">
                    {ev.status_pedido || 'Pendente'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
