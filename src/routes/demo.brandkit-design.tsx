import { createFileRoute } from "@tanstack/react-router";
import { DemoShell, DemoBtn, demoNoIndexHead } from "@/components/DemoShell";

export const Route = createFileRoute("/demo/brandkit-design")({
  head: () => demoNoIndexHead("BrandKit — লোগো/কভার/পোস্টার ডেমো", "Webtrix-এর ডিজাইন শোকেস।"),
  component: BrandKit,
});

const logos = [
  { n: "Nova", g: "linear-gradient(135deg,#3B82F6,#8B5CF6)", ch: "N" },
  { n: "Petal", g: "linear-gradient(135deg,#EC4899,#F59E0B)", ch: "P" },
  { n: "Forge", g: "linear-gradient(135deg,#0A0F1D,#10B981)", ch: "F" },
  { n: "Orbit", g: "linear-gradient(135deg,#06B6D4,#3B82F6)", ch: "O" },
  { n: "Bloom", g: "linear-gradient(135deg,#10B981,#F59E0B)", ch: "B" },
  { n: "Kite", g: "linear-gradient(135deg,#8B5CF6,#EC4899)", ch: "K" },
];

const posters = [
  { t: "ঈদ স্পেশাল অফার", tag: "সোশ্যাল পোস্টার", g: "linear-gradient(135deg,#F59E0B,#EF4444)" },
  { t: "গ্র্যান্ড ওপেনিং", tag: "কভার ফটো", g: "linear-gradient(135deg,#3B82F6,#0A0F1D)" },
  { t: "৫০% ফ্ল্যাশ সেল", tag: "ফেসবুক অ্যাড", g: "linear-gradient(135deg,#10B981,#06B6D4)" },
  { t: "ব্র্যান্ড লঞ্চ", tag: "ইন্সটাগ্রাম পোস্ট", g: "linear-gradient(135deg,#8B5CF6,#EC4899)" },
];

function BrandKit() {
  return (
    <DemoShell>
      <header style={{ background: "#0A0F1D", color: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "18px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontWeight: 900, fontSize: 22 }}>
            🎨 Brand<span style={{ color: "#F59E0B" }}>Kit</span>
          </div>
          <div style={{ display: "flex", gap: 22, fontSize: 14, color: "#94A3B8" }}>
            <span>পোর্টফোলিও</span>
            <span>সার্ভিস</span>
            <span>প্রাইসিং</span>
          </div>
          <DemoBtn style={{ background: "#F59E0B", color: "#0A0F1D" }}>অর্ডার করুন</DemoBtn>
        </div>
      </header>

      <section style={{ padding: "60px 24px", textAlign: "center", background: "linear-gradient(180deg,#F8FAFC,#fff)" }}>
        <h1 style={{ fontSize: 48, fontWeight: 900, margin: 0, color: "#0A0F1D" }}>
          আপনার ব্র্যান্ডের জন্য <br />
          <span style={{ color: "#F59E0B" }}>সম্পূর্ণ ভিজ্যুয়াল আইডেনটিটি</span>
        </h1>
        <p style={{ maxWidth: 620, margin: "16px auto 0", color: "#64748B" }}>
          লোগো, কভার ফটো, সোশ্যাল মিডিয়া পোস্টার — সব একটাই প্যাকেজে, প্রফেশনাল কোয়ালিটিতে।
        </p>
      </section>

      <section style={{ maxWidth: 1200, margin: "40px auto", padding: "0 24px" }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 24 }}>সাম্প্রতিক লোগো ডিজাইন</h2>
        <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))" }}>
          {logos.map((l) => (
            <div
              key={l.n}
              style={{
                aspectRatio: "1/1",
                borderRadius: 20,
                background: "#F8FAFC",
                border: "1px solid #E2E8F0",
                display: "grid",
                placeItems: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 22,
                    background: l.g,
                    color: "#fff",
                    display: "grid",
                    placeItems: "center",
                    fontSize: 40,
                    fontWeight: 900,
                    margin: "0 auto",
                    boxShadow: "0 10px 24px rgba(0,0,0,0.15)",
                  }}
                >
                  {l.ch}
                </div>
                <div style={{ marginTop: 14, fontWeight: 800, fontSize: 18, color: "#0A0F1D" }}>{l.n}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: "40px auto", padding: "0 24px" }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 24 }}>পোস্টার ও সোশ্যাল ডিজাইন</h2>
        <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))" }}>
          {posters.map((p) => (
            <article key={p.t} style={{ borderRadius: 18, overflow: "hidden", border: "1px solid #E2E8F0" }}>
              <div style={{ aspectRatio: "4/5", background: p.g, position: "relative", padding: 20, color: "#fff", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.8 }}>
                  {p.tag}
                </span>
                <div>
                  <div style={{ fontSize: 26, fontWeight: 900, lineHeight: 1.1 }}>{p.t}</div>
                  <div style={{ fontSize: 12, marginTop: 8, opacity: 0.85 }}>Webtrix IT Solution</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        style={{
          margin: "40px 24px",
          padding: 40,
          borderRadius: 24,
          background: "#0A0F1D",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: 30, fontWeight: 800, margin: 0 }}>স্টার্টার প্যাকেজ — ৳ ২,৫০০</h2>
        <p style={{ color: "#94A3B8", marginTop: 8 }}>১টি লোগো + ৩টি সোশ্যাল পোস্টার + ১টি কভার ফটো</p>
        <DemoBtn style={{ marginTop: 18, background: "#F59E0B", color: "#0A0F1D" }}>এখনই অর্ডার করুন</DemoBtn>
      </section>

      <footer style={{ padding: 24, textAlign: "center", color: "#94A3B8", fontSize: 12 }}>
        © {new Date().getFullYear()} BrandKit Demo — Webtrix IT Solution
      </footer>
    </DemoShell>
  );
}
