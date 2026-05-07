"use client";

import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, Html } from "@react-three/drei";
import * as THREE from "three";

const RADIUS = 5.5;
const H = 1.5; // world-space height per banner, same for all
const ROT_SPEED = 0.0016;

export const CAMPAIGN_COUNT = 15;

const CAMPAIGNS: { file: string; aspect: number }[] = [
  { file: "300x600-generalopticas.jpg",        aspect: 0.5    },
  { file: "peugeot508sw-540x540-inread-ppaa.jpg", aspect: 1   },
  { file: "Ouigo-BusinessSur-1080x1920.jpg",    aspect: 0.5625 },
  { file: "300x600-paradores.jpg",              aspect: 0.5    },
  { file: "summerDrive-1024x1024-smartclip-wall.jpg", aspect: 1 },
  { file: "300x600pfizer.jpg",                  aspect: 0.5    },
  { file: "randstad-chica-300x250.gif",         aspect: 1.2    },
  { file: "1080x1080-Ouigo-Navidad25.jpg",      aspect: 1      },
  { file: "300x600-sanitas-amazon.jpg",         aspect: 0.5    },
  { file: "Citroen-REDDAYS-041025-300x600.gif", aspect: 0.5    },
  { file: "randstad-chico-300x250.gif",         aspect: 1.2    },
  { file: "300x600-finetwork-convergente-0226.png", aspect: 0.5 },
  { file: "300x600-movistaer.jpg",              aspect: 0.5    },
  { file: "paradores-blackfriday2025-300x600.gif", aspect: 0.5 },
  { file: "ES_EST_SANITAS_SEGUROS-SALUD_CAMBIATE24_ACCEDEYAVANZA_20241001_DOBLEROBAPAGINAS_300X600.jpg", aspect: 0.5 },
];

const N = CAMPAIGNS.length;

type GlitchRef = React.MutableRefObject<{
  active: boolean;
  target: number;
  countdown: number;
  nextAt: number;
}>;

function Banner({
  texture,
  aspect,
  angle,
  index,
  glitch,
}: {
  texture: THREE.Texture;
  aspect: number;
  angle: number;
  index: number;
  glitch: GlitchRef;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const w = H * aspect;
  const bx = Math.sin(angle) * RADIUS;
  const bz = Math.cos(angle) * RADIUS;

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const isGlitching = glitch.current.active && glitch.current.target === index;

    ref.current.position.y =
      Math.sin(t * 0.38 + index * 0.95) * 0.06 +
      (isGlitching ? (Math.random() - 0.5) * 0.32 : 0);

    ref.current.position.x = isGlitching
      ? bx + (Math.random() - 0.5) * 0.1
      : bx;
  });

  return (
    <mesh ref={ref} position={[bx, 0, bz]} rotation={[0, angle, 0]}>
      <planeGeometry args={[w, H]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

function Scene() {
  const paths = useMemo(
    () => CAMPAIGNS.map((c) => `/assets/campaigns/${c.file}`),
    []
  );
  const textures = useTexture(paths);
  const groupRef = useRef<THREE.Group>(null);
  const glitch = useRef({ active: false, target: -1, countdown: 0, nextAt: 3.5 });

  useFrame(({ clock }, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += ROT_SPEED;
    const t = clock.getElapsedTime();
    const g = glitch.current;
    if (g.active) {
      g.countdown -= delta;
      if (g.countdown <= 0) { g.active = false; g.target = -1; }
    } else if (t >= g.nextAt) {
      g.active = true;
      g.target = Math.floor(Math.random() * N);
      g.countdown = 0.05 + Math.random() * 0.1;
      g.nextAt = t + 2 + Math.random() * 5;
    }
  });

  const angles = useMemo(
    () => CAMPAIGNS.map((_, i) => (i / N) * Math.PI * 2),
    []
  );

  return (
    <>
      <fog attach="fog" args={["#0a0a0f", 7, 20]} />
      <group ref={groupRef}>
        {CAMPAIGNS.map((c, i) => (
          <Banner
            key={c.file}
            texture={textures[i]}
            aspect={c.aspect}
            angle={angles[i]}
            index={i}
            glitch={glitch}
          />
        ))}
      </group>
    </>
  );
}

function Loader() {
  return (
    <Html center>
      <p
        style={{
          fontFamily: "monospace",
          fontSize: 10,
          letterSpacing: "0.22em",
          color: "#3f3f46",
          whiteSpace: "nowrap",
        }}
      >
        INITIALIZING STREAM
      </p>
    </Html>
  );
}

export default function CampaignCanvas() {
  return (
    <Canvas
      style={{ display: "block", width: "100%", height: "100%" }}
      camera={{ position: [0, 2.2, 9], fov: 52 }}
      gl={{ antialias: true, alpha: false }}
      dpr={[1, 1.5]}
    >
      <color attach="background" args={["#0a0a0f"]} />
      <Suspense fallback={<Loader />}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
