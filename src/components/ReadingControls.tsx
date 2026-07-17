import { useEffect, useState } from "react";
import { Type, Minus, Plus, Contrast, RotateCcw, Accessibility, X } from "lucide-react";

type Size = "default" | "comfort" | "large" | "xlarge";
const ORDER: Size[] = ["default", "comfort", "large", "xlarge"];
const LABELS: Record<Size, string> = {
  default: "স্বাভাবিক",
  comfort: "আরামদায়ক",
  large: "বড়",
  xlarge: "অতি বড়",
};

export function ReadingControls() {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState<Size>("default");
  const [contrast, setContrast] = useState(false);

  useEffect(() => {
    const s = (localStorage.getItem("wtx-reading") as Size | null) ?? "default";
    const c = localStorage.getItem("wtx-contrast") === "1";
    setSize(s);
    setContrast(c);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    if (size === "default") html.removeAttribute("data-reading");
    else html.setAttribute("data-reading", size);
    localStorage.setItem("wtx-reading", size);
  }, [size]);

  useEffect(() => {
    const html = document.documentElement;
    if (contrast) html.setAttribute("data-contrast", "high");
    else html.removeAttribute("data-contrast");
    localStorage.setItem("wtx-contrast", contrast ? "1" : "0");
  }, [contrast]);

  const step = (dir: 1 | -1) => {
    const i = ORDER.indexOf(size);
    const next = Math.max(0, Math.min(ORDER.length - 1, i + dir));
    setSize(ORDER[next]);
  };

  return (
    <div className="fixed bottom-24 right-5 z-50 sm:bottom-6 sm:right-24">
      {open && (
        <div
          role="dialog"
          aria-label="পঠন সহায়তা / Reading options"
          className="mb-3 w-64 rounded-2xl border border-white/10 bg-[color:var(--surface)]/95 p-4 shadow-2xl backdrop-blur"
        >
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold">পঠন সহায়তা</h3>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close reading options"
              className="rounded-full p-1 text-muted-foreground hover:bg-white/10 hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mb-3">
            <p className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
              <Type className="h-3.5 w-3.5" /> টেক্সট সাইজ · {LABELS[size]}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => step(-1)}
                disabled={size === "default"}
                aria-label="টেক্সট ছোট করুন"
                className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-foreground transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Minus className="h-4 w-4" />
              </button>
              <div className="flex-1 rounded-xl border border-white/10 bg-white/5 py-2 text-center text-sm font-medium">
                {ORDER.indexOf(size) + 1} / {ORDER.length}
              </div>
              <button
                onClick={() => step(1)}
                disabled={size === "xlarge"}
                aria-label="টেক্সট বড় করুন"
                className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-foreground transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <button
            onClick={() => setContrast((v) => !v)}
            aria-pressed={contrast}
            className={`mb-2 flex w-full items-center justify-between rounded-xl border border-white/10 px-3 py-2.5 text-sm transition ${
              contrast ? "bg-[color:var(--electric)]/20 text-foreground" : "bg-white/5 hover:bg-white/10"
            }`}
          >
            <span className="flex items-center gap-2">
              <Contrast className="h-4 w-4" /> হাই কনট্রাস্ট
            </span>
            <span className="text-xs text-muted-foreground">{contrast ? "চালু" : "বন্ধ"}</span>
          </button>

          <button
            onClick={() => {
              setSize("default");
              setContrast(false);
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-xs text-muted-foreground transition hover:bg-white/10 hover:text-foreground"
          >
            <RotateCcw className="h-3.5 w-3.5" /> রিসেট
          </button>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="পঠন সহায়তা খুলুন / Open reading options"
        aria-expanded={open}
        className="grid h-12 w-12 place-items-center rounded-full bg-[color:var(--lavender)] text-white shadow-lg ring-4 ring-[color:var(--lavender)]/25 transition hover:scale-105"
      >
        <Accessibility className="h-5 w-5" />
      </button>
    </div>
  );
}
