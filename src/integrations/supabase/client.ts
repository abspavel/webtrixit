// Browser Supabase client for the user's own Supabase project.
// Config is injected by the SSR root shell into window.__SUPABASE_CONFIG
// (values come from server-only MY_SUPABASE_URL / MY_SUPABASE_ANON_KEY env vars).
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

declare global {
  interface Window {
    __SUPABASE_CONFIG?: { url: string; anonKey: string };
  }
}

let cached: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (cached) return cached;
  if (typeof window === "undefined") {
    throw new Error("getSupabase() browser-only — server-এ getSupabaseAdmin() ব্যবহার করুন।");
  }
  const cfg = window.__SUPABASE_CONFIG;
  if (!cfg?.url || !cfg?.anonKey) {
    throw new Error("Supabase config missing — MY_SUPABASE_URL / MY_SUPABASE_ANON_KEY সেট করা নেই।");
  }
  cached = createClient(cfg.url, cfg.anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      storage: window.localStorage,
      storageKey: "webtrix-auth",
    },
  });
  return cached;
}
