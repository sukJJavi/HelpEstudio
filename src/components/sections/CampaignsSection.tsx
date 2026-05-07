"use client";

import React, { useRef, useState, Suspense, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

// ─── Data ────────────────────────────────────────────────────────────────────

const CAMPAIGNS: { file: string; aspect: number; label: string }[] = [
  { file: "300x600-paradores.jpg",              aspect: 0.5,    label: "Paradores" },
  { file: "Ouigo-BusinessSur-1080x1920.jpg",    aspect: 0.5625, label: "Ouigo" },
  { file: "300x600-movistaer.jpg",              aspect: 0.5,    label: "Movistar" },
  { file: "300x600-finetwork-convergente-0226.png", aspect: 0.5, label: "Finetwork" },
  { file: "300x600-generalopticas.jpg",         aspect: 0.5,    label: "General Óptica" },
  { file: "peugeot508sw-540x540-inread-ppaa.jpg", aspect: 1,    label: "Peugeot" },
  { file: "Citroen-REDDAYS-041025-300x600.gif", aspect: 0.5,    label: "Citroën" },
  { file: "300x600-sanitas-amazon.jpg",         aspect: 0.5,    label: "Sanitas" },
  { file: "summerDrive-1024x1024-smartclip-wall.jpg", aspect: 1, label: "Peugeot" },
  { file: "300x600pfizer.jpg",                  aspect: 0.5,    label: "Pfizer" },
  { file: "paradores-blackfriday2025-300x600.gif", aspect: 0.5, label: "Paradores BF" },
  { file: "paradores-cybermonday2025-300x600.gif", aspect: 0.5, label: "Paradores CM" },
  { file: "randstad-chica-300x250.gif",         aspect: 1.2,    label: "Randstad" },
  { file: "randstad-chico-300x250.gif",         aspect: 1.2,    label: "Randstad" },
  { file: "1080x1080-Ouigo-Navidad25.jpg",      aspect: 1,      label: "Ouigo Navidad" },
  { file: "ES_EST_SANITAS_SEGUROS-SALUD_CAMBIATE24_ACCEDEYAVANZA_20241001_DOBLEROBAPAGINAS_300X600.jpg", aspect: 0.5, label: "Sanitas 24" },
  { file: "ES_EST_SANITAS_SEGUROS-SALUD_CAMBIATE25_CHICO_1440x2560.jpg", aspect: 0.5625, label: "Sanitas 25" },
  { file: "300x600-paradoresweej.jpg",          aspect: 0.5,    label: "Paradores Week" },
  { file: "1440x2560-Citroen-EC3-Nov2025-1.jpg", aspect: 0.5625, label: "Citroën EC3" },
  { file: "1440x2560-Citroen-EC3-Nov2025-3.jpg", aspect: 0.5625, label: "Citroën EC3" },
  { file: "Citroen-REDDAYS-041025-1080x1920.jpg", aspect: 0.5625, label: "Citroën Red Days" },
  { file: "300x250_santander.gif",              aspect: 1.2,    label: "Santander" },
  { file: "300x600-backup.gif",                 aspect: 0.5,    label: "Ouigo" },
  { file: "300x600-finetwork-convergente-0226.gif", aspect: 0.5, label: "Finetwork" },
  { file: "320x480-paradores-veraneadores-30kb.jpg", aspect: 0.667, label: "Paradores Verano" },
  { file: "650x650.jpg",                        aspect: 1,      label: "Take2 - W2K20" },
  { file: "back-up_300x600.jpg",                aspect: 0.5,    label: "Movistar La Liga" },
  { file: "bg001.jpg",                          aspect: 1,      label: "Paradores Week" },
  { file: "carrefest2019-630x920.jpg",          aspect: 0.685,  label: "Carrefour" },
  { file: "peugeotProf-4dias-664x850-ogury.jpg", aspect: 0.781, label: "Peugeot Profesional" },
  { file: "take2-borderlands.jpg",              aspect: 1,      label: "Take2 Borderlands" },
];

const N = CAMPAIGNS.length; // 31

// Split campaigns across 3 rows by index modulo
const ROW_CAMPAIGNS = [
  CAMPAIGNS.map((c, i) => ({ ...c, originalIndex: i })).filter((_, i) => i % 3 === 0),
  CAMPAIGNS.map((c, i) => ({ ...c, originalIndex: i })).filter((_, i) => i % 3 === 1),
  CAMPAIGNS.map((c, i) => ({ ...c, originalIndex: i })).filter((_, i) => i % 3 === 2),
];

// Each row: y offset, z depth (perspective), scroll speed, x spacing
const ROW_CONFIG = [
  { y: 0,  z: 0,   speed: 3.4, xSpacing: 10.0 },
  { y: 2,    z: -6,  speed: 2.5, xSpacing: 9 },
  { y: 4, z: -12, speed: 1.8, xSpacing: 8.5 },
] as const;

// ─── Banner mesh ──────────────────────────────────────────────────────────────

interface BannerProps {
  texture: THREE.Texture;
  position: [number, number, number];
  width: number;
  height: number;
  label: string;
  isPausedRef: React.MutableRefObject<boolean>;
  onHover: (active: boolean, label: string, x: number, y: number) => void;
}

function BannerMesh({ texture, position, width, height, label, isPausedRef, onHover }: BannerProps) {
  const meshRef  = useRef<THREE.Mesh>(null);
  const glowRef  = useRef<THREE.Mesh>(null);
  const hovered  = useRef(false);

  useFrame((_, delta) => {
    if (!meshRef.current || !glowRef.current) return;
    const t = Math.min(delta * 9, 1);
    const targetS = hovered.current ? 1.1 : 1.0;
    meshRef.current.scale.x += (targetS - meshRef.current.scale.x) * t;
    meshRef.current.scale.y = meshRef.current.scale.x;
    const mat = glowRef.current.material as THREE.MeshBasicMaterial;
    mat.opacity += ((hovered.current ? 0.6 : 0.07) - mat.opacity) * t;
  });

  return (
    <group position={position}>
      {/* Luminous edge glow — slightly oversized plane behind the banner */}
      <mesh ref={glowRef} position={[0, 0, -0.015]}>
        <planeGeometry args={[width + 0.1, height + 0.1]} />
        <meshBasicMaterial color="#86efac" transparent opacity={0.07} depthWrite={false} />
      </mesh>

      {/* Banner face — meshBasicMaterial renders the texture at full brightness,
          independent of scene lighting so images always look vivid */}
      <mesh
        ref={meshRef}
        onPointerEnter={(e) => {
          e.stopPropagation();
          hovered.current = true;
          isPausedRef.current = true;
          onHover(true, label, e.clientX, e.clientY);
        }}
        onPointerLeave={() => {
          hovered.current = false;
          isPausedRef.current = false;
          onHover(false, "", 0, 0);
        }}
      >
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
    </group>
  );
}

// ─── Single scrolling row ─────────────────────────────────────────────────────

interface RowProps {
  rowCampaigns: (typeof CAMPAIGNS[number] & { originalIndex: number })[];
  config: typeof ROW_CONFIG[number];
  allTextures: THREE.Texture[];
  isPausedRef: React.MutableRefObject<boolean>;
  onHover: (active: boolean, label: string, x: number, y: number) => void;
}

function BannerRow({ rowCampaigns, config, allTextures, isPausedRef, onHover }: RowProps) {
  const groupRef  = useRef<THREE.Group>(null);
  const doubled   = useMemo(() => [...rowCampaigns, ...rowCampaigns], [rowCampaigns]);
  const trackW    = rowCampaigns.length * config.xSpacing;
  const H         = 5.4; // banner height in world units — large and clear

  useFrame((_, delta) => {
    if (isPausedRef.current || !groupRef.current) return;
    groupRef.current.position.x -= config.speed * delta;
    if (groupRef.current.position.x <= -trackW) {
      groupRef.current.position.x += trackW;
    }
  });

  return (
    // Banners are offset by -trackW/2 so the first copy sits centered at x=0.
    // The group animates from x=0 → x=-trackW then resets to 0.
    // At reset, the second copy occupies exactly where the first was → seamless.
    <group ref={groupRef} position={[0, config.y, config.z]}>
      {doubled.map((c, i) => {
        const x = i * config.xSpacing - trackW / 2;
        const w = H * c.aspect;
        return (
          <BannerMesh
            key={i}
            texture={allTextures[c.originalIndex]}
            position={[x, 0, 0]}
            width={w}
            height={H}
            label={c.label}
            isPausedRef={isPausedRef}
            onHover={onHover}
          />
        );
      })}
    </group>
  );
}

// ─── Three.js scene ───────────────────────────────────────────────────────────

interface SceneProps {
  isPausedRef: React.MutableRefObject<boolean>;
  onHover: (active: boolean, label: string, x: number, y: number) => void;
}

function Scene({ isPausedRef, onHover }: SceneProps) {
  const paths    = useMemo(() => CAMPAIGNS.map(c => `/assets/campaigns/${c.file}`), []);
  const textures = useTexture(paths);

  return (
    <>
      {/* Depth fade — banners float into void */}
      <fog attach="fog" args={["#09090b", 26, 62]} />

      {/* Grid — pure lines, no fill. Canvas is alpha:true so page bg shows through */}
      <gridHelper args={[100, 48, "#1c1c22", "#131318"]} position={[0, -1.3, -18]} />

      {/* Banner rows */}
      {ROW_CAMPAIGNS.map((rowCampaigns, rowIndex) => (
        <BannerRow
          key={rowIndex}
          rowCampaigns={rowCampaigns}
          config={ROW_CONFIG[rowIndex]}
          allTextures={textures}
          isPausedRef={isPausedRef}
          onHover={onHover}
        />
      ))}
    </>
  );
}

// ─── Stats panel — engineering data block ────────────────────────────────────

const STAT_ROWS = [
  { label: "CAMPAIGNS",  value: "1200+",       sub: "display · video · rich" },
  { label: "AGENCIES",   value: "TIER 1",     sub: "Dentsu · Wunderman · Havas" },
  { label: "FORMATS",    value: "IAB / RICH",  sub: "VPAID · HTML5 · OBA" },
  { label: "ARCHIVE",    value: "2012—2026",  sub: "14 yrs production" },
] as const;

function StatsPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: 0.25 }}
      style={{ flexShrink: 0 }}
    >
      {/* Outer wireframe shell */}
      <div style={{
        position: "relative",
        width: 300,
        border: "1px solid rgba(255,255,255,0.07)",
        background: "linear-gradient(135deg, rgba(9,9,11,0.95) 0%, rgba(15,15,20,0.85) 100%)",
      }}>
        {/* Top bar — system label */}
        <div style={{
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "10px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <span style={{ fontFamily:"var(--mono)", fontSize:9, letterSpacing:"0.22em", color:"rgba(255,255,255,0.18)", textTransform:"uppercase" }}>
            SYS:AD_STREAM
          </span>
          <span className="status-dot" style={{ color:"#4ade80" }} />
        </div>

        {/* Data rows */}
        <div style={{ padding: "4px 0" }}>
          {STAT_ROWS.map(({ label, value, sub }, i) => (
            <div
              key={label}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                alignItems: "start",
                gap: "6px 16px",
                padding: "12px 16px",
                borderBottom: i < STAT_ROWS.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
              }}
            >
              <div>
                <div style={{ fontFamily:"var(--mono)", fontSize:8, letterSpacing:"0.22em", color:"rgba(255,255,255,0.22)", textTransform:"uppercase", marginBottom:4 }}>
                  {label}
                </div>
                <div style={{ fontFamily:"var(--mono)", fontSize:9, letterSpacing:"0.1em", color:"rgba(255,255,255,0.2)" }}>
                  {sub}
                </div>
              </div>
              <div style={{ fontFamily:"var(--mono)", fontSize:18, letterSpacing:"0.02em", color:"#4ade80", textAlign:"right", lineHeight:1, paddingTop:2 }}>
                {value}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "9px 16px",
          display: "flex",
          justifyContent: "space-between",
        }}>
          <span style={{ fontFamily:"var(--mono)", fontSize:8, letterSpacing:"0.18em", color:"rgba(255,255,255,0.14)", textTransform:"uppercase" }}>
            HELP estudio
          </span>
          <span style={{ fontFamily:"var(--mono)", fontSize:8, letterSpacing:"0.18em", color:"rgba(74,222,128,0.35)", textTransform:"uppercase" }}>
            LIVE ●
          </span>
        </div>

        {/* Corner pin — top-right */}
        <span style={{ position:"absolute", top:-1, right:-1, width:8, height:8, borderTop:"1px solid rgba(74,222,128,0.4)", borderRight:"1px solid rgba(74,222,128,0.4)" }} />
        {/* Corner pin — bottom-left */}
        <span style={{ position:"absolute", bottom:-1, left:-1, width:8, height:8, borderBottom:"1px solid rgba(74,222,128,0.4)", borderLeft:"1px solid rgba(74,222,128,0.4)" }} />
      </div>
    </motion.div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

interface Tooltip {
  active: boolean;
  label: string;
  x: number;
  y: number;
}

export default function CampaignsSection() {
  const [tooltip, setTooltip] = useState<Tooltip>({ active: false, label: "", x: 0, y: 0 });
  const isPausedRef = useRef(false);

  const handleHover = useCallback((active: boolean, label: string, x: number, y: number) => {
    setTooltip({ active, label, x, y });
  }, []);

  return (
    <section id="craft" className="px-6 md:px-8" style={{ paddingTop: "120px", paddingBottom: "80px", position: "relative" }}>

      {/* ── Header ── */}
      <div style={{ maxWidth: 1600, margin: "0 auto" }}>
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between"
          style={{ marginBottom: 64, gap: 40 }}
          initial={{ opacity:0, y:20 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.5 }}
        >
          {/* Left — typography */}
          <div>
            <div className="kicker">
              <span className="mono">02</span>
              <span className="dash" />
              <span>THE CRAFT / AD DELIVERY</span>
            </div>

            <h2 style={{ fontFamily:"var(--serif)", fontStyle:"italic", fontWeight:400, fontSize:"clamp(44px,6vw,96px)", lineHeight:0.95, letterSpacing:"-0.03em", marginTop:24, maxWidth:700 }}>
              High-Stakes{" "}
              <span style={{ color:"var(--zinc-500)" }} className="sans">Ad Delivery.</span>
            </h2>

            <p style={{ fontSize:14, lineHeight:1.7, color:"var(--zinc-400)", fontFamily:"var(--sans)", fontWeight:300, marginTop:24, maxWidth:540 }}>
              Before building products, I mastered the art of the &apos;hit&apos;.
              Developing high-performance, pixel-perfect display campaigns for
              the world&apos;s biggest agencies. Scale, precision, and zero-latency execution.
            </p>
          </div>

          {/* Right — stats panel (hidden on mobile to avoid overflow) */}
          <div className="hidden sm:block">
            <StatsPanel />
          </div>
        </motion.div>
      </div>

      {/* ── 3D canvas ── */}
      <div style={{ maxWidth:1600, margin:"0 auto", position:"relative" }}>
        {/* Edge fades */}
        <div aria-hidden style={{ position:"absolute", top:0, left:0, width:180, height:"100%", background:"linear-gradient(to right,#09090b,transparent)", zIndex:10, pointerEvents:"none" }} />
        <div aria-hidden style={{ position:"absolute", top:0, right:0, width:180, height:"100%", background:"linear-gradient(to left,#09090b,transparent)", zIndex:10, pointerEvents:"none" }} />

        <div
          style={{ height:480, overflow:"hidden", position:"relative" }}
          role="img"
          aria-label="3D scrolling carousel of advertising campaigns delivered for Havas, Dentsu, Wunderman, Paradores, Citroën, Sanitas, Ouigo, Pfizer, Randstad and more"
        >
          <ul aria-hidden="false" className="sr-only">
            {CAMPAIGNS.map((c) => (
              <li key={c.file}>{c.label} — advertising campaign delivered by Help Estudio</li>
            ))}
          </ul>
          <Canvas
            camera={{ position:[0, 3.5, 13], fov:62, near:0.1, far:90 }}
            gl={{ antialias:true, alpha:true, powerPreference:"high-performance" }}
            dpr={[1, 1.5]}
            style={{ display:"block" }}
            aria-hidden="true"
          >
            {/* No background color — canvas is transparent, page bg shows through */}
            <Suspense fallback={null}>
              <Scene isPausedRef={isPausedRef} onHover={handleHover} />
            </Suspense>
          </Canvas>
        </div>
      </div>

      {/* ── Footer meta ── */}
      <div style={{ maxWidth:1600, margin:"0 auto", paddingTop:20 }}>
        <div style={{ borderTop:"1px solid var(--zinc-800)", paddingTop:16, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span className="mono" style={{ fontSize:10, letterSpacing:"0.16em", color:"var(--zinc-700)" }}>
            STREAM / {N} ASSETS ARCHIVED · {ROW_CAMPAIGNS.length} PARALLEL TRACKS · AUTO-SCROLL
          </span>
          <span className="mono" style={{ fontSize:10, letterSpacing:"0.16em", color:"var(--zinc-700)" }}>
            2008 — 2024
          </span>
        </div>
      </div>

      {/* ── Hover tooltip ── */}
      {tooltip.active && (
        <div
          style={{
            position:"fixed",
            left: tooltip.x + 18,
            top:  tooltip.y - 14,
            background:"rgba(9,9,11,0.96)",
            border:"1px solid rgba(74,222,128,0.22)",
            padding:"7px 12px",
            fontFamily:"var(--mono)",
            fontSize:10,
            letterSpacing:"0.18em",
            color:"rgba(74,222,128,0.9)",
            textTransform:"uppercase",
            pointerEvents:"none",
            zIndex:1000,
            whiteSpace:"nowrap",
          }}
        >
          {tooltip.label}
        </div>
      )}
    </section>
  );
}
