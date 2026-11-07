import catalog from "@/content/catalog.json";
import {
  Atom, Blocks, BookOpenText, Bot, CreditCard, Database, FlaskConical, FolderCheck, GitBranch,
  KeyRound, Mail, Map, MessagesSquare, Package, Palette, Scale, ScanSearch, ShieldCheck, Wrench,
  type LucideIcon,
} from "lucide-react";
import { Nav } from "@/components/site/nav";
import { Terminal } from "@/components/site/terminal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
// Todo lo que cuenta la página sale del catálogo real de tk (content/catalog.json),
// así la web no promete nada que el paquete no tenga.
type Module = { id: string; title: string; when: string; gives: string; costs: string };
type Arch = { id: string; title: string; for: string; recommended: string[]; optional: string[] };
type Skill = { id: string; nivel: string; origen: string; scope: string };

const modules = Object.values(catalog.modules) as Module[];
const archs = Object.values(catalog.architectures) as Arch[];
const skills = Object.values(catalog.skills) as Skill[];
const REPO_URL = "https://github.com/manuelt15/toolkit-public";
const NPM_URL = "https://www.npmjs.com/package/@manuelt15/toolkit";
// Un icono por módulo, del mismo set que el resto de la página. Si el catálogo trae un módulo
// nuevo sin icono aquí, sale el genérico.
const MODULE_ICONS: Record<string, LucideIcon> = {
  "agentes-ia": Bot,
  analisis: ScanSearch,
  auditoria: ShieldCheck,
  auth: KeyRound,
  datos: Database,
  diseno: Palette,
  email: Mail,
  ingenieria: Wrench,
  legal: Scale,
  librerias: Package,
  mapas: Map,
  "next-react": Atom,
  pagos: CreditCard,
  "repo-seguridad": GitBranch,
  testing: FlaskConical,
};

// Baldosa de icono con el radio de squircle del sistema (30%).
function IconTile({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-[30%] bg-canvas-soft text-ink">
      <Icon aria-hidden className="size-5" strokeWidth={1.75} />
    </span>
  );
}

const moduleTitle = (id: string) => (catalog.modules as Record<string, Module>)[id]?.title ?? id;
const ownSkills = skills.filter((s) => s.origen === "propia").length;

// Solo el símbolo de cada marca, sin fondo: Claude y Codex sacados de los iconos de skills.sh
// (el trazo, sin el cuadro), Claude en su naranja y Codex en blanco y negro (OpenAI no admite
// colores); Hermes es la ilustración oficial de su repo (MIT). Las marcas son de sus dueños y
// se usan solo para decir con qué funciona tk.
const AGENTS: { name: string; light: string; dark?: string }[] = [
  { name: "Claude Code", light: "/agents/claude.svg" },
  { name: "Codex", light: "/agents/codex-black.svg", dark: "/agents/codex-white.svg" },
  { name: "Hermes", light: "/agents/hermes-black.svg", dark: "/agents/hermes-white.svg" },
];

function Section({ id, eyebrow, title, lead, children }: { id: string; eyebrow: string; title: string; lead?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
      <p className="mb-4 text-[14px] font-semibold text-text-muted">{eyebrow}</p>
      <h2 className="max-w-3xl text-[36px] leading-[1.08] md:text-[44px] md:leading-[1.13]">{title}</h2>
      {lead ? <p className="mt-5 max-w-2xl text-[20px] leading-[1.38] font-light text-text-muted">{lead}</p> : null}
      <div className="mt-12">{children}</div>
    </section>
  );
}

const STEPS = [
  {
    n: "1",
    icon: MessagesSquare,
    title: "Te pregunta lo justo.",
    text: "Qué vas a construir, el tipo de proyecto, los módulos y tu sistema de diseño. Lo que se puede deducir, como tus agentes o tu identidad de git, no lo pregunta.",
  },
  {
    n: "2",
    icon: BookOpenText,
    title: "Te explica cada skill.",
    text: "Para qué sirve cada una, cuáles son obligatorias por tus módulos y cuáles ya tienes en global, con la opción de llevarlas también al proyecto.",
  },
  {
    n: "3",
    icon: FolderCheck,
    title: "Deja el proyecto listo.",
    text: "AGENTS.md con el flujo de sesión, la memoria del proyecto, DESIGN.md si hay interfaz y un lock con todo lo instalado. Abres tu agente y ya sabe qué hacer.",
  },
];

