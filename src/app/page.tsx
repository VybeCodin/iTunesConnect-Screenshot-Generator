"use client";

import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Examples } from "@/components/landing/Examples";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-blue-500">
              <span className="text-sm font-bold text-white">S</span>
            </div>
            <span className="text-lg font-bold">ScreenCraft</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/templates"
              className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground sm:block"
            >
              Templates
            </Link>
            <Link
              href="/editor"
              className="rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Open Editor
            </Link>
          </nav>
        </div>
      </header>

      <main className="pt-14">
        <Hero />
        <Features />
        <Examples />
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 px-4 py-8">
        <div className="mx-auto max-w-6xl text-center text-sm text-muted-foreground">
          <p>
            Built with Next.js, Fabric.js & Tailwind CSS. Free and open source.
          </p>
        </div>
      </footer>
    </div>
  );
}
