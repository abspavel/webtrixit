import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * Pure CSS/Tailwind 3D composition of layered "website mockup" panels.
 * Rotation, scale and perspective are bound to scroll progress.
 * On mobile (and with reduced motion) the heavy 3D transforms and blurs are
 * skipped so scrolling stays at 60fps.
 */
export function Hero3DStack() {
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useReducedMotion();
  const isMobile = useIsMobile();
  const reduced = prefersReduced || isMobile;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.4 });

  const rotateX = useTransform(smooth, [0, 0.5, 1], [22, 6, -10]);
  const rotateY = useTransform(smooth, [0, 0.5, 1], [-16, 0, 14]);
  const scale = useTransform(smooth, [0, 0.5, 1], [0.92, 1, 0.95]);
  const perspective = useTransform(smooth, [0, 1], [1400, 900]);
  const zBack = useTransform(smooth, [0, 1], [-140, -40]);
  const zMid = useTransform(smooth, [0, 1], [-60, 10]);
  const zFront = useTransform(smooth, [0, 1], [40, 120]);
  const floatY = useTransform(smooth, [0, 1], [24, -24]);

  const still = { rotateX: 0, rotateY: 0, scale: 1 };
  const blur = reduced ? "" : " backdrop-blur";

  return (
    <div ref={ref} className="mx-auto mt-12 w-full max-w-4xl [transform-style:preserve-3d]">
      <motion.div
        style={
          reduced
            ? undefined
            : { perspective, rotateX, rotateY, scale, transformStyle: "preserve-3d", willChange: "transform" }
        }
        {...(reduced ? { animate: still } : {})}
        className="relative mx-auto aspect-[16/10] w-full [transform-style:preserve-3d]"
      >

        {/* back panel */}
        <motion.div
          style={reduced ? undefined : { translateZ: zBack, y: floatY }}
          className={"absolute left-[8%] top-0 h-[72%] w-[64%] rounded-2xl border border-border/70 bg-surface/70 p-3 shadow-[var(--shadow-card)]" + blur}
        >
          <MockBar />
          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="col-span-2 h-16 rounded-lg bg-electric/15" />
            <div className="h-16 rounded-lg bg-lavender/15" />
            <div className="h-3 rounded bg-foreground/10" />
            <div className="h-3 rounded bg-foreground/10" />
            <div className="h-3 rounded bg-foreground/10" />
          </div>
        </motion.div>

        {/* mid panel */}
        <motion.div
          style={reduced ? undefined : { translateZ: zMid }}
          className={"absolute right-[6%] top-[14%] h-[70%] w-[52%] rounded-2xl border border-border bg-card/85 p-3 shadow-[var(--shadow-glow)]" + blur}
        >
          <MockBar />
          <div className="mt-3 space-y-2">
            <div className="h-20 rounded-lg bg-gradient-to-br from-electric/25 via-lavender/20 to-neon/20" />
            <div className="h-2.5 w-3/4 rounded bg-foreground/12" />
            <div className="h-2.5 w-1/2 rounded bg-foreground/10" />
          </div>
        </motion.div>

        {/* front floating card */}
        <motion.div
          style={reduced ? undefined : { translateZ: zFront, y: floatY }}
          className={"absolute bottom-[4%] left-[22%] w-[46%] rounded-2xl border border-primary/30 bg-card/95 p-4 shadow-[var(--shadow-neon)]" + blur}
        >
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            কনভার্সন রেট
          </div>
          <div className="mt-1 font-display text-2xl font-bold text-gradient">+১৮৭%</div>
          <div className="mt-3 flex items-end gap-1.5">
            {[30, 45, 38, 62, 74, 90].map((h) => (
              <div key={h} className="w-full rounded-t bg-neon/50" style={{ height: h * 0.45 }} />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function MockBar() {
  return (
    <div className="flex items-center gap-1.5">
      <span className="h-2 w-2 rounded-full bg-destructive/60" />
      <span className="h-2 w-2 rounded-full bg-neon/60" />
      <span className="h-2 w-2 rounded-full bg-electric/60" />
      <span className="ml-2 h-2 flex-1 rounded bg-foreground/10" />
    </div>
  );
}

/** Spring pop-up + fade-in wrapper for existing cards. */
export function PopIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const prefersReduced = useReducedMotion();
  const isMobile = useIsMobile();
  if (prefersReduced) return <div className={className}>{children}</div>;
  // On mobile: opacity-only tween (no transform/spring) to keep FPS stable.
  if (isMobile) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.35, ease: "easeOut", delay: delay * 0.5 }}
      >
        {children}
      </motion.div>
    );
  }
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 36, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25, margin: "0px 0px -60px 0px" }}
      transition={{ type: "spring", stiffness: 180, damping: 22, mass: 0.6, delay }}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}

