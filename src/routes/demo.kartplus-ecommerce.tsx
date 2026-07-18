import { createFileRoute } from "@tanstack/react-router";
import { DemoShell, DemoBtn, demoNoIndexHead } from "@/components/DemoShell";

export const Route = createFileRoute("/demo/kartplus-ecommerce")({
  head: () => demoNoIndexHead("Kart+ — ই-কমার্স ডেমো", "Webtrix-এর তৈরি একটি স্যাম্পল ই-কমার্স স্টোর।"),
  component: KartPlus,
});

const products = [
  { name: "প্রিমিয়াম কটন শার্ট", price: 1290, old: 1690, emoji: "👕", tag: "নতুন" },
  { name: "ডেনিম জ্যাকেট", price: 2450, old: 2990, emoji: "🧥", tag: "-১৮%" },
  { name: "স্নিকার শু", price: 1990, emoji: "👟", tag: "হট" },
  { name: "লেদার ব্যাকপ্যাক", price: 2790, old: 3490, emoji: "🎒", tag: "সেল" },
  { name: "ওভারসাইজড টি", price: 890, emoji: "👔" },
  { name: "স্লিম চিনো প্যান্ট", price: 1590, emoji: "👖", tag: "-১০%" },
  { name: "ক্লাসিক ওয়াচ", price: 3490, old: 4290, emoji: "⌚" },
  { name: "সানগ্লাস", price: 990, emoji: "🕶️", tag: "সেল" },
];

function KartPlus() {
  return (
    <DemoShell>
      <header style={{ borderBottom: "1px solid #EEF2F7", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", gap: 20, padding: "16px 24px" }}>
          <div style={{ fontWeight: 900, fontSize: 22, color: "#0A0F1D" }}>
            Kart<span style={{ color: "#3B82F6" }}>+</span>
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 16px",
              background: "#F1F5F9",
              borderRadius: 999,
              color: "#64748B",
              fontSize: 14,
            }}
          >
            🔍 <span>প্রোডাক্ট খুঁজুন…</span>
          </div>
          <div style={{ display: "flex", gap: 14, fontSize: 14, color: "#64748B" }}>
            <span>❤️</span>
            <span>🛒 ৩</span>
            <span>👤</span>
          </div>
        </div>
        <nav
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            gap: 24,
            padding: "10px 24px 16px",
            color: "#0A0F1D",
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          {["সব", "নতুন", "পুরুষ", "নারী", "শু", "অ্যাকসেসরিজ", "সেল"].map((c) => (
            <span key={c}>{c}</span>
          ))}
        </nav>
      </header>

      <section
        style={{
          maxWidth: 1200,
          margin: "24px auto",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            borderRadius: 24,
            padding: "48px 40px",
            background: "linear-gradient(120deg,#0A0F1D,#3B82F6)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <div style={{ maxWidth: 500 }}>
            <div style={{ fontSize: 12, color: "#10B981", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>
              উইন্টার কালেকশন ২০২৬
            </div>
            <h1 style={{ fontSize: 44, fontWeight: 900, margin: "10px 0", lineHeight: 1.1 }}>
              সবকিছুতে ৫০% পর্যন্ত ছাড়
            </h1>
            <p style={{ color: "rgba(255,255,255,0.8)" }}>
              দেশজুড়ে ফ্রি ডেলিভারি, ৭ দিনের রিটার্ন গ্যারান্টি।
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <DemoBtn>এখনই কিনুন</DemoBtn>
              <DemoBtn variant="ghost" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.3)" }}>
                কালেকশন দেখুন
              </DemoBtn>
            </div>
          </div>
          <div style={{ fontSize: 120 }}>🛍️</div>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: "40px auto", padding: "0 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20 }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>বেস্ট সেলার</h2>
          <span style={{ color: "#3B82F6", fontSize: 14, fontWeight: 600 }}>সব দেখুন →</span>
        </div>
        <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))" }}>
          {products.map((p) => (
            <article
              key={p.name}
              style={{
                borderRadius: 16,
                overflow: "hidden",
                border: "1px solid #EEF2F7",
                background: "#fff",
              }}
            >
              <div
                style={{
                  position: "relative",
                  aspectRatio: "1/1",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 72,
                  background: "linear-gradient(135deg,#F1F5F9,#E2E8F0)",
                }}
              >
                {p.emoji}
                {p.tag && (
                  <span
                    style={{
                      position: "absolute",
                      top: 12,
                      left: 12,
                      padding: "4px 10px",
                      borderRadius: 999,
                      background: "#10B981",
                      color: "#fff",
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    {p.tag}
                  </span>
                )}
                <span
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    width: 34,
                    height: 34,
                    display: "grid",
                    placeItems: "center",
                    borderRadius: 999,
                    background: "#fff",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                  }}
                >
                  ❤️
                </span>
              </div>
              <div style={{ padding: 14 }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{p.name}</div>
                <div style={{ color: "#F59E0B", fontSize: 12 }}>★★★★★</div>
                <div style={{ marginTop: 8, display: "flex", alignItems: "baseline", gap: 8 }}>
                  <span style={{ fontWeight: 800, color: "#0A0F1D" }}>৳ {p.price}</span>
                  {p.old && (
                    <span style={{ color: "#94A3B8", fontSize: 12, textDecoration: "line-through" }}>৳ {p.old}</span>
                  )}
                </div>
                <DemoBtn style={{ marginTop: 12, width: "100%", justifyContent: "center", padding: "8px 14px", fontSize: 13 }}>
                  🛒 কার্টে যোগ করুন
                </DemoBtn>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer style={{ borderTop: "1px solid #EEF2F7", marginTop: 40, padding: 24, textAlign: "center", color: "#94A3B8", fontSize: 12 }}>
        © {new Date().getFullYear()} Kart+ Demo — Webtrix IT Solution
      </footer>
    </DemoShell>
  );
}
