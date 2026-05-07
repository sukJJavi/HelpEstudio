export default function Footer() {
  const cols: { h: string; l: { label: string; href: string }[] }[] = [
    { h: "STUDIO",   l: [{ label: "Lab", href: "#lab" }, { label: "Craft", href: "#craft" }, { label: "Pedigree", href: "#pedigree" }, { label: "Process", href: "#process" }, { label: "Contact", href: "#contact" }] },
    { h: "PRODUCTS", l: [{ label: "Donemeter", href: "https://donemeter.com" }, { label: "Smashzone", href: "https://smashzone.app" }, { label: "Motorland.io", href: "https://motorland.io" }] },
    { h: "CONTACT",  l: [{ label: "javi@help-estudio.es", href: "mailto:javi@help-estudio.es" }, { label: "@jjavierblanco", href: "https://x.com/jjavierblanco" }, { label: "LinkedIn / jjavierblanco", href: "https://www.linkedin.com/in/jjavierblanco" }] },
  ];

  return (
    <footer className="px-6 md:px-8" style={{ paddingTop: 48, paddingBottom: 32, borderTop: "1px solid var(--zinc-900)" }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr]" style={{ maxWidth: 1600, margin: "0 auto", gap: 32, alignItems: "start" }}>
        <div>
          <div style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 32, letterSpacing: "-0.02em" }}>
            help-estudio.es
          </div>
          <div className="mono" style={{ fontSize: 10, color: "var(--zinc-500)", letterSpacing: "0.18em", marginTop: 8 }}>
            ARCHITECTS OF DIGITAL PRODUCT · MAD/VALL
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.h}>
            <div className="mono" style={{ fontSize: 10, color: "var(--zinc-500)", letterSpacing: "0.18em", marginBottom: 16 }}>{c.h}</div>
            {c.l.map((it) => {
              const internal = it.href.startsWith("#");
              return (
                <div key={it.label} style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--zinc-300)", padding: "6px 0" }}>
                  <a
                    data-cursor="hover"
                    href={it.href}
                    style={{ display: "inline-block" }}
                    {...(!internal && { target: "_blank", rel: "noreferrer" })}
                  >
                    {it.label}
                  </a>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div
        className="flex flex-col sm:flex-row sm:justify-between gap-2"
        style={{ maxWidth: 1600, margin: "48px auto 0", paddingTop: 24, borderTop: "1px dashed var(--zinc-900)", fontFamily: "var(--mono)", fontSize: 10, color: "var(--zinc-500)", letterSpacing: "0.14em" }}
      >
        <span>© 2026 HELP ESTUDIO S.L.U.</span>
        <span>BUILT IN MADRID · COMPILED 2026.05.06</span>
      </div>
    </footer>
  );
}
