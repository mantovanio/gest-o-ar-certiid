import { useState } from 'react'
import { MessageCircle, Mail, Send, Phone } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from '@/hooks/use-toast'
import { usePermissions } from '@/hooks/use-permissions'

interface CommunicationDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  clientData?: { name?: string; phone?: string; email?: string } | null
}

export function CommunicationDrawer({ open, onOpenChange, clientData }: CommunicationDrawerProps) {
  const [message, setMessage] = useState('')
  const { hasPermission } = usePermissions()
  const canSendMessage = hasPermission('enviar_mensagens')

  const handleSend = () => {
    if (!canSendMessage) {
      toast({
        title: 'Acesso Negado',
        description: 'Você não tem permissão para enviar mensagens.',
        variant: 'destructive',
      })
      return
    }

    toast({
      title: 'Mensagem Enviada',
      description: `Mensagem enviada com sucesso para ${clientData?.name || 'o cliente'}.`,
    })
    setMessage('')
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] flex flex-col">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-xl flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-brand-orange" />
            Comunicação
          </SheetTitle>
          <SheetDescription>
            Envie mensagens para {clientData?.name || 'o cliente selecionado'}.
          </SheetDescription>
        </SheetHeader>

        <Tabs defaultValue="whatsapp" className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
            <TabsTrigger value="email">E-mail</TabsTrigger>
          </TabsList>

          <TabsContent value="whatsapp" className="flex-1 flex flex-col space-y-4">
            <fieldset disabled={!canSendMessage} className="space-y-4 flex-1 flex flex-col">
              <div className="space-y-2">
                <Label>Número do Cliente</Label>
                <div className="flex gap-2">
                  <Input value={clientData?.phone || ''} readOnly className="bg-slate-50" />
                  <Button variant="outline" size="icon" disabled={!canSendMessage}>
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2 flex-1 flex flex-col">
                <Label>Mensagem</Label>
                <Textarea
                  placeholder="Digite a mensagem aqui..."
                  className="flex-1 resize-none"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Templates Rápidos</Label>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() =>
                      setMessage('Olá, seu certificado digital está vencendo. Vamos renovar?')
                    }
                    disabled={!canSendMessage}
                  >
                    Renovação
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setMessage('Aguardamos o envio da documentação para emissão.')}
                    disabled={!canSendMessage}
                  >
                    Doc Pendente
                  </Button>
                </div>
              </div>
            </fieldset>

            <Button
              onClick={handleSend}
              disabled={!canSendMessage}
              className="w-full mt-auto bg-green-600 hover:bg-green-700 disabled:opacity-50"
            >
              <Send className="mr-2 h-4 w-4" /> Enviar WhatsApp
            </Button>
          </TabsContent>

          <TabsContent value="email" className="flex-1 flex flex-col space-y-4">
            <fieldset disabled={!canSendMessage} className="space-y-4 flex-1 flex flex-col">
              <div className="space-y-2">
                <Label>E-mail do Cliente</Label>
                <Input value={clientData?.email || ''} readOnly className="bg-slate-50" />
              </div>
              <div className="space-y-2">
                <Label>Assunto</Label>
                <Input placeholder="Assunto do e-mail" />
              </div>
              <div className="space-y-2 flex-1 flex flex-col">
                <Label>Mensagem</Label>
                <Textarea placeholder="Corpo do e-mail..." className="flex-1 resize-none" />
              </div>
            </fieldset>
            <Button
              onClick={handleSend}
              disabled={!canSendMessage}
              className="w-full mt-auto disabled:opacity-50"
            >
              <Mail className="mr-2 h-4 w-4" /> Enviar E-mail
            </Button>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}
