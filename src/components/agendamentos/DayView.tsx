import { useMemo } from 'react'
import { format, isSameDay, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { cn, getAgendamentoStatusColor } from '@/lib/utils'
import { UserCircle } from 'lucide-react'

interface DayViewProps {
  currentDate: Date
  events: any[]
  onDateClick: (date: Date) => void
  onEventClick: (event: any, e: React.MouseEvent) => void
}

export function DayView({ currentDate, events, onDateClick, onEventClick }: DayViewProps) {
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
                  getAgendamentoStatusColor(ev.status_pedido),
                )}
              >
                <div className="flex items-center gap-4">
                  <div className="text-xl font-bold opacity-90 w-16 text-center shrink-0">
                    {format(parseISO(ev.data_pedido), 'HH:mm')}
                  </div>
                  <div className="w-px h-10 bg-black/10 hidden sm:block"></div>
                  <div>
                    <div className="font-bold text-base">{ev.cliente?.nome || 'Sem Cliente'}</div>
                    <div className="text-sm opacity-90 flex items-center gap-2 mt-0.5">
                      <span>{ev.produto?.nome || 'Produto não informado'}</span>
                      {ev.agente && (
                        <span className="flex items-center gap-1 opacity-80 text-xs bg-black/5 px-2 py-0.5 rounded-full">
                          <UserCircle className="w-3 h-3" /> {ev.agente.nome}
                        </span>
                      )}
                    </div>
                    {ev.observacoes && (
                      <div className="text-xs opacity-75 mt-1.5 line-clamp-1 border-t border-black/5 pt-1.5">
                        {ev.observacoes.split('\n')[0]}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="px-3 py-1 bg-black/5 rounded-full text-xs font-semibold capitalize border border-black/5">
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
