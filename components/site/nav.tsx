import { ThemeToggle } from "./theme";

const LINKS = [
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#sesiones", label: "Sesiones" },
  { href: "#modulos", label: "Módulos" },
  { href: "#seguridad", label: "Seguridad" },
];

// Píldora flotante y centrada: se separa del borde y el lienzo la rodea.
export function Nav() {
  return (
    <header className="sticky top-4 z-50 flex justify-center px-4 pt-4">
      <nav
        aria-label="Principal"
        className="flex w-full max-w-3xl items-center justify-between gap-4 rounded-full bg-canvas-soft py-2 pr-2 pl-5"
      >
        <a href="#inicio" className="font-mono text-lg font-semibold tracking-normal text-ink">
          tk
        </a>
        <ul className="hidden items-center gap-6 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-[15px] font-semibold text-ink/80 transition-colors hover:text-ink">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
        <ThemeToggle />
        <a
          href="#instalar"
          className="inline-flex h-10 items-center rounded-full bg-primary px-4 text-[15px] font-semibold text-primary-foreground transition-[background-color,scale] duration-160 ease-snappy hover:bg-primary/85 active:scale-[0.97]"
        >
          Instalar
        </a>
        </div>
      </nav>
    </header>
  );
}
