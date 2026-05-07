"use client";

const INTERNO_AGENCIES = [
  { name: "Netthink / Isobar" },
  { name: "Orbital BBDO" },
  { name: "Publicis" },
  { name: "Wunderman" },
  { name: "Carrots" },
  { name: "VCCP" },
];

const AGENCIES = [
  { name: "Havas", project: "Citroën · Sanitas" },
  { name: "Dentsu", project: "Movistar · Mango" },
  { name: "Wunderman", project: "Coca-Cola · Pfizer" },
  { name: "Wink", project: "Paradores · Take 2" },
  { name: "Bambú", project: "Mahou · Santander" },
  { name: "Ymedia", project: "Ouigo · Randstad" },
];

const CLIENTS = [
  "Citroën", "Sanitas", "Ouigo", "Mango", "Michelin", "Movistar",
  "Paradores", "Coca-Cola", "Peugeot", "General Ópticas", "Take 2",
  "Mahou", "Santander", "Pfizer", "Randstad", "BMW",
];

export default function Pedigree() {
  return (
    <section id="pedigree" style={{ paddingTop: "120px", paddingBottom: "80px", position: "relative", borderTop: "1px solid var(--zinc-900)", borderBottom: "1px solid var(--zinc-900)" }}>
      <div className="px-6 md:px-8" style={{ maxWidth: 1600, margin: "0 auto", marginBottom: 64 }}>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between" style={{ gap: 32 }}>
          <div>
            <div className="kicker"><span className="mono">03</span><span className="dash" /><span>THE PEDIGREE / EMBEDDED WORK</span></div>
            <h2 style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(44px, 5vw, 80px)", lineHeight: 0.95, letterSpacing: "-0.03em", marginTop: 24, maxWidth: 900 }}>
              The senior engineer{" "}
              <span className="sans" style={{ color: "var(--zinc-500)", fontWeight: 300 }}>Best Agencies calls when it has to ship.</span>
            </h2>
          </div>
          <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--zinc-500)", letterSpacing: "0.14em" }} className="md:text-right">
            <div>{INTERNO_AGENCIES.length + AGENCIES.length} AGENCIES</div>
            <div>{CLIENTS.length}+ CLIENTS</div>
            <div style={{ color: "var(--phosphor)" }}>2012 → ACTIVE</div>
          </div>
        </div>
      </div>

      {/* Two-phase timeline — 1-col on mobile, 2-col on md+ */}
      <div className="px-6 md:px-8 grid grid-cols-1 md:grid-cols-2" style={{ maxWidth: 1600, margin: "0 auto 56px", gap: 24 }}>
        <div style={{ border: "1px solid var(--zinc-800)", padding: "24px 28px" }}>
          <div className="mono" style={{ fontSize: 10, letterSpacing: "0.18em", color: "var(--zinc-500)" }}>PHASE_01 · 2000 — 2012</div>
          <div style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "clamp(24px, 4vw, 36px)", letterSpacing: "-0.02em", marginTop: 8, marginBottom: 20 }}>
            Intern. <span className="sans" style={{ color: "var(--zinc-500)", fontSize: "clamp(16px, 3vw, 24px)", fontWeight: 300 }}>In-house creative at holding agencies.</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {INTERNO_AGENCIES.map((a) => (
              <span key={a.name} className="pill" style={{ borderColor: "var(--zinc-700)", color: "var(--zinc-300)" }}>
                <span className="tick-mark" style={{ width: 6, height: 6, color: "var(--zinc-500)" }} />
                {a.name}
              </span>
            ))}
          </div>
        </div>

        <div style={{ border: "1px solid var(--phosphor)", padding: "24px 28px", background: "oklch(0.86 0.20 145 / 0.03)" }}>
          <div className="mono" style={{ fontSize: 10, letterSpacing: "0.18em", color: "var(--phosphor)" }}>
            PHASE_02 · 2012 — PRESENT &nbsp;<span className="status-dot" style={{ background: "var(--phosphor)", color: "var(--phosphor)" }} />
          </div>
          <div style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "clamp(24px, 4vw, 36px)", letterSpacing: "-0.02em", marginTop: 8, marginBottom: 20 }}>
            Help Estudio. <span className="sans" style={{ color: "var(--zinc-500)", fontSize: "clamp(16px, 3vw, 24px)", fontWeight: 300 }}>Founded. Embedded force multiplier.</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {AGENCIES.map((a) => (
              <span key={a.name} className="pill" style={{ borderColor: "var(--phosphor)", color: "var(--zinc-100)" }}>
                <span className="tick-mark" style={{ width: 6, height: 6, color: "var(--phosphor)" }} />
                {a.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="mono px-6 md:px-8" style={{ maxWidth: 1600, margin: "0 auto 16px", fontSize: 10, letterSpacing: "0.18em", color: "var(--zinc-500)" }}>
        <span style={{ color: "var(--phosphor)" }}>● CLIENTES_FINALES</span>&nbsp;·&nbsp;HE/2012-2026
      </div>
      <div style={{ overflow: "hidden", maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
        <div className="marquee-track">
          {[...CLIENTS, ...CLIENTS].map((c, i) => (
            <div key={i} style={{ padding: "32px 48px", display: "flex", alignItems: "center", gap: 24, borderRight: "1px solid var(--zinc-900)", minWidth: 320 }}>
              <span className="tick-mark" style={{ color: "var(--phosphor)" }} />
              <div style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 400, fontSize: 44, lineHeight: 1, letterSpacing: "-0.02em", color: "var(--zinc-100)" }}>{c}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats — 2-col on mobile, 4-col on md+ */}
      <div className="px-6 md:px-8 grid grid-cols-2 md:grid-cols-4" style={{ maxWidth: 1600, margin: "64px auto 0", gap: 24 }}>
        {[
          { k: "ZERO TO ONE", v: "Expert", c: "var(--phosphor)" },
          { k: "CONCEPT TO LAUNCH", v: "100%", c: "var(--electric)" },
          { k: "DIRECT EXECUTION", v: "No layers", c: "" },
          { k: "HOLDING NETWORKS", v: "Top 3", c: "" },
        ].map((s, i) => (
          <div key={i} style={{ borderTop: "1px solid var(--zinc-800)", paddingTop: 16 }}>
            <div className="mono" style={{ fontSize: 10, letterSpacing: "0.18em", color: "var(--zinc-500)" }}>
              {String(i + 1).padStart(2, "0")} · {s.k}
            </div>
            <div style={{ marginTop: 6, fontSize: 22, color: s.c || "var(--zinc-100)", fontFamily: "var(--mono)" }}>{s.v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
