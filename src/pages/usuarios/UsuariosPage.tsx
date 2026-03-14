import { useState, useEffect } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { toast } from '@/hooks/use-toast'
import { Edit, Trash2, Plus, Loader2 } from 'lucide-react'
import {
  getUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  checkUsuarioLinks,
  UsuarioData,
} from '@/services/usuarios'
import { usePermissions } from '@/hooks/use-permissions'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

export default function UsuariosPage() {
  const { hasPermission } = usePermissions()
  const canCreate = hasPermission('criar_usuario')
  const canEdit = hasPermission('editar_usuario')
  const canDelete = hasPermission('deletar_usuario')

  const [usuarios, setUsuarios] = useState<UsuarioData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const [formOpen, setFormOpen] = useState(false)
  const [formData, setFormData] = useState<Partial<UsuarioData>>({})
  const [isSaving, setIsSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setIsLoading(true)
    try {
      const data = await getUsuarios()
      setUsuarios(data)
    } catch (error) {
      toast({ title: 'Erro', description: 'Falha ao carregar usuários.', variant: 'destructive' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleNew = () => {
    setFormData({
      status: true,
      tipo_usuario: 'vendedor',
      meta_comissao_minima: 0,
      percentual_comissao_padrao: 0,
    })
    setFormOpen(true)
  }

  const handleEdit = (u: UsuarioData) => {
    setFormData(u)
    setFormOpen(true)
  }

  const handleDelete = async (u: UsuarioData) => {
    setDeletingId(u.id)
    try {
      const hasLinks = await checkUsuarioLinks(u.id)
      if (hasLinks) {
        toast({
          title: 'Ação Bloqueada',
          description:
            'Este usuário não pode ser excluído pois possui pedidos ou comissões vinculados.',
          variant: 'destructive',
        })
      } else {
        if (confirm(`Tem certeza que deseja deletar ${u.nome}?`)) {
          await deleteUsuario(u.id)
          toast({ title: 'Sucesso', description: 'Usuário removido.' })
          loadData()
        }
      }
    } catch (error) {
      toast({ title: 'Erro', description: 'Falha ao processar exclusão.', variant: 'destructive' })
    } finally {
      setDeletingId(null)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      if (formData.id) {
        await updateUsuario(formData.id, formData)
        toast({ title: 'Sucesso', description: 'Usuário atualizado.' })
      } else {
        await createUsuario(formData)
        toast({ title: 'Sucesso', description: 'Usuário criado.' })
      }
      setFormOpen(false)
      loadData()
    } catch (error) {
      toast({ title: 'Erro', description: 'Falha ao salvar usuário.', variant: 'destructive' })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Gestão de Usuários" module="Configurações" page="Usuários" />

      <Card className="bg-white border-slate-200 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-4">
          <CardTitle className="text-lg text-slate-800">Usuários do Sistema</CardTitle>
          {canCreate && (
            <Button onClick={handleNew} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="mr-2 h-4 w-4" /> Novo Usuário
            </Button>
          )}
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    <Loader2 className="animate-spin h-6 w-6 text-blue-500 mx-auto" />
                  </TableCell>
                </TableRow>
              ) : (
                usuarios.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell className="font-medium">{u.nome}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell className="capitalize">{u.tipo_usuario || '-'}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${u.status !== false ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}
                      >
                        {u.status !== false ? 'Ativo' : 'Inativo'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      {canEdit && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(u)}
                          className="text-blue-600"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      {canDelete && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(u)}
                          disabled={deletingId === u.id}
                          className="text-red-500"
                        >
                          {deletingId === u.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{formData.id ? 'Editar Usuário' : 'Novo Usuário'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Nome Completo</Label>
              <Input
                required
                value={formData.nome || ''}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>E-mail</Label>
              <Input
                required
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Tipo de Usuário</Label>
              <Select
                value={formData.tipo_usuario}
                onValueChange={(v) => setFormData({ ...formData, tipo_usuario: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="agente">Agente de Registro</SelectItem>
                  <SelectItem value="vendedor">Vendedor</SelectItem>
                  <SelectItem value="cliente">Cliente</SelectItem>
                  <SelectItem value="fornecedor">Fornecedor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Meta Mínima (R$)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.meta_comissao_minima || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, meta_comissao_minima: Number(e.target.value) })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>% Comissão Padrão</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.percentual_comissao_padrao || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, percentual_comissao_padrao: Number(e.target.value) })
                  }
                />
              </div>
            </div>
            <div className="flex items-center space-x-2 pt-2">
              <Switch
                id="status"
                checked={formData.status !== false}
                onCheckedChange={(c) => setFormData({ ...formData, status: c })}
              />
              <Label htmlFor="status">Usuário Ativo</Label>
            </div>
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setFormOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isSaving}>
                {isSaving ? 'Salvando...' : 'Salvar'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
