import { useState, useEffect } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { toast } from '@/hooks/use-toast'
import { getUsuarios, UsuarioData } from '@/services/usuarios'
import { getPermissoes, savePermissoes, AVAILABLE_PERMISSIONS } from '@/services/permissoes'
import { Loader2, Save } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function PermissoesPage() {
  const [users, setUsers] = useState<UsuarioData[]>([])
  const [selectedUser, setSelectedUser] = useState<UsuarioData | null>(null)
  const [permissions, setPermissions] = useState<Record<string, boolean>>({})
  const [isLoadingUsers, setIsLoadingUsers] = useState(true)
  const [isLoadingPerms, setIsLoadingPerms] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      const data = await getUsuarios()
      setUsers(data)
    } catch (error) {
      toast({ title: 'Erro', description: 'Falha ao carregar usuários.', variant: 'destructive' })
    } finally {
      setIsLoadingUsers(false)
    }
  }

  const handleSelectUser = async (user: UsuarioData) => {
    setSelectedUser(user)
    setIsLoadingPerms(true)
    try {
      const data = await getPermissoes(user.id)
      setPermissions(data)
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Falha ao carregar permissões.',
        variant: 'destructive',
      })
    } finally {
      setIsLoadingPerms(false)
    }
  }

  const handleToggle = (id: string, checked: boolean) => {
    setPermissions((prev) => ({ ...prev, [id]: checked }))
  }

  const handleToggleModule = (module: string, checked: boolean) => {
    const modulePerms = AVAILABLE_PERMISSIONS.filter((p) => p.module === module).map((p) => p.id)
    setPermissions((prev) => {
      const next = { ...prev }
      modulePerms.forEach((p) => (next[p] = checked))
      return next
    })
  }

  const handleSave = async () => {
    if (!selectedUser) return
    setIsSaving(true)
    try {
      await savePermissoes(selectedUser.id, permissions)
      toast({ title: 'Sucesso', description: 'Permissões salvas com sucesso.' })
    } catch (error) {
      toast({ title: 'Erro', description: 'Falha ao salvar permissões.', variant: 'destructive' })
    } finally {
      setIsSaving(false)
    }
  }

  const modules = Array.from(new Set(AVAILABLE_PERMISSIONS.map((p) => p.module)))

  return (
    <div className="space-y-6 animate-fade-in h-full flex flex-col">
      <PageHeader title="Controle de Permissões" module="Configurações" page="Permissões" />

      <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-0 overflow-hidden">
        {/* Left Side: Users List */}
        <Card className="w-full md:w-1/3 flex flex-col bg-white border-slate-200 shadow-sm h-full max-h-[800px]">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <h3 className="font-semibold text-slate-800">Usuários do Sistema</h3>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-1">
              {isLoadingUsers ? (
                <div className="p-4 text-center text-slate-500">
                  <Loader2 className="animate-spin h-5 w-5 mx-auto" />
                </div>
              ) : (
                users.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => handleSelectUser(user)}
                    className={cn(
                      'w-full text-left px-4 py-3 rounded-md transition-colors text-sm',
                      selectedUser?.id === user.id
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'hover:bg-slate-50 text-slate-700',
                    )}
                  >
                    <div className="font-medium">{user.nome}</div>
                    <div className="text-xs opacity-70 mt-0.5">{user.email}</div>
                  </button>
                ))
              )}
            </div>
          </ScrollArea>
        </Card>

        {/* Right Side: Permissions Matrix */}
        <Card className="w-full md:w-2/3 flex flex-col bg-white border-slate-200 shadow-sm h-full max-h-[800px]">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="font-semibold text-slate-800">
              {selectedUser ? `Permissões: ${selectedUser.nome}` : 'Selecione um usuário'}
            </h3>
            <Button
              onClick={handleSave}
              disabled={!selectedUser || isSaving || isLoadingPerms}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isSaving ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Salvar Alterações
            </Button>
          </div>

          <ScrollArea className="flex-1 bg-slate-50/30">
            <div className="p-6">
              {!selectedUser ? (
                <div className="text-center text-slate-500 py-12">
                  Selecione um usuário na lista ao lado para gerenciar suas permissões.
                </div>
              ) : isLoadingPerms ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                </div>
              ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  {modules.map((module) => {
                    const perms = AVAILABLE_PERMISSIONS.filter((p) => p.module === module)
                    const allChecked = perms.every((p) => permissions[p.id])
                    const someChecked = perms.some((p) => permissions[p.id])

                    return (
                      <div
                        key={module}
                        className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm"
                      >
                        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
                          <Checkbox
                            id={`mod-${module}`}
                            checked={allChecked}
                            onCheckedChange={(c) => handleToggleModule(module, !!c)}
                            className={cn(someChecked && !allChecked && 'opacity-50')}
                          />
                          <Label
                            htmlFor={`mod-${module}`}
                            className="text-base font-semibold text-blue-900 cursor-pointer"
                          >
                            {module}
                          </Label>
                        </div>
                        <div className="space-y-3 pl-6">
                          {perms.map((p) => (
                            <div key={p.id} className="flex items-center gap-2">
                              <Checkbox
                                id={p.id}
                                checked={!!permissions[p.id]}
                                onCheckedChange={(c) => handleToggle(p.id, !!c)}
                              />
                              <Label
                                htmlFor={p.id}
                                className="text-slate-700 font-normal cursor-pointer leading-tight"
                              >
                                {p.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </ScrollArea>
        </Card>
      </div>
    </div>
  )
}
