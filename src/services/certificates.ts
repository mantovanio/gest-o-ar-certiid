import { supabase } from '@/lib/supabase/client'

export const getCertificates = async () => {
  const { data, error } = await supabase
    .from('certificates')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50) // Simple limit for demonstration

  if (error) throw error
  return data
}
