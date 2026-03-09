"use client";

import {
  LayoutGrid,
  Type,
  Palette,
  ImagePlus,
  Layers,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEditorStore } from "@/stores/editor-store";
import type { SidebarPanel } from "@/types/editor";
import { cn } from "@/lib/utils";

const panels: { id: SidebarPanel; icon: typeof LayoutGrid; label: string }[] = [
  { id: "templates", icon: LayoutGrid, label: "Templates" },
  { id: "text", icon: Type, label: "Text" },
  { id: "background", icon: Palette, label: "Background" },
  { id: "images", icon: ImagePlus, label: "Images" },
  { id: "layers", icon: Layers, label: "Layers" },
];

export function Sidebar() {
  const { activeSidebarPanel, setActiveSidebarPanel } = useEditorStore();

  return (
    <div className="flex w-12 flex-col items-center gap-1 border-r border-border/50 bg-card/50 py-3 backdrop-blur-sm">
      {panels.map((panel) => (
        <Tooltip key={panel.id}>
          <TooltipTrigger>
            <button
              onClick={() => setActiveSidebarPanel(panel.id)}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg transition-colors",
                activeSidebarPanel === panel.id
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
              )}
            >
              <panel.icon className="h-4 w-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right">{panel.label}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
