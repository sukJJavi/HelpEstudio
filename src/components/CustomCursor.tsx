"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    let rx = window.innerWidth / 2, ry = window.innerHeight / 2;
    let dx = rx, dy = ry;

    const onMove = (e: MouseEvent) => {
      dx = e.clientX; dy = e.clientY;
      dot.style.left = dx + "px";
      dot.style.top = dy + "px";
    };

    let raf: number;
    const loop = () => {
      rx += (dx - rx) * 0.18;
      ry += (dy - ry) * 0.18;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      raf = requestAnimationFrame(loop);
    };
    loop();

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element;
      if (t.closest("[data-cursor='hover']")) {
        ring.classList.add("hover");
        ring.classList.remove("text");
      } else if (t.closest("[data-cursor='text']")) {
        ring.classList.add("text");
        ring.classList.remove("hover");
      } else {
        ring.classList.remove("hover", "text");
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="cursor-ring" ref={ringRef} />
      <div className="cursor-dot" ref={dotRef} />
    </>
  );
}
