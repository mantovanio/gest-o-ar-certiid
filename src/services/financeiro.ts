import { supabase } from '@/lib/supabase/client'

export const getFinancialTransactions = async () => {
  const { data, error } = await supabase
    .from('financial_transactions')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching financial transactions:', error)
    return []
  }
  return data
}

export const getBankAccounts = async () => {
  const { data, error } = await supabase
    .from('bank_accounts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching bank accounts:', error)
    return []
  }
  return data
}
