import { createFileRoute } from "@tanstack/react-router";
import { DemoShell, DemoBtn, demoNoIndexHead } from "@/components/DemoShell";

export const Route = createFileRoute("/demo/panelpro-smm")({
  head: () => demoNoIndexHead("PanelPro — SMM প্যানেল ডেমো", "Webtrix-এর তৈরি একটি স্যাম্পল SMM প্যানেল ড্যাশবোর্ড।"),
  component: PanelPro,
});

const services = [
  { id: 101, name: "Facebook Page Followers — Real", rate: 0.75, min: 100, max: 50000 },
  { id: 102, name: "Instagram Followers — HQ", rate: 1.2, min: 50, max: 20000 },
  { id: 103, name: "YouTube Watch Time (Hours)", rate: 45, min: 10, max: 4000 },
  { id: 104, name: "TikTok Video Views", rate: 0.15, min: 500, max: 100000 },
  { id: 105, name: "Twitter/X Followers", rate: 1.8, min: 100, max: 10000 },
];

const orders = [
  { id: 8452, svc: "IG Followers", qty: 1000, status: "Completed", color: "#10B981" },
  { id: 8451, svc: "FB Likes", qty: 500, status: "Processing", color: "#F59E0B" },
  { id: 8450, svc: "YT Views", qty: 5000, status: "Completed", color: "#10B981" },
  { id: 8449, svc: "TikTok Followers", qty: 250, status: "Pending", color: "#64748B" },
];

function PanelPro() {
  return (
    <DemoShell theme="dark">
      <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", minHeight: "calc(100vh - 34px)" }}>
        <aside style={{ background: "#111827", padding: "24px 16px", borderRight: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontWeight: 900, fontSize: 20, marginBottom: 24 }}>
            <span style={{ color: "#3B82F6" }}>◆</span> PanelPro
          </div>
          {["📊 ড্যাশবোর্ড", "🛒 নতুন অর্ডার", "📦 আমার অর্ডার", "💳 ফান্ড যোগ করুন", "🔑 API", "⚙️ সেটিংস"].map((m, i) => (
            <div
              key={m}
              style={{
                padding: "10px 12px",
                borderRadius: 10,
                marginBottom: 4,
                color: i === 0 ? "#fff" : "#94A3B8",
                background: i === 0 ? "rgba(59,130,246,0.15)" : "transparent",
                fontSize: 14,
                fontWeight: i === 0 ? 700 : 500,
              }}
            >
              {m}
            </div>
          ))}
        </aside>

        <main style={{ padding: 28, background: "#0A0F1D" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <div>
              <div style={{ color: "#94A3B8", fontSize: 13 }}>স্বাগতম,</div>
              <h1 style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>Demo User 👋</h1>
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ padding: "10px 16px", background: "#111827", borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: 11, color: "#94A3B8" }}>ব্যালেন্স</div>
                <div style={{ fontWeight: 800, color: "#10B981" }}>৳ 2,450.00</div>
              </div>
              <DemoBtn>+ ফান্ড যোগ করুন</DemoBtn>
            </div>
          </div>

          <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", marginBottom: 28 }}>
            {[
              ["মোট অর্ডার", "128", "#3B82F6"],
              ["সম্পন্ন", "112", "#10B981"],
              ["প্রসেসিং", "12", "#F59E0B"],
              ["পেন্ডিং", "4", "#64748B"],
            ].map(([l, v, c]) => (
              <div key={l} style={{ padding: 18, background: "#111827", borderRadius: 14, border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ color: "#94A3B8", fontSize: 12 }}>{l}</div>
                <div style={{ fontSize: 26, fontWeight: 800, color: c as string, marginTop: 4 }}>{v}</div>
              </div>
            ))}
          </div>

          <section style={{ background: "#111827", borderRadius: 14, padding: 20, border: "1px solid rgba(255,255,255,0.06)", marginBottom: 24 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 14px" }}>নতুন অর্ডার দিন</h2>
            <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))" }}>
              <select disabled style={selStyle}>
                <option>ক্যাটাগরি — Facebook</option>
              </select>
              <select disabled style={selStyle}>
                <option>সার্ভিস — Page Followers</option>
              </select>
              <input readOnly value="1000" style={selStyle} />
              <DemoBtn>অর্ডার সাবমিট</DemoBtn>
            </div>
          </section>

          <section style={{ background: "#111827", borderRadius: 14, padding: 20, border: "1px solid rgba(255,255,255,0.06)", marginBottom: 24 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 14px" }}>সার্ভিস তালিকা</h2>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}>
                <thead style={{ color: "#94A3B8", textAlign: "left" }}>
                  <tr>
                    <th style={cellH}>ID</th>
                    <th style={cellH}>সার্ভিস</th>
                    <th style={cellH}>রেট / 1K</th>
                    <th style={cellH}>Min</th>
                    <th style={cellH}>Max</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((s) => (
                    <tr key={s.id} style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                      <td style={cell}>{s.id}</td>
                      <td style={cell}>{s.name}</td>
                      <td style={{ ...cell, color: "#10B981", fontWeight: 700 }}>৳ {s.rate}</td>
                      <td style={cell}>{s.min}</td>
                      <td style={cell}>{s.max}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section style={{ background: "#111827", borderRadius: 14, padding: 20, border: "1px solid rgba(255,255,255,0.06)" }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 14px" }}>সাম্প্রতিক অর্ডার</h2>
            <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}>
              <thead style={{ color: "#94A3B8", textAlign: "left" }}>
                <tr>
                  <th style={cellH}>#</th>
                  <th style={cellH}>সার্ভিস</th>
                  <th style={cellH}>কোয়ান্টিটি</th>
                  <th style={cellH}>স্ট্যাটাস</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    <td style={cell}>#{o.id}</td>
                    <td style={cell}>{o.svc}</td>
                    <td style={cell}>{o.qty}</td>
                    <td style={cell}>
                      <span style={{ padding: "3px 10px", borderRadius: 999, fontSize: 11, fontWeight: 700, background: `${o.color}22`, color: o.color }}>
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>
      </div>
    </DemoShell>
  );
}

const cellH: React.CSSProperties = { padding: "10px 12px", fontWeight: 600, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em" };
const cell: React.CSSProperties = { padding: "12px", color: "#E2E8F0" };
const selStyle: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 10,
  background: "#0A0F1D",
  border: "1px solid rgba(255,255,255,0.12)",
  color: "#E2E8F0",
  fontSize: 13,
};
