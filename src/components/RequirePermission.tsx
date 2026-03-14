import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { usePermissions } from '@/hooks/use-permissions'
import { toast } from '@/hooks/use-toast'
import { Loader2 } from 'lucide-react'

interface RequirePermissionProps {
  children: JSX.Element
  permissions: string[]
}

export function RequirePermission({ children, permissions }: RequirePermissionProps) {
  const { hasPermission, loading } = usePermissions()
  const [showDenied, setShowDenied] = useState(false)

  const hasAccess = permissions.some((p) => hasPermission(p))

  useEffect(() => {
    if (!loading && !hasAccess) {
      toast({
        title: 'Acesso Negado',
        description: 'Você não tem permissão para acessar esta funcionalidade.',
        variant: 'destructive',
      })
      setShowDenied(true)
    }
  }, [loading, hasAccess])

  if (loading)
    return (
      <div className="flex h-full flex-1 min-h-[50vh] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )

  if (!hasAccess && showDenied) {
    return <Navigate to="/" replace />
  }

  if (!hasAccess) return null

  return children
}
