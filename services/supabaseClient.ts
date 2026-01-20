
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// If keys are missing, we should handle it gracefully in a real app, 
// but for this generation, we provide the setup.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
