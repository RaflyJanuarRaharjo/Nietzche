import type { Metadata } from "next";
import "./globals.css";
import RevealObserver from "@/components/RevealObserver";
import Preloader from "@/components/Preloader";

export const metadata: Metadata = {
  title: "Nietzsche — Build software with a team of AI agents",
  description:
    "A different kind of digital studio, bringing design, technology, and distinct minds together to build what’s next.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Enables reveal animations only when JS runs (set before first paint, no flash). */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js','loading')" }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700&family=Noto+Sans:wght@400&display=swap"
        />
      </head>
      <body>
        <Preloader />
        <div className="scroll-progress" aria-hidden />
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
