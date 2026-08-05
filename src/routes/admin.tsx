import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  Loader2, LogOut, Search, RefreshCw, Trash2, Phone, MessageCircle, Mail,
  ShieldCheck, Inbox, Link2, Save, BriefcaseBusiness, Plus, Pencil, X, ExternalLink, ImagePlus, Loader
} from "lucide-react";
const logoAsset = { url: "/webtrix-logo.png" };

import { services } from "@/lib/services-data";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Bioxin" },
      { name: "description", content: "Bioxin admin dashboard for leads, service links, and portfolio projects." },
      { property: "og:title", content: "Admin Dashboard — Bioxin" },
      { property: "og:description", content: "Manage Bioxin leads, demo links, sale links, and portfolio projects." },

      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
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
  new: "New", contacted: "Contacted", won: "Won", lost: "Lost",
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
      const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      setLeads((data ?? []) as Lead[]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Leads could not be loaded";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
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
          toast.error("Access denied — this account does not have admin role.");
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
        toast.error(err instanceof Error ? err.message : "An error occurred");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  async function updateStatus(id: string, status: Status) {
    try {
      const { error } = await supabase.from("leads").update({ status }).eq("id", id);
      if (error) throw error;
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
      toast.success("Status updated");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Update failed");

    }
  }

  async function deleteLead(id: string) {
    if (!confirm("Delete this lead?")) return;
    try {
      const { error } = await supabase.from("leads").delete().eq("id", id);
      if (error) throw error;
      setLeads((prev) => prev.filter((l) => l.id !== id));
      toast.success("Deleted successfully");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");

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
            <img src={logoAsset.url} alt="Bioxin" className="h-8 w-auto" />
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
              <LogOut className="h-3.5 w-3.5" /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Leads Dashboard</h1>
            <p className="mt-1 text-sm text-muted-foreground">All incoming inquiries in one place.</p>
          </div>
          <button
            onClick={loadLeads}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-4 py-2 text-sm font-medium text-foreground hover:bg-surface"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Refresh
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
              {s === "all" ? "All" : STATUS_LABEL[s]}
              <span className="rounded-full bg-background px-1.5 py-0.5 text-[10px] text-muted-foreground">
                {counts[s] ?? 0}
              </span>
            </button>
          ))}
          <div className="ml-auto flex min-w-[220px] items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="Name / Phone / Email / Service..."
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
                {leads.length === 0 ? "No leads yet." : "Nothing in this filter."}
              </p>
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden overflow-x-auto lg:block">
                <table className="w-full text-sm">
                  <thead className="border-b border-border bg-background/40 text-left text-xs uppercase text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 font-medium">Name</th>
                      <th className="px-4 py-3 font-medium">Contact</th>
                      <th className="px-4 py-3 font-medium">Service</th>
                      <th className="px-4 py-3 font-medium">Source</th>
                      <th className="px-4 py-3 font-medium">Date</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium text-right">Action</th>

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
                      {l.email && <a href={`mailto:${l.email}`} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-2.5 py-1 text-muted-foreground"><Mail className="h-3 w-3" />Email</a>}
                    </div>
                    {(l.service || l.budget) && (
                      <div className="mt-3 text-xs">
                        {l.service && <div className="text-foreground">Service: <span className="text-muted-foreground">{l.service}</span></div>}
                        {l.budget && <div className="mt-0.5 text-foreground">Budget: <span className="text-muted-foreground">{l.budget}</span></div>}
                      </div>
                    )}
                    {l.source_page && <div className="mt-2 text-xs text-muted-foreground">Source: {l.source_page}</div>}
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
        <PortfolioProjectsPanel />
      </div>
    </main>
  );
}

type ServiceLinkRow = { service_slug: string; demo_url: string | null; sale_url: string | null; demo_image: string | null };

type PortfolioProject = {
  id: string;
  title: string;
  category: string | null;
  description: string | null;
  demo_url: string;
  image_url: string | null;
  project_screenshots: string[] | null;
  sort_order: number | null;
  is_active: boolean;
  created_at: string;
};

