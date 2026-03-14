import { useState, useEffect, useCallback } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { toast } from '@/hooks/use-toast'
import { PedidoForm } from '@/components/pedidos/PedidoForm'
import { PedidoList } from '@/components/pedidos/PedidoList'
import { usePermissions } from '@/hooks/use-permissions'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  getPedidos,
  getDropdownData,
  createPedido,
  updatePedido,
  deletePedido,
  PedidoData,
  PedidoFormData,
} from '@/services/pedidos'

const initialFormState: PedidoFormData = {
  cliente_id: '',
  produto_id: '',
  vendedor_id: '',
  agente_id: '',
  data_pedido: new Date().toISOString().split('T')[0],
  valor_venda: '',
  desconto: '',
  valor_final: '',
  status_pedido: 'pendente',
  status_pagamento: 'pendente',
  data_pagamento: '',
  protocolo_certificadora: '',
  numero_nf: '',
  observacoes: '',
}

export default function PedidosPage() {
  const { hasPermission } = usePermissions()
  const canCreate = hasPermission('criar_pedido')

  const [pedidos, setPedidos] = useState<PedidoData[]>([])
  const [dropdownData, setDropdownData] = useState<{
    clientes: any[]
    produtos: any[]
    usuarios: any[]
  }>({ clientes: [], produtos: [], usuarios: [] })
  const [formData, setFormData] = useState<PedidoFormData>(initialFormState)

  const [showForm, setShowForm] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)
  const [pedidoToDelete, setPedidoToDelete] = useState<PedidoData | null>(null)

  const loadData = useCallback(async () => {
    setIsLoading(true)
    try {
      const [pedidosData, dropsData] = await Promise.all([getPedidos(), getDropdownData()])
      setPedidos(pedidosData)
      setDropdownData(dropsData)
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message || 'Falha ao carregar dados.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleFieldChange = (field: keyof PedidoFormData, value: any) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value }
      if (field === 'valor_venda' || field === 'desconto') {
        const venda = Number(newData.valor_venda) || 0
        const desc = Number(newData.desconto) || 0
        newData.valor_final = venda - desc
      }
      return newData
    })
  }

  const handleSave = async () => {
    if (!formData.cliente_id) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Por favor, selecione um Cliente.',
        variant: 'destructive',
      })
      return
    }

    setIsSaving(true)
    try {
      if (formData.id) {
        const { id, ...payload } = formData
        await updatePedido(id, payload as PedidoFormData)
        toast({ title: 'Sucesso', description: 'Pedido atualizado com sucesso.' })
      } else {
        await createPedido(formData)
        toast({ title: 'Sucesso', description: 'Pedido cadastrado com sucesso.' })
      }
      setFormData(initialFormState)
      setShowForm(false)
      loadData()
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message || 'Falha ao salvar pedido.',
        variant: 'destructive',
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleEdit = (pedido: PedidoData) => {
    setFormData({
      id: pedido.id,
      cliente_id: pedido.cliente_id || '',
      produto_id: pedido.produto_id || '',
      vendedor_id: pedido.vendedor_id || '',
      agente_id: pedido.agente_id || '',
      data_pedido: pedido.data_pedido ? pedido.data_pedido.split('T')[0] : '',
      valor_venda: pedido.valor_venda ?? '',
      desconto: pedido.desconto ?? '',
      valor_final: pedido.valor_final ?? '',
      status_pedido: pedido.status_pedido || 'pendente',
      status_pagamento: pedido.status_pagamento || 'pendente',
      data_pagamento: pedido.data_pagamento ? pedido.data_pagamento.split('T')[0] : '',
      protocolo_certificadora: pedido.protocolo_certificadora || '',
      numero_nf: pedido.numero_nf || '',
      observacoes: pedido.observacoes || '',
    })
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDeleteClick = (pedido: PedidoData) => {
    setPedidoToDelete(pedido)
    setAlertOpen(true)
  }

  const confirmDelete = async () => {
    if (!pedidoToDelete) return
    setIsLoading(true)
    try {
      await deletePedido(pedidoToDelete.id)
      toast({ title: 'Removido', description: 'Pedido removido com sucesso.' })
      if (formData.id === pedidoToDelete.id) {
        setFormData(initialFormState)
        setShowForm(false)
      }
      loadData()
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message || 'Falha ao deletar pedido.',
        variant: 'destructive',
      })
    } finally {
      setAlertOpen(false)
      setPedidoToDelete(null)
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Gestão de Pedidos" module="Vendas" page="Pedidos" />

      {showForm && (canCreate || formData.id) ? (
        <PedidoForm
          formData={formData}
          onChange={handleFieldChange}
          onSave={handleSave}
          onClear={() => setFormData(initialFormState)}
          onCancel={() => {
            setFormData(initialFormState)
            setShowForm(false)
          }}
          isSaving={isSaving}
          dropdownData={dropdownData}
        />
      ) : (
        <PedidoList
          pedidos={pedidos}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDeleteClick={handleDeleteClick}
          onNew={() => {
            setFormData(initialFormState)
            setShowForm(true)
          }}
        />
      )}

      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja deletar este pedido? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              Deletar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
