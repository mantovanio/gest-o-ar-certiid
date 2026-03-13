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
import { Search, Plus, FileText, Upload, Download, Edit } from 'lucide-react'
import { getCustomers } from '@/services/vendas'

export default function Clientes() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    getCustomers().then((res) => {
      if (res && res.length > 0) setData(res)
      else {
        setData([
          {
            id: '1',
            type: 'Cliente',
            phone: '11999999999',
            name: 'Empresa Alpha Ltda',
            company_name: 'Alpha Tech',
          },
          {
            id: '2',
            type: 'Cliente',
            phone: '11888888888',
            name: 'Comercial Beta S.A.',
            company_name: 'Beta Shop',
          },
        ])
      }
    })
  }, [])

  return (
    <div className="space-y-4 animate-fade-in">
      <PageHeader title="Clientes" module="Vendas" page="Clientes" />

      <Card className="bg-white border-slate-200 shadow-sm rounded-lg overflow-hidden">
        <CardContent className="p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <Label>Cliente/Fornecedor</Label>
              <Input placeholder="Buscar por nome ou documento..." />
            </div>
            <div className="space-y-1">
              <Label>Tipo</Label>
              <Select defaultValue="cliente">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cliente">Cliente</SelectItem>
                  <SelectItem value="fornecedor">Fornecedor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
                <Search className="mr-2 h-4 w-4" /> Pesquisar
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Plus className="mr-2 h-4 w-4" /> Novo
            </Button>
            <Button className="bg-sky-400 hover:bg-sky-500">
              <FileText className="mr-2 h-4 w-4" /> Template Clientes
            </Button>
            <div className="flex border rounded-md overflow-hidden bg-slate-50 border-slate-300">
              <span className="px-3 py-2 text-sm text-slate-500 bg-white border-r">
                Nenhum arquivo
              </span>
              <Button
                variant="ghost"
                className="rounded-none bg-teal-400 hover:bg-teal-500 text-white"
              >
                Selecione a planilha
              </Button>
            </div>
            <Button className="bg-teal-700 hover:bg-teal-800">
              <Upload className="mr-2 h-4 w-4" /> Importar
            </Button>
            <Button className="bg-sky-400 hover:bg-sky-500">
              <Download className="mr-2 h-4 w-4" /> Exportar CSV
            </Button>
          </div>

          <div className="rounded-md border border-slate-200 mt-4 overflow-hidden">
            <Table className="table-zebra">
              <TableHeader className="bg-slate-200 text-slate-700">
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Empresa/Fantasia</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Edit className="h-4 w-4 text-blue-600" />
                      </Button>
                    </TableCell>
                    <TableCell>{row.type || 'Cliente'}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.company_name}</TableCell>
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
