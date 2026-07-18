import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { getSupabase } from "@/integrations/supabase/client";
import {
  Loader2, LogOut, Search, RefreshCw, Trash2, Phone, MessageCircle, Mail,
  ShieldCheck, Inbox, Link2, Save,
} from "lucide-react";
import logoUrl from "@/assets/webtrix-logo.svg";
import { services } from "@/lib/services-data";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Dashboard — Webtrix" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

type Lead = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  service: string | null;
  budget: string | null;
  message: string | null;
  source_page: string | null;
  status: string;
  created_at: string;
};

type Status = "new" | "contacted" | "won" | "lost";
const STATUSES: Status[] = ["new", "contacted", "won", "lost"];
const STATUS_LABEL: Record<string, string> = {
  new: "নতুন", contacted: "যোগাযোগ হয়েছে", won: "জয়ী", lost: "হারানো",
};
const STATUS_COLOR: Record<string, string> = {
  new: "bg-electric/15 text-electric border-electric/30",
  contacted: "bg-lavender/15 text-lavender border-lavender/30",
  won: "bg-neon/15 text-neon border-neon/30",
  lost: "bg-rose-500/15 text-rose-400 border-rose-500/30",
};

function AdminPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"all" | Status>("all");
  const [q, setQ] = useState("");

  const loadLeads = useCallback(async () => {
    setLoading(true);
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      setLeads((data ?? []) as Lead[]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Leads লোড হয়নি";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const supabase = getSupabase();
        const { data: userData } = await supabase.auth.getUser();
        if (!userData.user) {
          navigate({ to: "/auth", replace: true });
          return;
        }
        setEmail(userData.user.email ?? "");
        // Role check
        const { data: roleData, error: roleErr } = await supabase.rpc("has_role", {
          _user_id: userData.user.id, _role: "admin",
        });
        if (roleErr || !roleData) {
          toast.error("Access denied — এই account-এ admin role নেই।");
          await supabase.auth.signOut();
          navigate({ to: "/auth", replace: true });
          return;
        }
        setReady(true);
        await loadLeads();

        // Realtime
        const ch = supabase
          .channel("leads-admin")
          .on("postgres_changes", { event: "*", schema: "public", table: "leads" }, () => {
            loadLeads();
          })
          .subscribe();
        return () => { supabase.removeChannel(ch); };
      } catch (err) {
        console.error(err);
        toast.error(err instanceof Error ? err.message : "ত্রুটি ঘটেছে");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleLogout() {
    const supabase = getSupabase();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  async function updateStatus(id: string, status: Status) {
    try {
      const supabase = getSupabase();
      const { error } = await supabase.from("leads").update({ status }).eq("id", id);
      if (error) throw error;
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
      toast.success("স্ট্যাটাস আপডেট হয়েছে");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "আপডেট ব্যর্থ");
    }
  }

  async function deleteLead(id: string) {
    if (!confirm("এই lead delete করবেন?")) return;
    try {
      const supabase = getSupabase();
      const { error } = await supabase.from("leads").delete().eq("id", id);
      if (error) throw error;
      setLeads((prev) => prev.filter((l) => l.id !== id));
      toast.success("Delete হয়েছে");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete ব্যর্থ");
    }
  }

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return leads.filter((l) => {
      if (filter !== "all" && l.status !== filter) return false;
      if (!term) return true;
      return (
        l.name.toLowerCase().includes(term) ||
        l.phone.toLowerCase().includes(term) ||
        (l.email ?? "").toLowerCase().includes(term) ||
        (l.service ?? "").toLowerCase().includes(term)
      );
    });
  }, [leads, filter, q]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: leads.length, new: 0, contacted: 0, won: 0, lost: 0 };
    for (const l of leads) c[l.status] = (c[l.status] ?? 0) + 1;
    return c;
  }, [leads]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoUrl} alt="Webtrix" className="h-8 w-auto" />
          </Link>
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <span className="hidden items-center gap-1.5 rounded-full border border-neon/30 bg-neon/10 px-3 py-1 text-neon sm:inline-flex">
              <ShieldCheck className="h-3.5 w-3.5" /> Admin
            </span>
            <span className="hidden text-muted-foreground sm:inline">{email}</span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/70 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-surface"
            >
              <LogOut className="h-3.5 w-3.5" /> লগআউট
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Leads Dashboard</h1>
            <p className="mt-1 text-sm text-muted-foreground">সব incoming inquiry এক জায়গায়।</p>
          </div>
          <button
            onClick={loadLeads}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-4 py-2 text-sm font-medium text-foreground hover:bg-surface"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> রিফ্রেশ
          </button>
        </div>

        {/* Filters */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {(["all", ...STATUSES] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                filter === s
                  ? "border-primary bg-primary/15 text-primary"
                  : "border-border bg-surface/60 text-muted-foreground hover:text-foreground"
              }`}
            >
              {s === "all" ? "সব" : STATUS_LABEL[s]}
              <span className="rounded-full bg-background px-1.5 py-0.5 text-[10px] text-muted-foreground">
                {counts[s] ?? 0}
              </span>
            </button>
          ))}
          <div className="ml-auto flex min-w-[220px] items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="নাম / ফোন / ইমেইল / সার্ভিস..."
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
        </div>

        {/* Table */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-surface/50">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
              <Inbox className="h-10 w-10 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                {leads.length === 0 ? "এখনো কোনো lead আসেনি।" : "এই ফিল্টারে কিছু নেই।"}
              </p>
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden overflow-x-auto lg:block">
                <table className="w-full text-sm">
                  <thead className="border-b border-border bg-background/40 text-left text-xs uppercase text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 font-medium">নাম</th>
                      <th className="px-4 py-3 font-medium">যোগাযোগ</th>
                      <th className="px-4 py-3 font-medium">সার্ভিস</th>
                      <th className="px-4 py-3 font-medium">সোর্স</th>
                      <th className="px-4 py-3 font-medium">তারিখ</th>
                      <th className="px-4 py-3 font-medium">স্ট্যাটাস</th>
                      <th className="px-4 py-3 font-medium text-right">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((l) => (
                      <tr key={l.id} className="border-b border-border/60 align-top text-foreground last:border-0">
                        <td className="px-4 py-3">
                          <div className="font-medium">{l.name}</div>
                          {l.message && <div className="mt-1 max-w-xs text-xs text-muted-foreground line-clamp-2">{l.message}</div>}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-col gap-1 text-xs">
                            <a href={`tel:${l.phone}`} className="inline-flex items-center gap-1.5 text-foreground hover:text-electric"><Phone className="h-3 w-3" />{l.phone}</a>
                            <a href={`https://wa.me/${l.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-neon hover:opacity-80"><MessageCircle className="h-3 w-3" />WhatsApp</a>
                            {l.email && <a href={`mailto:${l.email}`} className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground"><Mail className="h-3 w-3" />{l.email}</a>}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs">
                          <div className="text-foreground">{l.service || "—"}</div>
                          {l.budget && <div className="mt-1 text-muted-foreground">Budget: {l.budget}</div>}
                        </td>
                        <td className="px-4 py-3 text-xs text-muted-foreground">{l.source_page || "—"}</td>
                        <td className="px-4 py-3 text-xs text-muted-foreground">{formatDate(l.created_at)}</td>
                        <td className="px-4 py-3">
                          <StatusPill value={l.status} onChange={(s) => updateStatus(l.id, s)} />
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button onClick={() => deleteLead(l.id)} className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-rose-500/10 hover:text-rose-400" title="Delete">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="divide-y divide-border/60 lg:hidden">
                {filtered.map((l) => (
                  <div key={l.id} className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="font-medium text-foreground">{l.name}</div>
                        <div className="mt-0.5 text-xs text-muted-foreground">{formatDate(l.created_at)}</div>
                      </div>
                      <StatusPill value={l.status} onChange={(s) => updateStatus(l.id, s)} />
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs">
                      <a href={`tel:${l.phone}`} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-2.5 py-1 text-foreground"><Phone className="h-3 w-3" />{l.phone}</a>
                      <a href={`https://wa.me/${l.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-neon/30 bg-neon/10 px-2.5 py-1 text-neon"><MessageCircle className="h-3 w-3" />WhatsApp</a>
                      {l.email && <a href={`mailto:${l.email}`} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-2.5 py-1 text-muted-foreground"><Mail className="h-3 w-3" />ইমেইল</a>}
                    </div>
                    {(l.service || l.budget) && (
                      <div className="mt-3 text-xs">
                        {l.service && <div className="text-foreground">সার্ভিস: <span className="text-muted-foreground">{l.service}</span></div>}
                        {l.budget && <div className="mt-0.5 text-foreground">Budget: <span className="text-muted-foreground">{l.budget}</span></div>}
                      </div>
                    )}
                    {l.source_page && <div className="mt-2 text-xs text-muted-foreground">সোর্স: {l.source_page}</div>}
                    {l.message && <div className="mt-2 rounded-lg border border-border bg-background/40 p-2 text-xs text-muted-foreground">{l.message}</div>}
                    <div className="mt-3 flex justify-end">
                      <button onClick={() => deleteLead(l.id)} className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1 text-xs text-rose-400">
                        <Trash2 className="h-3 w-3" /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <ServiceLinksPanel />
      </div>
    </main>
  );
}

type ServiceLinkRow = { service_slug: string; demo_url: string | null; sale_url: string | null };

function ServiceLinksPanel() {
  const [rows, setRows] = useState<Record<string, { demo_url: string; sale_url: string }>>({});
  const [loading, setLoading] = useState(false);
  const [savingSlug, setSavingSlug] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase.from("service_links").select("service_slug, demo_url, sale_url");
      if (error) throw error;
      const map: Record<string, { demo_url: string; sale_url: string }> = {};
      for (const s of services) map[s.slug] = { demo_url: "", sale_url: "" };
      for (const r of (data ?? []) as ServiceLinkRow[]) {
        map[r.service_slug] = { demo_url: r.demo_url ?? "", sale_url: r.sale_url ?? "" };
      }
      setRows(map);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "লিংক লোড হয়নি");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function save(slug: string) {
    const row = rows[slug];
    if (!row) return;
    setSavingSlug(slug);
    try {
      const supabase = getSupabase();
      const { error } = await supabase.from("service_links").upsert(
        { service_slug: slug, demo_url: row.demo_url || null, sale_url: row.sale_url || null, updated_at: new Date().toISOString() },
        { onConflict: "service_slug" },
      );
      if (error) throw error;
      toast.success("লিংক সেভ হয়েছে");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "সেভ ব্যর্থ");
    } finally {
      setSavingSlug(null);
    }
  }

  return (
    <section className="mt-10">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold text-foreground sm:text-2xl">
            <Link2 className="h-5 w-5 text-electric" /> সার্ভিস ডেমো / সেল লিংক
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            প্রতিটি সার্ভিসের জন্য লাইভ ডেমো URL ও কেনার/অর্ডার পেজ URL এখান থেকে আপডেট করুন। খালি রাখলে ডিফল্ট ব্যবহার হবে।
          </p>
        </div>
        <button
          onClick={load}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-surface"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} /> রিফ্রেশ
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-surface/50">
        {services.map((s) => {
          const row = rows[s.slug] ?? { demo_url: "", sale_url: "" };
          return (
            <div key={s.slug} className="border-b border-border/60 p-4 last:border-0 sm:p-5">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className="font-semibold text-foreground">{s.titleBn}</div>
                  <div className="text-[11px] text-muted-foreground">/services/{s.slug}</div>
                </div>
                <button
                  onClick={() => save(s.slug)}
                  disabled={savingSlug === s.slug}
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
                >
                  {savingSlug === s.slug ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />} সেভ
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">ডেমো URL</span>
                  <input
                    type="url"
                    value={row.demo_url}
                    onChange={(e) => setRows((prev) => ({ ...prev, [s.slug]: { ...row, demo_url: e.target.value } }))}
                    placeholder="https://... বা /demo/..."
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-electric focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">সেল / অর্ডার URL</span>
                  <input
                    type="url"
                    value={row.sale_url}
                    onChange={(e) => setRows((prev) => ({ ...prev, [s.slug]: { ...row, sale_url: e.target.value } }))}
                    placeholder="https://..."
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-neon focus:outline-none"
                  />
                </label>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function StatusPill({ value, onChange }: { value: string; onChange: (s: Status) => void }) {
  const cls = STATUS_COLOR[value] ?? "bg-surface text-muted-foreground border-border";
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as Status)}
      className={`cursor-pointer rounded-full border px-2.5 py-1 text-xs font-medium focus:outline-none ${cls}`}
    >
      {STATUSES.map((s) => (
        <option key={s} value={s} className="bg-background text-foreground">
          {STATUS_LABEL[s]}
        </option>
      ))}
    </select>
  );
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleString("bn-BD", { dateStyle: "medium", timeStyle: "short" });
  } catch {
    return iso;
  }
}
