import { createFileRoute } from "@tanstack/react-router";
import { DemoShell, DemoBtn, demoNoIndexHead } from "@/components/DemoShell";

export const Route = createFileRoute("/demo/pulseads-video")({
  head: () => demoNoIndexHead("PulseAds — AI ভিডিও অ্যাড ডেমো", "Webtrix-এর তৈরি AI ভিডিও অ্যাড শোকেস।"),
  component: PulseAds,
});

const videos = [
  { t: "শীতের ফ্যাশন প্রোমো", d: "0:30", views: "১.২M", cat: "ফ্যাশন", g: "linear-gradient(135deg,#3B82F6,#8B5CF6)" },
  { t: "রেস্টুরেন্ট গ্র্যান্ড ওপেনিং", d: "0:45", views: "৮৫০K", cat: "ফুড", g: "linear-gradient(135deg,#F59E0B,#EF4444)" },
  { t: "রিয়েল এস্টেট ট্যুর", d: "1:00", views: "৩২০K", cat: "প্রপার্টি", g: "linear-gradient(135deg,#10B981,#06B6D4)" },
  { t: "স্মার্টফোন লঞ্চ টিজার", d: "0:20", views: "২.১M", cat: "টেক", g: "linear-gradient(135deg,#0A0F1D,#3B82F6)" },
  { t: "স্কিনকেয়ার প্রোডাক্ট ডেমো", d: "0:35", views: "৪৮০K", cat: "বিউটি", g: "linear-gradient(135deg,#EC4899,#8B5CF6)" },
  { t: "অনলাইন কোর্স প্রোমো", d: "0:50", views: "৬২০K", cat: "এডুকেশন", g: "linear-gradient(135deg,#8B5CF6,#EC4899)" },
];

function PulseAds() {
  return (
    <DemoShell theme="dark">
      <header style={{ padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontWeight: 900, fontSize: 22 }}>
            ⚡ Pulse<span style={{ color: "#8B5CF6" }}>Ads</span>
          </div>
          <div style={{ display: "flex", gap: 22, fontSize: 14, color: "#94A3B8" }}>
            <span>গ্যালারি</span>
            <span>প্রাইসিং</span>
            <span>প্রসেস</span>
          </div>
          <DemoBtn style={{ background: "linear-gradient(90deg,#8B5CF6,#EC4899)" }}>অ্যাড বানান</DemoBtn>
        </div>
      </header>

      <section style={{ padding: "60px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <span
            style={{
              display: "inline-block",
              padding: "6px 14px",
              borderRadius: 999,
              background: "rgba(139,92,246,0.15)",
              color: "#C4B5FD",
              fontSize: 12,
              fontWeight: 600,
              marginBottom: 20,
            }}
          >
            ✨ AI-Powered Video Ads
          </span>
          <h1 style={{ fontSize: 56, fontWeight: 900, margin: 0, lineHeight: 1.05 }}>
            আপনার প্রোডাক্টের জন্য <br />
            <span
              style={{
                background: "linear-gradient(90deg,#8B5CF6,#EC4899,#F59E0B)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              স্ক্রল-স্টপিং
            </span>{" "}
            AI ভিডিও অ্যাড
          </h1>
          <p style={{ color: "#94A3B8", fontSize: 18, marginTop: 20 }}>
            মাত্র ৪৮ ঘণ্টায় ডেলিভারি — Facebook, Instagram, TikTok, YouTube-এর জন্য অপটিমাইজড।
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 28 }}>
            <DemoBtn style={{ background: "linear-gradient(90deg,#8B5CF6,#EC4899)" }}>প্রজেক্ট শুরু করুন</DemoBtn>
            <DemoBtn variant="ghost" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.2)" }}>▶ শোরিল দেখুন</DemoBtn>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: "40px auto", padding: "0 24px" }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 20 }}>সাম্প্রতিক প্রজেক্ট</h2>
        <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))" }}>
          {videos.map((v) => (
            <article
              key={v.t}
              style={{
                borderRadius: 18,
                overflow: "hidden",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div style={{ position: "relative", aspectRatio: "16/9", background: v.g, display: "grid", placeItems: "center" }}>
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 999,
                    background: "rgba(255,255,255,0.9)",
                    color: "#0A0F1D",
                    display: "grid",
                    placeItems: "center",
                    fontSize: 24,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                  }}
                >
                  ▶
                </div>
                <span
                  style={{
                    position: "absolute",
                    bottom: 10,
                    right: 10,
                    background: "rgba(0,0,0,0.7)",
                    color: "#fff",
                    padding: "3px 8px",
                    borderRadius: 6,
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  {v.d}
                </span>
                <span
                  style={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    background: "rgba(255,255,255,0.2)",
                    backdropFilter: "blur(6px)",
                    color: "#fff",
                    padding: "4px 10px",
                    borderRadius: 999,
                    fontSize: 11,
                    fontWeight: 600,
                  }}
                >
                  {v.cat}
                </span>
              </div>
              <div style={{ padding: 14 }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{v.t}</div>
                <div style={{ color: "#94A3B8", fontSize: 12, marginTop: 6 }}>👁️ {v.views} views</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer style={{ textAlign: "center", padding: 24, color: "#94A3B8", fontSize: 12, marginTop: 40 }}>
        © {new Date().getFullYear()} PulseAds Demo — Webtrix IT Solution
      </footer>
    </DemoShell>
  );
}
