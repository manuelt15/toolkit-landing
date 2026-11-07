"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { CLAVE } from "./theme-script";

type Tema = "claro" | "oscuro" | "sistema";

function aplicar(tema: Tema) {
  const html = document.documentElement;
  const oscuro = tema === "oscuro" || (tema === "sistema" && matchMedia("(prefers-color-scheme: dark)").matches);
  if (html.classList.contains("dark") === oscuro) return;
  // Sin transiciones durante el cambio: si no, los botones animan el color y se ven invertidos un instante
  html.classList.add("sin-transicion");
  html.classList.toggle("dark", oscuro);
  requestAnimationFrame(() => requestAnimationFrame(() => html.classList.remove("sin-transicion")));
}

const OPCIONES: { value: Tema; label: string; Icon: typeof Sun }[] = [
  { value: "claro", label: "Modo claro", Icon: Sun },
  { value: "oscuro", label: "Modo oscuro", Icon: Moon },
  { value: "sistema", label: "Como el sistema", Icon: Monitor },
];

// Control segmentado de DESIGN.md: pista gris en píldora, la opción activa en blanco.
// El tema guardado es un estado externo (localStorage): se lee con useSyncExternalStore, que
// también se entera de cambios hechos en otra pestaña. En el servidor no hay tema: null.
const EVENTO = "tema-cambiado";
function leer(): Tema {
  try {
    const t = localStorage.getItem(CLAVE);
    if (t === "claro" || t === "oscuro") return t;
  } catch {}
  return "sistema";
}
function suscribir(aviso: () => void) {
  window.addEventListener("storage", aviso);
  window.addEventListener(EVENTO, aviso);
  return () => {
    window.removeEventListener("storage", aviso);
    window.removeEventListener(EVENTO, aviso);
  };
}

export function ThemeToggle({ className }: { className?: string }) {
  const tema = useSyncExternalStore<Tema | null>(suscribir, leer, () => null);

  useEffect(() => {
    if (tema === null) return;
    aplicar(tema); // también cuando cambia en otra pestaña
    if (tema !== "sistema") return;
    const mq = matchMedia("(prefers-color-scheme: dark)");
    const cambio = () => aplicar("sistema");
    mq.addEventListener("change", cambio);
    return () => mq.removeEventListener("change", cambio);
  }, [tema]);

  const elegir = (t: Tema) => {
    try {
      if (t === "sistema") localStorage.removeItem(CLAVE);
      else localStorage.setItem(CLAVE, t);
    } catch {}
    window.dispatchEvent(new Event(EVENTO));
  };

  return (
    <div role="radiogroup" aria-label="Tema" className={cn("flex items-center gap-0.5 rounded-full bg-hairline-soft p-1 dark:bg-field", className)}>
      {OPCIONES.map(({ value, label, Icon }) => {
        const activo = tema === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={activo}
            aria-label={label}
            title={label}
            onClick={() => elegir(value)}
            className={cn(
              "inline-flex size-8 items-center justify-center rounded-full text-text-muted transition-colors hover:text-ink",
              activo && "bg-background text-ink shadow-[0_1px_2px_rgb(0_0_0/0.08)]",
            )}
          >
            <Icon className="size-4" strokeWidth={1.75} />
          </button>
        );
      })}
    </div>
  );
}
