import { createFileRoute } from "@tanstack/react-router";
import { DemoShell, DemoBtn, demoNoIndexHead } from "@/components/DemoShell";

export const Route = createFileRoute("/demo/eduprime-lms")({
  head: () => demoNoIndexHead("EduPrime — LMS ডেমো", "Webtrix-এর তৈরি একটি স্যাম্পল LMS প্ল্যাটফর্ম।"),
  component: EduPrime,
});

const courses = [
  { t: "কমপ্লিট ওয়েব ডেভেলপমেন্ট", ins: "আরিফ রহমান", price: 2500, rating: 4.9, students: 1240, hours: 42, i: "💻", c: "#3B82F6" },
  { t: "ডিজিটাল মার্কেটিং মাস্টারক্লাস", ins: "নাদিয়া করিম", price: 1800, rating: 4.8, students: 890, hours: 28, i: "📈", c: "#10B981" },
  { t: "গ্রাফিক ডিজাইন — জিরো টু হিরো", ins: "সাব্বির আহমেদ", price: 2200, rating: 4.7, students: 720, hours: 36, i: "🎨", c: "#8B5CF6" },
  { t: "ফ্রিল্যান্সিং সাকসেস কোর্স", ins: "তানভীর হোসেন", price: 1500, rating: 4.9, students: 2100, hours: 22, i: "🚀", c: "#F59E0B" },
  { t: "স্পোকেন ইংলিশ ফর কেরিয়ার", ins: "মিসেস তৃণা", price: 1200, rating: 4.6, students: 640, hours: 18, i: "🗣️", c: "#EF4444" },
  { t: "মোবাইল অ্যাপ ডেভেলপমেন্ট", ins: "শাহরিয়ার ইসলাম", price: 2800, rating: 4.8, students: 480, hours: 48, i: "📱", c: "#06B6D4" },
];

function EduPrime() {
  return (
    <DemoShell>
      <header style={{ background: "#fff", borderBottom: "1px solid #EEF2F7" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontWeight: 900, fontSize: 22 }}>
            🎓 Edu<span style={{ color: "#8B5CF6" }}>Prime</span>
          </div>
          <div style={{ display: "flex", gap: 22, fontSize: 14, color: "#64748B" }}>
            <span>কোর্স</span>
            <span>ক্যাটাগরি</span>
            <span>ইনস্ট্রাক্টর</span>
            <span>ব্লগ</span>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <DemoBtn variant="ghost">লগইন</DemoBtn>
            <DemoBtn style={{ background: "#8B5CF6" }}>রেজিস্টার</DemoBtn>
          </div>
        </div>
      </header>

      <section
        style={{
          background: "linear-gradient(120deg,#EDE9FE,#DDD6FE)",
          padding: "60px 24px",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <h1 style={{ fontSize: 48, fontWeight: 900, margin: 0, color: "#4C1D95" }}>
            শিখুন যেকোনো জায়গা থেকে, <br /> নিজের গতিতে
          </h1>
          <p style={{ maxWidth: 620, margin: "16px auto 0", color: "#5B21B6" }}>
            বাংলাদেশের সেরা ইনস্ট্রাক্টরদের কাছ থেকে ১০০০+ কোর্স — সার্টিফিকেট সহ।
          </p>
          <div style={{ maxWidth: 480, margin: "26px auto 0", display: "flex", gap: 8 }}>
            <input
              readOnly
              placeholder="কোন কোর্স শিখতে চান?"
              style={{ flex: 1, padding: "12px 18px", borderRadius: 999, border: "1px solid #C4B5FD", fontSize: 14, background: "#fff" }}
            />
            <DemoBtn style={{ background: "#4C1D95" }}>খুঁজুন</DemoBtn>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: "40px auto", padding: "0 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20 }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, margin: 0 }}>জনপ্রিয় কোর্স</h2>
          <span style={{ color: "#8B5CF6", fontSize: 14, fontWeight: 600 }}>সব কোর্স →</span>
        </div>
        <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))" }}>
          {courses.map((c) => (
            <article key={c.t} style={{ borderRadius: 18, overflow: "hidden", border: "1px solid #EEF2F7", background: "#fff" }}>
              <div style={{ background: c.c, height: 140, display: "grid", placeItems: "center", fontSize: 60, color: "#fff" }}>
                {c.i}
              </div>
              <div style={{ padding: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: c.c, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  প্রফেশনাল কোর্স
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, marginTop: 6, lineHeight: 1.35 }}>{c.t}</div>
                <div style={{ fontSize: 13, color: "#64748B", marginTop: 4 }}>👨‍🏫 {c.ins}</div>
                <div style={{ display: "flex", gap: 14, marginTop: 10, fontSize: 12, color: "#64748B" }}>
                  <span>⭐ {c.rating}</span>
                  <span>👥 {c.students}</span>
                  <span>⏱️ {c.hours}ঘ</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
                  <span style={{ fontWeight: 800, color: "#4C1D95", fontSize: 18 }}>৳ {c.price}</span>
                  <DemoBtn style={{ background: "#8B5CF6", padding: "8px 14px", fontSize: 13 }}>এনরোল করুন</DemoBtn>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer style={{ background: "#0A0F1D", color: "#94A3B8", padding: 32, textAlign: "center", marginTop: 40 }}>
        © {new Date().getFullYear()} EduPrime LMS Demo — Webtrix IT Solution
      </footer>
    </DemoShell>
  );
}
