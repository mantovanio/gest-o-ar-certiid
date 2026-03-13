import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
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
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from '@/hooks/use-toast'
import { Save, Layers } from 'lucide-react'

export default function EntradaMidias() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      toast({
        title: 'Estoque Atualizado',
        description: 'A entrada de mídias foi registrada com sucesso no sistema.',
      })
      // form reset would go here
    }, 800)
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in-up">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-800">Entrada de Mídias</h2>
        <p className="text-muted-foreground text-sm">
          Registre o estoque de tokens e cartões físicos.
        </p>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="border-b bg-slate-50/50 pb-4 mb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Layers className="h-5 w-5 text-brand-orange" />
            Nova Entrada
          </CardTitle>
          <CardDescription>
            Preencha os dados abaixo para atualizar o inventário físico.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="midia">Tipo de Mídia</Label>
                <Select required defaultValue="token_gd">
                  <SelectTrigger id="midia">
                    <SelectValue placeholder="Selecione a mídia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="token_gd">Token GD</SelectItem>
                    <SelectItem value="token_safenet">Token Safenet</SelectItem>
                    <SelectItem value="cartao_smart">Cartão SmartCard</SelectItem>
                    <SelectItem value="leitora">Leitora de Cartão</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantidade">Quantidade</Label>
                <Input id="quantidade" type="number" min="1" placeholder="Ex: 50" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="custo">Custo Unitário (R$)</Label>
                <Input id="custo" type="number" step="0.01" min="0" placeholder="0,00" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="data">Data de Entrada no Estoque</Label>
                <Input
                  id="data"
                  type="date"
                  required
                  defaultValue={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="space-y-2 md:col-span-2 flex items-center gap-2 border p-4 rounded-md bg-slate-50 mt-2">
                <Checkbox id="comodato" />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="comodato" className="font-medium">
                    Itens em Comodato
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Marque esta opção se as mídias não foram compradas (fornecidas pela
                    certificadora raiz).
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t">
              <Button type="button" variant="outline" className="mr-2">
                Cancelar
              </Button>
              <Button type="submit" disabled={loading} className="bg-teal-600 hover:bg-teal-700">
                <Save className={`mr-2 h-4 w-4 ${loading ? 'animate-pulse' : ''}`} />
                {loading ? 'Salvando...' : 'Salvar Entrada'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
