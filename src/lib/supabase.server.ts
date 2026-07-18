// Server-only Supabase admin client for the user's own Supabase project.
// Filename `.server.ts` blocks this module from client bundles.
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (cached) return cached;
  const url = process.env.MY_SUPABASE_URL;
  const key = process.env.MY_SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "MY_SUPABASE_URL / MY_SUPABASE_SERVICE_ROLE_KEY env vars নেই — Secrets-এ যোগ করুন।",
    );
  }
  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      // Opaque sb_secret_ keys are not JWTs — strip default bearer, keep apikey.
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
  return cached;
}
