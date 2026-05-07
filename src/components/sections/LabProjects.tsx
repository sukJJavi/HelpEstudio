"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef, useEffect } from "react";

type Project = {
  id: string;
  name: string;
  tag: string;
  desc: string;
  metric: { label: string; value: string; trend?: string };
  status: "LIVE" | "BETA" | "PRIVATE" | "OPEN-SOURCE";
  color: string;
  span: "large" | "med" | "small";
  href: string | null;
  image: string;
  stack: string[];
};

const LAB_PROJECTS: Project[] = [
  {
    id: "donemeter",
    name: "Donemeter",
    tag: "Productivity / SaaS",
    desc: "Not another todo app. Donemeter scores the quality of your work, not the quantity. Built for makers who donate a slice of revenue to causes they believe in — transparency as a product feature.",
    metric: { label: "ACTIVE USERS", value: "12.4k", trend: "+38% MoM" },
    status: "LIVE",
    color: "phosphor",
    span: "large",
    href: "https://donemeter.com",
    image: "/assets/donemeter/donemeter1.png",
    stack: ["Next.js", "TypeScript", "Supabase", "Stripe"],
  },
  {
    id: "smashzone",
    name: "Smashzone",
    tag: "Sports / Community",
    desc: "Pickleball court booking and real-time matchmaking. Geo-routed reservations with sub-200ms lock. Building the layer that connects courts, players, and clubs.",
    metric: { label: "BOOKINGS", value: "94k", trend: "0.18s P99" },
    status: "LIVE",
    color: "electric",
    span: "med",
    href: "https://smashzone.app",
    image: "/assets/smashzone/smashzone0.png",
    stack: ["Next.js", "TypeScript", "Mapbox", "WebSockets"],
  },
  {
    id: "motorlandio",
    name: "Motorland.io",
    tag: "Automotive / Niche SaaS",
    desc: "Operations platform for motorsport circuits and track-day organizers. From session scheduling to live telemetry dashboards — built for a niche that deserved better tooling.",
    metric: { label: "CIRCUITS", value: "18", trend: "EU + LATAM" },
    status: "LIVE",
    color: "amber",
    span: "med",
    href: "https://motorland.io",
    image: "/assets/motorlandio/motorlandio1.png",
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
  },
  {
    id: "next3hours",
    name: "Next3hours",
    tag: "Real-time / Lifestyle",
    desc: "What can you do right now, near you, in the next three hours? A hyper-local discovery engine that trades infinite scroll for immediate action. Real-time availability, zero friction.",
    metric: { label: "RESPONSE TIME", value: "<80ms", trend: "P99 GLOBAL" },
    status: "LIVE",
    color: "phosphor",
    span: "small",
    href: "https://next3hours.com",
    image: "/assets/next3hours/next3hours2.png",
    stack: ["Next.js", "TypeScript", "OpenAI", "Vercel"],
  },
];

function StatusBadge({ status, color }: { status: Project["status"]; color: string }) {
  const isLive = status === "LIVE";
  return (
    <div
      className="mono"
      style={{
        fontSize: 10,
        letterSpacing: "0.14em",
        padding: "4px 8px",
        border: `1px solid ${isLive ? `var(--${color})` : "var(--zinc-700)"}`,
        color: isLive ? `var(--${color})` : "var(--zinc-400)",
        display: "flex",
        alignItems: "center",
        gap: 6,
        whiteSpace: "nowrap",
      }}
    >
      {isLive && (
        <span
          className="status-dot"
          style={{ background: `var(--${color})`, color: `var(--${color})` }}
        />
      )}
      {status}
    </div>
  );
}

