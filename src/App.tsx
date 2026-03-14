import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AuthProvider } from '@/hooks/use-auth'
import { PermissionsProvider } from '@/hooks/use-permissions'
import { RequirePermission } from '@/components/RequirePermission'
import ProtectedRoute from '@/components/ProtectedRoute'

import Layout from '@/components/Layout'
import Index from '@/pages/Index'
import Login from '@/pages/auth/Login'
import ClientesPage from '@/pages/ClientesPage'
import PedidosPage from '@/pages/PedidosPage'
import AgendamentosPage from '@/pages/AgendamentosPage'
import ComissoesPage from '@/pages/ComissoesPage'
import ConfiguracaoComissoesPage from '@/pages/ConfiguracaoComissoesPage'
import UsuariosPage from '@/pages/usuarios/UsuariosPage'
import PermissoesPage from '@/pages/configuracoes/PermissoesPage'
import TabelasPrecoPage from '@/pages/configuracoes/TabelasPreco'
import RelatoriosPage from '@/pages/RelatoriosPage'

import PagarReceber from '@/pages/financeiro/PagarReceber'
import ContasBancarias from '@/pages/financeiro/ContasBancarias'

import Clientes from '@/pages/vendas/Clientes'
import Renovacoes from '@/pages/vendas/Renovacoes'
import CertificadosEmitidos from '@/pages/vendas/CertificadosEmitidos'
import RastreamentoPage from '@/pages/vendas/RastreamentoCertificados'

import VendasGraficos from '@/pages/graficos/Vendas'
import FinanceiroGraficos from '@/pages/graficos/Financeiro'

import EntradaMidias from '@/pages/configuracoes/EntradaMidias'
import NotificacoesLog from '@/pages/configuracoes/NotificacoesLog'
import NotFound from '@/pages/NotFound'

const App = () => (
  <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
    <AuthProvider>
      <PermissionsProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route path="/" element={<Index />} />
                <Route path="/dashboard" element={<Index />} />

                <Route
                  path="/clientes"
                  element={
                    <RequirePermission permissions={['ver_clientes']}>
                      <ClientesPage />
                    </RequirePermission>
                  }
                />
                <Route
                  path="/pedidos"
                  element={
                    <RequirePermission permissions={['ver_pedidos']}>
                      <PedidosPage />
                    </RequirePermission>
                  }
                />
                <Route
                  path="/rastreamento-certificados"
                  element={
                    <RequirePermission permissions={['rastreamento']}>
                      <RastreamentoPage />
                    </RequirePermission>
                  }
                />
                <Route
                  path="/agendamentos"
                  element={
                    <RequirePermission permissions={['ver_agendamentos']}>
                      <AgendamentosPage />
                    </RequirePermission>
                  }
                />

                <Route
                  path="/comissoes"
                  element={
                    <RequirePermission
                      permissions={['ver_comissoes_proprias', 'ver_comissoes_todas']}
                    >
                      <ComissoesPage />
                    </RequirePermission>
                  }
                />
                <Route
                  path="/configuracao-comissoes"
                  element={
                    <RequirePermission permissions={['metas_comissao']}>
                      <ConfiguracaoComissoesPage />
                    </RequirePermission>
                  }
                />

                <Route
                  path="/relatorios"
                  element={
                    <RequirePermission permissions={['ver_relatorios']}>
                      <RelatoriosPage />
                    </RequirePermission>
                  }
                />

                <Route
                  path="/usuarios"
                  element={
                    <RequirePermission permissions={['ver_usuarios']}>
                      <UsuariosPage />
                    </RequirePermission>
                  }
                />
                <Route
                  path="/tabelas-preco"
                  element={
                    <RequirePermission permissions={['tabelas_preco']}>
                      <TabelasPrecoPage />
                    </RequirePermission>
                  }
                />
                <Route
                  path="/permissoes"
                  element={
                    <RequirePermission permissions={['gerenciar_permissoes']}>
                      <PermissoesPage />
                    </RequirePermission>
                  }
                />

                <Route path="/financeiro/pagar-receber" element={<PagarReceber />} />
                <Route path="/financeiro/contas-bancarias" element={<ContasBancarias />} />

                <Route path="/vendas/clientes" element={<Clientes />} />
                <Route path="/vendas/renovacoes" element={<Renovacoes />} />
                <Route path="/vendas/certificados" element={<CertificadosEmitidos />} />

                <Route path="/graficos/vendas" element={<VendasGraficos />} />
                <Route path="/graficos/financeiro" element={<FinanceiroGraficos />} />

                <Route path="/configuracoes/entrada-midias" element={<EntradaMidias />} />
                <Route path="/configuracoes/notificacoes" element={<NotificacoesLog />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </PermissionsProvider>
    </AuthProvider>
  </BrowserRouter>
)

export default App
