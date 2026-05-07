"use client";
import { useEffect, useRef } from "react";

export default function BootScreen() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const t1 = setTimeout(() => el.classList.add("gone"), 1900);
    const t2 = setTimeout(() => { el.style.display = "none"; }, 2700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <>
      <style>{`
        #boot {
          position: fixed; inset: 0; z-index: 9999;
          background: var(--zinc-950);
          display: flex; flex-direction: column;
          justify-content: flex-end;
          padding: 5vh 5vw;
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        #boot.gone { opacity: 0; transform: scale(1.02); pointer-events: none; }
        #boot pre {
          font-family: var(--mono);
          font-size: 11px;
          line-height: 1.5;
          color: var(--phosphor);
          white-space: pre;
        }
        .boot-bar {
          width: min(420px, 70vw);
          height: 2px;
          background: var(--zinc-800);
          margin-top: 16px;
          position: relative;
          overflow: hidden;
        }
        .boot-bar::after {
          content: "";
          position: absolute; inset: 0;
          background: var(--phosphor);
          transform: translateX(-100%);
          animation: bootFill 1.6s ease-out forwards;
        }
      `}</style>
      <div id="boot" ref={ref}>
        <pre
          dangerouslySetInnerHTML={{
            __html: `[ HELP ESTUDIO / RUNTIME 4.2.0 ]\n> initializing canvas........... <span style="color:#a1a1aa">OK</span>\n> loading typefaces.geist_mono... <span style="color:#a1a1aa">OK</span>\n> compiling shaders.wireframe... <span style="color:#a1a1aa">OK</span>\n> mounting product.nucleus...... <span style="color:#a1a1aa">OK</span>\n> handshake[user]............... <span style="color:#a1a1aa">OK</span>`,
          }}
        />
        <div className="boot-bar" />
      </div>
    </>
  );
}
