import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PedidoFormData } from '@/services/pedidos'

interface PedidoFormProps {
  formData: PedidoFormData
  onChange: (field: keyof PedidoFormData, value: any) => void
  onSave: () => void
  onClear: () => void
  onCancel: () => void
  isSaving: boolean
  dropdownData: { clientes: any[]; produtos: any[]; usuarios: any[] }
}

const statusPedidoOptions = ['pendente', 'processando', 'aprovado', 'rejeitado', 'cancelado']
const statusPagamentoOptions = ['pendente', 'pago', 'atrasado', 'cancelado']

export function PedidoForm({
  formData,
  onChange,
  onSave,
  onClear,
  onCancel,
  isSaving,
  dropdownData,
}: PedidoFormProps) {
  const vendedores = dropdownData.usuarios.filter(
    (u) =>
      !u.role ||
      ['vendedor', 'admin'].includes(u.role?.toLowerCase()) ||
      ['vendedor', 'admin'].includes(u.tipo_usuario?.toLowerCase()),
  )
  const agentes = dropdownData.usuarios.filter(
    (u) =>
      !u.role ||
      ['agente'].includes(u.role?.toLowerCase()) ||
      ['agente'].includes(u.tipo_usuario?.toLowerCase()),
  )

  const FormSelect = ({
    label,
    value,
    options,
    field,
  }: {
    label: string
    value: string
    options: any[]
    field: keyof PedidoFormData
  }) => (
    <div className="space-y-1">
      <Label>{label}</Label>
      <Select value={value || 'none'} onValueChange={(v) => onChange(field, v === 'none' ? '' : v)}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">Selecione...</SelectItem>
          {options.map((opt, i) => (
            <SelectItem key={opt.id || opt} value={opt.id || opt}>
              {opt.nome || opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )

  return (
    <Card className="bg-white shadow-sm border-slate-200">
      <CardHeader className="bg-slate-50 border-b pb-4">
        <CardTitle className="text-lg font-semibold text-slate-800">
          {formData.id ? 'Editar Pedido' : 'Novo Pedido'}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <FormSelect
            label="Cliente"
            value={formData.cliente_id || ''}
            options={dropdownData.clientes}
            field="cliente_id"
          />
          <FormSelect
            label="Produto"
            value={formData.produto_id || ''}
            options={dropdownData.produtos}
            field="produto_id"
          />
          <FormSelect
            label="Vendedor"
            value={formData.vendedor_id || ''}
            options={vendedores}
            field="vendedor_id"
          />
          <FormSelect
            label="Agente"
            value={formData.agente_id || ''}
            options={agentes}
            field="agente_id"
          />

          <div className="space-y-1">
            <Label>Data do Pedido</Label>
            <Input
              type="date"
              value={formData.data_pedido || ''}
              onChange={(e) => onChange('data_pedido', e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label>Protocolo Certificadora</Label>
            <Input
              value={formData.protocolo_certificadora || ''}
              onChange={(e) => onChange('protocolo_certificadora', e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <Label>Valor Venda (R$)</Label>
            <Input
              type="number"
              step="0.01"
              value={formData.valor_venda || ''}
              onChange={(e) => onChange('valor_venda', e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label>Desconto (R$)</Label>
            <Input
              type="number"
              step="0.01"
              value={formData.desconto || ''}
              onChange={(e) => onChange('desconto', e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label>Valor Final (R$)</Label>
            <Input
              type="number"
              value={formData.valor_final || ''}
              readOnly
              className="bg-slate-50 font-medium"
            />
          </div>

          <FormSelect
            label="Status Pedido"
            value={formData.status_pedido || ''}
            options={statusPedidoOptions}
            field="status_pedido"
          />
          <FormSelect
            label="Status Pagamento"
            value={formData.status_pagamento || ''}
            options={statusPagamentoOptions}
            field="status_pagamento"
          />

          <div className="space-y-1">
            <Label>Data Pagamento</Label>
            <Input
              type="date"
              value={formData.data_pagamento || ''}
              onChange={(e) => onChange('data_pagamento', e.target.value)}
            />
          </div>
          <div className="space-y-1 lg:col-span-3">
            <Label>Número NF</Label>
            <Input
              value={formData.numero_nf || ''}
              onChange={(e) => onChange('numero_nf', e.target.value)}
            />
          </div>
          <div className="space-y-1 lg:col-span-3">
            <Label>Observações</Label>
            <Textarea
              value={formData.observacoes || ''}
              onChange={(e) => onChange('observacoes', e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <div className="flex gap-2 justify-end pt-4 border-t border-slate-100 mt-6">
          <Button variant="outline" onClick={onCancel} disabled={isSaving}>
            Cancelar
          </Button>
          <Button variant="ghost" onClick={onClear} disabled={isSaving}>
            Limpar
          </Button>
          <Button onClick={onSave} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700">
            {isSaving ? 'Salvando...' : 'Salvar Pedido'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
