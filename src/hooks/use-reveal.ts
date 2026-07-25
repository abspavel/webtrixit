import { useEffect, useLayoutEffect, useRef, useState } from "react";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Sets data-visible="true" on the returned ref when the element enters the viewport.
 * Pair with `.reveal` / `.reveal-l` / `.reveal-r` classes in styles.css.
 *
 * If the element is already in the viewport on mount (above the fold on route
 * entry), it is marked visible synchronously before paint AND flagged with
 * data-instant so no rise-in animation plays — otherwise the hero would
 * appear to "load from the bottom" on every service page.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverInit = { threshold: 0.15, rootMargin: "0px 0px -80px 0px" },
) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  const [instant, setInstant] = useState(false);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const rect = el.getBoundingClientRect();
    if (rect.top < vh && rect.bottom > 0) {
      setInstant(true);
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
            break;
          }
        }
      },
      options,
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible]);

  return { ref, visible, instant } as const;
}

/**
 * Watches multiple section ids and returns the id currently in view (nearest to the top).
 */
export function useActiveSection(ids: string[], topOffset = 120) {
  const [active, setActive] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    const onScroll = () => {
      let current = ids[0] ?? "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top - topOffset <= 0) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids.join("|"), topOffset]);

  return active;
}