const FAQ = [
  {
    q: "¿Necesito Claude Code?",
    a: "No. tk detecta los agentes que tienes instalados (Claude Code, Codex y Hermes) y prepara el proyecto para todos. Las instrucciones viven en AGENTS.md, que los tres leen.",
  },
  {
    q: "¿Instala cosas sin preguntar?",
    a: "No. Las skills de terceros se instalan desde su repositorio con su comando, que siempre ves antes. Eliges ejecutarlos todos, solo los del proyecto, solo los obligatorios o ninguno, y lo que no se instala queda apuntado en los pendientes.",
  },
  {
    q: "¿Qué pasa con las skills que ya tengo en global?",
    a: "tk las detecta y te pregunta si las quieres también en el proyecto. Si las copias, viajan con el repositorio y las ve cualquier agente en cualquier máquina.",
  },
  {
    q: "¿Y si cambio de agente a mitad de proyecto?",
    a: "Es justo para lo que está pensado. Cada sesión termina con tk close, que deja un handover con lo hecho, lo pendiente y lo decidido. La siguiente sesión empieza con tk start, sea el agente que sea.",
  },
  {
    q: "¿Qué datos guarda de mí?",
    a: "Nada sale de tu máquina: no hay telemetría ni scripts de instalación. Si usas un perfil con tus identidades de git, los emails nunca se escriben en el proyecto.",
  },
];

