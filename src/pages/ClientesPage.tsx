import { useState, useEffect, useCallback } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { toast } from '@/hooks/use-toast'
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
import { ClienteForm } from '@/components/clientes/ClienteForm'
import { ClienteList } from '@/components/clientes/ClienteList'
import {
  getClientes,
  createCliente,
  updateCliente,
  deleteCliente,
  checkPedidosVinculados,
  ClienteData,
  ClienteFormData,
} from '@/services/clientes'

const initialFormState: ClienteFormData = {
  documento: '',
  nome: '',
  email: '',
  telefone: '',
  razao_social: '',
  endereco: '',
  cidade: '',
  uf: '',
  status: 'Ativo',
  origem: '',
}

export default function ClientesPage() {
  const [clientes, setClientes] = useState<ClienteData[]>([])
  const [formData, setFormData] = useState<ClienteFormData>(initialFormState)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null)

  const [alertOpen, setAlertOpen] = useState(false)
  const [clienteToDelete, setClienteToDelete] = useState<ClienteData | null>(null)

  const loadData = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await getClientes()
      setClientes(data)
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message || 'Falha ao carregar clientes.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleFieldChange = (field: keyof ClienteFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    if (!formData.nome || !formData.documento) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Por favor, preencha pelo menos Nome e Documento.',
        variant: 'destructive',
      })
      return
    }

    setIsSaving(true)
    try {
      if (formData.id) {
        const { id, ...payload } = formData
        await updateCliente(id, payload as ClienteFormData)
        toast({ title: 'Sucesso', description: 'Cliente atualizado com sucesso.' })
      } else {
        await createCliente(formData)
        toast({ title: 'Sucesso', description: 'Cliente cadastrado com sucesso.' })
      }
      setFormData(initialFormState)
      loadData()
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message || 'Falha ao salvar cliente.',
        variant: 'destructive',
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleEdit = (cliente: ClienteData) => {
    setFormData({
      id: cliente.id,
      documento: cliente.documento || '',
      nome: cliente.nome || '',
      email: cliente.email || '',
      telefone: cliente.telefone || '',
      razao_social: cliente.razao_social || '',
      endereco: cliente.endereco || '',
      cidade: cliente.cidade || '',
      uf: cliente.uf || '',
      status: cliente.status || 'Ativo',
      origem: cliente.origem || '',
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDeleteClick = async (cliente: ClienteData) => {
    setActionLoadingId(cliente.id)
    try {
      const hasPedidos = await checkPedidosVinculados(cliente.id)
      if (hasPedidos) {
        toast({
          title: 'Ação Bloqueada',
          description: 'Não é possível deletar cliente com pedidos vinculados.',
          variant: 'destructive',
        })
      } else {
        setClienteToDelete(cliente)
        setAlertOpen(true)
      }
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message || 'Falha ao verificar vinculações.',
        variant: 'destructive',
      })
    } finally {
      setActionLoadingId(null)
    }
  }

  const confirmDelete = async () => {
    if (!clienteToDelete) return
    setIsLoading(true)
    try {
      await deleteCliente(clienteToDelete.id)
      toast({ title: 'Removido', description: 'Cliente removido com sucesso.' })
      if (formData.id === clienteToDelete.id) setFormData(initialFormState)
      loadData()
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message || 'Falha ao deletar cliente.',
        variant: 'destructive',
      })
    } finally {
      setAlertOpen(false)
      setClienteToDelete(null)
      setIsLoading(false)
    }
  }

  const handleClear = () => {
    setFormData(initialFormState)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Gestão de Clientes" module="Cadastros" page="Clientes" />

      <ClienteForm
        formData={formData}
        onChange={handleFieldChange}
        onSave={handleSave}
        onClear={handleClear}
        isSaving={isSaving}
      />

      <ClienteList
        clientes={clientes}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDeleteClick={handleDeleteClick}
        actionLoadingId={actionLoadingId}
      />

      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja deletar o cliente <strong>{clienteToDelete?.nome}</strong>?
              Esta ação não pode ser desfeita.
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
