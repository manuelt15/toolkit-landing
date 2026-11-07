import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { themeScript } from "@/components/site/theme-script";

// next/font descarga la fuente al compilar y la sirve desde el propio sitio:
// el navegador del visitante nunca pide nada a Google.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "tk: proyectos con agentes",
  description:
    "Un comando que monta tu proyecto para Claude Code, Codex o Hermes: módulos, skills explicadas y un cierre de sesión que deja dicho qué sigue.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: el script de tema pone la clase "dark" antes de que React hidrate
    <html lang="es" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
