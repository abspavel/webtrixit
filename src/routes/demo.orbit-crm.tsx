import { createFileRoute } from "@tanstack/react-router";
import { DemoShell, DemoBtn, demoNoIndexHead } from "@/components/DemoShell";

export const Route = createFileRoute("/demo/orbit-crm")({
  head: () => demoNoIndexHead("Orbit CRM — সফটওয়্যার ডেমো", "Webtrix-এর তৈরি একটি স্যাম্পল কাস্টম CRM ড্যাশবোর্ড।"),
  component: OrbitCRM,
});

const kpis = [
  { l: "মোট বিক্রয়", v: "৳ ৪৮.২ লক্ষ", d: "+১২.৪%", c: "#10B981" },
  { l: "নতুন লিড", v: "৩৪২", d: "+২৮%", c: "#3B82F6" },
  { l: "কনভার্শন রেট", v: "৪.৮%", d: "+০.৭%", c: "#8B5CF6" },
  { l: "একটিভ ক্লায়েন্ট", v: "১২৮", d: "+৬", c: "#F59E0B" },
];

const bars = [40, 65, 50, 78, 60, 88, 72, 95, 82, 70, 90, 100];
const months = ["জা", "ফে", "মা", "এ", "মে", "জু", "জু", "আ", "সে", "অ", "ন", "ডি"];

const pipeline = [
  { s: "Prospecting", n: 24, color: "#94A3B8" },
  { s: "Qualified", n: 18, color: "#3B82F6" },
  { s: "Proposal", n: 12, color: "#8B5CF6" },
  { s: "Negotiation", n: 8, color: "#F59E0B" },
  { s: "Won", n: 6, color: "#10B981" },
];

const activities = [
  { u: "রাশেদ", a: "নতুন লিড যোগ করেছে", t: "৫ মিনিট আগে", c: "#3B82F6" },
  { u: "নাদিয়া", a: "চুক্তি স্বাক্ষর করেছে (৳ ২.৫ লক্ষ)", t: "১ ঘণ্টা আগে", c: "#10B981" },
  { u: "তানভীর", a: "মিটিং সিডিউল করেছে", t: "৩ ঘণ্টা আগে", c: "#8B5CF6" },
  { u: "সাব্বির", a: "প্রোপোজাল পাঠিয়েছে", t: "গতকাল", c: "#F59E0B" },
];

function OrbitCRM() {
  return (
    <DemoShell>
      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", background: "#F8FAFC", minHeight: "calc(100vh - 34px)" }}>
        <aside style={{ background: "#fff", borderRight: "1px solid #E2E8F0", padding: 20 }}>
          <div style={{ fontWeight: 900, fontSize: 20, marginBottom: 28 }}>
            🌐 Orbit<span style={{ color: "#3B82F6" }}>CRM</span>
          </div>
          {["🏠 ওভারভিউ", "👥 লিড", "🤝 ক্লায়েন্ট", "📊 রিপোর্ট", "📅 ক্যালেন্ডার", "⚙️ সেটিংস"].map((m, i) => (
            <div
              key={m}
              style={{
                padding: "10px 12px",
                borderRadius: 10,
                marginBottom: 4,
                color: i === 0 ? "#3B82F6" : "#64748B",
                background: i === 0 ? "#EFF6FF" : "transparent",
                fontWeight: i === 0 ? 700 : 500,
                fontSize: 14,
              }}
            >
              {m}
            </div>
          ))}
        </aside>

        <main style={{ padding: 28 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
            <h1 style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>ড্যাশবোর্ড</h1>
            <div style={{ display: "flex", gap: 10 }}>
              <DemoBtn variant="ghost">📤 এক্সপোর্ট</DemoBtn>
              <DemoBtn>+ নতুন লিড</DemoBtn>
            </div>
          </div>

          <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", marginBottom: 24 }}>
            {kpis.map((k) => (
              <div key={k.l} style={{ background: "#fff", padding: 20, borderRadius: 14, border: "1px solid #E2E8F0" }}>
                <div style={{ fontSize: 12, color: "#64748B" }}>{k.l}</div>
                <div style={{ fontSize: 24, fontWeight: 800, marginTop: 6 }}>{k.v}</div>
                <div style={{ fontSize: 12, color: k.c, marginTop: 4, fontWeight: 600 }}>▲ {k.d}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gap: 20, gridTemplateColumns: "2fr 1fr", marginBottom: 24 }}>
            <section style={{ background: "#fff", borderRadius: 14, padding: 22, border: "1px solid #E2E8F0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
                <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>বার্ষিক রেভিনিউ</h2>
                <span style={{ fontSize: 12, color: "#3B82F6" }}>২০২৬</span>
              </div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 180 }}>
                {bars.map((h, i) => (
                  <div key={i} style={{ flex: 1, textAlign: "center" }}>
                    <div
                      style={{
                        height: `${h}%`,
                        background: "linear-gradient(180deg,#3B82F6,#8B5CF6)",
                        borderRadius: "8px 8px 0 0",
                      }}
                    />
                    <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 6 }}>{months[i]}</div>
                  </div>
                ))}
              </div>
            </section>

            <section style={{ background: "#fff", borderRadius: 14, padding: 22, border: "1px solid #E2E8F0" }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 16px" }}>সেলস পাইপলাইন</h2>
              {pipeline.map((p) => (
                <div key={p.s} style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
                    <span>{p.s}</span>
                    <span style={{ fontWeight: 700 }}>{p.n}</span>
                  </div>
                  <div style={{ height: 8, background: "#F1F5F9", borderRadius: 999 }}>
                    <div style={{ width: `${(p.n / 24) * 100}%`, height: "100%", background: p.color, borderRadius: 999 }} />
                  </div>
                </div>
              ))}
            </section>
          </div>

          <section style={{ background: "#fff", borderRadius: 14, padding: 22, border: "1px solid #E2E8F0" }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 14px" }}>সাম্প্রতিক অ্যাক্টিভিটি</h2>
            {activities.map((a, i) => (
              <div key={i} style={{ display: "flex", gap: 12, padding: "10px 0", borderTop: i === 0 ? "none" : "1px solid #F1F5F9" }}>
                <div style={{ width: 36, height: 36, borderRadius: 999, background: a.c, color: "#fff", display: "grid", placeItems: "center", fontWeight: 700 }}>
                  {a.u[0]}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14 }}>
                    <strong>{a.u}</strong> {a.a}
                  </div>
                  <div style={{ fontSize: 12, color: "#94A3B8" }}>{a.t}</div>
                </div>
              </div>
            ))}
          </section>
        </main>
      </div>
    </DemoShell>
  );
}
