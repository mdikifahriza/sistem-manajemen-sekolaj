
import { createClient } from '@supabase/supabase-js';

/**
 * Robust environment variable accessor.
 * Supports Vite (import.meta.env) and standard Node-like (process.env) shims.
 */
const getEnv = (key: string): string => {
  try {
    // Check import.meta.env (Vite/Modern Bundlers)
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
      // @ts-ignore
      return import.meta.env[key];
    }
    // Check process.env (Node/Webpack/Shims)
    if (typeof process !== 'undefined' && process.env && process.env[key]) {
      return (process.env as any)[key] as string;
    }
    // Check window (some platforms inject here)
    if (typeof window !== 'undefined' && (window as any)._env_ && (window as any)._env_[key]) {
      return (window as any)._env_[key];
    }
  } catch (e) {
    console.warn(`Error accessing env var ${key}:`, e);
  }
  return '';
};

const supabaseUrl = getEnv('VITE_SUPABASE_URL');
const supabaseAnonKey = getEnv('VITE_SUPABASE_ANON_KEY');

export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

export const isSupabaseConnected = !!supabase;

if (!isSupabaseConnected) {
  console.warn("Supabase connection skipped: Missing URL or Anon Key. App will use mock data.");
}
