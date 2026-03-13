import { useState, useEffect } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Search, Plus, FileText, Upload, Download, Edit2 } from 'lucide-react'
import { getCertificates } from '@/services/vendas'

export default function Renovacoes() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    getCertificates().then((res) => {
      if (res && res.length > 0) setData(res)
      else {
        setData([
          {
            id: '1',
            data_expiracao: '2023-11-20',
            status_renovacao: 'Aviso 30 Dias',
            pedido_ticket: 'TK-1002',
            certificado_tipo: 'A1 PF',
            client_name_rs: 'João Silva',
          },
          {
            id: '2',
            data_expiracao: '2023-10-25',
            status_renovacao: 'Vencido',
            pedido_ticket: 'TK-0998',
            certificado_tipo: 'A3 PJ',
            client_name_rs: 'Empresa Beta',
          },
        ])
      }
    })
  }, [])

  return (
    <div className="space-y-4 animate-fade-in">
      <PageHeader title="Renovações" module="Vendas" page="Renovações" />

      <Card className="bg-white border-slate-200 shadow-sm rounded-lg overflow-hidden">
        <CardContent className="p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <Label>Data Inicial</Label>
              <Input type="date" />
            </div>
            <div className="space-y-1">
              <Label>Data Final</Label>
              <Input type="date" />
            </div>
            <div className="space-y-1">
              <Label>Parceiro</Label>
              <Input placeholder="Selecione..." />
            </div>
            <div className="flex items-end">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                <Search className="mr-2 h-4 w-4" /> Pesquisar
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
            <Button className="bg-blue-700 hover:bg-blue-800">
              <Plus className="mr-2 h-4 w-4" /> Renovação
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="mr-2 h-4 w-4" /> Novo Cliente
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">Criar Status</Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <FileText className="mr-2 h-4 w-4" /> Template Renovações
            </Button>
            <div className="flex border rounded-md overflow-hidden bg-slate-50 border-slate-300">
              <span className="px-3 py-2 text-sm text-slate-500 bg-white border-r">
                Nenhum arquivo
              </span>
              <Button
                variant="ghost"
                className="rounded-none bg-teal-400 hover:bg-teal-500 text-white"
              >
                Selecione a Planilha
              </Button>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Upload className="mr-2 h-4 w-4" /> Importar Up
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Download className="mr-2 h-4 w-4" /> Exportar CSV
            </Button>
          </div>

          <div className="rounded-md border border-slate-200 mt-4 overflow-hidden">
            <Table className="table-zebra">
              <TableHeader className="bg-slate-200 text-slate-700">
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>Expiração</TableHead>
                  <TableHead>Status Renovação</TableHead>
                  <TableHead>Pedido/Ticket</TableHead>
                  <TableHead>Certificado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Edit2 className="h-4 w-4 text-blue-600" />
                      </Button>
                    </TableCell>
                    <TableCell>
                      {row.data_expiracao
                        ? new Date(row.data_expiracao).toLocaleDateString('pt-BR')
                        : '-'}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${row.status_renovacao === 'Vencido' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'}`}
                      >
                        {row.status_renovacao || 'Pendente'}
                      </span>
                    </TableCell>
                    <TableCell>{row.pedido_ticket || '-'}</TableCell>
                    <TableCell>
                      {row.client_name_rs} {row.certificado_tipo ? `(${row.certificado_tipo})` : ''}
                    </TableCell>
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
