import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gzijbxpehvbijcopmxui.supabase.co'
const supabaseAnonKey = 'sb_publishable_QppOe-bHS2wzcCKTJf_-wg_2OquIOdQ'

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
)