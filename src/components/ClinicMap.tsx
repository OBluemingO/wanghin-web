"use client";

import { useEffect, useRef, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import { clinic } from "@/lib/clinic";
import { MARK_HAND, MARK_TOOTH } from "./Icons";

/**
 * Free, keyless map: MapLibre GL (open source) with OpenFreeMap vector tiles (OpenStreetMap data).
 * Loads only when scrolled near, labels in Thai, and needs two fingers / Ctrl+scroll to move so it
 * never traps the page scroll.
 */
const STYLE = "https://tiles.openfreemap.org/styles/liberty";

export default function ClinicMap() {
  const box = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "ready" | "failed">("idle");

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    let map: import("maplibre-gl").Map | undefined;
    let cancelled = false;

    const start = async () => {
      try {
        const maplibregl = await import("maplibre-gl");
        if (cancelled) return;
        maplibregl.setWorkerUrl("/maplibre/maplibre-gl-worker.mjs");
        const { lat, lng } = clinic.geo;
        const m = new maplibregl.Map({
          container: el,
          style: STYLE,
          center: [lng, lat],
          zoom: 16,
          minZoom: 10,
          cooperativeGestures: true,
          attributionControl: { compact: true },
          locale: {
            "CooperativeGesturesHandler.WindowsHelpText": "กด Ctrl ค้างไว้แล้วเลื่อนเพื่อซูมแผนที่",
            "CooperativeGesturesHandler.MacHelpText": "กด ⌘ ค้างไว้แล้วเลื่อนเพื่อซูมแผนที่",
            "CooperativeGesturesHandler.MobileHelpText": "ใช้สองนิ้วเพื่อเลื่อนแผนที่",
            "NavigationControl.ZoomIn": "ซูมเข้า",
            "NavigationControl.ZoomOut": "ซูมออก",
          },
        });
        map = m;
        m.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");

        m.on("load", () => {
          // Thai names first, then the local name.
          for (const layer of m.getStyle().layers ?? []) {
            if (layer.type === "symbol" && m.getLayoutProperty(layer.id, "text-field")) {
              m.setLayoutProperty(layer.id, "text-field", ["coalesce", ["get", "name:th"], ["get", "name"]]);
            }
          }
          setState("ready");
        });
        m.on("error", (e) => { if (!m.loaded()) { console.warn(e.error); setState("failed"); } });

        const pin = document.createElement("div");
        pin.className = "map-pin";
        pin.setAttribute("aria-hidden", "true");
        // pin head carries the clinic mark: tooth cradled by the hand, wrist running out to the pin's edge
        pin.innerHTML =
          '<svg width="48" height="58" viewBox="0 0 46 56"><defs><clipPath id="pin-head"><circle cx="23" cy="22" r="17.5"/></clipPath></defs>' +
          '<path d="M23 55c0 0 21-19.2 21-33A21 21 0 0 0 2 22c0 13.8 21 33 21 33z" fill="#B4500A" stroke="#fff" stroke-width="3"/>' +
          '<g clip-path="url(#pin-head)"><g transform="translate(5.7 4.7) scale(.72)">' +
          `<path d="${MARK_TOOTH}" fill="#fff"/><path d="${MARK_HAND}" fill="#B4500A" stroke="#fff" stroke-width="1.1" stroke-linejoin="round"/>` +
          '</g></g></svg>' +
          '<span class="map-pin-label">Dental Care @วังหิน</span>';
        new maplibregl.Marker({ element: pin, anchor: "bottom" }).setLngLat([lng, lat]).addTo(m);
      } catch (err) {
        console.warn(err);
        setState("failed");
      }
    };

    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { io.disconnect(); start(); }
    }, { rootMargin: "150px" });
    io.observe(el);

    return () => { cancelled = true; io.disconnect(); map?.remove(); };
  }, []);

  return (
    <div className="map-wrap">
      <div ref={box} className="map-box" role="region" aria-label="แผนที่ตั้งคลินิก ซอยลาดพร้าววังหิน 79 ตรงข้ามโลตัสวังหิน" />
      {state !== "ready" && (
        <div className="map-fallback">
          {state === "failed" ? "โหลดแผนที่ไม่สำเร็จ กดปุ่มด้านล่างเพื่อเปิดใน Google Maps" : "กำลังโหลดแผนที่"}
        </div>
      )}
      <div className="map-actions">
        <a href={clinic.directionsUrl} target="_blank" rel="noopener" className="btn-primary">นำทางด้วย Google Maps</a>
        <a href={clinic.googleMapsUrl} target="_blank" rel="noopener" className="btn-outline">ดูรีวิวบน Google</a>
      </div>
    </div>
  );
}
