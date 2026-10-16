import { useEffect, useRef } from "react";

export function ParallaxBackground() {
  const bgRef = useRef<HTMLDivElement>(null);
  const currentY = useRef(50);
  const targetY = useRef(50);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    // Continuous animation loop — smoothly chases the target position each frame
    const animate = () => {
      currentY.current = lerp(currentY.current, targetY.current, 0.06);

      if (bgRef.current) {
        bgRef.current.style.backgroundPositionY = `${currentY.current}%`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    const handleScroll = () => {
      targetY.current = 50 + window.scrollY * 0.012;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={bgRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        backgroundImage: "url('/1.jpg')",
        backgroundSize: "cover",
        backgroundPositionX: "center",
        backgroundPositionY: "50%",
        willChange: "background-position",
      }}
    >
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
