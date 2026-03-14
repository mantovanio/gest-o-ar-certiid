import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Edit, Trash2, Loader2 } from 'lucide-react'
import { ClienteData } from '@/services/clientes'

interface ClienteListProps {
  clientes: ClienteData[]
  onEdit: (cliente: ClienteData) => void
  onDeleteClick: (cliente: ClienteData) => void
  actionLoadingId: string | null
  isLoading: boolean
}

export function ClienteList({
  clientes,
  onEdit,
  onDeleteClick,
  actionLoadingId,
  isLoading,
}: ClienteListProps) {
  return (
    <Card className="bg-white border-slate-200 shadow-sm">
      <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
        <CardTitle className="text-lg text-blue-900">Lista de Clientes</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-semibold text-slate-600">Nome</TableHead>
              <TableHead className="font-semibold text-slate-600">Documento</TableHead>
              <TableHead className="font-semibold text-slate-600">Email</TableHead>
              <TableHead className="font-semibold text-slate-600">Telefone</TableHead>
              <TableHead className="font-semibold text-slate-600">Razão Social</TableHead>
              <TableHead className="font-semibold text-slate-600">Status</TableHead>
              <TableHead className="font-semibold text-slate-600 text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-blue-500 mx-auto" />
                </TableCell>
              </TableRow>
            ) : clientes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-slate-500 py-8">
                  Nenhum cliente encontrado.
                </TableCell>
              </TableRow>
            ) : (
              clientes.map((cliente) => (
                <TableRow key={cliente.id} className="hover:bg-blue-50/50">
                  <TableCell className="font-medium text-slate-700">{cliente.nome}</TableCell>
                  <TableCell>{cliente.documento}</TableCell>
                  <TableCell>{cliente.email}</TableCell>
                  <TableCell>{cliente.telefone}</TableCell>
                  <TableCell>{cliente.razao_social}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        cliente.status === 'Ativo'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {cliente.status || 'N/A'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-2 whitespace-nowrap">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(cliente)}
                      className="text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                      title="Editar"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDeleteClick(cliente)}
                      disabled={actionLoadingId === cliente.id}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      title="Deletar"
                    >
                      {actionLoadingId === cliente.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
