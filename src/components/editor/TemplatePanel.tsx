"use client";

import { cn } from "@/lib/utils";

interface TemplatePreview {
  id: string;
  name: string;
  gradient: string;
  category: string;
}

const templatePreviews: TemplatePreview[] = [
  { id: "minimal-clean", name: "Minimal Clean", gradient: "from-slate-100 to-slate-200", category: "minimal" },
  { id: "bold-gradient", name: "Bold Gradient", gradient: "from-purple-500 to-blue-600", category: "bold" },
  { id: "dark-premium", name: "Dark Premium", gradient: "from-gray-900 to-gray-800", category: "dark" },
  { id: "sunset-glow", name: "Sunset Glow", gradient: "from-pink-500 to-orange-400", category: "gradient" },
  { id: "ocean-breeze", name: "Ocean Breeze", gradient: "from-blue-400 to-teal-500", category: "gradient" },
  { id: "forest-calm", name: "Forest Calm", gradient: "from-emerald-600 to-green-500", category: "gradient" },
  { id: "midnight-blue", name: "Midnight Blue", gradient: "from-indigo-900 to-blue-800", category: "dark" },
  { id: "coral-reef", name: "Coral Reef", gradient: "from-red-400 to-pink-500", category: "bold" },
  { id: "lavender-dream", name: "Lavender Dream", gradient: "from-purple-400 to-indigo-300", category: "gradient" },
  { id: "arctic-frost", name: "Arctic Frost", gradient: "from-blue-100 to-cyan-50", category: "minimal" },
  { id: "neon-nights", name: "Neon Nights", gradient: "from-violet-600 to-fuchsia-500", category: "bold" },
  { id: "warm-earth", name: "Warm Earth", gradient: "from-amber-600 to-orange-500", category: "gradient" },
];

export function TemplatePanel() {
  const applyTemplate = (template: TemplatePreview) => {
    window.dispatchEvent(
      new CustomEvent("editor:applyTemplate", { detail: template })
    );
  };

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">
        Click a template to apply it to your canvas
      </p>
      <div className="grid grid-cols-2 gap-2">
        {templatePreviews.map((template) => (
          <button
            key={template.id}
            onClick={() => applyTemplate(template)}
            className="group relative aspect-[9/16] overflow-hidden rounded-lg border border-border/50 transition-all hover:scale-105 hover:border-purple-500/50"
          >
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-br",
                template.gradient
              )}
            />
            {/* Mini phone mockup */}
            <div className="absolute inset-0 flex flex-col items-center justify-between p-2">
              <div className="mt-3 text-center">
                <div className="mx-auto mb-1 h-1.5 w-10 rounded bg-white/40" />
                <div className="mx-auto h-1 w-6 rounded bg-white/25" />
              </div>
              <div className="mb-2 h-[40%] w-[60%] rounded bg-white/15" />
            </div>
            {/* Label */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-1.5">
              <p className="text-[8px] font-medium text-white">
                {template.name}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
