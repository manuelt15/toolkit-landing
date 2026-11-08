"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// Marca el bloque con data-dentro la primera vez que entra en pantalla; la animación vive en
// globals.css (.revela). Una sola vez: volver a subir no repite nada.
export function Revela({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        el.setAttribute("data-dentro", "");
        io.disconnect();
      },
      // Arriba sin límite: un bloque que se salta de un tirón (scroll rápido o enlace del menú)
      // queda por encima de la pantalla y también cuenta como visto; si no, se quedaría oculto.
      { rootMargin: "100000px 0px -15% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("revela", className)}>
      {children}
    </div>
  );
}
