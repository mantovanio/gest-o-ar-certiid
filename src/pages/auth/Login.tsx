import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from '@/hooks/use-toast'
import { ShieldCheck, Fingerprint, Loader2 } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isResetting, setIsResetting] = useState(false)
  const { signIn, signUp, resetPassword } = useAuth()
  const navigate = useNavigate()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (isSignUp) {
      if (!name) {
        toast({
          title: 'Nome obrigatório',
          description: 'Por favor, informe seu nome completo.',
          variant: 'destructive',
        })
        setIsLoading(false)
        return
      }

      const { error } = await signUp(email, password, name)
      if (error) {
        toast({
          title: 'Falha no cadastro',
          description: error.message || 'Verifique os dados informados.',
          variant: 'destructive',
        })
      } else {
        toast({
          title: 'Conta criada com sucesso!',
          description: 'Você já pode acessar o sistema com recursos iniciais. O Administrador irá liberar os recursos completos.',
        })
        setIsSignUp(false)
        setPassword('')
      }
    } else {
      const { error } = await signIn(email, password)

      if (error) {
        toast({
          title: 'Falha na autenticação',
          description: error.message || 'Credenciais inválidas. Tente novamente.',
          variant: 'destructive',
        })
      } else {
        toast({
          title: 'Login realizado com sucesso',
          description: 'Bem-vindo ao Gestão Certi ID.',
        })
        navigate('/dashboard')
      }
    }

    setIsLoading(false)
  }

  const handleResetPassword = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!email) {
      toast({
        title: 'E-mail obrigatório',
        description: 'Por favor, informe seu e-mail no campo acima para recuperar a senha.',
        variant: 'destructive',
      })
      return
    }

    setIsResetting(true)
    const { error } = await resetPassword(email)

    if (error) {
      toast({
        title: 'Erro ao solicitar recuperação',
        description: error.message || 'Ocorreu um problema ao enviar o e-mail.',
        variant: 'destructive',
      })
    } else {
      toast({
        title: 'E-mail enviado',
        description: 'Verifique sua caixa de entrada para redefinir sua senha.',
      })
    }

    setIsResetting(false)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50/50 p-4">
      <div className="mb-8 flex items-center justify-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 shadow-md text-white">
          <Fingerprint className="h-7 w-7" />
        </div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Gestão Certi ID</h1>
      </div>

      <Card className="w-full max-w-md shadow-lg border-slate-200 bg-white">
        <CardHeader className="space-y-1 text-center pb-6">
          <CardTitle className="text-2xl font-semibold tracking-tight text-slate-900">
            {isSignUp ? 'Criar Nova Conta' : 'Acesso ao Sistema'}
          </CardTitle>
          <CardDescription className="text-slate-500">
            {isSignUp ? 'Preencha seus dados para se cadastrar.' : 'Insira suas credenciais para acessar a plataforma.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-5">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-700">
                  Nome Completo
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={isSignUp}
                  className="border-slate-300 focus-visible:ring-blue-500"
                />
              </div>
            )}
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
                {!isSignUp && (
                  <button
                    type="button"
                    onClick={handleResetPassword}
                    disabled={isResetting}
                    className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline disabled:opacity-50 disabled:hover:no-underline"
                  >
                    {isResetting ? 'Enviando...' : 'Esqueci minha senha'}
                  </button>
                )}
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
              disabled={isLoading || isResetting}
            >
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
              {isLoading ? (isSignUp ? 'Criando conta...' : 'Entrando...') : (isSignUp ? 'Criar Conta' : 'Entrar')}
            </Button>
          </form>

          <div className="mt-5 text-center text-sm text-slate-600">
            {isSignUp ? 'Já possui uma conta?' : 'Ainda não possui conta?'}
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp)
                setName('')
              }}
              className="ml-1 font-medium text-blue-600 hover:text-blue-700 hover:underline"
            >
              {isSignUp ? 'Faça login' : 'Criar agora'}
            </button>
          </div>
        </CardContent>
      </Card>

      <div className="mt-10 flex items-center justify-center text-sm font-medium text-slate-500 bg-white/80 px-4 py-2 rounded-full shadow-sm border border-slate-200/60 backdrop-blur-sm">
        <ShieldCheck className="mr-2 h-4 w-4 text-blue-600" />
        Ambiente Seguro e Monitorado
      </div>
    </div>
  )
}
