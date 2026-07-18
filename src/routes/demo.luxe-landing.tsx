import { createFileRoute } from "@tanstack/react-router";
import { DemoShell, DemoBtn, demoNoIndexHead } from "@/components/DemoShell";

export const Route = createFileRoute("/demo/luxe-landing")({
  head: () =>
    demoNoIndexHead("Luxe — ল্যান্ডিং পেজ ডেমো", "Webtrix-এর তৈরি একটি স্যাম্পল ল্যান্ডিং পেজ।"),
  component: LuxeLanding,
});

function LuxeLanding() {
  return (
    <DemoShell theme="dark">
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px 24px" }}>
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "14px 20px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 16,
            backdropFilter: "blur(8px)",
          }}
        >
          <div style={{ fontWeight: 800, fontSize: 20, letterSpacing: "-0.02em" }}>
            <span style={{ color: "#3B82F6" }}>◆</span> Luxe<span style={{ color: "#10B981" }}>.</span>
          </div>
          <div style={{ display: "flex", gap: 24, fontSize: 14, color: "#94A3B8" }}>
            <span>ফিচার</span>
            <span>প্রাইসিং</span>
            <span>রিভিউ</span>
            <span>যোগাযোগ</span>
          </div>
          <DemoBtn>এখনই শুরু করুন</DemoBtn>
        </nav>

        <section style={{ padding: "80px 20px", textAlign: "center" }}>
          <div
            style={{
              display: "inline-block",
              padding: "6px 14px",
              borderRadius: 999,
              background: "rgba(16,185,129,0.12)",
              color: "#10B981",
              fontSize: 12,
              fontWeight: 600,
              marginBottom: 24,
            }}
          >
            🎉 নতুন লঞ্চ অফার — ৪০% ছাড়
          </div>
          <h1
            style={{
              fontSize: "clamp(36px, 6vw, 68px)",
              lineHeight: 1.05,
              fontWeight: 800,
              margin: 0,
              letterSpacing: "-0.03em",
            }}
          >
            আপনার আইডিয়াকে <br />
            <span
              style={{
                background: "linear-gradient(90deg,#3B82F6,#8B5CF6,#10B981)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              বিক্রয়যোগ্য প্রোডাক্টে
            </span>{" "}
            রূপান্তর করুন
          </h1>
          <p style={{ maxWidth: 640, margin: "24px auto 0", color: "#94A3B8", fontSize: 18 }}>
            কনভার্শন-ফোকাসড ল্যান্ডিং পেজ, দ্রুত লোড, মোবাইল-ফার্স্ট — মাত্র ৭২ ঘণ্টায় প্রস্তুত।
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 32, flexWrap: "wrap" }}>
            <DemoBtn>ফ্রি কনসালটেশন নিন</DemoBtn>
            <DemoBtn variant="ghost" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.2)" }}>
              ▶ ডেমো দেখুন
            </DemoBtn>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 40, marginTop: 60, flexWrap: "wrap" }}>
            {[
              ["১২০০+", "হ্যাপি ক্লায়েন্ট"],
              ["৪.৯/৫", "গড় রেটিং"],
              ["৪৮ ঘণ্টা", "ডেলিভারি"],
            ].map(([v, l]) => (
              <div key={l}>
                <div style={{ fontSize: 32, fontWeight: 800, color: "#10B981" }}>{v}</div>
                <div style={{ color: "#94A3B8", fontSize: 13 }}>{l}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ padding: "60px 20px" }}>
          <h2 style={{ textAlign: "center", fontSize: 36, fontWeight: 800, marginBottom: 40 }}>
            কেন <span style={{ color: "#3B82F6" }}>Luxe</span> বেছে নেবেন?
          </h2>
          <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))" }}>
            {[
              { icon: "⚡", title: "দ্রুত লোডিং", desc: "২ সেকেন্ডের কম টাইমে লোড হয়, SEO স্কোর ১০০।" },
              { icon: "📱", title: "মোবাইল-ফার্স্ট", desc: "প্রতিটি স্ক্রিনে নিখুঁত রেসপন্সিভ UI।" },
              { icon: "🎯", title: "কনভার্শন-ফোকাসড", desc: "প্রুভেন স্ট্রাকচার — ৩–৫× বেশি লিড।" },
              { icon: "🔒", title: "সিকিউর ও রিলায়েবল", desc: "SSL, DDoS প্রোটেকশন, ৯৯.৯% আপটাইম।" },
            ].map((f) => (
              <div
                key={f.title}
                style={{
                  padding: 24,
                  borderRadius: 20,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 12 }}>{f.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{f.title}</div>
                <div style={{ color: "#94A3B8", fontSize: 14 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section
          style={{
            margin: "40px 0",
            padding: 48,
            borderRadius: 24,
            background: "linear-gradient(135deg,#3B82F6,#8B5CF6)",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: 32, fontWeight: 800, color: "#fff", margin: 0 }}>
            আজই আপনার ল্যান্ডিং পেজ বানান
          </h2>
          <p style={{ color: "rgba(255,255,255,0.85)", marginTop: 12 }}>
            ৪৮ ঘণ্টার মধ্যে লাইভ, ৩০ দিনের মানি-ব্যাক গ্যারান্টি।
          </p>
          <DemoBtn variant="dark" style={{ marginTop: 20 }}>
            শুরু করুন — ৳ ৫,০০০ থেকে
          </DemoBtn>
        </section>

        <footer style={{ padding: 24, textAlign: "center", color: "#94A3B8", fontSize: 12 }}>
          © {new Date().getFullYear()} Luxe — Demo template by Webtrix IT Solution
        </footer>
      </div>
    </DemoShell>
  );
}
