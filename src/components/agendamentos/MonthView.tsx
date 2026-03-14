import { useMemo } from 'react'
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  parseISO,
} from 'date-fns'
import { cn, getAgendamentoStatusColor } from '@/lib/utils'

interface MonthViewProps {
  currentDate: Date
  events: any[]
  onDateClick: (date: Date) => void
  onEventClick: (event: any, e: React.MouseEvent) => void
}

export function MonthView({ currentDate, events, onDateClick, onEventClick }: MonthViewProps) {
  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentDate), { weekStartsOn: 0 })
    const end = endOfWeek(endOfMonth(currentDate), { weekStartsOn: 0 })
    return eachDayOfInterval({ start, end })
  }, [currentDate])

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

  return (
    <div className="flex flex-col h-full bg-white rounded-md border border-slate-200 overflow-hidden">
      <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">
        {weekDays.map((day) => (
          <div
            key={day}
            className="py-2 text-center text-sm font-medium text-slate-600 border-r border-slate-200 last:border-r-0"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 flex-1 auto-rows-fr">
        {days.map((day, i) => {
          const dayEvents = events.filter(
            (ev) => ev.data_pedido && isSameDay(parseISO(ev.data_pedido), day),
          )
          const isCurrentMonth = isSameMonth(day, currentDate)
          const isToday = isSameDay(day, new Date())

          return (
            <div
              key={day.toISOString()}
              onClick={() => onDateClick(day)}
              className={cn(
                'min-h-[100px] p-1 border-b border-r border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors flex flex-col gap-1 relative',
                !isCurrentMonth && 'bg-slate-50/50 text-slate-400',
                i % 7 === 6 && 'border-r-0',
              )}
            >
              <div className="flex justify-end p-1">
                <span
                  className={cn(
                    'text-xs w-6 h-6 flex items-center justify-center rounded-full',
                    isToday ? 'bg-blue-600 text-white font-bold' : 'font-medium',
                  )}
                >
                  {format(day, 'd')}
                </span>
              </div>
              <div className="flex flex-col gap-1 overflow-y-auto flex-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-1 px-1">
                {dayEvents.map((ev) => (
                  <div
                    key={ev.id}
                    onClick={(e) => onEventClick(ev, e)}
                    className={cn(
                      'text-[10px] sm:text-xs px-1.5 py-1 rounded-sm border truncate font-medium',
                      getAgendamentoStatusColor(ev.status_pedido),
                    )}
                    title={`Cliente: ${ev.cliente?.nome || 'N/A'}\nAgente: ${ev.agente?.nome || 'Não atribuído'}\nHora: ${format(parseISO(ev.data_pedido), 'HH:mm')}`}
                  >
                    {format(parseISO(ev.data_pedido), 'HH:mm')} -{' '}
                    {ev.cliente?.nome?.split(' ')[0] || 'Novo'}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
