import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Edit, Trash2, Eye, Search, Plus } from 'lucide-react'
import { PedidoData } from '@/services/pedidos'

interface PedidoListProps {
  pedidos: PedidoData[]
  onEdit: (pedido: PedidoData) => void
  onDeleteClick: (pedido: PedidoData) => void
  onNew: () => void
  isLoading: boolean
}

export function PedidoList({ pedidos, onEdit, onDeleteClick, onNew, isLoading }: PedidoListProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [viewData, setViewData] = useState<PedidoData | null>(null)

  const filtered = pedidos.filter(
    (p) =>
      p.numero_pedido?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.protocolo_certificadora?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.cliente?.nome?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const formatBRL = (val: any) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(val) || 0)

  return (
    <Card className="bg-white border-slate-200 shadow-sm rounded-lg overflow-hidden">
      <CardContent className="p-4 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input
              placeholder="Buscar por protocolo ou cliente..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            onClick={onNew}
            className="bg-emerald-600 hover:bg-emerald-700 text-white w-full sm:w-auto"
          >
            <Plus className="mr-2 h-4 w-4" /> Novo Pedido
          </Button>
        </div>

        <div className="rounded-md border border-slate-200 mt-4 overflow-hidden">
          <Table className="table-zebra">
            <TableHeader className="bg-slate-50 text-slate-700">
              <TableRow>
                <TableHead>Ações</TableHead>
                <TableHead>Protocolo</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Produto</TableHead>
                <TableHead>Vendedor</TableHead>
                <TableHead>Valor Final</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    Carregando pedidos...
                  </TableCell>
                </TableRow>
              ) : filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-slate-500">
                    Nenhum pedido encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setViewData(row)}
                      >
                        <Eye className="h-4 w-4 text-slate-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onEdit(row)}
                      >
                        <Edit className="h-4 w-4 text-blue-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onDeleteClick(row)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                    <TableCell className="font-medium">
                      {row.protocolo_certificadora || row.numero_pedido || '-'}
                    </TableCell>
                    <TableCell>{row.cliente?.nome || '-'}</TableCell>
                    <TableCell>{row.produto?.nome || '-'}</TableCell>
                    <TableCell>{row.vendedor?.nome || '-'}</TableCell>
                    <TableCell>{formatBRL(row.valor_final)}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded text-xs ${row.status_pedido === 'aprovado' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'}`}
                      >
                        {row.status_pedido || 'pendente'}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <Dialog open={!!viewData} onOpenChange={(o) => !o && setViewData(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Detalhes do Pedido</DialogTitle>
              <DialogDescription>Informações completas do registro.</DialogDescription>
            </DialogHeader>
            {viewData && (
              <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm py-4 border-t border-slate-100 mt-2">
                <div>
                  <span className="text-slate-500 block text-xs">Protocolo/Nº Pedido</span>
                  {viewData.protocolo_certificadora || viewData.numero_pedido || '-'}
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">Data Pedido</span>
                  {viewData.data_pedido
                    ? new Date(viewData.data_pedido).toLocaleDateString('pt-BR')
                    : '-'}
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">Cliente</span>
                  {viewData.cliente?.nome || '-'}
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">Produto</span>
                  {viewData.produto?.nome || '-'}
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">Vendedor</span>
                  {viewData.vendedor?.nome || '-'}
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">Status Pedido</span>
                  <span className="capitalize">{viewData.status_pedido || '-'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">Valor Venda</span>
                  {formatBRL(viewData.valor_venda)}
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">Desconto</span>
                  {formatBRL(viewData.desconto)}
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">Valor Final</span>
                  <strong className="text-emerald-700">{formatBRL(viewData.valor_final)}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">Status Pagamento</span>
                  <span className="capitalize">{viewData.status_pagamento || '-'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">Data Pagamento</span>
                  {viewData.data_pagamento
                    ? new Date(viewData.data_pagamento).toLocaleDateString('pt-BR')
                    : '-'}
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">Nº NF</span>
                  {viewData.numero_nf || '-'}
                </div>
                <div className="col-span-2">
                  <span className="text-slate-500 block text-xs">Observações</span>
                  <p className="bg-slate-50 p-2 rounded mt-1 min-h-[40px] whitespace-pre-wrap">
                    {viewData.observacoes || 'Nenhuma observação.'}
                  </p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
