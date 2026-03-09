import type { BackgroundConfig } from "@/types/editor";

export interface TemplateDefinition {
  id: string;
  name: string;
  category: string;
  background: BackgroundConfig;
  elements: {
    type: "headline" | "subtitle" | "placeholder";
    text?: string;
    fontSize?: number;
    fontWeight?: number;
    fill?: string;
    positionY?: number;
    width?: number;
    height?: number;
  }[];
}

export const BUILT_IN_TEMPLATES: TemplateDefinition[] = [
  {
    id: "minimal-clean",
    name: "Minimal Clean",
    category: "minimal",
    background: {
      type: "gradient",
      gradient: {
        type: "linear",
        angle: 180,
        stops: [
          { offset: 0, color: "#f1f5f9" },
          { offset: 1, color: "#e2e8f0" },
        ],
      },
    },
    elements: [
      { type: "headline", text: "Clean & Simple", fontSize: 72, fontWeight: 800, fill: "#1e293b", positionY: 0.08 },
      { type: "subtitle", text: "Your app, beautifully presented", fontSize: 32, fontWeight: 400, fill: "#64748b", positionY: 0.18 },
      { type: "placeholder", positionY: 0.55, width: 0.55, height: 0.5 },
    ],
  },
  {
    id: "bold-gradient",
    name: "Bold Gradient",
    category: "bold",
    background: {
      type: "gradient",
      gradient: {
        type: "linear",
        angle: 135,
        stops: [
          { offset: 0, color: "#a855f7" },
          { offset: 1, color: "#2563eb" },
        ],
      },
    },
    elements: [
      { type: "headline", text: "Make It Bold", fontSize: 80, fontWeight: 900, fill: "#ffffff", positionY: 0.06 },
      { type: "subtitle", text: "Stand out from the crowd", fontSize: 34, fontWeight: 400, fill: "#ffffffcc", positionY: 0.17 },
      { type: "placeholder", positionY: 0.55, width: 0.55, height: 0.5 },
    ],
  },
  {
    id: "dark-premium",
    name: "Dark Premium",
    category: "dark",
    background: {
      type: "gradient",
      gradient: {
        type: "linear",
        angle: 180,
        stops: [
          { offset: 0, color: "#111827" },
          { offset: 1, color: "#1f2937" },
        ],
      },
    },
    elements: [
      { type: "headline", text: "Premium Experience", fontSize: 72, fontWeight: 700, fill: "#ffffff", positionY: 0.08 },
      { type: "subtitle", text: "Elevate your workflow", fontSize: 30, fontWeight: 300, fill: "#9ca3af", positionY: 0.18 },
      { type: "placeholder", positionY: 0.55, width: 0.55, height: 0.5 },
    ],
  },
  {
    id: "sunset-glow",
    name: "Sunset Glow",
    category: "gradient",
    background: {
      type: "gradient",
      gradient: {
        type: "linear",
        angle: 135,
        stops: [
          { offset: 0, color: "#ec4899" },
          { offset: 1, color: "#fb923c" },
        ],
      },
    },
    elements: [
      { type: "headline", text: "Warm & Inviting", fontSize: 72, fontWeight: 800, fill: "#ffffff", positionY: 0.08 },
      { type: "subtitle", text: "The app you'll love", fontSize: 32, fontWeight: 400, fill: "#ffffffdd", positionY: 0.18 },
      { type: "placeholder", positionY: 0.55, width: 0.55, height: 0.5 },
    ],
  },
  {
    id: "ocean-breeze",
    name: "Ocean Breeze",
    category: "gradient",
    background: {
      type: "gradient",
      gradient: {
        type: "linear",
        angle: 135,
        stops: [
          { offset: 0, color: "#60a5fa" },
          { offset: 1, color: "#14b8a6" },
        ],
      },
    },
    elements: [
      { type: "headline", text: "Stay Connected", fontSize: 72, fontWeight: 700, fill: "#ffffff", positionY: 0.08 },
      { type: "subtitle", text: "Wherever you go", fontSize: 32, fontWeight: 400, fill: "#ffffffcc", positionY: 0.18 },
      { type: "placeholder", positionY: 0.55, width: 0.55, height: 0.5 },
    ],
  },
];
