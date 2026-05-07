"use client";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils/cn";

function MagneticBtn({ children, primary, href = "#" }: { children: React.ReactNode; primary?: boolean; href?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const inner = innerRef.current;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
      const max = 8;
      el.style.transform = `translate(${dx * max}px, ${dy * max}px)`;
      if (inner) inner.style.transform = `translate(${dx * max * 0.4}px, ${dy * max * 0.4}px)`;
    };
    const onLeave = () => {
      el.style.transform = "";
      if (inner) inner.style.transform = "";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <a
      ref={ref}
      href={href}
      data-cursor="hover"
      className={cn("btn-magnetic", primary && "primary")}
      style={{ transition: "transform 0.25s cubic-bezier(0.2,0.8,0.2,1), border-color 0.25s, color 0.25s, background 0.25s" }}
    >
      <span ref={innerRef} style={{ display: "inline-flex", alignItems: "center", gap: 14 }}>
        <span>{children}</span>
        <span className="arrow">→</span>
      </span>
    </a>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen px-6 md:px-8 overflow-hidden" style={{ paddingTop: "140px", paddingBottom: "80px" }}>
      <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.5, pointerEvents: "none" }} />

      {/* Corner metadata — hidden on mobile to avoid clutter */}
      <div className="hidden md:block" style={{ position: "absolute", top: 96, left: 32, fontFamily: "var(--mono)", fontSize: 10, color: "var(--zinc-500)", lineHeight: 1.7, letterSpacing: "0.12em" }}>
        <div>SES/0001 · MADRID 40.4168°N</div>
        <div>RUNTIME · v4.2.0 — STABLE</div>
        <div>STATUS · <span style={{ color: "var(--phosphor)" }}>● ACCEPTING BRIEFS</span></div>
      </div>

      <div className="hidden md:block" style={{ position: "absolute", top: 96, right: 32, fontFamily: "var(--mono)", fontSize: 10, color: "var(--zinc-500)", lineHeight: 1.7, letterSpacing: "0.12em", textAlign: "right" }}>
        <div>FILE/IDX_001</div>
        <div>HOMEPAGE.MAIN</div>
        <div>HE/2026.05</div>
      </div>

      <div style={{ maxWidth: 1600, margin: "0 auto", marginTop: "4vh", position: "relative" }}>
        <div className="kicker scan-in" style={{ marginBottom: 36 }}>
          <span className="mono">[ MANIFESTO 000 ]</span>
          <span className="dash" />
          <span>EST. 2012 — ESPAÑA</span>
        </div>

        {/* Headline — font size driven by CSS .headline class */}
        <h1
          className="headline"
          style={{ maxWidth: "90%" }}
        >
          <span className="strike sans" style={{ color: "var(--zinc-700)", fontStyle: "normal", fontWeight: 300 }}>Production Studio.</span><br />
          <span className="serif">Architecting</span>{" "}
          <span className="em">digital products</span><br />
          <span className="serif">for humans</span>{" "}
          <span style={{ color: "var(--zinc-500)" }} className="sans">&amp;</span>{" "}
          <span className="serif">high-tier agencies.</span>
        </h1>

        {/* Body + CTA — stacks vertically on mobile, side-by-side on md+ */}
        <div className="flex flex-col md:grid md:grid-cols-[1fr_auto] md:items-end" style={{ marginTop: 48, gap: 32 }}>
          <p
            className="w-full"
            style={{
              maxWidth: 480,
              fontSize: 15,
              lineHeight: 1.6,
              color: "var(--zinc-400)",
              fontWeight: 300,
              fontFamily: "var(--sans)",
            }}
          >
            We are <span style={{ color: "var(--zinc-100)" }}>Help Estudio</span> — a small team of product architects, engineers and visual designers operating at the intersection of{" "}
            <span style={{ color: "var(--phosphor)" }}>technical sophistication</span> and creative chaos. We ship lab-grade digital products and embed with top-tier agencies as a force multiplier.
          </p>
          <div className="flex flex-wrap gap-3">
            <MagneticBtn primary href="#contact">Open a brief</MagneticBtn>
            <MagneticBtn href="#lab">See the lab</MagneticBtn>
          </div>
        </div>

        {/* Float labels — hidden on small screens */}
        <div className="float-label hidden md:block" style={{ top: "30%", right: "36%", color: "var(--phosphor)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 16, height: 1, background: "var(--phosphor)", display: "inline-block" }} />
            CORE.001
          </div>
          <div style={{ marginLeft: 22, color: "var(--zinc-500)" }}>0.842 / RDX</div>
        </div>
        <div className="float-label hidden md:block" style={{ bottom: "12%", right: "8%", color: "var(--zinc-400)" }}>
          <div>VERTICES <span style={{ color: "var(--electric)" }}>2,562</span></div>
          <div>FPS <span style={{ color: "var(--phosphor)" }}>60.0</span></div>
          <div>ENTROPY <span style={{ color: "var(--phosphor)" }}>0.71</span></div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: 32, left: 32,
        fontFamily: "var(--mono)", fontSize: 10, color: "var(--zinc-500)",
        letterSpacing: "0.18em", textTransform: "uppercase",
        display: "flex", alignItems: "center", gap: 12,
      }}>
        <div style={{ width: 1, height: 40, background: "var(--zinc-700)", position: "relative", overflow: "hidden" }}>
          <div style={{
            position: "absolute", top: 0, left: 0, width: "100%", height: "40%",
            background: "var(--phosphor)",
            animation: "scrollPulse 2s ease-in-out infinite",
          }} />
        </div>
        <span>Scroll · or press [↓]</span>
      </div>
    </section>
  );
}
