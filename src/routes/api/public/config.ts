import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/config")({
  server: {
    handlers: {
      GET: async () => {
        return new Response(
          JSON.stringify({
            url: process.env["MY_SUPABASE_URL"],
            anonKey: process.env["MY_SUPABASE_ANON_KEY"],
          }),
          { headers: { "Content-Type": "application/json" } }
        );
      },
    },
  },
});
