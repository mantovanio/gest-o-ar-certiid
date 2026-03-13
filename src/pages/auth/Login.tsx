import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from '@/hooks/use-toast'
import { ShieldCheck } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('admin@gestaoar.com')
  const [password, setPassword] = useState('Admin123!')
  const [isLoading, setIsLoading] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const { error } = await signIn(email, password)

    if (error) {
      toast({
        title: 'Erro ao fazer login',
        description: error.message,
        variant: 'destructive',
      })
    } else {
      toast({
        title: 'Login realizado com sucesso',
        description: 'Bem-vindo ao Gestão AR.',
      })
      navigate('/')
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
      <div className="mb-8 flex items-center justify-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-orange text-white">
          <span className="text-xl font-bold">ID</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-800">Gestão AR</h1>
      </div>

      <Card className="w-full max-w-md shadow-elevation border-slate-200">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">Acesso ao Sistema</CardTitle>
          <CardDescription>Insira suas credenciais para acessar a plataforma.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="nome@empresa.com.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button className="w-full mt-6" type="submit" disabled={isLoading}>
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="mt-8 flex items-center justify-center text-sm text-slate-500">
        <ShieldCheck className="mr-2 h-4 w-4" />
        Ambiente Seguro e Monitorado
      </div>
    </div>
  )
}
