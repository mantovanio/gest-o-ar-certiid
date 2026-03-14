import { useMemo } from 'react'
import { startOfWeek, endOfWeek, eachDayOfInterval, format, isSameDay, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { cn, getAgendamentoStatusColor } from '@/lib/utils'

interface WeekViewProps {
  currentDate: Date
  events: any[]
  onDateClick: (date: Date) => void
  onEventClick: (event: any, e: React.MouseEvent) => void
}

export function WeekView({ currentDate, events, onDateClick, onEventClick }: WeekViewProps) {
  const days = useMemo(() => {
    const start = startOfWeek(currentDate, { weekStartsOn: 0 })
    const end = endOfWeek(currentDate, { weekStartsOn: 0 })
    return eachDayOfInterval({ start, end })
  }, [currentDate])

  return (
    <div className="flex flex-col h-full bg-white rounded-md border border-slate-200 overflow-hidden">
      <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">
        {days.map((day) => {
          const isToday = isSameDay(day, new Date())
          return (
            <div
              key={day.toISOString()}
              className="py-3 text-center border-r border-slate-200 last:border-r-0"
            >
              <div className="text-xs font-medium text-slate-500 uppercase">
                {format(day, 'EEE', { locale: ptBR })}
              </div>
              <div
                className={cn(
                  'text-lg mx-auto w-8 h-8 flex items-center justify-center rounded-full mt-1',
                  isToday ? 'bg-blue-600 text-white font-bold' : 'text-slate-800 font-medium',
                )}
              >
                {format(day, 'd')}
              </div>
            </div>
          )
        })}
      </div>
      <div className="grid grid-cols-7 flex-1 min-h-[500px]">
        {days.map((day, i) => {
          const dayEvents = events.filter(
            (ev) => ev.data_pedido && isSameDay(parseISO(ev.data_pedido), day),
          )
          return (
            <div
              key={day.toISOString()}
              onClick={() => onDateClick(day)}
              className={cn(
                'p-2 border-r border-slate-200 cursor-pointer hover:bg-slate-50 flex flex-col gap-2',
                i === 6 && 'border-r-0',
              )}
            >
              {dayEvents
                .sort(
                  (a, b) => new Date(a.data_pedido).getTime() - new Date(b.data_pedido).getTime(),
                )
                .map((ev) => (
                  <div
                    key={ev.id}
                    onClick={(e) => onEventClick(ev, e)}
                    className={cn(
                      'text-xs p-2 rounded-md border cursor-pointer hover:opacity-80 transition-opacity',
                      getAgendamentoStatusColor(ev.status_pedido),
                    )}
                  >
                    <div className="font-semibold">{format(parseISO(ev.data_pedido), 'HH:mm')}</div>
                    <div className="truncate mt-0.5" title={ev.cliente?.nome}>
                      {ev.cliente?.nome || 'Sem Cliente'}
                    </div>
                    <div className="truncate text-[10px] opacity-80 mt-1" title={ev.agente?.nome}>
                      Agente: {ev.agente?.nome?.split(' ')[0] || 'N/A'}
                    </div>
                  </div>
                ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}