type PortfolioForm = {
  title: string;
  category: string;
  description: string;
  demo_url: string;
  image_url: string;
  project_screenshots: string; // stored as comma-separated or JSON in form state
  sort_order: string;
  is_active: boolean;
};

const emptyPortfolioForm: PortfolioForm = {
  title: "",
  category: "",
  description: "",
  demo_url: "",
  image_url: "",
  project_screenshots: "",
  sort_order: "0",
  is_active: true,
};

function ServiceLinksPanel() {
  const [rows, setRows] = useState<Record<string, { demo_url: string; sale_url: string; demo_image: string }>>({});
  const [loading, setLoading] = useState(false);
  const [savingSlug, setSavingSlug] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("service_links").select("service_slug, demo_url, sale_url, demo_image");
      if (error) throw error;
      const map: Record<string, { demo_url: string; sale_url: string; demo_image: string }> = {};
      for (const s of services) map[s.slug] = { demo_url: "", sale_url: "", demo_image: "" };
      for (const r of (data ?? []) as ServiceLinkRow[]) {

        map[r.service_slug] = { 
          demo_url: r.demo_url ?? "", 
          sale_url: r.sale_url ?? "",
          demo_image: r.demo_image ?? ""
        };
      }
      setRows(map);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Links could not be loaded");
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
      const { error } = await supabase.from("service_links").upsert(
        { 
          service_slug: slug, 
          demo_url: row.demo_url || null, 
          sale_url: row.sale_url || null, 
          demo_image: row.demo_image || null,
          updated_at: new Date().toISOString() 
        },
        { onConflict: "service_slug" },
      );

      if (error) throw error;
      toast.success("Link saved successfully");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");

    } finally {
      setSavingSlug(null);
    }
  }

  return (
    <section className="mt-10">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold text-foreground sm:text-2xl">
            <Link2 className="h-5 w-5 text-electric" /> Service Demo / Sale Links
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Update the Live Demo URL and Buy/Order Page URL for each service. Leave blank to use defaults.
          </p>

        </div>
        <button
          onClick={load}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-surface"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh

        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-surface/50">
        {services.map((s) => {
          const row = rows[s.slug] ?? { demo_url: "", sale_url: "", demo_image: "" };
          return (
            <div key={s.slug} className="border-b border-border/60 p-4 last:border-0 sm:p-5">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className="font-semibold text-foreground">{s.title}</div>
                  <div className="text-[11px] text-muted-foreground">/services/{s.slug}</div>
                </div>
                <button
                  onClick={() => save(s.slug)}
                  disabled={savingSlug === s.slug}
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
                >
                  {savingSlug === s.slug ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />} Save
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Demo URL</span>
                  <input
                    type="url"
                    value={row.demo_url}
                    onChange={(e) => setRows((prev) => ({ ...prev, [s.slug]: { ...row, demo_url: e.target.value } }))}
                    placeholder="https://... or /demo/..."

                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-electric focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Sale / Order URL</span>
                  <input
                    type="url"
                    value={row.sale_url}
                    onChange={(e) => setRows((prev) => ({ ...prev, [s.slug]: { ...row, sale_url: e.target.value } }))}
                    placeholder="https://..."
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-neon focus:outline-none"
                  />
                </label>
              </div>
              <div className="mt-4">
                <ImageUpload 
                  label="Service Demo Image" 
                  value={row.demo_image} 
                  onUpload={(url) => setRows((prev) => ({ ...prev, [s.slug]: { ...row, demo_image: url } }))} 
                />
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}

function PortfolioProjectsPanel() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [form, setForm] = useState<PortfolioForm>(emptyPortfolioForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("portfolio_projects")
        .select("id, title, category, description, demo_url, image_url, project_screenshots, sort_order, is_active, created_at")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });
      if (error) throw error;
      setProjects((data ?? []) as PortfolioProject[]);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Projects could not be loaded");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  function resetForm() {
    setEditingId(null);
    setForm(emptyPortfolioForm);
  }

  function editProject(project: PortfolioProject) {
    setEditingId(project.id);
    setForm({
      title: project.title,
      category: project.category ?? "",
      description: project.description ?? "",
      demo_url: project.demo_url,
      image_url: project.image_url ?? "",
      project_screenshots: Array.isArray(project.project_screenshots) ? project.project_screenshots.join(", ") : "",
      sort_order: String(project.sort_order ?? 0),
      is_active: project.is_active,
    });
  }

  async function saveProject() {
    if (!form.title.trim() || !form.demo_url.trim()) {
      toast.error("Please provide a project name and demo URL");
      return;
    }
    setSaving(true);
    try {
      const order = Number.parseInt(form.sort_order, 10);
      const screenshots = form.project_screenshots
        .split(",")
        .map(s => s.trim())
        .filter(Boolean);
      
      const payload = {
        title: form.title.trim(),
        category: form.category.trim() || null,
        description: form.description.trim() || null,
        demo_url: form.demo_url.trim(),
        image_url: form.image_url.trim() || null,
        project_screenshots: screenshots.length > 0 ? screenshots : null,
        sort_order: Number.isFinite(order) ? order : 0,
        is_active: form.is_active,
        updated_at: new Date().toISOString(),
      };
      
      const { data: { user } } = await supabase.auth.getUser();
      const payloadWithUser = { ...payload, updated_by: user?.id };

      const query = editingId
        ? supabase.from("portfolio_projects").update(payloadWithUser).eq("id", editingId)
        : supabase.from("portfolio_projects").insert([payloadWithUser]);

      const { error } = await query;
      if (error) throw error;
      toast.success(editingId ? "Project updated" : "New project added");
      resetForm();
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function deleteProject(id: string) {
    if (!confirm("Delete this portfolio project?")) return;
    try {
      const { error } = await supabase.from("portfolio_projects").delete().eq("id", id);
      if (error) throw error;
      setProjects((prev) => prev.filter((project) => project.id !== id));
      if (editingId === id) resetForm();
      toast.success("Project deleted");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");

    }
  }

  return (
    <section className="mt-10">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold text-foreground sm:text-2xl">
            <BriefcaseBusiness className="h-5 w-5 text-neon" /> Portfolio / Our Work
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Add, edit, and hide projects or websites to be shown in the "Our Work" section of the homepage.
          </p>

        </div>
        <Button type="button" variant="outline" size="sm" onClick={load} className="rounded-full bg-surface/70 text-foreground hover:bg-surface">
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh
        </Button>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(320px,0.8fr)_minmax(0,1.2fr)]">
        <div className="rounded-2xl border border-border bg-surface/50 p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between gap-2">
            <h3 className="font-semibold text-foreground">{editingId ? "Edit Project" : "New Project"}</h3>
            {editingId && (
              <Button type="button" variant="ghost" size="sm" onClick={resetForm} className="rounded-full text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" /> Cancel

              </Button>
            )}
          </div>
          <div className="space-y-4">
            <ImageUpload 
              label="Project Preview Image" 
              value={form.image_url} 
              onUpload={(url) => setForm(prev => ({ ...prev, image_url: url }))} 
            />


            <label className="block">
              <span className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Project Name</span>
              <input
                value={form.title}
                onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="e.g. Modern Skin Analysis Tool"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-electric focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Category</span>
              <input
                value={form.category}
                onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                placeholder="Dermatology / Anti-aging / Care"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-electric focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Demo / Website URL</span>
              <input
                type="url"
                value={form.demo_url}
                onChange={(e) => setForm((prev) => ({ ...prev, demo_url: e.target.value }))}
                placeholder="https://... or /demo/..."
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-neon focus:outline-none"
              />
            </label>
            <div className="space-y-1.5">
              <span className="block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Project Screenshots</span>
              <div className="grid grid-cols-2 gap-2">
                {form.project_screenshots.split(",").filter(Boolean).map((s, i) => (
                  <div key={i} className="group relative aspect-video overflow-hidden rounded-lg border border-border">
                    <img src={s.trim()} alt="" className="h-full w-full object-cover" />
                    <button 
                      onClick={() => {
                        const sss = form.project_screenshots.split(",").map(x => x.trim()).filter(Boolean);
                        sss.splice(i, 1);
                        setForm(prev => ({ ...prev, project_screenshots: sss.join(", ") }));
                      }}
                      className="absolute right-1 top-1 rounded-full bg-rose-500 p-1 text-white opacity-0 transition group-hover:opacity-100"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                <ImageUpload 
                  compact 
                  onUpload={(url) => {
                    const sss = form.project_screenshots.split(",").map(x => x.trim()).filter(Boolean);
                    sss.push(url);
                    setForm(prev => ({ ...prev, project_screenshots: sss.join(", ") }));
                  }} 
                />
              </div>
            </div>

            <label className="block">
              <span className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Short Description</span>
              <textarea
                value={form.description}
                onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="1-2 line description about the project"
                rows={3}
                className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-electric focus:outline-none"
              />
            </label>
            <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
              <label className="block">
                <span className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Serial</span>
                <input
                  type="number"
                  value={form.sort_order}
                  onChange={(e) => setForm((prev) => ({ ...prev, sort_order: e.target.value }))}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-electric focus:outline-none"
                />
              </label>
              <label className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground">
                <input
                  type="checkbox"
                  checked={form.is_active}
                  onChange={(e) => setForm((prev) => ({ ...prev, is_active: e.target.checked }))}
                  className="h-4 w-4 accent-primary"
                />
                Active
              </label>
            </div>
            <Button type="button" onClick={saveProject} disabled={saving} className="w-full rounded-full font-semibold">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : editingId ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              {editingId ? "Update Project" : "Add Project"}
            </Button>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-surface/50">
          {projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
              <Inbox className="h-10 w-10 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">No portfolio projects yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-border/60">
              {projects.map((project) => (
                <div key={project.id} className="p-4 sm:p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-foreground">{project.title}</h3>
                        <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${project.is_active ? "border-neon/30 bg-neon/10 text-neon" : "border-border bg-background text-muted-foreground"}`}>
                          {project.is_active ? "Active" : "Hidden"}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {project.category || "No Category"} · Serial {project.sort_order ?? 0}
                      </p>
                      {project.description && <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>}
                      <div className="mt-2 flex flex-wrap gap-2">
                        <a href={project.demo_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 break-all text-xs text-electric hover:opacity-80">
                          <ExternalLink className="h-3 w-3" /> {project.demo_url}
                        </a>
                        {project.project_screenshots && project.project_screenshots.length > 0 && (
                          <span className="text-[10px] text-muted-foreground">
                            · {project.project_screenshots.length} Screenshots
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <Button type="button" variant="outline" size="icon" onClick={() => editProject(project)} aria-label="Edit Project" className="rounded-full bg-background">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button type="button" variant="outline" size="icon" onClick={() => deleteProject(project.id)} aria-label="Delete Project" className="rounded-full border-rose-500/30 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 hover:text-rose-300">

                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ImageUpload({ 
  label, 
  value, 
  onUpload, 
  compact 
}: { 
  label?: string; 
  value?: string; 
  onUpload: (url: string) => void;
  compact?: boolean;
}) {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const ext = file.name.split('.').pop();
      const path = `${Math.random().toString(36).substring(2)}.${ext}`;
      
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(path, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(path);

      onUpload(publicUrl);
      toast.success("Image uploaded successfully");
    } catch (err) {
      toast.error("Upload failed: " + (err instanceof Error ? err.message : "Error"));

    } finally {
      setUploading(false);
    }
  };

  if (compact) {
    return (
      <label className="flex aspect-video cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-border bg-background/50 transition hover:bg-background">
        {uploading ? <Loader className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4 text-muted-foreground" />}
        <input type="file" accept="image/*" className="hidden" onChange={handleFile} disabled={uploading} />
      </label>
    );
  }

  return (
    <div className="space-y-2">
      {label && <span className="block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</span>}
      <div className="flex gap-3">
        {value && (
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-border">
            <img src={value} alt="" className="h-full w-full object-cover" />
          </div>
        )}
        <label className="flex h-12 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-background/50 px-4 transition hover:bg-background">
          {uploading ? (
            <Loader className="h-4 w-4 animate-spin text-muted-foreground" />
          ) : (
            <>
              <ImagePlus className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Upload from Gallery</span>
            </>
          )}
          <input type="file" accept="image/*" className="hidden" onChange={handleFile} disabled={uploading} />
        </label>
      </div>
    </div>
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
