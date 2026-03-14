import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AuthProvider } from '@/hooks/use-auth'
import ProtectedRoute from '@/components/ProtectedRoute'

import Layout from '@/components/Layout'
import Index from '@/pages/Index'
import Login from '@/pages/auth/Login'
import ClientesPage from '@/pages/ClientesPage'
import PedidosPage from '@/pages/PedidosPage'

import PagarReceber from '@/pages/financeiro/PagarReceber'
import ContasBancarias from '@/pages/financeiro/ContasBancarias'

import Clientes from '@/pages/vendas/Clientes'
import Renovacoes from '@/pages/vendas/Renovacoes'
import CertificadosEmitidos from '@/pages/vendas/CertificadosEmitidos'

import VendasGraficos from '@/pages/graficos/Vendas'
import FinanceiroGraficos from '@/pages/graficos/Financeiro'

import EntradaMidias from '@/pages/configuracoes/EntradaMidias'
import NotFound from '@/pages/NotFound'

const App = () => (
  <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Index />} />
              <Route path="/clientes" element={<ClientesPage />} />
              <Route path="/pedidos" element={<PedidosPage />} />

              {/* Keep existing routes to not break previous functionalities */}
              <Route path="/financeiro/pagar-receber" element={<PagarReceber />} />
              <Route path="/financeiro/contas-bancarias" element={<ContasBancarias />} />

              <Route path="/vendas/clientes" element={<Clientes />} />
              <Route path="/vendas/renovacoes" element={<Renovacoes />} />
              <Route path="/vendas/certificados" element={<CertificadosEmitidos />} />

              <Route path="/graficos/vendas" element={<VendasGraficos />} />
              <Route path="/graficos/financeiro" element={<FinanceiroGraficos />} />

              <Route path="/configuracoes/entrada-midias" element={<EntradaMidias />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </AuthProvider>
  </BrowserRouter>
)

export default App
