import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

export default function NotificacoesLog() {
  const [logs, setLogs] = useState<any[]>([])

  useEffect(() => {
    supabase
      .from('notification_queue')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)
      .then(({ data }) => {
        if (data) setLogs(data)
      })
  }, [])

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 animate-fade-in-up">
      <h1 className="text-3xl font-bold tracking-tight">Logs de Notificações (WhatsApp)</h1>
      <Card>
        <CardHeader>
          <CardTitle>Últimos envios via Chatwoot</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Mensagem</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{new Date(log.created_at).toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{log.notification_type}</Badge>
                  </TableCell>
                  <TableCell>{log.phone}</TableCell>
                  <TableCell className="max-w-xs truncate" title={log.message}>
                    {log.message}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        log.status === 'sent'
                          ? 'default'
                          : log.status === 'failed'
                            ? 'destructive'
                            : 'secondary'
                      }
                    >
                      {log.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
              {logs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                    Nenhuma notificação registrada ainda.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
