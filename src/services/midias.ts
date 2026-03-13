import { supabase } from '@/lib/supabase/client'

export const getMediaInventory = async () => {
  const { data, error } = await supabase
    .from('media_inventory')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching media inventory:', error)
    return []
  }
  return data
}

export const addMediaInventory = async (payload: any) => {
  const { data, error } = await supabase.from('media_inventory').insert([payload]).select()

  if (error) {
    console.error('Error adding media inventory:', error)
    throw error
  }
  return data
}
