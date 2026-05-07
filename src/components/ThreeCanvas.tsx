"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x09090b, 0.045);

    const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    const PHOSPHOR = new THREE.Color("#a8e635");
    const ELECTRIC = new THREE.Color("#3b82f6");

    function makeFaceTexture({ w, h, drawFn, bg = "#0c0c0f" }: {
      w: number; h: number; bg?: string;
      drawFn: (ctx: CanvasRenderingContext2D, w: number, h: number) => void;
    }) {
      const c = document.createElement("canvas");
      const SCALE = 2;
      c.width = w * SCALE;
      c.height = h * SCALE;
      const ctx = c.getContext("2d")!;
      ctx.scale(SCALE, SCALE);
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);
      drawFn(ctx, w, h);
      const tex = new THREE.CanvasTexture(c);
      tex.anisotropy = 8;
      tex.needsUpdate = true;
      return tex;
    }

    function drawLockup(ctx: CanvasRenderingContext2D, x: number, baselineY: number, helpSize: number, color: string) {
      const subSize = Math.max(8, Math.round(helpSize * 0.28));
      ctx.textAlign = "left";
      ctx.fillStyle = color;
      ctx.font = `bold ${helpSize}px "Helvetica Neue", Arial, sans-serif`;
      ctx.fillText("HELP", x, baselineY);
      ctx.font = `${subSize}px "Helvetica Neue", Arial, sans-serif`;
      ctx.fillText("estudio", x, baselineY + subSize + 4);
    }

    function drawFront(ctx: CanvasRenderingContext2D, w: number, h: number) {
      ctx.strokeStyle = "#27272a";
      ctx.lineWidth = 1;
      ctx.strokeRect(8, 8, w - 16, h - 16);

      const leftX = 32, xCx = leftX + 32, xCy = 88, xR = 36;
      ctx.save();
      ctx.translate(xCx, xCy);
      ctx.rotate(Math.PI / 4);
      ctx.strokeStyle = "#a8e635";
      ctx.lineWidth = 1.4;
      const armW = 14, armL = xR;
      ctx.strokeRect(-armW / 2, -armL, armW, armL * 2);
      ctx.strokeRect(-armL, -armW / 2, armL * 2, armW);
      ctx.restore();

      drawLockup(ctx, leftX, xCy + 58, 16, "#a8e635");

      const rightX = 132;
      drawLockup(ctx, rightX, 78, 56, "#f4f4f5");

      const barY = 130;
      ctx.fillStyle = "#a8e635";
      ctx.fillRect(rightX, barY, w - rightX - 20, 3);

      ctx.fillStyle = "#f4f4f5";
      ctx.font = 'bold 14px "Helvetica Neue", Arial, sans-serif';
      ctx.textAlign = "left";
      let by = barY + 22;
      ["Diseño", "Creatividad", "Producción web"].forEach((line) => {
        ctx.fillText(line, rightX, by);
        by += 18;
      });

      ctx.fillStyle = "#a8e635";
      ctx.fillRect(8, h - 28, w - 16, 14);
      ctx.fillStyle = "#09090b";
      ctx.font = 'bold 8px "Geist Mono", monospace';
      ctx.textAlign = "left";
      ctx.fillText("800mg", 14, h - 18);
      ctx.textAlign = "right";
      ctx.fillText("Vía Online", w - 14, h - 18);
    }

    function drawSide(ctx: CanvasRenderingContext2D, w: number, h: number) {
      ctx.strokeStyle = "#27272a";
      ctx.lineWidth = 1;
      ctx.strokeRect(6, 6, w - 12, h - 12);
      ctx.fillStyle = "#a8e635";
      ctx.fillRect(6, 50, w - 12, 3);
      ctx.save();
      ctx.translate(w / 2, h - 24);
      ctx.rotate(-Math.PI / 2);
      drawLockup(ctx, 0, 0, 22, "#f4f4f5");
      ctx.restore();
    }

    function drawTop(ctx: CanvasRenderingContext2D, w: number, h: number) {
      ctx.strokeStyle = "#27272a";
      ctx.lineWidth = 1;
      ctx.strokeRect(6, 6, w - 12, h - 12);
      ctx.fillStyle = "#a8e635";
      ctx.fillRect(6, 6, w - 12, 4);
      drawLockup(ctx, 18, 38, 22, "#f4f4f5");
      ctx.fillStyle = "#71717a";
      ctx.font = '9px "Geist Mono", monospace';
      ctx.textAlign = "right";
      ctx.fillText("800mg · 24 tabs", w - 16, 56);
    }

    function drawBack(ctx: CanvasRenderingContext2D, w: number, h: number) {
      ctx.strokeStyle = "#27272a";
      ctx.lineWidth = 1;
      ctx.strokeRect(8, 8, w - 16, h - 16);

      ctx.strokeStyle = "#3f3f46";
      ctx.lineWidth = 0.6;
      [[14, 14], [w - 14, 14], [14, h - 14], [w - 14, h - 14]].forEach(([x, y]) => {
        ctx.beginPath();
        ctx.moveTo(x - 5, y); ctx.lineTo(x + 5, y);
        ctx.moveTo(x, y - 5); ctx.lineTo(x, y + 5);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.stroke();
      });

      ctx.fillStyle = "#1f1f23";
      for (let gx = 24; gx < w - 16; gx += 8)
        for (let gy = 24; gy < h - 16; gy += 8)
          ctx.fillRect(gx, gy, 1, 1);

      ctx.fillStyle = "#a8e635";
      ctx.fillRect(16, 18, 4, 10);
      ctx.fillStyle = "#a1a1aa";
      ctx.font = 'bold 8px "Geist Mono", monospace';
      ctx.textAlign = "left";
      ctx.fillText("INSTRUCCIONES // SES_0001", 26, 26);
      ctx.fillStyle = "#71717a";
      ctx.font = '7px "Geist Mono", monospace';
      ctx.textAlign = "right";
      ctx.fillText("REV.4.2.0  ·  MAD/BCN", w - 16, 26);

      ctx.strokeStyle = "#27272a";
      ctx.beginPath(); ctx.moveTo(16, 34); ctx.lineTo(w - 16, 34); ctx.stroke();

      ctx.fillStyle = "#71717a";
      ctx.font = '7px "Geist Mono", monospace';
      ctx.textAlign = "left";
      const lines: [string, string][] = [
        ["01", "Brief con el cliente."],
        ["02", "Mapear sistema en 60 min."],
        ["03", "Spike de 2 semanas."],
        ["04", "Embed con tu equipo."],
        ["05", "Handoff + 90d soporte."],
      ];
      let ly = 48;
      lines.forEach(([n, l]) => {
        ctx.fillStyle = "#a8e635"; ctx.fillText(n, 18, ly);
        ctx.fillStyle = "#a1a1aa"; ctx.fillText(l, 36, ly);
        ly += 11;
      });

      const cy = 110;
      ctx.fillStyle = "#3f3f46"; ctx.fillRect(16, cy, 80, 1);
      ctx.fillStyle = "#71717a"; ctx.font = '6.5px "Geist Mono", monospace';
      ctx.fillText("COMPOSICIÓN", 16, cy + 9);
      ctx.fillStyle = "#a1a1aa"; ctx.font = '7px "Geist Mono", monospace';
      ["arquitectura  · 40%", "ingeniería    · 35%", "diseño        · 25%"].forEach((row, i) =>
        ctx.fillText(row, 16, cy + 20 + i * 10)
      );

      const vx = 110, vy = cy + 6;
      for (let i = 0; i < 12; i++) {
        const bh = 4 + Math.abs(Math.sin(i * 1.3)) * 22;
        ctx.fillStyle = i % 4 === 0 ? "#a8e635" : "#3f3f46";
        ctx.fillRect(vx + i * 5, vy + 28 - bh, 3, bh);
      }
      ctx.fillStyle = "#71717a"; ctx.font = '6px "Geist Mono", monospace';
      ctx.fillText("FOCUS_GRAPH 04W", vx, vy + 40);

      const bx = 200, by = 110, bw = 120, bh2 = 44;
      ctx.fillStyle = "#0c0c0f"; ctx.fillRect(bx - 4, by - 4, bw + 8, bh2 + 8);
      ctx.fillStyle = "#f4f4f5";
      let bxr = bx;
      while (bxr < bx + bw) {
        const w2 = 1 + Math.floor(Math.random() * 3);
        ctx.fillRect(bxr, by, w2, bh2);
        bxr += w2 + 1 + Math.floor(Math.random() * 2);
      }
      ctx.fillStyle = "#a1a1aa"; ctx.font = '6px "Geist Mono", monospace';
      ctx.textAlign = "center";
      ctx.fillText("8 4 1 2 0 0 5 0 0 1 8 9", bx + bw / 2, by + bh2 + 9);

      ctx.fillStyle = "#a8e635"; ctx.fillRect(8, h - 22, w - 16, 10);
      ctx.fillStyle = "#09090b"; ctx.font = 'bold 6.5px "Geist Mono", monospace';
      ctx.textAlign = "left"; ctx.fillText("LOT 2026.05.06", 14, h - 14);
      ctx.textAlign = "center"; ctx.fillText("● ESTÉRIL · NDA-FIRST", w / 2, h - 14);
      ctx.textAlign = "right"; ctx.fillText("EXP ∞", w - 14, h - 14);
    }

    const BW = 3.4, BH = 2.2, BD = 1.0;

    const frontTex  = makeFaceTexture({ w: 340, h: 220, drawFn: drawFront });
    const backTex   = makeFaceTexture({ w: 340, h: 220, drawFn: drawBack });
    const sideLTex  = makeFaceTexture({ w: 100, h: 220, drawFn: drawSide });
    const sideRTex  = makeFaceTexture({ w: 100, h: 220, drawFn: drawSide });
    const topTex    = makeFaceTexture({ w: 340, h: 100, drawFn: drawTop });
    const bottomTex = makeFaceTexture({ w: 340, h: 100, drawFn: drawTop });

    const boxGeo = new THREE.BoxGeometry(BW, BH, BD);
    const matOpts = { transparent: true, opacity: 0.96 };
    const materials = [
      new THREE.MeshBasicMaterial({ map: sideRTex, ...matOpts }),
      new THREE.MeshBasicMaterial({ map: sideLTex, ...matOpts }),
      new THREE.MeshBasicMaterial({ map: topTex,   ...matOpts }),
      new THREE.MeshBasicMaterial({ map: bottomTex,...matOpts }),
      new THREE.MeshBasicMaterial({ map: frontTex, ...matOpts }),
      new THREE.MeshBasicMaterial({ map: backTex,  ...matOpts }),
    ];
    const boxMesh = new THREE.Mesh(boxGeo, materials);

    const edges = new THREE.EdgesGeometry(boxGeo);
    const edgeMat = new THREE.LineBasicMaterial({ color: 0xa8e635, transparent: true, opacity: 0.85 });
    const wire = new THREE.LineSegments(edges, edgeMat);

    const boxGroup = new THREE.Group();
    boxGroup.add(boxMesh);
    boxGroup.add(wire);

    const ghostGeo = new THREE.BoxGeometry(BW * 1.06, BH * 1.06, BD * 1.06);
    const ghostEdges = new THREE.EdgesGeometry(ghostGeo);
    const ghost = new THREE.LineSegments(
      ghostEdges,
      new THREE.LineBasicMaterial({ color: 0x3f3f46, transparent: true, opacity: 0.5 })
    );
    boxGroup.add(ghost);

    const bracingMat = new THREE.LineBasicMaterial({ color: 0x27272a, transparent: true, opacity: 0.5 });
    const bracingPts: number[] = [];
    bracingPts.push(-BW/2, -BH/2, BD/2,  BW/2, BH/2, BD/2);
    bracingPts.push( BW/2, -BH/2, BD/2, -BW/2, BH/2, BD/2);
    bracingPts.push(-BW/2, -BH/2, -BD/2,  BW/2, BH/2, -BD/2);
    bracingPts.push( BW/2, -BH/2, -BD/2, -BW/2, BH/2, -BD/2);
    bracingPts.push(-BW/2, BH/2, -BD/2,  BW/2, BH/2, BD/2);
    bracingPts.push( BW/2, BH/2, -BD/2, -BW/2, BH/2, BD/2);
    const bracingGeo = new THREE.BufferGeometry().setAttribute(
      "position", new THREE.Float32BufferAttribute(bracingPts, 3)
    );
    const bracing = new THREE.LineSegments(bracingGeo, bracingMat);
    boxGroup.add(bracing);

    scene.add(boxGroup);

    const pointsGroup = new THREE.Group();
    scene.add(pointsGroup);
    const dataPoints: { mesh: THREE.Mesh; radius: number; theta: number; speed: number; tilt: number }[] = [];
    for (let i = 0; i < 14; i++) {
      const isPhos = i % 3 === 0;
      const ptGeo = new THREE.SphereGeometry(0.022, 8, 8);
      const ptMat = new THREE.MeshBasicMaterial({
        color: isPhos ? PHOSPHOR : (i % 5 === 0 ? ELECTRIC : 0xa1a1aa),
        transparent: true,
        opacity: isPhos ? 1 : 0.55,
      });
      const pt = new THREE.Mesh(ptGeo, ptMat);
      const radius = 2.9 + Math.random() * 0.7;
      const theta = Math.random() * Math.PI * 2;
      const speed = 0.12 + Math.random() * 0.3;
      const tilt = (i % 3) * 0.4;
      dataPoints.push({ mesh: pt, radius, theta, speed, tilt });
      pointsGroup.add(pt);
    }

    const mouse = new THREE.Vector2(0, 0);
    const mouseTarget = new THREE.Vector2(0, 0);

    const onMouseMove = (e: MouseEvent) => {
      mouseTarget.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseTarget.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    function updateBoxPosition() {
      const w = window.innerWidth;
      if (w < 900) {
        boxGroup.position.set(0, 0.6, 0);
        boxGroup.scale.setScalar(0.7);
        pointsGroup.position.set(0, 0.6, 0);
        pointsGroup.scale.setScalar(0.7);
      } else {
        boxGroup.position.set(2.2, 0.1, 0);
        boxGroup.scale.setScalar(1);
        pointsGroup.position.set(2.2, 0.1, 0);
        pointsGroup.scale.setScalar(1);
      }
    }
    updateBoxPosition();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      updateBoxPosition();
    };
    window.addEventListener("resize", onResize);

    const timer = new THREE.Timer();
    let animId: number;

    function animate() {
      animId = requestAnimationFrame(animate);
      timer.update();
      const t = timer.getElapsed();

      mouse.x += (mouseTarget.x - mouse.x) * 0.05;
      mouse.y += (mouseTarget.y - mouse.y) * 0.05;

      boxGroup.rotation.y = t * 0.18 + mouse.x * 0.5 - 0.3;
      boxGroup.rotation.x = Math.sin(t * 0.4) * 0.06 + mouse.y * 0.25 - 0.15;
      boxGroup.rotation.z = Math.sin(t * 0.3) * 0.02;
      boxGroup.position.y = (window.innerWidth < 900 ? 0.6 : 0.1) + Math.sin(t * 0.7) * 0.08;

      edgeMat.opacity = 0.7 + Math.sin(t * 1.2) * 0.18;
      ghost.scale.setScalar(1 + Math.sin(t * 0.5) * 0.015);

      pointsGroup.rotation.y = t * 0.05;
      for (const dp of dataPoints) {
        dp.theta += dp.speed * 0.01;
        dp.mesh.position.set(
          Math.cos(dp.theta) * dp.radius,
          Math.sin(dp.theta * 1.3 + dp.tilt) * 0.6,
          Math.sin(dp.theta) * dp.radius
        );
        dp.mesh.scale.setScalar(0.7 + Math.sin(t * 2 + dp.theta * 5) * 0.3);
      }

      renderer.render(scene, camera);
    }
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      <div style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 1,
        backgroundImage: "radial-gradient(circle, rgba(9,9,11,0.55) 1px, transparent 1px)",
        backgroundSize: "3px 3px",
      }} />
    </>
  );
}
