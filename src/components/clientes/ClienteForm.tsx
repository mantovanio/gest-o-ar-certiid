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
import { Save, X, Eraser, Loader2 } from 'lucide-react'
import { ClienteFormData } from '@/services/clientes'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ClienteFormProps {
  formData: ClienteFormData
  onChange: (field: keyof ClienteFormData, value: string) => void
  onSave: () => void
  onClear: () => void
  isSaving: boolean
}

export function ClienteForm({ formData, onChange, onSave, onClear, isSaving }: ClienteFormProps) {
  return (
    <Card className="bg-white border-slate-200 shadow-sm">
      <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
        <CardTitle className="text-lg text-blue-900">
          {formData.id ? 'Editar Cliente' : 'Novo Cliente'}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label>Documento (CPF/CNPJ)*</Label>
            <Input
              value={formData.documento}
              onChange={(e) => onChange('documento', e.target.value)}
              placeholder="000.000.000-00"
            />
          </div>
          <div className="space-y-2">
            <Label>Nome*</Label>
            <Input
              value={formData.nome}
              onChange={(e) => onChange('nome', e.target.value)}
              placeholder="Nome completo"
            />
          </div>
          <div className="space-y-2">
            <Label>E-mail</Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => onChange('email', e.target.value)}
              placeholder="email@exemplo.com"
            />
          </div>
          <div className="space-y-2">
            <Label>Telefone</Label>
            <Input
              type="tel"
              value={formData.telefone}
              onChange={(e) => onChange('telefone', e.target.value)}
              placeholder="(00) 00000-0000"
            />
          </div>
          <div className="space-y-2 lg:col-span-2">
            <Label>Razão Social</Label>
            <Input
              value={formData.razao_social}
              onChange={(e) => onChange('razao_social', e.target.value)}
              placeholder="Razão Social (se PJ)"
            />
          </div>
          <div className="space-y-2 lg:col-span-2">
            <Label>Endereço</Label>
            <Input
              value={formData.endereco}
              onChange={(e) => onChange('endereco', e.target.value)}
              placeholder="Rua, número, bairro"
            />
          </div>
          <div className="space-y-2 lg:col-span-2">
            <Label>Cidade</Label>
            <Input
              value={formData.cidade}
              onChange={(e) => onChange('cidade', e.target.value)}
              placeholder="Nome da cidade"
            />
          </div>
          <div className="space-y-2">
            <Label>UF</Label>
            <Select value={formData.uf} onValueChange={(v) => onChange('uf', v)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SP">São Paulo</SelectItem>
                <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                <SelectItem value="MG">Minas Gerais</SelectItem>
                <SelectItem value="PR">Paraná</SelectItem>
                <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                <SelectItem value="SC">Santa Catarina</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={formData.status} onValueChange={(v) => onChange('status', v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ativo">Ativo</SelectItem>
                <SelectItem value="Inativo">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Origem</Label>
            <Select value={formData.origem} onValueChange={(v) => onChange('origem', v)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Site">Site</SelectItem>
                <SelectItem value="Indicação">Indicação</SelectItem>
                <SelectItem value="Instagram">Instagram</SelectItem>
                <SelectItem value="Outros">Outros</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-slate-100">
          <Button
            onClick={onSave}
            disabled={isSaving}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isSaving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Salvar
          </Button>
          <Button
            variant="outline"
            onClick={onClear}
            className="border-blue-200 text-blue-700 hover:bg-blue-50"
          >
            <Eraser className="mr-2 h-4 w-4" /> Limpar
          </Button>
          <Button variant="ghost" onClick={onClear} className="text-slate-500 hover:text-slate-700">
            <X className="mr-2 h-4 w-4" /> Cancelar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
