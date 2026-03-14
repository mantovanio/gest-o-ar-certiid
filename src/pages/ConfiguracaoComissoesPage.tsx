import { useState, useEffect, useCallback } from 'react'
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
import { toast } from '@/hooks/use-toast'
import { Save } from 'lucide-react'
import { getUsuariosConfig, updateUsuarioConfig } from '@/services/comissoes'

export default function ConfiguracaoComissoesPage() {
  const [users, setUsers] = useState<any[]>([])
  const [editedValues, setEditedValues] = useState<Record<string, any>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const loadData = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await getUsuariosConfig()
      setUsers(data || [])
      setEditedValues({})
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: 'Falha ao carregar configurações.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleEdit = (id: string, field: string, value: string) => {
    setEditedValues((prev) => ({
      ...prev,
      [id]: { ...(prev[id] || {}), [field]: value === '' ? null : Number(value) },
    }))
  }

  const handleSave = async () => {
    const ids = Object.keys(editedValues)
    if (ids.length === 0) return

    setIsSaving(true)
    try {
      for (const id of ids) {
        await updateUsuarioConfig(id, editedValues[id])
      }
      toast({ title: 'Sucesso', description: 'Configurações atualizadas com sucesso.' })
      loadData()
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: 'Falha ao salvar configurações.',
        variant: 'destructive',
      })
    } finally {
      setIsSaving(false)
    }
  }

  const getValue = (userId: string, field: string, originalValue: any) => {
    if (editedValues[userId] && editedValues[userId][field] !== undefined) {
      return editedValues[userId][field] === null ? '' : editedValues[userId][field]
    }
    return originalValue === null ? '' : originalValue
  }

  const hasChanges = Object.keys(editedValues).length > 0

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Configuração de Comissões"
        module="Configurações"
        page="Regras de Comissionamento"
      />

      <Card className="bg-white border-slate-200 shadow-sm">
        <CardContent className="p-4 sm:p-6 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-slate-800">Metas e Percentuais por Usuário</h3>
            <Button
              onClick={handleSave}
              disabled={!hasChanges || isSaving}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Save className="mr-2 h-4 w-4" /> {isSaving ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </div>

          <div className="rounded-md border border-slate-200 overflow-hidden">
            <Table className="table-zebra">
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead>Usuário</TableHead>
                  <TableHead className="w-[150px]">Meta Mínima (R$)</TableHead>
                  <TableHead className="w-[150px]">% Comissão Padrão</TableHead>
                  <TableHead className="w-[150px]">% Imposto</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8">
                      Carregando...
                    </TableCell>
                  </TableRow>
                ) : users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-slate-500">
                      Nenhum usuário encontrado.
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow
                      key={user.id}
                      className={editedValues[user.id] ? 'bg-blue-50/50' : ''}
                    >
                      <TableCell className="font-medium">{user.nome}</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          step="0.01"
                          value={getValue(
                            user.id,
                            'meta_comissao_minima',
                            user.meta_comissao_minima,
                          )}
                          onChange={(e) =>
                            handleEdit(user.id, 'meta_comissao_minima', e.target.value)
                          }
                          className="h-8"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          step="0.01"
                          value={getValue(
                            user.id,
                            'percentual_comissao_padrao',
                            user.percentual_comissao_padrao,
                          )}
                          onChange={(e) =>
                            handleEdit(user.id, 'percentual_comissao_padrao', e.target.value)
                          }
                          className="h-8"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          step="0.01"
                          value={getValue(user.id, 'percentual_imposto', user.percentual_imposto)}
                          onChange={(e) =>
                            handleEdit(user.id, 'percentual_imposto', e.target.value)
                          }
                          className="h-8"
                        />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
