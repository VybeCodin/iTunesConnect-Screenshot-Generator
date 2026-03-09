"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const templates = [
  { id: "minimal-clean", name: "Minimal Clean", gradient: "from-slate-100 to-slate-200", category: "Minimal" },
  { id: "bold-gradient", name: "Bold Gradient", gradient: "from-purple-500 to-blue-600", category: "Bold" },
  { id: "dark-premium", name: "Dark Premium", gradient: "from-gray-900 to-gray-800", category: "Dark" },
  { id: "sunset-glow", name: "Sunset Glow", gradient: "from-pink-500 to-orange-400", category: "Gradient" },
  { id: "ocean-breeze", name: "Ocean Breeze", gradient: "from-blue-400 to-teal-500", category: "Gradient" },
  { id: "forest-calm", name: "Forest Calm", gradient: "from-emerald-600 to-green-500", category: "Gradient" },
  { id: "midnight-blue", name: "Midnight Blue", gradient: "from-indigo-900 to-blue-800", category: "Dark" },
  { id: "coral-reef", name: "Coral Reef", gradient: "from-red-400 to-pink-500", category: "Bold" },
  { id: "lavender-dream", name: "Lavender Dream", gradient: "from-purple-400 to-indigo-300", category: "Gradient" },
  { id: "arctic-frost", name: "Arctic Frost", gradient: "from-blue-100 to-cyan-50", category: "Minimal" },
  { id: "neon-nights", name: "Neon Nights", gradient: "from-violet-600 to-fuchsia-500", category: "Bold" },
  { id: "warm-earth", name: "Warm Earth", gradient: "from-amber-600 to-orange-500", category: "Gradient" },
  { id: "deep-space", name: "Deep Space", gradient: "from-slate-900 to-violet-900", category: "Dark" },
  { id: "spring-bloom", name: "Spring Bloom", gradient: "from-rose-400 to-pink-300", category: "Gradient" },
  { id: "carbon", name: "Carbon", gradient: "from-zinc-900 to-neutral-800", category: "Dark" },
];

const categories = ["All", "Minimal", "Bold", "Dark", "Gradient"];

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Link href="/" className={buttonVariants({ variant: "ghost", size: "icon" })}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <h1 className="text-lg font-bold">Templates</h1>
          </div>
          <Link
            href="/editor"
            className={cn(buttonVariants(), "bg-gradient-to-r from-purple-500 to-blue-500 text-white")}
          >
            Open Editor
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        {/* Category filters */}
        <div className="mb-8 flex gap-2">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={cat === "All" ? "secondary" : "outline"}
              size="sm"
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {templates.map((template) => (
            <Link
              key={template.id}
              href={`/editor?template=${template.id}`}
              className="group"
            >
              <div className="relative aspect-[9/16] overflow-hidden rounded-xl border border-border/50 transition-all hover:scale-105 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10">
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br",
                    template.gradient
                  )}
                />
                {/* Mini content */}
                <div className="absolute inset-0 flex flex-col items-center justify-between p-4">
                  <div className="mt-6 text-center">
                    <div className="mx-auto mb-2 h-3 w-20 rounded bg-white/40" />
                    <div className="mx-auto h-2 w-12 rounded bg-white/25" />
                  </div>
                  <div className="mb-4 h-[40%] w-[65%] rounded-lg bg-white/15" />
                </div>
                {/* Category badge */}
                <div className="absolute right-2 top-2">
                  <span className="rounded-full bg-black/30 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                    {template.category}
                  </span>
                </div>
              </div>
              <div className="mt-2 text-center">
                <p className="text-sm font-medium">{template.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
