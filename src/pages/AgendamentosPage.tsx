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
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { format, addMonths, subMonths, addWeeks, subWeeks, addDays, subDays } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { MonthView } from '@/components/agendamentos/MonthView'
import { WeekView } from '@/components/agendamentos/WeekView'
import { DayView } from '@/components/agendamentos/DayView'
import { AgendamentoForm } from '@/components/agendamentos/AgendamentoForm'
import {
  getPedidos,
  getDropdownData,
  createPedido,
  updatePedido,
  deletePedido,
} from '@/services/pedidos'
import { toast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

export default function AgendamentosPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<'month' | 'week' | 'day'>('month')

  const [events, setEvents] = useState<any[]>([])
  const [dropdownData, setDropdownData] = useState<{
    clientes: any[]
    produtos: any[]
    usuarios: any[]
  }>({ clientes: [], produtos: [], usuarios: [] })
  const [isLoading, setIsLoading] = useState(true)

  const [formOpen, setFormOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null)
  const [initialDate, setInitialDate] = useState<Date | null>(null)

  const loadData = useCallback(async () => {
    setIsLoading(true)
    try {
      const [pedidosData, dropsData] = await Promise.all([getPedidos(), getDropdownData()])
      setEvents(pedidosData.filter((p) => p.data_pedido))
      setDropdownData(dropsData)
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: 'Falha ao carregar agendamentos.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handlePrev = () => {
    if (view === 'month') setCurrentDate(subMonths(currentDate, 1))
    else if (view === 'week') setCurrentDate(subWeeks(currentDate, 1))
    else setCurrentDate(subDays(currentDate, 1))
  }

  const handleNext = () => {
    if (view === 'month') setCurrentDate(addMonths(currentDate, 1))
    else if (view === 'week') setCurrentDate(addWeeks(currentDate, 1))
    else setCurrentDate(addDays(currentDate, 1))
  }

  const handleToday = () => {
    setCurrentDate(new Date())
  }

  const handleDateClick = (date: Date) => {
    const newDate = new Date(date)
    newDate.setHours(9, 0, 0, 0)
    setInitialDate(newDate)
    setSelectedEvent(null)
    setFormOpen(true)
  }

  const handleEventClick = (event: any, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedEvent(event)
    setInitialDate(null)
    setFormOpen(true)
  }

  const handleSaveEvent = async (data: any) => {
    try {
      if (data.id) {
        const { id, ...payload } = data
        await updatePedido(id, payload)
        toast({ title: 'Sucesso', description: 'Agendamento atualizado.' })
      } else {
        await createPedido(data)
        toast({ title: 'Sucesso', description: 'Agendamento criado.' })
      }
      loadData()
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message || 'Falha ao salvar.',
        variant: 'destructive',
      })
      throw error
    }
  }

  const handleDeleteEvent = async (id: string) => {
    try {
      await deletePedido(id)
      toast({ title: 'Sucesso', description: 'Agendamento removido.' })
      loadData()
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message || 'Falha ao remover.',
        variant: 'destructive',
      })
      throw error
    }
  }

  const getHeaderLabel = () => {
    if (view === 'day') return format(currentDate, "dd 'de' MMMM, yyyy", { locale: ptBR })
    if (view === 'week') return `Semana de ${format(currentDate, 'dd MMM', { locale: ptBR })}`
    return format(currentDate, 'MMMM yyyy', { locale: ptBR })
  }

  return (
    <div className="space-y-4 animate-fade-in h-full flex flex-col">
      <PageHeader title="Agendamentos" module="Atendimento" page="Calendário" />

      <Card className="bg-white border-slate-200 shadow-sm flex-1 flex flex-col min-h-[600px]">
        <CardContent className="p-4 sm:p-6 flex-1 flex flex-col h-full space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={handlePrev}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={handleToday} className="px-4">
                Hoje
              </Button>
              <Button variant="outline" size="icon" onClick={handleNext}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <h2 className="text-xl font-bold text-slate-800 ml-2 capitalize w-[200px]">
                {getHeaderLabel()}
              </h2>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Select value={view} onValueChange={(v: any) => setView(v)}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Mês</SelectItem>
                  <SelectItem value="week">Semana</SelectItem>
                  <SelectItem value="day">Dia</SelectItem>
                </SelectContent>
              </Select>

              <Button
                onClick={() => {
                  setInitialDate(new Date())
                  setSelectedEvent(null)
                  setFormOpen(true)
                }}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="mr-2 h-4 w-4" /> Novo
              </Button>
            </div>
          </div>

          <div className="flex-1 min-h-0 overflow-hidden relative">
            {isLoading && (
              <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
                <span className="text-slate-500 font-medium bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
                  Carregando...
                </span>
              </div>
            )}

            {view === 'month' && (
              <MonthView
                currentDate={currentDate}
                events={events}
                onDateClick={handleDateClick}
                onEventClick={handleEventClick}
              />
            )}
            {view === 'week' && (
              <WeekView
                currentDate={currentDate}
                events={events}
                onDateClick={handleDateClick}
                onEventClick={handleEventClick}
              />
            )}
            {view === 'day' && (
              <DayView
                currentDate={currentDate}
                events={events}
                onDateClick={handleDateClick}
                onEventClick={handleEventClick}
              />
            )}
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 items-center justify-center pt-2 text-xs sm:text-sm border-t border-slate-100 mt-2">
            <LegendItem color="bg-slate-300" label="Pendente" />
            <LegendItem color="bg-orange-400" label="Aguardando Pagamento" />
            <LegendItem color="bg-emerald-400" label="Confirmado" />
            <LegendItem color="bg-purple-400" label="Reagendado" />
            <LegendItem color="bg-green-700" label="Atendido" />
            <LegendItem color="bg-red-400" label="Cancelado" />
          </div>
        </CardContent>
      </Card>

      <AgendamentoForm
        open={formOpen}
        onOpenChange={setFormOpen}
        selectedEvent={selectedEvent}
        initialDate={initialDate}
        dropdownData={dropdownData}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
      />
    </div>
  )
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className={cn('w-3 h-3 rounded-full', color)}></div>
      <span className="text-slate-600 font-medium">{label}</span>
    </div>
  )
}
