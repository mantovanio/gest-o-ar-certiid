import { useState, useEffect } from 'react'
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
import { Checkbox } from '@/components/ui/checkbox'
import { Search, Save, Trash2 } from 'lucide-react'
import { getMediaInventory, addMediaInventory } from '@/services/midias'
import { toast } from '@/hooks/use-toast'

export default function EntradaMidias() {
  const [data, setData] = useState<any[]>([])
  const [form, setForm] = useState({
    media_type: 'token',
    quantity: '',
    unit_cost: '',
    stock_date: new Date().toISOString().split('T')[0],
    is_comodato: false,
    observation: '',
  })
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    const res = await getMediaInventory()
    if (res && res.length > 0) setData(res)
    else {
      setData([
        {
          id: '1',
          stock_date: '2023-10-10',
          media_type: 'Token GD',
          is_comodato: false,
          quantity: 50,
          unit_cost: 35.0,
          observation: 'Reposição sede',
        },
      ])
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSave = async () => {
    if (!form.quantity || !form.unit_cost) return
    setLoading(true)
    try {
      await addMediaInventory({
        media_type: form.media_type,
        quantity: parseInt(form.quantity),
        unit_cost: parseFloat(form.unit_cost),
        stock_date: form.stock_date,
        is_comodato: form.is_comodato,
        observation: form.observation,
      })
      toast({ title: 'Sucesso', description: 'Entrada registrada com sucesso.' })
      fetchData()
      setForm({ ...form, quantity: '', unit_cost: '', observation: '' })
    } catch (error) {
      toast({ title: 'Erro', description: 'Falha ao registrar entrada.', variant: 'destructive' })
    }
    setLoading(false)
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <PageHeader title="Entrada de Mídias" module="Configurações" page="Entrada Mídias" />

      <Card className="bg-white border-slate-200 shadow-sm rounded-lg overflow-hidden mb-6">
        <CardHeader className="bg-slate-50 border-b pb-3 pt-4">
          <CardTitle className="text-sm text-slate-700">Lançar Nova Entrada</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
            <div className="space-y-1 md:col-span-2">
              <Label>Mídia</Label>
              <Select
                value={form.media_type}
                onValueChange={(v) => setForm({ ...form, media_type: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Token GD">Token GD</SelectItem>
                  <SelectItem value="Cartão Smart">Cartão Smart</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label>Quantidade</Label>
              <Input
                type="number"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <Label>Custo Unitário</Label>
              <Input
                type="number"
                step="0.01"
                value={form.unit_cost}
                onChange={(e) => setForm({ ...form, unit_cost: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <Label>Data Estoque</Label>
              <Input
                type="date"
                value={form.stock_date}
                onChange={(e) => setForm({ ...form, stock_date: e.target.value })}
              />
            </div>
            <div className="flex items-center gap-2 h-10 pb-2">
              <Checkbox
                id="comodato"
                checked={form.is_comodato}
                onCheckedChange={(c) => setForm({ ...form, is_comodato: !!c })}
              />
              <Label htmlFor="comodato">Comodato</Label>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="space-y-1 md:col-span-3">
              <Label>Observações</Label>
              <Input
                value={form.observation}
                onChange={(e) => setForm({ ...form, observation: e.target.value })}
              />
            </div>
            <Button
              onClick={handleSave}
              disabled={loading}
              className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white"
            >
              <Save className="mr-2 h-4 w-4" /> {loading ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white border-slate-200 shadow-sm rounded-lg overflow-hidden">
        <CardContent className="p-4 sm:p-6 space-y-4">
          <div className="flex gap-4 items-end w-full max-w-sm">
            <div className="space-y-1 flex-1">
              <Label>Mês/Ano</Label>
              <Input type="month" />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Search className="mr-2 h-4 w-4" /> Pesquisar
            </Button>
          </div>

          <div className="rounded-md border border-slate-200 mt-4 overflow-hidden">
            <Table className="table-zebra">
              <TableHeader className="bg-slate-200 text-slate-700">
                <TableRow>
                  <TableHead className="w-[50px] text-center">Excluir</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Produto</TableHead>
                  <TableHead>Comodato</TableHead>
                  <TableHead>Qtde</TableHead>
                  <TableHead>Valor Unitário</TableHead>
                  <TableHead>Observação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="text-center">
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                    <TableCell>
                      {row.stock_date ? new Date(row.stock_date).toLocaleDateString('pt-BR') : '-'}
                    </TableCell>
                    <TableCell>{row.media_type}</TableCell>
                    <TableCell>{row.is_comodato ? 'Sim' : 'Não'}</TableCell>
                    <TableCell>{row.quantity}</TableCell>
                    <TableCell>R$ {Number(row.unit_cost || 0).toFixed(2)}</TableCell>
                    <TableCell>{row.observation}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
