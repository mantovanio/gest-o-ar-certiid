import React, { useEffect, useState } from 'react'
import { getCertificates } from '@/services/certificates'
import { Database } from '@/lib/supabase/types'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
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
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { format } from 'date-fns'
import { Search, Download, Plus, FileText, Loader2, MessageCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { CommunicationDrawer } from '@/components/CommunicationDrawer'

type Certificate = Database['public']['Tables']['certificates']['Row']

export default function CertificadosEmitidos() {
  const [certs, setCerts] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState<{
    name: string
    phone: string
    email: string
  } | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const data = await getCertificates()
      setCerts(data || [])
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const filteredCerts = certs.filter(
    (c) =>
      c.razao_social?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.cnpj?.includes(searchTerm),
  )

  const formatDoc = (doc?: string | null) => {
    if (!doc) return '-'
    return doc.length > 11
      ? doc.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
      : doc
  }

  const getStatusBadge = (status?: string | null) => {
    switch (status?.toLowerCase()) {
      case 'emitido':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">
            Emitido
          </Badge>
        )
      case 'revogado':
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-none">Revogado</Badge>
        )
      default:
        return <Badge variant="secondary">{status || 'Pendente'}</Badge>
    }
  }

  const handleWhatsApp = (cert: Certificate) => {
    setSelectedClient({
      name: cert.razao_social || cert.client_name_rs,
      phone: cert.telefone_1 || '',
      email: cert.email || '',
    })
    setDrawerOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Vendas</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Certificados Emitidos</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h2 className="text-2xl font-bold tracking-tight text-slate-800">
          Relatório de certificados emitidos/revogados
        </h2>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardContent className="p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Data Inicial</Label>
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <Label>Data Final</Label>
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select defaultValue="todos">
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="emitido">Emitido</SelectItem>
                  <SelectItem value="revogado">Revogado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 flex items-end">
              <Button className="w-full bg-[#0056b3] hover:bg-blue-700">
                <Search className="mr-2 h-4 w-4" /> Pesquisar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2">
          <Button variant="outline" className="text-slate-600">
            <Plus className="mr-2 h-4 w-4" /> Novo
          </Button>
          <Button variant="outline" className="text-slate-600 border-dashed">
            <FileText className="mr-2 h-4 w-4" /> Template
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Buscar por nome ou documento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Button variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50">
            <Download className="mr-2 h-4 w-4" /> Exportar CSV
          </Button>
        </div>
      </div>

      <div className="rounded-md border border-slate-200 bg-white">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead>Cliente / Razão Social</TableHead>
              <TableHead>Documento</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Emissão</TableHead>
              <TableHead>Vencimento</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  <Loader2 className="mx-auto h-6 w-6 animate-spin text-slate-400" />
                </TableCell>
              </TableRow>
            ) : filteredCerts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-slate-500">
                  Nenhum registro encontrado.
                </TableCell>
              </TableRow>
            ) : (
              filteredCerts.map((cert) => (
                <TableRow key={cert.id} className="hover:bg-slate-50">
                  <TableCell className="font-medium text-slate-700">
                    {cert.razao_social || cert.client_name_rs}
                  </TableCell>
                  <TableCell>{formatDoc(cert.cnpj || cert.documento)}</TableCell>
                  <TableCell>{cert.certificado_tipo || 'N/A'}</TableCell>
                  <TableCell>
                    {cert.data_emissao ? format(new Date(cert.data_emissao), 'dd/MM/yyyy') : '-'}
                  </TableCell>
                  <TableCell>
                    {cert.data_expiracao
                      ? format(new Date(cert.data_expiracao), 'dd/MM/yyyy')
                      : '-'}
                  </TableCell>
                  <TableCell>{getStatusBadge(cert.status_renovacao)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleWhatsApp(cert)}
                      title="Contatar via WhatsApp"
                      className="text-green-600 hover:text-green-700 hover:bg-green-50"
                    >
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <CommunicationDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        clientData={selectedClient}
      />
    </div>
  )
}
