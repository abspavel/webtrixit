import type { ReactNode } from "react";

/**
 * Wrapper for all internal demo template pages.
 * Adds a subtle "Demo Preview by Webtrix" ribbon so viewers know
 * the page is a showcase and not a real, functional site.
 */
export function DemoShell({
  children,
  theme = "light",
}: {
  children: ReactNode;
  theme?: "light" | "dark";
}) {
  const bg = theme === "dark" ? "#0A0F1D" : "#ffffff";
  const fg = theme === "dark" ? "#E2E8F0" : "#0A0F1D";
  return (
    <div
      style={{
        background: bg,
        color: fg,
        fontFamily:
          '"Hind Siliguri", "Noto Sans Bengali", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 60,
          background: "linear-gradient(90deg,#3B82F6,#8B5CF6,#10B981)",
          color: "#fff",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.08em",
          textAlign: "center",
          padding: "6px 10px",
          textTransform: "uppercase",
        }}
      >
        ✦ Demo Preview by Webtrix IT Solution — শুধু প্রদর্শনের জন্য
      </div>
      {children}
    </div>
  );
}

/** Non-functional button — swallows the click so demo pages feel real but don't navigate. */
export function DemoBtn({
  children,
  style,
  variant = "primary",
}: {
  children: ReactNode;
  style?: React.CSSProperties;
  variant?: "primary" | "ghost" | "dark";
}) {
  const base: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 18px",
    borderRadius: 999,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    border: "1px solid transparent",
    transition: "transform .15s ease",
  };
  const variants: Record<string, React.CSSProperties> = {
    primary: { background: "#3B82F6", color: "#fff" },
    ghost: { background: "transparent", color: "inherit", borderColor: "rgba(0,0,0,0.12)" },
    dark: { background: "#0A0F1D", color: "#fff" },
  };
  return (
    <button
      type="button"
      onClick={(e) => e.preventDefault()}
      style={{ ...base, ...variants[variant], ...style }}
    >
      {children}
    </button>
  );
}

export const demoNoIndexHead = (title: string, description: string) => ({
  meta: [
    { title },
    { name: "description", content: description },
    { name: "robots", content: "noindex, nofollow" },
  ],
});
