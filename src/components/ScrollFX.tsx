import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

/** Thin neon progress bar bound to page scroll. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-[image:var(--gradient-hero)]"
    />
  );
}

/**
 * Full-page animated background: drifting neon orbs + slow-moving grid.
 * Purely decorative, GPU-friendly, disabled for reduced motion.
 */
export function AnimatedBackground() {
  const prefersReduced = useReducedMotion();
  const isMobile = useIsMobile();
  const still = prefersReduced;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className={`grid-bg absolute inset-0 opacity-[0.35] ${still ? "" : "animate-grid-drift"}`} />
      <div className={`orb absolute -left-32 top-[10%] h-[38rem] w-[38rem] ${still ? "" : "animate-orb-a"}`} />
      <div className={`orb orb-2 absolute -right-40 top-[45%] h-[34rem] w-[34rem] ${still ? "" : "animate-orb-b"}`} />
      {!isMobile && (
        <div className={`orb orb-3 absolute left-[35%] bottom-[-10%] h-[30rem] w-[30rem] ${still ? "" : "animate-orb-c"}`} />
      )}
    </div>
  );
}

type Depth = "soft" | "medium" | "strong";

const DEPTH: Record<Depth, { rot: number; z: number; y: number; scale: number }> = {
  soft: { rot: 6, z: -60, y: 40, scale: 0.97 },
  medium: { rot: 10, z: -120, y: 60, scale: 0.95 },
  strong: { rot: 14, z: -180, y: 80, scale: 0.93 },
};

/**
 * Scroll-bound 3D reveal: the section tilts up from below, flattens as it
 * reaches the viewport centre, then tilts away as it leaves.
 * Mobile / reduced-motion falls back to a light opacity fade.
 */
export function Scroll3DSection({
  children,
  depth = "medium",
  className = "",
}: {
  children: React.ReactNode;
  depth?: Depth;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useReducedMotion();
  const isMobile = useIsMobile();
  const reduced = prefersReduced || isMobile;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.4 });

  const d = DEPTH[depth];
  const rotateX = useTransform(smooth, [0, 0.45, 0.6, 1], [d.rot, 0, 0, -d.rot * 0.6]);
  const translateZ = useTransform(smooth, [0, 0.45, 0.6, 1], [d.z, 0, 0, d.z * 0.5]);
  const y = useTransform(smooth, [0, 0.45, 0.6, 1], [d.y, 0, 0, -d.y * 0.5]);
  const scale = useTransform(smooth, [0, 0.45, 0.6, 1], [d.scale, 1, 1, d.scale + 0.02]);
  const opacity = useTransform(smooth, [0, 0.2, 0.85, 1], [0.35, 1, 1, 0.6]);

  if (reduced) {
    return (
      <motion.div
        ref={ref}
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div ref={ref} className={`[perspective:1400px] ${className}`}>
      <motion.div
        style={{ rotateX, translateZ, y, scale, opacity, transformStyle: "preserve-3d", willChange: "transform, opacity" }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/** Simple vertical parallax for decorative layers. */
export function Parallax({
  children,
  distance = 60,
  className = "",
}: {
  children: React.ReactNode;
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useReducedMotion();
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  if (prefersReduced || isMobile) return <div className={className}>{children}</div>;
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
