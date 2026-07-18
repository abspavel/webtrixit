import { createFileRoute } from "@tanstack/react-router";
import { DemoShell, DemoBtn, demoNoIndexHead } from "@/components/DemoShell";

export const Route = createFileRoute("/demo/freshcart-grocery")({
  head: () => demoNoIndexHead("FreshCart — গ্রোসারি ডেমো", "Webtrix-এর তৈরি একটি স্যাম্পল গ্রোসারি স্টোর।"),
  component: FreshCart,
});

const cats = [
  { n: "ফলমূল", i: "🍎", c: "#FEE2E2" },
  { n: "সবজি", i: "🥦", c: "#DCFCE7" },
  { n: "মাছ ও মাংস", i: "🐟", c: "#DBEAFE" },
  { n: "দুধ ও ডিম", i: "🥚", c: "#FEF3C7" },
  { n: "মসলা", i: "🧂", c: "#FFE4E6" },
  { n: "স্ন্যাকস", i: "🍪", c: "#EDE9FE" },
];

const deals = [
  { n: "টাটকা আপেল ১ কেজি", p: 220, o: 280, i: "🍎" },
  { n: "কাঁচা মরিচ ২৫০গ্রাম", p: 40, o: 60, i: "🌶️" },
  { n: "গরুর মাংস ১ কেজি", p: 750, o: 820, i: "🥩" },
  { n: "ব্রাউন এগ ১২টি", p: 165, o: 190, i: "🥚" },
];

function FreshCart() {
  return (
    <DemoShell>
      <header style={{ background: "#10B981", color: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "12px 24px", fontSize: 13, display: "flex", justifyContent: "space-between" }}>
          <span>🚚 চট্টগ্রামে ৯০ মিনিটে ডেলিভারি</span>
          <span>📞 হেল্পলাইন: 09611-000-000</span>
        </div>
        <div style={{ background: "#fff", color: "#0A0F1D" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ fontWeight: 900, fontSize: 22 }}>
              🛒 Fresh<span style={{ color: "#10B981" }}>Cart</span>
            </div>
            <div
              style={{
                flex: 1,
                background: "#F1F5F9",
                borderRadius: 999,
                padding: "10px 16px",
                color: "#64748B",
                fontSize: 14,
              }}
            >
              🔍 তাজা সবজি, ফল, মাছ খুঁজুন…
            </div>
            <DemoBtn style={{ background: "#10B981" }}>🛒 কার্ট (৫)</DemoBtn>
          </div>
        </div>
      </header>

      <section style={{ maxWidth: 1200, margin: "24px auto", padding: "0 24px" }}>
        <div
          style={{
            borderRadius: 20,
            padding: "36px 32px",
            background: "linear-gradient(120deg,#DCFCE7,#BBF7D0)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#065F46", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              আজকের বিশেষ অফার
            </div>
            <h1 style={{ fontSize: 40, fontWeight: 900, margin: "8px 0", color: "#064E3B" }}>
              টাটকা সবজি — ৩০% পর্যন্ত ছাড়
            </h1>
            <p style={{ color: "#065F46" }}>ফার্ম থেকে সরাসরি আপনার ঘরে, কোনো মধ্যস্বত্বভোগী ছাড়াই।</p>
            <DemoBtn style={{ marginTop: 14, background: "#065F46" }}>এখনই অর্ডার করুন</DemoBtn>
          </div>
          <div style={{ fontSize: 100 }}>🥬</div>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: "36px auto", padding: "0 24px" }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 16 }}>ক্যাটাগরি</h2>
        <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))" }}>
          {cats.map((c) => (
            <div
              key={c.n}
              style={{
                background: c.c,
                borderRadius: 16,
                padding: 20,
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <div style={{ fontSize: 40 }}>{c.i}</div>
              <div style={{ marginTop: 6, fontWeight: 700, color: "#0A0F1D" }}>{c.n}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: "36px auto", padding: "0 24px" }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 16 }}>
          ⚡ ফ্ল্যাশ ডিল <span style={{ color: "#EF4444", fontSize: 14 }}>শেষ হচ্ছে ০২:১৪:৩২</span>
        </h2>
        <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))" }}>
          {deals.map((d) => (
            <div key={d.n} style={{ background: "#fff", border: "1px solid #EEF2F7", borderRadius: 16, padding: 16, textAlign: "center" }}>
              <div style={{ fontSize: 56 }}>{d.i}</div>
              <div style={{ fontWeight: 700, marginTop: 6 }}>{d.n}</div>
              <div style={{ marginTop: 6 }}>
                <span style={{ fontWeight: 800, color: "#10B981", fontSize: 18 }}>৳ {d.p}</span>{" "}
                <span style={{ color: "#94A3B8", textDecoration: "line-through", fontSize: 13 }}>৳ {d.o}</span>
              </div>
              <DemoBtn style={{ marginTop: 10, width: "100%", justifyContent: "center", background: "#10B981" }}>
                + যোগ করুন
              </DemoBtn>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ background: "#F1F5F9", padding: 24, textAlign: "center", color: "#64748B", fontSize: 12, marginTop: 40 }}>
        © {new Date().getFullYear()} FreshCart Demo — Webtrix IT Solution
      </footer>
    </DemoShell>
  );
}
