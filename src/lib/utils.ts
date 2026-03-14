import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAgendamentoStatusColor(status?: string) {
  const s = status?.toLowerCase() || ''
  switch (s) {
    case 'aguardando pagamento':
      return 'bg-orange-100 text-orange-800 border-orange-200'
    case 'atendido':
      return 'bg-green-700 text-green-50 border-green-800'
    case 'cancelado':
      return 'bg-red-100 text-red-800 border-red-200'
    case 'reagendado':
      return 'bg-purple-100 text-purple-800 border-purple-200'
    case 'confirmado':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200'
    case 'pendente':
    default:
      return 'bg-slate-100 text-slate-800 border-slate-200'
  }
}
