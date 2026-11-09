"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { GUM_LOWER, GUM_UPPER } from "@/lib/clinic";

const CENTER = new THREE.Vector3(0, -0.4, 0.5);
const PINK = new THREE.Color("#b8445f");
const ENAMEL = new THREE.Color("#f3eee4");
const GUM = new THREE.Color("#cf5a64");
const GUM_HI = new THREE.Color("#ff9fab");
const LOOK = new THREE.Vector3(0, -0.4, 0.5);
const CAM = new THREE.Vector3(0, -15, 4.2);
const ZOOM_MIN = 0.75;
const ZOOM_MAX = 2.6;

type Props = {
  selected: number;
  onSelect: (id: number) => void;
  /** Change this number to turn the model back to face the camera. */
  faceToken: number;
  /** Change this number to open the mouth (used by the quick buttons). */
  openToken: number;
  label: string;
};

/** One tooth placement in jaw.glb (typodont v2): which prototype mesh, where, and how it is turned. */
type ToothMeta = { id: number; fdi: number; upper: number; proto: string; x: number; y: number; z: number; rz: number; rx: number; mirror: boolean };
type Rig = { hinge: [number, number, number]; upper_world_z: number };

export default function JawViewer({ selected, onSelect, faceToken, openToken, label }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const selRef = useRef(selected);
  const onSelectRef = useRef(onSelect);
  const ctl = useRef({ faceGoal: false, keepOpen: false, zoomGoal: 1 });
  const zoomBy = (f: number) => {
    const c = ctl.current;
    c.zoomGoal = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, c.zoomGoal * f));
    window.dispatchEvent(new Event("jaw-wake"));
  };

  useEffect(() => { selRef.current = selected; }, [selected]);
  useEffect(() => { onSelectRef.current = onSelect; }, [onSelect]);
  useEffect(() => { if (faceToken) ctl.current.faceGoal = true; }, [faceToken]);
  useEffect(() => { if (openToken) ctl.current.keepOpen = true; }, [openToken]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Phones and tablets: lower render resolution and simpler materials. The GPU is shared with
    // page scrolling, so this is what keeps the rest of the page smooth.
    const light = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: light ? "low-power" : "default" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, light ? 1.5 : 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;
    scene.environmentIntensity = 0.85;

    const camera = new THREE.PerspectiveCamera(22, 1, 0.1, 60);
    camera.up.set(0, 0, 1);
    const placeCamera = (zoom: number) => {
      camera.position.copy(CAM).sub(LOOK).divideScalar(zoom).add(LOOK);
      camera.lookAt(LOOK);
    };
    placeCamera(1);

    const key = new THREE.DirectionalLight(0xfff6ee, 1.7);
    key.position.set(-4, -6, 7);
    const fill = new THREE.DirectionalLight(0xeef4ff, 0.6);
    fill.position.set(5, -4, 2);
    const rim = new THREE.DirectionalLight(0xffffff, 0.8);
    rim.position.set(0, 6, 5);
    scene.add(key, fill, rim);

    // pitch -> yaw -> offset, so the model turns about its own centre
    const pitchG = new THREE.Group();
    pitchG.position.copy(CENTER);
    const yawG = new THREE.Group();
    const offsetG = new THREE.Group();
    offsetG.position.copy(CENTER).negate();
    pitchG.add(yawG);
    yawG.add(offsetG);
    scene.add(pitchG);

    const lower = new THREE.Group();
    // The upper arch is modelled crown-up like the lower one, then flipped and hung from a hinge at the back.
    const hinge = new THREE.Group();
    const upperRoot = new THREE.Group();
    upperRoot.scale.set(1, 1, -1);
    hinge.add(upperRoot);
    const setRig = ({ hinge: [hx, hy, hz], upper_world_z }: Rig) => {
      hinge.position.set(hx, hy, hz);
      upperRoot.position.set(-hx, -hy, upper_world_z - hz);
    };
    setRig({ hinge: [0, 1.25, 0.75], upper_world_z: 0.97 });
    offsetG.add(lower, hinge);

    const pickables: THREE.Mesh[] = [];
    const toothMeshes = new Map<number, THREE.Mesh>();
    const gumMeshes: THREE.Mesh[] = [];
    const lift = new Map<number, number>();

    const state = { hover: false, hoverId: 0, dragging: false, moved: 0, lx: 0, ly: 0, open: 0, yaw: 0.35, pitch: 0.08, spin: !reduce, touchOpen: false, zoom: 1 };
    // two-finger pinch: remember every active pointer and the finger spread when the pinch started
    const touches = new Map<number, { x: number; y: number }>();
    let pinch = 0;
    const spread = () => { const [a, b] = [...touches.values()]; return Math.hypot(a.x - b.x, a.y - b.y); };
    const pointer = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    let disposed = false;

    new GLTFLoader().load("/models/jaw.glb", (gltf) => {
      if (disposed) return;
      const json = gltf.parser.json as { extras?: { teeth?: ToothMeta[]; rig?: Rig } };
      const meta = json.extras?.teeth ?? [];
      if (json.extras?.rig) setRig(json.extras.rig);
      const geo = (name: string) => (gltf.scene.getObjectByName(name) as THREE.Mesh).geometry;
      const soft = (color: THREE.Color, roughness: number, extra: Partial<THREE.MeshPhysicalMaterialParameters> = {}) =>
        light
          ? new THREE.MeshStandardMaterial({ color: color.clone(), roughness })
          : new THREE.MeshPhysicalMaterial({ color: color.clone(), roughness, ...extra });

      // teeth and gums only; each gum is pickable (it has its own info card)
      ([["gum_lower", lower, GUM_LOWER], ["gum_upper", upperRoot, GUM_UPPER]] as const).forEach(([name, parent, id]) => {
        const m = new THREE.Mesh(geo(name), soft(GUM, 0.4, { clearcoat: 0.5, clearcoatRoughness: 0.18, sheen: 0.4, sheenColor: new THREE.Color("#ffb3bc"), sheenRoughness: 0.5 }));
        m.userData.id = id;
        parent.add(m);
        pickables.push(m);
        gumMeshes.push(m);
      });
      meta.forEach((t) => {
        const holder = new THREE.Group();
        holder.position.set(t.x, t.y, t.z);
        holder.rotation.set(t.rx, 0, t.rz, "ZYX"); // tilt first, then turn along the arch
        const m = new THREE.Mesh(geo(t.proto), soft(ENAMEL, light ? 0.2 : 0.24, { clearcoat: 0.9, clearcoatRoughness: 0.07, ior: 1.55 }));
        if (t.mirror) m.scale.x = -1;
        m.userData.id = t.id;
        holder.add(m);
        (t.upper ? upperRoot : lower).add(holder);
        pickables.push(m);
        toothMeshes.set(t.id, m);
      });
    });

    const resize = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const pick = () => {
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(pickables, false)[0];
      return hit ? (hit.object.userData.id as number) : 0;
    };
    const toPointer = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    };
    const onDown = (e: PointerEvent) => {
      touches.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (touches.size === 2) { pinch = spread() / ctl.current.zoomGoal; state.dragging = false; state.moved = 99; return; }
      state.dragging = true; state.moved = 0; state.lx = e.clientX; state.ly = e.clientY; state.spin = false;
      ctl.current.faceGoal = false;
      if (e.pointerType === "touch") state.touchOpen = true;
      toPointer(e); state.hoverId = pick();
      canvas.setPointerCapture?.(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (touches.has(e.pointerId)) touches.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (touches.size === 2 && pinch) {
        ctl.current.zoomGoal = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, spread() / pinch));
        start();
        return;
      }
      state.hover = true;
      toPointer(e);
      if (state.dragging) {
        const dx = e.clientX - state.lx, dy = e.clientY - state.ly;
        state.moved += Math.abs(dx) + Math.abs(dy);
        state.yaw += dx * 0.012;
        state.pitch = Math.min(0.75, Math.max(-0.35, state.pitch + dy * 0.006));
        state.lx = e.clientX; state.ly = e.clientY;
      } else {
        state.hoverId = pick();
      }
      canvas.style.cursor = state.dragging ? "grabbing" : state.hoverId ? "pointer" : "grab";
    };
    const onUp = (e: PointerEvent) => {
      touches.delete(e.pointerId);
      if (touches.size < 2) pinch = 0;
      if (state.dragging && state.moved < 6 && state.hoverId) onSelectRef.current(state.hoverId);
      state.dragging = false;
    };
    const onLeave = (e: PointerEvent) => { touches.delete(e.pointerId); pinch = 0; state.hover = false; state.hoverId = 0; state.dragging = false; };
    // mouse wheel / trackpad pinch zooms while the pointer is over the model
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const c = ctl.current;
      c.zoomGoal = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, c.zoomGoal * Math.exp(-e.deltaY * (e.ctrlKey ? 0.01 : 0.0015))));
      start();
    };
    canvas.addEventListener("wheel", onWheel, { passive: false });
    canvas.addEventListener("pointercancel", onLeave);
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointerleave", onLeave);

    const clock = new THREE.Clock();
    let raf = 0;
    let onScreen = false;
    let lastKey = "";
    let skip = false;
    const tmp = new THREE.Color();
    const loop = () => {
      raf = 0;
      if (!onScreen || document.hidden) return; // stop entirely while scrolled away or in a background tab
      const dt = Math.min(0.05, clock.getDelta());
      const wantOpen = (state.hover && !state.dragging) || state.touchOpen || ctl.current.keepOpen;
      state.open += ((wantOpen ? 1 : 0) - state.open) * (reduce ? 1 : Math.min(1, dt * 7));
      if (ctl.current.faceGoal) {
        state.spin = false;
        const goal = Math.round(state.yaw / (Math.PI * 2)) * Math.PI * 2;
        state.yaw += (goal - state.yaw) * Math.min(1, dt * 6);
        state.pitch += (0.08 - state.pitch) * Math.min(1, dt * 6);
        if (Math.abs(goal - state.yaw) < 0.002) ctl.current.faceGoal = false;
      } else if (state.spin && !state.hover) {
        state.yaw += dt * 0.35;
      }
      yawG.rotation.z = state.yaw;
      pitchG.rotation.x = state.pitch;
      hinge.rotation.x = -state.open * 0.42;
      const zg = ctl.current.zoomGoal;
      state.zoom += (zg - state.zoom) * (reduce ? 1 : Math.min(1, dt * 10));
      if (Math.abs(zg - state.zoom) < 0.0005) state.zoom = zg;
      placeCamera(state.zoom);

      const sel = selRef.current;
      const gumSel = sel === GUM_LOWER || sel === GUM_UPPER;
      const gumHov = state.hoverId === GUM_LOWER || state.hoverId === GUM_UPPER;
      gumMeshes.forEach((m) => {
        const a = gumSel ? 0.4 : gumHov ? 0.18 : 0;
        const mat = m.material as THREE.MeshStandardMaterial;
        mat.color.copy(tmp.copy(GUM).lerp(GUM_HI, a));
      });
      toothMeshes.forEach((m, id) => {
        const target = sel === id ? 1 : 0;
        const cur = (lift.get(id) ?? 0) + (target - (lift.get(id) ?? 0)) * Math.min(1, dt * 9);
        lift.set(id, cur);
        m.position.z = cur * 0.12;
        const a = sel === id ? 0.6 : state.hoverId === id ? 0.28 : 0;
        const mat = m.material as THREE.MeshStandardMaterial;
        mat.color.copy(tmp.copy(ENAMEL).lerp(PINK, a));
      });

      // Draw only when something on screen changed. While it is just spinning on a phone, 30 fps is plenty.
      const busy = state.dragging || state.zoom !== ctl.current.zoomGoal || ctl.current.faceGoal || Math.abs((wantOpen ? 1 : 0) - state.open) > 0.002 || [...lift.values()].some((v, i) => Math.abs(v - (sel === [...lift.keys()][i] ? 1 : 0)) > 0.002);
      const key = `${state.yaw.toFixed(4)}|${state.pitch.toFixed(4)}|${state.open.toFixed(3)}|${sel}|${state.hoverId}|${toothMeshes.size}|${state.zoom.toFixed(4)}`;
      skip = light && !busy && !skip;
      if (key !== lastKey && !(skip && state.spin)) {
        renderer.render(scene, camera);
        lastKey = key;
      }
      raf = requestAnimationFrame(loop);
    };
    const start = () => { if (!raf && onScreen && !document.hidden) { clock.getDelta(); raf = requestAnimationFrame(loop); } };
    const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; start(); }, { rootMargin: "100px" });
    io.observe(canvas);
    const onVis = () => start();
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("jaw-wake", onVis);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("jaw-wake", onVis);
      canvas.removeEventListener("wheel", onWheel);
      canvas.removeEventListener("pointercancel", onLeave);
      ro.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointerleave", onLeave);
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.isMesh) (m.material as THREE.Material).dispose();
      });
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="jaw-wrap">
      <canvas ref={canvasRef} className="jaw-canvas" role="img" aria-label={label} />
      <div className="jaw-zoom" role="group" aria-label="ซูมโมเดล">
        <button type="button" onClick={() => zoomBy(1.35)} aria-label="ซูมเข้า">+</button>
        <button type="button" onClick={() => zoomBy(1 / 1.35)} aria-label="ซูมออก">−</button>
      </div>
    </div>
  );
}
