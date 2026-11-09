"use client";

import { useEffect, useState } from "react";
import LineChat from "./LineChat";

/** Opens the LINE booking demo for any element marked data-line-demo, on every page. */
export default function LineDemoModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onClick = (e: Event) => {
      // composedPath survives the target being re-rendered away by an earlier click handler
      const a = e.composedPath().find((n) => n instanceof HTMLElement && n.hasAttribute("data-line-demo"));
      if (a) { e.preventDefault(); setOpen(true); }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  if (!open) return null;
  return (
    <div className="modal" onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
      <div role="dialog" aria-modal="true" aria-label="ตัวอย่างบอท LINE จองคิว">
        <LineChat onClose={() => setOpen(false)} />
      </div>
    </div>
  );
}
