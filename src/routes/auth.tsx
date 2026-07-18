import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getSupabase } from "@/integrations/supabase/client";
import { ShieldCheck, ArrowRight, Loader2 } from "lucide-react";
import logoAsset from "@/assets/webtrix-logo.png.asset.json";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Admin Login — Webtrix IT Solution" }] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const supabase = getSupabase();
        const { data } = await supabase.auth.getUser();
        if (data.user) navigate({ to: "/admin", replace: true });
      } catch (e) {
        console.error(e);
      } finally {
        setChecking(false);
      }
    })();
  }, [navigate]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const supabase = getSupabase();
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (error) throw error;
      toast.success("লগইন সফল হয়েছে");
      navigate({ to: "/admin", replace: true });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "লগইন ব্যর্থ হয়েছে";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-8 flex items-center justify-center gap-3">
          <img src={logoAsset.url} alt="Webtrix" className="h-12 w-auto drop-shadow-[0_2px_10px_rgba(59,130,246,0.35)]" />
        </Link>
        <div className="rounded-2xl border border-border bg-surface/70 p-6 backdrop-blur sm:p-8">
          <div className="mb-6 flex items-center gap-2 text-sm text-neon">
            <ShieldCheck className="h-4 w-4" /> অ্যাডমিন লগইন
          </div>
          <h1 className="text-2xl font-bold text-foreground">Webtrix Admin</h1>
          <p className="mt-1 text-sm text-muted-foreground">Leads dashboard-এ প্রবেশ করতে লগইন করুন।</p>

          {checking ? (
            <div className="mt-8 flex items-center justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
          ) : (
            <form onSubmit={handleLogin} className="mt-6 grid gap-4">
              <label className="text-xs font-medium text-muted-foreground">
                ইমেইল
                <input
                  type="email" required autoComplete="email"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                  placeholder="you@webtrix.com"
                />
              </label>
              <label className="text-xs font-medium text-muted-foreground">
                পাসওয়ার্ড
                <input
                  type="password" required autoComplete="current-password"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                  placeholder="••••••••"
                />
              </label>
              <button
                type="submit" disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground glow-ring transition hover:opacity-90 disabled:opacity-60"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>লগইন <ArrowRight className="h-4 w-4" /></>}
              </button>
            </form>
          )}
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">← হোমে ফিরে যান</Link>
        </p>
      </div>
    </main>
  );
}
