import { useState, useEffect } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from '@/hooks/use-toast'
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react'
import {
  getTabelasPreco,
  createTabelaPreco,
  updateTabelaPreco,
  deleteTabelaPreco,
  TabelaPreco,
} from '@/services/tabelas-preco'
import { getUsuarios, UsuarioData } from '@/services/usuarios'
import { supabase } from '@/lib/supabase/client'

export default function TabelasPrecoPage() {
  const [data, setData] = useState<TabelaPreco[]>([])
  const [usuarios, setUsuarios] = useState<UsuarioData[]>([])
  const [produtos, setProdutos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<Partial<TabelaPreco>>({})

  useEffect(() => {
    loadAll()
  }, [])

  const loadAll = async () => {
    setLoading(true)
    try {
      const [tabelasRes, usersRes, prodRes] = await Promise.all([
        getTabelasPreco(),
        getUsuarios(),
        supabase.from('produtos').select('id, nome').eq('ativo', true).order('nome'),
      ])
      setData(tabelasRes)
      setUsuarios(usersRes)
      setProdutos(prodRes.data || [])
    } catch (e) {
      toast({ title: 'Erro', description: 'Falha ao carregar dados', variant: 'destructive' })
    }
    setLoading(false)
  }

  const handleNew = () => {
    setFormData({ ativo: true })
    setOpen(true)
  }

  const handleEdit = (item: TabelaPreco) => {
    setFormData(item)
    setOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja remover esta tabela de preço?')) return
    try {
      await deleteTabelaPreco(id)
      toast({ title: 'Sucesso', description: 'Tabela removida com sucesso.' })
      loadAll()
    } catch (e) {
      toast({ title: 'Erro', description: 'Falha ao remover a tabela.', variant: 'destructive' })
    }
  }

  const handleSave = async () => {
    if (!formData.nome || !formData.preco_venda || !formData.produto_id || !formData.usuario_id) {
      toast({
        title: 'Atenção',
        description: 'Preencha os campos obrigatórios',
        variant: 'destructive',
      })
      return
    }
    setIsSaving(true)
    try {
      if (formData.id) {
        await updateTabelaPreco(formData.id, formData)
        toast({ title: 'Sucesso', description: 'Tabela atualizada com sucesso.' })
      } else {
        await createTabelaPreco(formData)
        toast({ title: 'Sucesso', description: 'Tabela criada com sucesso.' })
      }
      setOpen(false)
      loadAll()
    } catch (e) {
      toast({
        title: 'Erro',
        description: 'Falha ao salvar as configurações.',
        variant: 'destructive',
      })
    }
    setIsSaving(false)
  }

  return (
    <div className="space-y-6 animate-fade-in h-full flex flex-col">
      <PageHeader title="Tabelas de Preço" module="Configurações" page="Tabelas de Preço" />
      <Card className="bg-white border-slate-200 shadow-sm flex-1">
        <CardContent className="p-4 sm:p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-slate-800">
              Gerenciamento de Preços Específicos
            </h3>
            <Button onClick={handleNew} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" /> Nova Tabela
            </Button>
          </div>

          <div className="rounded-md border border-slate-200 overflow-hidden">
            <Table className="table-zebra">
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead>Nome da Tabela</TableHead>
                  <TableHead>Usuário / Parceiro</TableHead>
                  <TableHead>Produto Vinculado</TableHead>
                  <TableHead>Preço Venda</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <Loader2 className="animate-spin h-6 w-6 mx-auto text-blue-500" />
                    </TableCell>
                  </TableRow>
                ) : data.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                      Nenhuma tabela de preço configurada.
                    </TableCell>
                  </TableRow>
                ) : (
                  data.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium text-slate-800">{item.nome}</TableCell>
                      <TableCell>{item.usuario?.nome || '-'}</TableCell>
                      <TableCell>{item.produto?.nome || '-'}</TableCell>
                      <TableCell className="font-semibold text-emerald-600">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(item.preco_venda || 0)}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${item.ativo ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-600'}`}
                        >
                          {item.ativo ? 'Ativo' : 'Inativo'}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                          <Edit className="h-4 w-4 text-blue-600" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {formData.id ? 'Editar Tabela de Preço' : 'Nova Tabela de Preço'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Nome Identificador</Label>
              <Input
                value={formData.nome || ''}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                placeholder="Ex: TABELA GOLD 2024"
              />
            </div>
            <div className="space-y-2">
              <Label>Usuário / Parceiro</Label>
              <Select
                value={formData.usuario_id || ''}
                onValueChange={(v) => setFormData({ ...formData, usuario_id: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {usuarios.map((u) => (
                    <SelectItem key={u.id} value={u.id}>
                      {u.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Produto Vinculado</Label>
              <Select
                value={formData.produto_id || ''}
                onValueChange={(v) => setFormData({ ...formData, produto_id: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {produtos.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Preço de Venda Praticado (R$)</Label>
              <Input
                type="number"
                step="0.01"
                value={formData.preco_venda || ''}
                onChange={(e) => setFormData({ ...formData, preco_venda: Number(e.target.value) })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)} disabled={isSaving}>
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isSaving ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : null}
              {isSaving ? 'Salvando...' : 'Salvar Tabela'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
