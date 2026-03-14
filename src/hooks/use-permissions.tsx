import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/hooks/use-auth'

interface PermissionsContextType {
  permissions: Record<string, boolean>
  hasPermission: (funcionalidade: string) => boolean
  loading: boolean
  isAdmin: boolean
}

const PermissionsContext = createContext<PermissionsContextType | undefined>(undefined)

export const usePermissions = () => {
  const context = useContext(PermissionsContext)
  if (!context) throw new Error('usePermissions must be used within a PermissionsProvider')
  return context
}

export const PermissionsProvider = ({ children }: { children: ReactNode }) => {
  const { user, loading: authLoading } = useAuth()
  const [permissions, setPermissions] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (authLoading) return

    if (!user?.email) {
      setPermissions({})
      setIsAdmin(false)
      setLoading(false)
      return
    }

    const loadPermissions = async () => {
      setLoading(true)
      try {
        const { data: userData, error: userError } = await supabase
          .from('usuarios')
          .select('id, role')
          .eq('email', user.email)
          .maybeSingle()

        if (userError) {
          console.error('Error fetching user for permissions:', userError)
        }

        if (userData) {
          setIsAdmin(userData.role === 'admin')
          const { data: perms, error: permsError } = await supabase
            .from('permissoes_usuario')
            .select('funcionalidade, permitido')
            .eq('usuario_id', userData.id)

          if (permsError) {
            console.error('Error fetching permissions:', permsError)
          }

          if (perms) {
            const permsMap = perms.reduce(
              (acc, curr) => {
                if (curr.funcionalidade) acc[curr.funcionalidade] = !!curr.permitido
                return acc
              },
              {} as Record<string, boolean>,
            )
            setPermissions(permsMap)
          } else {
            setPermissions({})
          }
        } else {
          // Fallback if the user does not exist in the usuarios table yet
          // Restricted "guest" role
          setIsAdmin(false)
          setPermissions({})
        }
      } catch (error) {
        console.error('Error loading permissions:', error)
        setIsAdmin(false)
        setPermissions({})
      } finally {
        setLoading(false)
      }
    }

    loadPermissions()
  }, [user, authLoading])

  const hasPermission = (funcionalidade: string) => {
    if (isAdmin) return true
    return !!permissions[funcionalidade]
  }

  return (
    <PermissionsContext.Provider
      value={{ permissions, hasPermission, loading: loading || authLoading, isAdmin }}
    >
      {children}
    </PermissionsContext.Provider>
  )
}
