import { useState } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Edit, Trash2, Save, X, Eraser } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

type Cliente = {
  id: string
  documento: string
  nome: string
  email: string
  telefone: string
  razao_social: string
  endereco: string
  cidade: string
  uf: string
  status: string
}

const initialFormState: Cliente = {
  id: '',
  documento: '',
  nome: '',
  email: '',
  telefone: '',
  razao_social: '',
  endereco: '',
  cidade: '',
  uf: '',
  status: 'Ativo',
}

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([
    {
      id: '1',
      documento: '123.456.789-00',
      nome: 'João Silva',
      email: 'joao@exemplo.com',
      telefone: '(11) 99999-9999',
      razao_social: '',
      endereco: 'Rua das Flores, 123',
      cidade: 'São Paulo',
      uf: 'SP',
      status: 'Ativo',
    },
    {
      id: '2',
      documento: '12.345.678/0001-90',
      nome: 'Maria Empresa',
      email: 'contato@mariaempresa.com',
      telefone: '(21) 3333-4444',
      razao_social: 'Maria Empreendimentos LTDA',
      endereco: 'Av Principal, 456',
      cidade: 'Rio de Janeiro',
      uf: 'RJ',
      status: 'Ativo',
    },
  ])

  const [formData, setFormData] = useState<Cliente>(initialFormState)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    if (!formData.nome || !formData.documento) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Por favor, preencha pelo menos Nome e Documento.',
        variant: 'destructive',
      })
      return
    }

    if (formData.id) {
      // Edit existing
      setClientes(clientes.map((c) => (c.id === formData.id ? formData : c)))
      toast({ title: 'Sucesso', description: 'Cliente atualizado com sucesso.' })
    } else {
      // Add new
      const newId = Math.random().toString(36).substr(2, 9)
      setClientes([...clientes, { ...formData, id: newId }])
      toast({ title: 'Sucesso', description: 'Cliente cadastrado com sucesso.' })
    }
    setFormData(initialFormState)
  }

  const handleEdit = (cliente: Cliente) => {
    setFormData(cliente)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = (id: string) => {
    setClientes(clientes.filter((c) => c.id !== id))
    toast({ title: 'Removido', description: 'Cliente removido com sucesso.' })
    if (formData.id === id) setFormData(initialFormState)
  }

  const handleClear = () => {
    setFormData(initialFormState)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Gestão de Clientes" module="Cadastros" page="Clientes" />

      <Card className="bg-white border-slate-200 shadow-sm">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
          <CardTitle className="text-lg text-blue-900">
            {formData.id ? 'Editar Cliente' : 'Novo Cliente'}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="documento">Documento (CPF/CNPJ)</Label>
              <Input
                id="documento"
                name="documento"
                value={formData.documento}
                onChange={handleInputChange}
                placeholder="000.000.000-00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                placeholder="Nome completo"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="email@exemplo.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone</Label>
              <Input
                id="telefone"
                name="telefone"
                type="tel"
                value={formData.telefone}
                onChange={handleInputChange}
                placeholder="(00) 00000-0000"
              />
            </div>
            <div className="space-y-2 lg:col-span-2">
              <Label htmlFor="razao_social">Razão Social</Label>
              <Input
                id="razao_social"
                name="razao_social"
                value={formData.razao_social}
                onChange={handleInputChange}
                placeholder="Razão Social (se PJ)"
              />
            </div>
            <div className="space-y-2 lg:col-span-2">
              <Label htmlFor="endereco">Endereço</Label>
              <Input
                id="endereco"
                name="endereco"
                value={formData.endereco}
                onChange={handleInputChange}
                placeholder="Rua, número, bairro"
              />
            </div>
            <div className="space-y-2 lg:col-span-2">
              <Label htmlFor="cidade">Cidade</Label>
              <Input
                id="cidade"
                name="cidade"
                value={formData.cidade}
                onChange={handleInputChange}
                placeholder="Nome da cidade"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="uf">UF</Label>
              <Select value={formData.uf} onValueChange={(v) => handleSelectChange('uf', v)}>
                <SelectTrigger id="uf">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SP">São Paulo</SelectItem>
                  <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                  <SelectItem value="MG">Minas Gerais</SelectItem>
                  <SelectItem value="PR">Minas Gerais</SelectItem>
                  <SelectItem value="RS">Paraná</SelectItem>
                  <SelectItem value="SC">Rio Grande do Sul</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(v) => handleSelectChange('status', v)}
              >
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ativo">Ativo</SelectItem>
                  <SelectItem value="Inativo">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-slate-100">
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Save className="mr-2 h-4 w-4" /> Salvar
            </Button>
            <Button
              variant="outline"
              onClick={handleClear}
              className="border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              <Eraser className="mr-2 h-4 w-4" /> Limpar
            </Button>
            <Button
              variant="ghost"
              onClick={handleClear}
              className="text-slate-500 hover:text-slate-700"
            >
              <X className="mr-2 h-4 w-4" /> Cancelar
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white border-slate-200 shadow-sm">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
          <CardTitle className="text-lg text-blue-900">Lista de Clientes</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="font-semibold text-slate-600">Documento</TableHead>
                <TableHead className="font-semibold text-slate-600">Nome</TableHead>
                <TableHead className="font-semibold text-slate-600">Email</TableHead>
                <TableHead className="font-semibold text-slate-600">Telefone</TableHead>
                <TableHead className="font-semibold text-slate-600">Status</TableHead>
                <TableHead className="font-semibold text-slate-600 text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-slate-500 py-8">
                    Nenhum cliente cadastrado.
                  </TableCell>
                </TableRow>
              ) : (
                clientes.map((cliente) => (
                  <TableRow key={cliente.id} className="hover:bg-blue-50/50">
                    <TableCell className="font-medium text-slate-700">
                      {cliente.documento}
                    </TableCell>
                    <TableCell>{cliente.nome}</TableCell>
                    <TableCell>{cliente.email}</TableCell>
                    <TableCell>{cliente.telefone}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          cliente.status === 'Ativo'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {cliente.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(cliente)}
                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                        title="Editar"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(cliente.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        title="Deletar"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
