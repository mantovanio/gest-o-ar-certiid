import { supabase } from '@/lib/supabase/client'

export const getCustomers = async () => {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching customers:', error)
    return []
  }
  return data
}

export const getCertificates = async () => {
  const { data, error } = await supabase
    .from('certificates')
    .select('*')
    .order('data_expiracao', { ascending: true })

  if (error) {
    console.error('Error fetching certificates:', error)
    return []
  }
  return data
}
