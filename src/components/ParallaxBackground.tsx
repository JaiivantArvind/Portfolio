import { useEffect, useRef } from "react";

/**
 * Full-screen marble background with a subtle scroll parallax.
 * Previously ran a requestAnimationFrame loop forever (~59 callbacks/s while idle)
 * and animated background-position (a paint on every frame). Now it moves a
 * GPU-composited layer with transform, and only runs frames while it is moving.
 */
export function ParallaxBackground() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const MAX_SHIFT = 120; // px, matches the layer's overscan below
    let target = 0;
    let current = 0;
    let raf = 0;

    const frame = () => {
      current += (target - current) * 0.08;
      if (Math.abs(target - current) < 0.1) current = target;
      layer.style.transform = `translate3d(0, ${(-current).toFixed(2)}px, 0)`;
      raf = current === target ? 0 : requestAnimationFrame(frame);
    };

    const onScroll = () => {
      target = reduceMotion.matches ? 0 : Math.min(window.scrollY * 0.05, MAX_SHIFT);
      if (!raf) raf = requestAnimationFrame(frame);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}
    >
      <div
        ref={layerRef}
        style={{
          position: "absolute",
          top: -120,
          bottom: -120,
          left: 0,
          right: 0,
          backgroundImage: "url('/bg-marble.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          willChange: "transform",
        }}
      />
      {/* Dark overlay so text stays readable */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(10,10,10,0.75) 0%, rgba(10,10,10,0.55) 40%, rgba(10,10,10,0.55) 60%, rgba(10,10,10,0.75) 100%)",
        }}
      />
    </div>
  );
}
