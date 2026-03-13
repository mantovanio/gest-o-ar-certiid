import { useState, useEffect } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Plus, Edit, Trash2, Download } from 'lucide-react'
import { getBankAccounts } from '@/services/financeiro'

export default function ContasBancarias() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    getBankAccounts().then((res) => {
      if (res && res.length > 0) setData(res)
      else {
        setData([
          {
            id: '1',
            active: true,
            bank_type: 'Corrente',
            bank_number: '033 - Santander',
            agency: '1234',
            account_number: '12345-6',
            owner_document: '00.000.000/0001-00',
          },
          {
            id: '2',
            active: true,
            bank_type: 'Corrente',
            bank_number: '341 - Itaú',
            agency: '4321',
            account_number: '65432-1',
            owner_document: '00.000.000/0001-00',
          },
        ])
      }
    })
  }, [])

  return (
    <div className="space-y-4 animate-fade-in">
      <PageHeader title="Contas Bancárias" module="Financeiro" page="Contas Bancárias" />

      <Card className="bg-white border-slate-200 shadow-sm rounded-lg overflow-hidden">
        <CardContent className="p-4 sm:p-6 space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100">
            <h3 className="text-slate-600 font-medium">
              Abaixo segue relação das contas cadastradas
            </h3>
            <Button className="bg-teal-600 hover:bg-teal-700 text-white">
              <Plus className="mr-2 h-4 w-4" /> Nova Conta
            </Button>
          </div>

          <div className="rounded-md border border-slate-200 mt-4 overflow-hidden">
            <div className="bg-slate-50 p-2 border-b flex justify-end">
              <Button variant="outline" size="sm" className="h-8 text-slate-600">
                <Download className="mr-2 h-3 w-3" /> Exportar Excel
              </Button>
            </div>
            <Table className="table-zebra">
              <TableHeader className="bg-slate-200 text-slate-700">
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>Ativa</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Número do Banco</TableHead>
                  <TableHead>Agência</TableHead>
                  <TableHead>Conta Corrente</TableHead>
                  <TableHead>CNPJ/CPF Titular</TableHead>
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
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 ${row.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} rounded text-xs`}
                      >
                        {row.active ? 'Sim' : 'Não'}
                      </span>
                    </TableCell>
                    <TableCell>{row.bank_type}</TableCell>
                    <TableCell>{row.bank_number}</TableCell>
                    <TableCell>{row.agency}</TableCell>
                    <TableCell>{row.account_number}</TableCell>
                    <TableCell>{row.owner_document}</TableCell>
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