export default function Home() {
  return (
    <>
      <Nav />
      <main id="inicio" className="flex-1">
        {/* Hero */}
        <section className="mx-auto grid w-full max-w-6xl gap-14 px-6 pt-20 pb-16 md:pt-28 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          <div>
            <h1 className="text-[48px] leading-[1.0] sm:text-[64px] lg:text-[72px]">
              Empieza proyectos con agentes. Sin partir de cero.
            </h1>
            <p className="mt-7 max-w-xl text-[20px] leading-[1.38] font-light text-text-muted">
              tk te pregunta qué vas a construir, te propone módulos y skills explicando para qué sirve cada una, y deja el proyecto listo para que Claude Code, Codex o Hermes sigan donde lo dejó la sesión anterior.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a href="#instalar" className="inline-flex h-12 items-center rounded-full bg-primary px-6 text-[16px] font-semibold text-primary-foreground transition-colors hover:bg-primary/85">
                Cómo instalarlo
              </a>
              <a href="#como-funciona" className="inline-flex h-12 items-center rounded-full bg-canvas-soft px-6 text-[16px] font-semibold text-ink transition-colors hover:bg-hairline">
                Ver cómo funciona
              </a>
            </div>
          </div>
          <Terminal
            title="mi-proyecto"
            lines={[
              { text: "mkdir mi-proyecto && cd mi-proyecto", tone: "prompt" },
              { text: "tk", tone: "prompt" },
              { text: "" },
              { text: "◇  ¿Qué vas a construir?   Reservas para clínicas", tone: "ok" },
              { text: "◇  Tipo de proyecto        SaaS", tone: "ok" },
              { text: "◇  Datos: ¿cuál?           neon", tone: "ok" },
              { text: "◆  Skills para el proyecto" },
              { text: "   ✓ cierre          deja dicho qué sigue", tone: "muted" },
              { text: "   ✓ seguridad-rgpd  por auth, pagos y datos", tone: "muted" },
              { text: "   ◻ apple-design    ya la tienes en global", tone: "muted" },
              { text: "└  Proyecto listo. Abre tu agente aquí.", tone: "ok" },
            ]}
          />
        </section>

        {/* Agentes */}
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-8 gap-y-4 px-6 pb-8">
          <span className="text-[14px] text-text-muted">Funciona con</span>
          {AGENTS.map((a) => (
            <span key={a.name} className="inline-flex items-center gap-2.5 text-[16px] font-semibold text-ink">
              {/* Símbolo de la marca, sin caja, a la altura del texto */}
              {/* eslint-disable-next-line @next/next/no-img-element -- SVG de marca, sin optimizar a propósito */}
              <img src={a.light} alt="" width={24} height={24} className={a.dark ? "size-6 dark:hidden" : "size-6"} />
              {a.dark ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={a.dark} alt="" width={24} height={24} className="hidden size-6 dark:block" />
              ) : null}
              {a.name}
            </span>
          ))}
        </div>

        <Section
          id="como-funciona"
          eyebrow="Cómo funciona"
          title="Un asistente que pregunta lo justo y explica lo que instala."
          lead="Solo pregunta lo que no puede deducir. Tus agentes, tus skills globales y tu identidad de git los detecta solo."
        >
          <ol className="grid gap-4 md:grid-cols-3">
            {STEPS.map((s) => (
              <li key={s.n} className="rounded-md border border-hairline-soft p-7">
                <div className="flex items-center justify-between">
                  <IconTile icon={s.icon} />
                  <span className="text-[14px] font-semibold text-text-faint">Paso {s.n}</span>
                </div>
                <h3 className="mt-6 text-[24px] leading-[1.25]">{s.title}</h3>
                <p className="mt-3 text-[16px] leading-[1.45] text-text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section
          id="sesiones"
          eyebrow="Sesiones"
          title="Cada sesión deja dicho qué sigue."
          lead="Da igual que mañana abras otro agente: el proyecto guarda lo hecho, lo pendiente y lo decidido."
        >
          {/* min-w-0: sin él, la línea más larga del terminal ensancha la columna y la página en móvil */}
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="min-w-0">
              <h3 className="mb-4 text-[20px] font-semibold">Al empezar, tk start.</h3>
              <Terminal
                title="tk start"
                lines={[
                  { text: "tk start", tone: "prompt" },
                  { text: "═══ tk start: mi-proyecto ═══", tone: "ok" },
                  { text: "Proyecto: Reservas para clínicas" },
                  { text: "Pendiente (3 de 7):" },
                  { text: "  1. Webhook de Stripe sin verificar firma" },
                  { text: "  2. Página de privacidad" },
                  { text: "Último handover: HANDOVER-…-pagos.md", tone: "muted" },
                  { text: "Git: rama main; 2 cambios sin commitear", tone: "muted" },
                ]}
              />
            </div>
            <div className="min-w-0">
              <h3 className="mb-4 text-[20px] font-semibold">Al terminar, tk close.</h3>
              <Terminal
                title="tk close"
                lines={[
                  { text: "tk close", tone: "prompt" },
                  { text: "+ handover con los commits de la sesión", tone: "ok" },
                  { text: "~ pending.md: 1 cerrada, archivada", tone: "ok" },
                  { text: "Checklist:" },
                  { text: "  ✓ Ningún .env en git" },
                  { text: "  ! Hay \"resend\" pero el módulo email no está activo" },
                  { text: "Rellena los huecos y: tk close --commit", tone: "muted" },
                ]}
              />
            </div>
          </div>
          <p className="mt-8 max-w-2xl text-[16px] leading-[1.45] text-text-muted">
            tk close hace lo mecánico y deja huecos marcados para el agente. tk close --commit se niega mientras quede alguno sin rellenar, commitea solo la memoria y nunca hace push.
          </p>
        </Section>

        <Section
          id="modulos"
          eyebrow="Módulos"
          title="Cada pieza dice qué te da y qué te cuesta."
          lead={`${modules.length} módulos, ${archs.length} tipos de proyecto que los preseleccionan y ${skills.length} skills en el catálogo, ${ownSkills} de ellas propias.`}
        >
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((m) => (
              <li key={m.id} className="flex flex-col rounded-md border border-hairline-soft p-6">
                <IconTile icon={MODULE_ICONS[m.id] ?? Blocks} />
                <h3 className="mt-5 text-[20px] leading-[1.3] font-semibold">{m.title}</h3>
                <p className="mt-1 text-[14px] text-text-faint">{m.when}</p>
                <p className="mt-4 text-[15px] leading-[1.45]">{m.gives}</p>
                <p className="mt-3 text-[14px] leading-[1.43] text-text-muted">
                  <span className="font-semibold text-ink-soft">Cuesta: </span>
                  {m.costs}
                </p>
              </li>
            ))}
          </ul>

          <h3 className="mt-20 text-[24px] leading-[1.25]">Tipos de proyecto.</h3>
          <ul className="mt-6 grid gap-3">
            {archs.map((a) => (
              <li key={a.id} className="grid gap-2 rounded-sm bg-canvas-soft px-6 py-5 md:grid-cols-[200px_1fr] md:items-baseline">
                <div>
                  <p className="text-[18px] font-semibold">{a.title}</p>
                  <p className="text-[14px] text-text-muted">{a.for}</p>
                </div>
                <p className="text-[14px] leading-[1.6] text-text-muted">
                  <span className="text-ink">{a.recommended.map(moduleTitle).join(", ")}</span>
                  {a.optional.length ? <>. Opcionales: {a.optional.map(moduleTitle).join(", ")}.</> : "."}
                </p>
              </li>
            ))}
          </ul>
        </Section>

        <Section
          id="seguridad"
          eyebrow="Seguridad"
          title="Nada se instala ni se publica a tus espaldas."
        >
          <ul className="grid gap-4 md:grid-cols-2">
            {[
              ["Sin telemetría ni postinstall.", "tk no llama a casa. Solo usa la red cuando ejecuta, con tu permiso, el comando de una skill de terceros."],
              ["Comandos siempre a la vista.", "Antes de ejecutar nada de terceros enseña el comando completo. Las skills de terceros no viajan dentro del paquete: se instalan desde su origen, con su licencia."],
              ["Tu identidad, fuera del proyecto.", "Detecta tus identidades de git y solo pregunta si hay varias. Los emails nunca se escriben en el proyecto ni en el lock."],
              ["Un doctor que no pisa tus cambios.", "tk doctor comprueba el proyecto contra el lock y con --fix repara lo que falta, pero nunca sobrescribe una skill que hayas editado a mano."],
            ].map(([t, d]) => (
              <li key={t} className="rounded-md border border-hairline-soft p-7">
                <h3 className="text-[20px] leading-[1.3] font-semibold">{t}</h3>
                <p className="mt-3 text-[16px] leading-[1.45] text-text-muted">{d}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="instalar" eyebrow="Instalar" title="Un comando y listo.">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
            <div>
              <a href={NPM_URL} className="inline-flex items-center rounded-full bg-signal px-3 py-1 text-[12px] font-semibold text-white transition-opacity hover:opacity-85">
                En npm: @manuelt15/toolkit
              </a>
              <p className="mt-5 max-w-md text-[20px] leading-[1.38] font-light text-text-muted">
                Se instala con un comando y se usa con tk en una carpeta vacía.
              </p>
              <ul className="mt-6 space-y-2 text-[15px] text-text-muted">
                <li>Node 22 o superior.</li>
                <li>macOS o Linux. En Windows, con WSL.</li>
                <li>Claude Code, Codex o Hermes instalados.</li>
              </ul>
            </div>
            <Terminal
              title="instalar"
              lines={[
                { text: "npm install -g @manuelt15/toolkit", tone: "prompt" },
                { text: "mkdir mi-proyecto && cd mi-proyecto", tone: "prompt" },
                { text: "tk", tone: "prompt" },
              ]}
            />
          </div>
        </Section>

        <Section id="preguntas" eyebrow="Preguntas" title="Lo que suele preguntarse.">
          <Accordion type="single" collapsible className="grid max-w-3xl gap-3">
            {FAQ.map((f) => (
              <AccordionItem key={f.q} value={f.q} className="rounded-sm border-0 bg-canvas-soft px-6">
                <AccordionTrigger className="py-5 text-[16px] font-semibold hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="pb-5 text-[16px] leading-[1.45] text-text-muted">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Section>
      </main>

      <footer className="mt-10 rounded-t-md bg-footer px-6 pt-20 pb-12 text-footer-foreground">
        <div className="mx-auto grid w-full max-w-6xl gap-12 md:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="font-mono text-[80px] leading-none font-semibold">tk</p>
            <p className="mt-6 max-w-sm text-[16px] text-footer-muted">Empieza proyectos con agentes. Sin partir de cero.</p>
          </div>
          <div className="grid grid-cols-2 gap-8 text-[15px]">
            <ul className="space-y-3">
              <li><a href="#como-funciona" className="text-footer-foreground transition-opacity hover:opacity-60">Cómo funciona</a></li>
              <li><a href="#sesiones" className="text-footer-foreground transition-opacity hover:opacity-60">Sesiones</a></li>
              <li><a href="#modulos" className="text-footer-foreground transition-opacity hover:opacity-60">Módulos</a></li>
              <li><a href="#instalar" className="text-footer-foreground transition-opacity hover:opacity-60">Instalar</a></li>
            </ul>
            <ul className="space-y-3 text-footer-muted">
              <li><a href={REPO_URL} className="text-footer-foreground transition-opacity hover:opacity-60">Código en GitHub</a></li>
              <li><a href={NPM_URL} className="text-footer-foreground transition-opacity hover:opacity-60">Paquete en npm</a></li>
              <li><a href={`${REPO_URL}/issues`} className="text-footer-foreground transition-opacity hover:opacity-60">Contacto: issues</a></li>
              <li>Licencia MIT.</li>
              <li>Se ofrece tal cual, sin soporte.</li>
              <li>Sin cookies ni analítica.</li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
