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
import { Search, FileText } from 'lucide-react'
import { getCertificates } from '@/services/vendas'

export default function CertificadosEmitidos() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    getCertificates().then((res) => {
      if (res && res.length > 0) setData(res)
      else {
        setData([
          {
            id: '1',
            pedido_ticket: '10054',
            data_emissao: '2023-10-01',
            certificado_tipo: 'Novo',
            status_renovacao: 'Aprovado',
          },
          {
            id: '2',
            pedido_ticket: '10055',
            data_emissao: '2023-10-02',
            certificado_tipo: 'Renovação',
            status_renovacao: 'Aprovado',
          },
        ])
      }
    })
  }, [])

  return (
    <div className="space-y-4 animate-fade-in">
      <PageHeader title="Certificados Emitidos" module="Vendas" page="Certificados Emitidos" />

      <Card className="bg-white border-slate-200 shadow-sm rounded-lg overflow-hidden">
        <CardContent className="p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="space-y-1">
              <Label>Data Inicial</Label>
              <Input type="date" />
            </div>
            <div className="space-y-1">
              <Label>Data Final</Label>
              <Input type="date" />
            </div>
            <div className="space-y-1">
              <Label>PA/Vendedor/Contador</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label>Tipo Venda</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label>Status Venda</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="w-full bg-teal-800 hover:bg-teal-900 text-white">
                <Search className="mr-2 h-4 w-4" /> Pesquisar
              </Button>
            </div>
          </div>

          <div className="rounded-md border border-slate-200 mt-4 overflow-hidden">
            <Table className="table-zebra">
              <TableHeader className="bg-slate-200 text-slate-700">
                <TableRow>
                  <TableHead className="w-[50px] text-center">
                    <FileText className="inline h-4 w-4 text-slate-500" title="Ver NF-e" />
                  </TableHead>
                  <TableHead>Nº Pedido</TableHead>
                  <TableHead>Protocolo</TableHead>
                  <TableHead>Status Venda</TableHead>
                  <TableHead>Data Emissão</TableHead>
                  <TableHead>Tipo Venda</TableHead>
                  <TableHead>Cliente</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="text-center">
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <FileText className="h-4 w-4 text-blue-500" />
                      </Button>
                    </TableCell>
                    <TableCell>{row.pedido_ticket || '-'}</TableCell>
                    <TableCell>{row.id.substring(0, 8)}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                        {row.status_renovacao || 'Aprovado'}
                      </span>
                    </TableCell>
                    <TableCell>
                      {row.data_emissao
                        ? new Date(row.data_emissao).toLocaleDateString('pt-BR')
                        : '-'}
                    </TableCell>
                    <TableCell>{row.certificado_tipo || 'Novo'}</TableCell>
                    <TableCell>{row.client_name_rs}</TableCell>
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
