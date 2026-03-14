import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from '@/hooks/use-toast'
import { ShieldCheck, Fingerprint } from 'lucide-react'

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50/50 p-4">
      <div className="mb-8 flex items-center justify-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 shadow-md text-white">
          <Fingerprint className="h-7 w-7" />
        </div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Gestão AR</h1>
      </div>

      <Card className="w-full max-w-md shadow-lg border-slate-200 bg-white">
        <CardHeader className="space-y-1 text-center pb-6">
          <CardTitle className="text-2xl font-semibold tracking-tight text-slate-900">
            Acesso ao Sistema
          </CardTitle>
          <CardDescription className="text-slate-500">
            Insira suas credenciais para acessar a plataforma.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700">
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="nome@empresa.com.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-slate-300 focus-visible:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-slate-700">
                  Senha
                </Label>
                <Link
                  to="#"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Esqueci minha senha
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-slate-300 focus-visible:ring-blue-500"
              />
            </div>
            <Button
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-colors h-11 text-base font-medium"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="mt-10 flex items-center justify-center text-sm font-medium text-slate-500 bg-white/80 px-4 py-2 rounded-full shadow-sm border border-slate-200/60 backdrop-blur-sm">
        <ShieldCheck className="mr-2 h-4 w-4 text-blue-600" />
        Ambiente Seguro e Monitorado
      </div>
    </div>
  )
}
