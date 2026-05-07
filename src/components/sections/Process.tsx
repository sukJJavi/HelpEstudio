const STEPS = [
  { i: "00", t: "BLUEPRINT", d: "Every product starts as a question. I design its technical soul before writing a single line — UX flow, stack selection, data architecture, and a roadmap to reality. Vision without a plan is just noise.", side: "L" },
  { i: "01", t: "CRAFT",     d: "This is where the magic happens. Next.js, Three.js, Framer Motion, custom engines — whatever the product demands. Not just code that works, but a product that feels premium. The difference is craft.", side: "R" },
  { i: "02", t: "LAUNCH",    d: "Taking it to the wild is a discipline. Performance budgets, Core Web Vitals, distribution strategy, SEO architecture. The product doesn't win when it's deployed — it wins when it's used.", side: "L" },
  { i: "03", t: "EVOLVE",    d: "A product is never finished — it matures. I stay connected, watching metrics, shipping iterations, and making sure what we built keeps compounding in value. This is how Donemeter went from side project to 12k users.", side: "R" },
];

export default function Process() {
  return (
    <section id="process" className="px-6 md:px-8" style={{ paddingTop: "120px", paddingBottom: "80px", position: "relative" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="kicker"><span className="mono">04</span><span className="dash" /><span>PROCESS / OPERATING SYSTEM</span></div>
        <h2 style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(40px, 5vw, 80px)", lineHeight: 0.95, letterSpacing: "-0.03em", marginTop: 24, marginBottom: 64, maxWidth: 900 }}>
          Vision to product. <span className="sans" style={{ fontWeight: 300, color: "var(--zinc-500)" }}>Craft at every layer.</span>
        </h2>

        {/* Desktop zigzag — hidden on mobile */}
        <div className="hidden md:block" style={{ position: "relative" }}>
          <div style={{ position: "absolute", top: 0, bottom: 0, left: "50%", width: 1, background: "var(--zinc-800)" }} />
          {STEPS.map((s) => (
            <div key={s.i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, marginBottom: 48, alignItems: "center", position: "relative" }}>
              <div style={{ position: "absolute", left: "50%", top: 24, width: 12, height: 12, transform: "translate(-50%, 0) rotate(45deg)", background: "var(--zinc-950)", border: "1px solid var(--phosphor)" }} />
              {s.side === "L" ? (
                <>
                  <div style={{ textAlign: "right", paddingRight: 48 }}>
                    <div className="mono" style={{ fontSize: 12, color: "var(--phosphor)", letterSpacing: "0.18em" }}>$ {s.t.toLowerCase()} --start</div>
                    <h3 className="serif" style={{ fontSize: 56, lineHeight: 1, marginTop: 12 }}>{s.t}</h3>
                    <p style={{ fontSize: 14, color: "var(--zinc-400)", marginTop: 12, fontWeight: 300, lineHeight: 1.6, fontFamily: "var(--sans)" }}>{s.d}</p>
                  </div>
                  <div className="mono" style={{ fontSize: 60, color: "var(--zinc-800)", paddingLeft: 48, fontWeight: 300 }}>{s.i}</div>
                </>
              ) : (
                <>
                  <div className="mono" style={{ fontSize: 60, color: "var(--zinc-800)", textAlign: "right", paddingRight: 48, fontWeight: 300 }}>{s.i}</div>
                  <div style={{ paddingLeft: 48 }}>
                    <div className="mono" style={{ fontSize: 12, color: "var(--phosphor)", letterSpacing: "0.18em" }}>$ {s.t.toLowerCase()} --start</div>
                    <h3 className="serif" style={{ fontSize: 56, lineHeight: 1, marginTop: 12 }}>{s.t}</h3>
                    <p style={{ fontSize: 14, color: "var(--zinc-400)", marginTop: 12, fontWeight: 300, lineHeight: 1.6, fontFamily: "var(--sans)" }}>{s.d}</p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Mobile — simple vertical stack */}
        <div className="flex flex-col md:hidden" style={{ gap: 0 }}>
          {STEPS.map((s, i) => (
            <div
              key={s.i}
              style={{
                borderLeft: "1px solid var(--zinc-800)",
                paddingLeft: 24,
                paddingBottom: i < STEPS.length - 1 ? 48 : 0,
                position: "relative",
              }}
            >
              {/* Diamond marker */}
              <div style={{ position: "absolute", left: -6, top: 4, width: 12, height: 12, transform: "rotate(45deg)", background: "var(--zinc-950)", border: "1px solid var(--phosphor)" }} />
              <div className="mono" style={{ fontSize: 11, color: "var(--phosphor)", letterSpacing: "0.18em" }}>$ {s.t.toLowerCase()} --start</div>
              <div className="mono" style={{ fontSize: 40, color: "var(--zinc-800)", fontWeight: 300, lineHeight: 1, marginTop: 4 }}>{s.i}</div>
              <h3 className="serif" style={{ fontSize: "clamp(36px, 8vw, 56px)", lineHeight: 1, marginTop: 8 }}>{s.t}</h3>
              <p style={{ fontSize: 14, color: "var(--zinc-400)", marginTop: 12, fontWeight: 300, lineHeight: 1.6, fontFamily: "var(--sans)" }}>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
