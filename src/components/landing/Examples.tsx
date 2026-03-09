"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const exampleScreenshots = [
  {
    gradient: "from-purple-500 to-blue-600",
    headline: "Track Your Habits",
    subtitle: "Build better routines",
  },
  {
    gradient: "from-pink-500 to-orange-400",
    headline: "Smart Budgeting",
    subtitle: "Take control of finances",
  },
  {
    gradient: "from-emerald-500 to-teal-600",
    headline: "Meditate Daily",
    subtitle: "Find your inner peace",
  },
  {
    gradient: "from-blue-600 to-indigo-700",
    headline: "Learn Languages",
    subtitle: "Master any language",
  },
];

export function Examples() {
  return (
    <section className="relative px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Screenshots that{" "}
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              convert
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            See what you can create in just a few minutes.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center gap-4 overflow-hidden sm:gap-6"
        >
          {exampleScreenshots.map((example, i) => (
            <motion.div
              key={example.headline}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="w-[140px] flex-shrink-0 sm:w-[180px] md:w-[200px]"
            >
              <div
                className={`aspect-[9/19.5] rounded-[16px] bg-gradient-to-br ${example.gradient} flex flex-col items-center justify-between p-4 shadow-lg sm:rounded-[24px] sm:p-6`}
              >
                <div className="mt-4 text-center sm:mt-8">
                  <p className="text-[10px] font-bold text-white sm:text-sm md:text-base">
                    {example.headline}
                  </p>
                  <p className="mt-1 text-[8px] text-white/70 sm:text-xs">
                    {example.subtitle}
                  </p>
                </div>
                <div className="mb-2 h-[45%] w-[75%] rounded-lg bg-white/15 backdrop-blur-sm sm:mb-4 sm:rounded-xl" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <Link
            href="/editor"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-12 bg-gradient-to-r from-purple-500 to-blue-500 px-8 text-base font-semibold text-white shadow-lg shadow-purple-500/25"
            )}
          >
            Start Creating Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <p className="mt-4 text-sm text-muted-foreground">
            No account required. 100% free.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
