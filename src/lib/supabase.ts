import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

export const portfolioTable = (import.meta.env.VITE_SUPABASE_PORTFOLIO_TABLE as string | undefined) || "portfolio_content";
export const assetsBucket = (import.meta.env.VITE_SUPABASE_ASSETS_BUCKET as string | undefined) || "portfolio-assets";
