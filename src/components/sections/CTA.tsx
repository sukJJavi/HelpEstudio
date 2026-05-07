"use client";
import { useEffect, useRef } from "react";

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
      className={`btn-magnetic${primary ? " primary" : ""}`}
      style={{ transition: "transform 0.25s cubic-bezier(0.2,0.8,0.2,1), border-color 0.25s, color 0.25s, background 0.25s" }}
    >
      <span ref={innerRef} style={{ display: "inline-flex", alignItems: "center", gap: 14 }}>
        <span>{children}</span>
        <span className="arrow">→</span>
      </span>
    </a>
  );
}

export default function CTA() {
  return (
    <section id="contact" className="px-6 md:px-8 relative" style={{ paddingTop: "120px", paddingBottom: "120px" }}>
      <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.4 }} />
      <div
        className="glass grid grid-cols-1 md:grid-cols-[1.4fr_1fr] relative"
        style={{ maxWidth: 1300, margin: "0 auto", padding: "clamp(40px, 6vw, 80px) clamp(24px, 5vw, 64px)", gap: "clamp(40px, 6vw, 64px)", alignItems: "center" }}
      >
        <div>
          <div className="kicker"><span className="mono">[ 05 ]</span><span className="dash" /><span>DIRECT LINE</span></div>
          <h2 style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(44px, 5.5vw, 88px)", lineHeight: 0.95, letterSpacing: "-0.03em", marginTop: 24 }}>
            No account managers. <span className="sans" style={{ color: "var(--phosphor)", fontWeight: 300 }}>Talk to the engineer.</span>
          </h2>
          <p style={{ marginTop: 24, fontSize: 16, color: "var(--zinc-400)", maxWidth: 540, fontWeight: 300, lineHeight: 1.6, fontFamily: "var(--sans)" }}>
            Tell me what&apos;s blocked, broken, or hasn&apos;t been built yet. I reply within 48 hours — no layers, no handoffs. You get the person who writes the code.
          </p>
          <div style={{ marginTop: 36, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <MagneticBtn primary href="mailto:javi@help-estudio.es">javi@help-estudio.es</MagneticBtn>
          </div>
        </div>

        {/* Status block — stacks vertically on mobile */}
        <div
          className="flex flex-col"
          style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--zinc-300)", lineHeight: 1.8 }}
        >
          <div style={{ color: "var(--zinc-500)", letterSpacing: "0.16em", fontSize: 10, marginBottom: 16 }}>CURRENT.STATUS</div>
          {[
            { q: "BLOCKED", s: "I unblock it", live: true },
            { q: "BROKEN", s: "I fix it", live: true },
            { q: "UNBUILT", s: "I build it", live: true },
          ].map((r) => (
            <div key={r.q} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px dashed var(--zinc-700)", padding: "8px 0" }}>
              <span style={{ color: "var(--zinc-500)" }}>{r.q}</span>
              <span style={{ color: "var(--phosphor)" }}>{r.s}</span>
            </div>
          ))}
          <div style={{ marginTop: 28, color: "var(--zinc-500)", letterSpacing: "0.16em", fontSize: 10 }}>RESPONSE.TIME</div>
          <div style={{ fontSize: "clamp(24px, 5vw, 32px)", color: "var(--phosphor)", marginTop: 4 }}>{"< 48h"}</div>
        </div>
      </div>
    </section>
  );
}
