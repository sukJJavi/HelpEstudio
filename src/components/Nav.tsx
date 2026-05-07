"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

function StatusDot({ color = "var(--phosphor)" }: { color?: string }) {
  return <span className="status-dot" style={{ background: color, color }} />;
}

const NAV_LINKS = [
  { label: "Lab",      href: "lab"      },
  { label: "Craft",    href: "craft"    },
  { label: "Pedigree", href: "pedigree" },
  { label: "Process",  href: "process"  },
  { label: "Contact",  href: "contact"  },
];

export default function Nav() {
  const [time, setTime] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const h = String(d.getUTCHours()).padStart(2, "0");
      const m = String(d.getUTCMinutes()).padStart(2, "0");
      const s = String(d.getUTCSeconds()).padStart(2, "0");
      setTime(`${h}:${m}:${s} UTC`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-8 py-5"
        style={{ mixBlendMode: "difference" }}
      >
        <a href="#" data-cursor="hover" className="flex items-center gap-2.5">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <polygon points="6,0 22,16 16,22 0,6" fill="white" />
            <polygon points="16,0 22,6 6,22 0,16" fill="white" />
          </svg>
          <span className="mono" style={{ fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "white" }}>
            help/estudio
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center" style={{ gap: 28 }}>
          {NAV_LINKS.map(({ label, href }, i) => (
            <a
              key={href}
              href={`#${href}`}
              data-cursor="hover"
              className="mono"
              style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "white" }}
            >
              <span style={{ color: "#a8e635" }}>0{i + 1}</span>&nbsp;&nbsp;{label}
            </a>
          ))}
        </div>

        {/* Desktop status */}
        <div className="hidden md:flex mono items-center" style={{ fontSize: 11, letterSpacing: "0.12em", color: "white", gap: 10 }}>
          <StatusDot />
          <span>OPEN · Q3&apos;26</span>
          <span style={{ opacity: 0.5 }}>|</span>
          <span style={{ opacity: 0.7 }}>{time}</span>
        </div>

        {/* Mobile hamburger */}
        <button
          className={cn("md:hidden mono flex items-center gap-2")}
          style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "white", background: "none", border: "none", cursor: "pointer", padding: "4px 0" }}
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <span>Menu</span>
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
            <line x1="0" y1="1" x2="18" y2="1" stroke="white" strokeWidth="1.5" />
            <line x1="0" y1="7" x2="18" y2="7" stroke="white" strokeWidth="1.5" />
            <line x1="0" y1="13" x2="18" y2="13" stroke="white" strokeWidth="1.5" />
          </svg>
        </button>
      </nav>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-100 flex flex-col"
            style={{ background: "#09090b" }}
          >
            {/* Overlay header */}
            <div className="flex justify-between items-center px-6 py-5">
              <span className="mono" style={{ fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "white" }}>
                help/estudio
              </span>
              <button
                onClick={() => setOpen(false)}
                className="mono"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "white",
                  background: "none",
                  border: "1px solid var(--zinc-700)",
                  padding: "6px 14px",
                  cursor: "pointer",
                }}
                aria-label="Close menu"
              >
                Close ✕
              </button>
            </div>

            {/* Links */}
            <nav className="flex flex-col justify-center flex-1 px-6 md:px-8">
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.a
                  key={href}
                  href={`#${href}`}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4"
                  style={{
                    fontFamily: "var(--serif)",
                    fontStyle: "italic",
                    fontSize: "clamp(36px, 10vw, 72px)",
                    letterSpacing: "-0.03em",
                    color: "white",
                    textDecoration: "none",
                    borderBottom: "1px solid var(--zinc-900)",
                    paddingBlock: "clamp(10px, 2vw, 18px)",
                  }}
                >
                  <span className="mono" style={{ fontSize: 10, color: "#a8e635", letterSpacing: "0.14em", flexShrink: 0 }}>
                    0{i + 1}
                  </span>
                  {label}
                </motion.a>
              ))}
            </nav>

            {/* Footer status */}
            <div className="px-6 pb-8 mono flex items-center gap-2.5" style={{ fontSize: 10, color: "var(--zinc-500)", letterSpacing: "0.14em" }}>
              <StatusDot />
              <span>OPEN · Q3&apos;26</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span style={{ opacity: 0.7 }}>{time}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
