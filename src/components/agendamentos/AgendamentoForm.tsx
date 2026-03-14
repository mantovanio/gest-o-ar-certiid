import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { format, parseISO } from 'date-fns'

interface AgendamentoFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedEvent: any | null
  initialDate: Date | null
  dropdownData: { clientes: any[]; produtos: any[]; usuarios: any[] }
  onSave: (data: any) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export function AgendamentoForm({
  open,
  onOpenChange,
  selectedEvent,
  initialDate,
  dropdownData,
  onSave,
  onDelete,
}: AgendamentoFormProps) {
  const [formData, setFormData] = useState<any>({})
  const [duracao, setDuracao] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (open) {
      if (selectedEvent) {
        setFormData({
          id: selectedEvent.id,
          cliente_id: selectedEvent.cliente_id || '',
          produto_id: selectedEvent.produto_id || '',
          agente_id: selectedEvent.agente_id || '',
          data_pedido: selectedEvent.data_pedido
            ? format(parseISO(selectedEvent.data_pedido), "yyyy-MM-dd'T'HH:mm")
            : '',
          status_pedido: selectedEvent.status_pedido || 'pendente',
          observacoes: selectedEvent.observacoes || '',
        })
        const match = (selectedEvent.observacoes || '').match(/Duração: (.*)\n\n/)
        setDuracao(match ? match[1] : '')
      } else if (initialDate) {
        setFormData({
          cliente_id: '',
          produto_id: '',
          agente_id: '',
          data_pedido: format(initialDate, "yyyy-MM-dd'T'HH:mm"),
          status_pedido: 'pendente',
          observacoes: '',
        })
        setDuracao('60 min')
      }
    }
  }, [open, selectedEvent, initialDate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      const finalObs = duracao
        ? `Duração: ${duracao}\n\n${formData.observacoes?.replace(/Duração: .*\n\n/, '') || ''}`
        : formData.observacoes
      const payload = { ...formData, observacoes: finalObs }

      if (payload.data_pedido) {
        payload.data_pedido = new Date(payload.data_pedido).toISOString()
      }

      await onSave(payload)
      onOpenChange(false)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja deletar este agendamento?')) {
      setIsDeleting(true)
      try {
        await onDelete(formData.id)
        onOpenChange(false)
      } finally {
        setIsDeleting(false)
      }
    }
  }

  const agentes = dropdownData.usuarios.filter(
    (u) =>
      !u.role ||
      ['agente'].includes(u.role?.toLowerCase()) ||
      ['agente'].includes(u.tipo_usuario?.toLowerCase()),
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{selectedEvent ? 'Editar Agendamento' : 'Novo Agendamento'}</DialogTitle>
          <DialogDescription>Preencha os detalhes do agendamento de certificado.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-1">
            <Label>Cliente</Label>
            <Select
              value={formData.cliente_id}
              onValueChange={(v) => setFormData({ ...formData, cliente_id: v })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o cliente" />
              </SelectTrigger>
              <SelectContent>
                {dropdownData.clientes.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Produto</Label>
              <Select
                value={formData.produto_id}
                onValueChange={(v) => setFormData({ ...formData, produto_id: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Produto..." />
                </SelectTrigger>
                <SelectContent>
                  {dropdownData.produtos.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label>Agente</Label>
              <Select
                value={formData.agente_id}
                onValueChange={(v) => setFormData({ ...formData, agente_id: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Agente..." />
                </SelectTrigger>
                <SelectContent>
                  {agentes.map((a) => (
                    <SelectItem key={a.id} value={a.id}>
                      {a.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Data/Hora</Label>
              <Input
                type="datetime-local"
                value={formData.data_pedido || ''}
                onChange={(e) => setFormData({ ...formData, data_pedido: e.target.value })}
                required
              />
            </div>
            <div className="space-y-1">
              <Label>Duração</Label>
              <Input
                placeholder="Ex: 60 min"
                value={duracao}
                onChange={(e) => setDuracao(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label>Status</Label>
            <Select
              value={formData.status_pedido}
              onValueChange={(v) => setFormData({ ...formData, status_pedido: v })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="aprovado">Confirmado</SelectItem>
                <SelectItem value="cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label>Observações</Label>
            <Textarea
              rows={3}
              value={formData.observacoes?.replace(/Duração: .*\n\n/, '') || ''}
              onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
            />
          </div>

          <DialogFooter className="flex justify-between items-center sm:justify-between w-full pt-4">
            {selectedEvent ? (
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting || isSaving}
              >
                Deletar
              </Button>
            ) : (
              <div />
            )}
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSaving || isDeleting}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700"
                disabled={isSaving || isDeleting}
              >
                {isSaving ? 'Salvando...' : 'Salvar'}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