function ImageCard({ project, isBento }: { project: Project; isBento: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const colorVar = `var(--${project.color})`;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  const isLarge = project.span === "large";
  const isMed = project.span === "med";

  const minH = isBento
    ? (isLarge ? 540 : isMed ? 340 : project.id === "next3hours" ? 360 : 280)
    : 360;

  const imgMinH = isBento
    ? (isLarge ? 260 : project.id === "next3hours" ? 200 : 140)
    : 200;

  return (
    <motion.div
      ref={ref}
      data-cursor="hover"
      className="bento"
      style={{
        gridArea: isBento ? project.id : undefined,
        padding: isLarge && isBento ? 36 : 24,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 20,
        minHeight: minH,
      }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
        <div className="mono" style={{ fontSize: 10, letterSpacing: "0.16em", color: "var(--zinc-500)", textTransform: "uppercase" }}>
          <div>FILE/{project.id.toUpperCase()}</div>
          <div style={{ marginTop: 4 }}>{project.tag}</div>
        </div>
        <StatusBadge status={project.status} color={project.color} />
      </div>

      {/* Image */}
      <div
        style={{
          flex: 1,
          position: "relative",
          overflow: "hidden",
          border: "1px solid var(--zinc-800)",
          minHeight: imgMinH,
        }}
        className="img-wrap"
      >
        <Image
          src={project.image}
          alt={`${project.name} — ${project.tag} built by Help Estudio`}
          fill
          sizes={isLarge ? "66vw" : "33vw"}
          style={{ objectFit: "cover", objectPosition: project.id === "next3hours" ? "center 40%" : "top", transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)" }}
          className="project-img"
        />
        <div
          className="stack-overlay"
          style={{
            position: "absolute",
            inset: 0,
            background: "oklch(0.09 0.005 260 / 0.88)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
            opacity: 0,
            transition: "opacity 0.35s ease",
            backdropFilter: "blur(4px)",
          }}
        >
          <div className="mono" style={{ fontSize: 9, letterSpacing: "0.22em", color: "var(--zinc-500)", marginBottom: 4 }}>STACK</div>
          {project.stack.map((tech) => (
            <div
              key={tech}
              className="mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.12em",
                color: colorVar,
                border: `1px solid ${colorVar}`,
                padding: "3px 10px",
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 16, marginBottom: 12 }}>
          <h3
            style={{
              fontFamily: isLarge && isBento ? "var(--serif)" : "var(--sans)",
              fontStyle: isLarge && isBento ? "italic" : "normal",
              fontWeight: 400,
              fontSize: isLarge && isBento ? 56 : isMed ? 28 : 22,
              letterSpacing: isLarge ? "-0.03em" : "-0.02em",
              lineHeight: 1,
            }}
          >
            {project.name}
          </h3>
          {project.href && (
            <a
              data-cursor="hover"
              href={project.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`Visit ${project.name} (opens in new tab)`}
              className="mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--zinc-300)",
                borderBottom: "1px solid var(--zinc-700)",
                paddingBottom: 2,
                display: "flex",
                alignItems: "center",
                gap: 4,
                whiteSpace: "nowrap",
              }}
            >
              Visit <ArrowUpRight size={12} strokeWidth={1.5} />
            </a>
          )}
        </div>
        <p
          style={{
            fontSize: isLarge && isBento ? 14 : 12,
            lineHeight: 1.6,
            color: "var(--zinc-400)",
            fontWeight: 300,
            maxWidth: 480,
            fontFamily: "var(--sans)",
          }}
        >
          {project.desc}
        </p>
        <div
          style={{
            marginTop: 20,
            paddingTop: 16,
            borderTop: "1px solid var(--zinc-800)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.12em",
          }}
        >
          <span style={{ color: "var(--zinc-500)" }}>{project.metric.label}</span>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <span style={{ color: colorVar, fontSize: 14 }}>{project.metric.value}</span>
            {project.metric.trend && <span style={{ color: "var(--zinc-500)" }}>{project.metric.trend}</span>}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TheLab() {
  const gridTemplate = `
    "donemeter donemeter smashzone"
    "donemeter donemeter motorlandio"
    "next3hours next3hours next3hours"
  `;

  return (
    <>
      <style>{`
        .img-wrap:hover .project-img { transform: scale(1.04); }
        .img-wrap:hover .stack-overlay { opacity: 1; }
      `}</style>
      <section id="lab" className="px-6 md:px-8" style={{ paddingTop: "120px", paddingBottom: "80px", position: "relative" }}>
        <div style={{ maxWidth: 1600, margin: "0 auto" }}>
          <motion.div
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between"
            style={{ marginBottom: 56, gap: 32, flexWrap: "wrap" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <div className="kicker">
                <span className="mono">01</span>
                <span className="dash" />
                <span>THE LAB / OWN PRODUCTS</span>
              </div>
              <h2
                style={{
                  fontFamily: "var(--serif)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(36px, 6vw, 96px)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.03em",
                  marginTop: 24,
                  maxWidth: 900,
                }}
              >
                Own products.{" "}
                <span style={{ color: "var(--zinc-500)" }} className="sans">
                  Shipped, not pitched.
                </span>
              </h2>
            </div>
            <div style={{ display: "flex", gap: 8, fontFamily: "var(--mono)", fontSize: 11, color: "var(--zinc-500)", letterSpacing: "0.14em" }}>
              <span>04 PRODUCTS</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span style={{ color: "var(--phosphor)" }}>04 LIVE</span>
            </div>
          </motion.div>

          {/* Mobile / tablet: simple stack or 2-col; desktop: bento */}
          {/* lg+ bento */}
          <div
            className="hidden lg:grid"
            style={{
              gridTemplateColumns: "1.6fr 1fr 1fr",
              gridTemplateAreas: gridTemplate,
              gap: 16,
            }}
          >
            {LAB_PROJECTS.map((p) => (
              <ImageCard key={p.id} project={p} isBento={true} />
            ))}
          </div>

          {/* md: 2-column grid */}
          <div className="hidden md:grid lg:hidden" style={{ gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {LAB_PROJECTS.map((p) => (
              <ImageCard key={p.id} project={p} isBento={false} />
            ))}
          </div>

          {/* sm and below: single column */}
          <div className="flex flex-col md:hidden" style={{ gap: 16 }}>
            {LAB_PROJECTS.map((p) => (
              <ImageCard key={p.id} project={p} isBento={false} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
