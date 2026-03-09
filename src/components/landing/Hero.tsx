"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-4 py-20">
      {/* Background gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-purple-500/20 blur-[128px]" />
        <div className="absolute -right-40 bottom-20 h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-[128px]" />
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/10 blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mb-6 flex items-center gap-2 rounded-full border border-border/50 bg-card/50 px-4 py-1.5 text-sm backdrop-blur-sm"
        >
          <Sparkles className="h-4 w-4 text-purple-400" />
          <span className="text-muted-foreground">
            Free & open source screenshot generator
          </span>
        </motion.div>

        {/* Headline */}
        <h1 className="max-w-4xl text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl md:text-7xl">
          Create{" "}
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            stunning
          </span>{" "}
          App Store screenshots
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
        >
          Design professional screenshots for the App Store & Google Play in
          minutes. Beautiful templates, device frames, and one-click export —
          completely free.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Link
            href="/editor"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-12 bg-gradient-to-r from-purple-500 to-blue-500 px-8 text-base font-semibold text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30"
            )}
          >
            Start Creating
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link
            href="/templates"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-12 px-8 text-base"
            )}
          >
            Browse Templates
          </Link>
        </motion.div>
      </motion.div>

      {/* Screenshot Preview Mockup */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
        className="relative z-10 mt-16 w-full max-w-5xl"
      >
        <div className="relative mx-auto overflow-hidden rounded-xl border border-border/50 bg-card/80 shadow-2xl backdrop-blur-sm">
          {/* Fake editor toolbar */}
          <div className="flex h-10 items-center gap-2 border-b border-border/50 bg-muted/50 px-4">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-400/70" />
              <div className="h-3 w-3 rounded-full bg-yellow-400/70" />
              <div className="h-3 w-3 rounded-full bg-green-400/70" />
            </div>
            <div className="ml-4 h-5 w-48 rounded bg-muted/80" />
          </div>
          {/* Fake editor content */}
          <div className="flex h-[350px] sm:h-[450px]">
            {/* Left sidebar mock */}
            <div className="hidden w-14 flex-col items-center gap-3 border-r border-border/50 bg-muted/30 p-3 sm:flex">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-lg bg-muted/60"
                />
              ))}
            </div>
            {/* Canvas area mock */}
            <div className="flex flex-1 items-center justify-center bg-[radial-gradient(circle_at_50%_50%,rgba(100,100,100,0.05)_1px,transparent_1px)] bg-[length:20px_20px] p-8">
              <div className="relative">
                {/* Phone frame */}
                <div className="h-[220px] w-[110px] rounded-[20px] border-2 border-muted-foreground/20 bg-gradient-to-br from-purple-500 to-blue-600 p-2 shadow-lg sm:h-[300px] sm:w-[150px] sm:rounded-[28px]">
                  <div className="flex h-full flex-col items-center justify-center rounded-[14px] bg-gradient-to-br from-purple-500/90 to-blue-600/90 p-4 sm:rounded-[20px]">
                    <div className="mb-2 h-3 w-16 rounded bg-white/30 sm:h-4 sm:w-24" />
                    <div className="mb-4 h-2 w-12 rounded bg-white/20 sm:w-16" />
                    <div className="h-16 w-12 rounded-lg bg-white/10 sm:h-24 sm:w-16" />
                  </div>
                </div>
              </div>
            </div>
            {/* Right panel mock */}
            <div className="hidden w-48 flex-col gap-3 border-l border-border/50 bg-muted/30 p-4 lg:flex">
              <div className="h-4 w-20 rounded bg-muted/60" />
              <div className="h-8 w-full rounded bg-muted/50" />
              <div className="h-4 w-16 rounded bg-muted/60" />
              <div className="h-8 w-full rounded bg-muted/50" />
              <div className="h-4 w-24 rounded bg-muted/60" />
              <div className="flex gap-2">
                {["#f72585", "#4361ee", "#06d6a0", "#fcbf49"].map((c) => (
                  <div
                    key={c}
                    className="h-6 w-6 rounded-full"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Glow effect below */}
        <div className="absolute -bottom-20 left-1/2 h-40 w-3/4 -translate-x-1/2 rounded-full bg-purple-500/10 blur-[80px]" />
      </motion.div>
    </section>
  );
}
