"use client";

import { useEditorStore } from "@/stores/editor-store";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TextEditor } from "./TextEditor";
import { BackgroundPicker } from "./BackgroundPicker";
import { ImageUploader } from "./ImageUploader";
import { LayerPanel } from "./LayerPanel";
import { TemplatePanel } from "./TemplatePanel";

export function SidebarPanel() {
  const { activeSidebarPanel } = useEditorStore();

  return (
    <div className="flex w-64 flex-col border-r border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="border-b border-border/50 px-4 py-3">
        <h3 className="text-sm font-semibold capitalize">
          {activeSidebarPanel}
        </h3>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4">
          {activeSidebarPanel === "templates" && <TemplatePanel />}
          {activeSidebarPanel === "text" && <TextEditor />}
          {activeSidebarPanel === "background" && <BackgroundPicker />}
          {activeSidebarPanel === "images" && <ImageUploader />}
          {activeSidebarPanel === "layers" && <LayerPanel />}
        </div>
      </ScrollArea>
    </div>
  );
}
