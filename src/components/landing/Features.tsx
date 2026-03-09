"use client";

import { motion } from "framer-motion";
import {
  Smartphone,
  Palette,
  Type,
  Download,
  Layers,
  Zap,
  Grid3X3,
  MonitorSmartphone,
} from "lucide-react";

const features = [
  {
    icon: Smartphone,
    title: "Device Frames",
    description:
      "Realistic iPhone, iPad & Android device frames. Auto-clip your screenshots perfectly.",
  },
  {
    icon: Type,
    title: "Beautiful Typography",
    description:
      "25+ curated Google Fonts with full styling controls. Headlines that pop.",
  },
  {
    icon: Palette,
    title: "Gradient Backgrounds",
    description:
      "20+ trendy gradient presets plus custom builder. Solid colors and image backgrounds too.",
  },
  {
    icon: Grid3X3,
    title: "Pro Templates",
    description:
      "Start from professionally designed templates. Minimal, bold, dark, gradient styles.",
  },
  {
    icon: Download,
    title: "One-Click Export",
    description:
      "Export all required sizes for App Store & Google Play at once. ZIP download included.",
  },
  {
    icon: Layers,
    title: "Multi-Screenshot",
    description:
      "Create up to 10 screenshots per project. Consistent styling across all screens.",
  },
  {
    icon: MonitorSmartphone,
    title: "All Devices",
    description:
      "iPhone 6.9\", 6.7\", iPad 13\", Android phones & tablets. Every size covered.",
  },
  {
    icon: Zap,
    title: "Completely Free",
    description:
      "No accounts, no subscriptions, no watermarks. Everything runs in your browser.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Features() {
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
            Everything you need to create{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              perfect screenshots
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A powerful editor with all the tools, none of the complexity.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group relative rounded-xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-colors hover:border-purple-500/30 hover:bg-card/80"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 transition-colors group-hover:bg-purple-500/20">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 font-semibold">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
