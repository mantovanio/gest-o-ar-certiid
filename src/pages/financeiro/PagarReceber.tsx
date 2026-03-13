import { useState, useEffect } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { Card, CardContent } from '@/components/ui/card'
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
import {
  Search,
  FileText,
  RefreshCw,
  DollarSign,
  Download,
  Plus,
  Edit,
  XCircle,
} from 'lucide-react'
import { getFinancialTransactions } from '@/services/financeiro'

export default function PagarReceber() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    getFinancialTransactions().then((res) => {
      if (res && res.length > 0) setData(res)
      else {
        setData([
          {
            id: '1',
            type: 'receivable',
            status: 'Aberto',
            due_date: '2023-10-15',
            payment_date: null,
            face_value: 150.0,
            open_value: 150.0,
            description: 'Renovação A1',
          },
          {
            id: '2',
            type: 'payable',
            status: 'Liquidado',
            due_date: '2023-10-10',
            payment_date: '2023-10-09',
            face_value: 50.0,
            open_value: 0,
            description: 'Comissão Parceiro',
          },
        ])
      }
    })
  }, [])

  return (
    <div className="space-y-4 animate-fade-in">
      <PageHeader title="Pagar e Receber" module="Financeiro" page="Pagar e Receber" />

      <Card className="bg-white border-slate-200 shadow-sm rounded-lg overflow-hidden">
        <CardContent className="p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
            <div className="space-y-1">
              <Label>Tipo de Data</Label>
              <Select defaultValue="vencimento">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vencimento">Vencimento</SelectItem>
                  <SelectItem value="emissao">Emissão</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label>Data Inicial</Label>
              <Input type="date" />
            </div>
            <div className="space-y-1">
              <Label>Data Final</Label>
              <Input type="date" />
            </div>
            <div className="space-y-1">
              <Label>Status</Label>
              <Select defaultValue="todos">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="aberto">Aberto</SelectItem>
                  <SelectItem value="pago">Pago</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label>Forma Pagamento</Label>
              <Select defaultValue="todos">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="pix">PIX</SelectItem>
                  <SelectItem value="boleto">Boleto</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label>Sacado/Favorecido</Label>
              <Input placeholder="Buscar..." />
            </div>
            <div className="space-y-1">
              <Label>Descrição</Label>
              <Input placeholder="Descrição do Lançamento" />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
            <Button className="bg-cyan-500 hover:bg-cyan-600">
              <Search className="mr-2 h-4 w-4" /> Pesquisar
            </Button>
            <Button className="bg-cyan-500 hover:bg-cyan-600">
              <FileText className="mr-2 h-4 w-4" /> Emitir NFS-e
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <RefreshCw className="mr-2 h-4 w-4" /> Atualizar Faturas
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <DollarSign className="mr-2 h-4 w-4" /> Liquidar
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Download className="mr-2 h-4 w-4" /> Exportar CSV
            </Button>
            <Button className="bg-teal-700 hover:bg-teal-800 ml-auto">
              <Plus className="mr-2 h-4 w-4" /> Novo
            </Button>
          </div>

          <div className="rounded-md border border-slate-200 mt-4 overflow-hidden">
            <Table className="table-zebra">
              <TableHeader className="bg-slate-200 text-slate-700">
                <TableRow>
                  <TableHead className="w-[40px]">
                    <Checkbox />
                  </TableHead>
                  <TableHead>Eventos</TableHead>
                  <TableHead>Ação</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Vencimento</TableHead>
                  <TableHead>Pagamento</TableHead>
                  <TableHead>Valor Face</TableHead>
                  <TableHead>Valor Aberto</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <FileText className="h-3 w-3 text-slate-500" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Download className="h-3 w-3 text-blue-500" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <XCircle className="h-3 w-3 text-red-500" />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Edit className="h-3 w-3 text-slate-600" />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded text-xs ${row.status === 'Aberto' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}
                      >
                        {row.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      {row.due_date ? new Date(row.due_date).toLocaleDateString('pt-BR') : '-'}
                    </TableCell>
                    <TableCell>
                      {row.payment_date
                        ? new Date(row.payment_date).toLocaleDateString('pt-BR')
                        : '-'}
                    </TableCell>
                    <TableCell>R$ {Number(row.face_value || 0).toFixed(2)}</TableCell>
                    <TableCell>R$ {Number(row.open_value || 0).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between text-sm text-slate-500 pt-2">
            <span>
              Mostrando {data.length} de {data.length} registros
            </span>
            <div className="flex gap-2 items-center">
              <span>Itens por página:</span>
              <Select defaultValue="10">
                <SelectTrigger className="h-8 w-16">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
