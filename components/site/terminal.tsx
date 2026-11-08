import { cn } from "@/lib/utils";

type Line = { text: string; tone?: "prompt" | "muted" | "ok" | "plain" };

// Bloque de terminal: el "contenido" que aporta el color en este sistema monocromo.
export function Terminal({ title, lines, className, style }: { title?: string; lines: Line[]; className?: string; style?: React.CSSProperties }) {
  return (
    <figure
      className={cn("overflow-hidden rounded-md bg-terminal text-left dark:ring-1 dark:ring-hairline text-[11px] leading-[1.6] sm:text-[13px] text-white", className)}
      aria-label={title ? `Terminal: ${title}` : "Terminal"}
      style={style}
    >
      <div className="flex items-center gap-2 px-4 pt-4 pb-2 sm:px-5">
        <span className="size-2.5 rounded-full bg-white/20" />
        <span className="size-2.5 rounded-full bg-white/20" />
        <span className="size-2.5 rounded-full bg-white/20" />
        {title ? <figcaption className="ml-2 font-mono text-xs text-white/50">{title}</figcaption> : null}
      </div>
      <pre className="overflow-x-auto px-4 pb-5 font-mono sm:px-5">
        <code>
          {lines.map((l, i) => (
            <span
              key={i}
              style={{ "--i": i } as React.CSSProperties}
              className={cn(
                "linea block whitespace-pre",
                l.tone === "prompt" && "text-white",
                l.tone === "muted" && "text-white/45",
                l.tone === "ok" && "text-white/80",
                (!l.tone || l.tone === "plain") && "text-white/70",
              )}
            >
              {l.tone === "prompt" ? <span className="text-white/40">$ </span> : null}
              {l.text || " "}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}
