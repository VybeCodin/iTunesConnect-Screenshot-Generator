"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import * as fabric from "fabric";
import { Canvas, type CanvasHandle } from "@/components/editor/Canvas";
import { Toolbar } from "@/components/editor/Toolbar";
import { Sidebar } from "@/components/editor/Sidebar";
import { SidebarPanel } from "@/components/editor/SidebarPanel";
import { PropertiesPanel } from "@/components/editor/PropertiesPanel";
import { ScreenshotList } from "@/components/editor/ScreenshotList";
import { ExportDialog } from "@/components/editor/ExportDialog";
import { useEditorStore } from "@/stores/editor-store";
import { exportScreenshotsAsZip } from "@/lib/canvas/export";
import type { ExportSize } from "@/types/device";
import { toast } from "sonner";

export default function EditorPage() {
  const canvasRef = useRef<CanvasHandle>(null);
  const [showExport, setShowExport] = useState(false);
  const { undo, redo } = useEditorStore();

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMod = e.metaKey || e.ctrlKey;

      if (isMod && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      if (isMod && e.key === "z" && e.shiftKey) {
        e.preventDefault();
        redo();
      }
      if (isMod && e.key === "s") {
        e.preventDefault();
        toast.success("Project saved");
      }
      if (e.key === "Delete" || e.key === "Backspace") {
        const canvas = canvasRef.current?.canvas;
        if (!canvas) return;
        const active = canvas.getActiveObject();
        if (active && !(active as fabric.Textbox).isEditing) {
          canvas.remove(active);
          canvas.discardActiveObject();
          canvas.renderAll();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo]);

  const handleExport = useCallback(
    async (selectedSizes: ExportSize[]) => {
      const canvasHandle = canvasRef.current;
      if (!canvasHandle) return;

      const screenshots = useEditorStore.getState().screenshots;
      const blobs: { blob: Blob; size: ExportSize; screenshotIndex: number }[] =
        [];

      for (let i = 0; i < screenshots.length; i++) {
        for (const size of selectedSizes) {
          const blob = await canvasHandle.exportToBlob(size.width, size.height);
          if (blob) {
            blobs.push({ blob, size, screenshotIndex: i });
          }
        }
      }

      if (blobs.length > 0) {
        await exportScreenshotsAsZip(blobs);
        toast.success(
          `Exported ${blobs.length} screenshot${blobs.length > 1 ? "s" : ""}`
        );
      }

      setShowExport(false);
    },
    []
  );

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <Toolbar onExport={() => setShowExport(true)} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <SidebarPanel />

        <Canvas ref={canvasRef} />

        <PropertiesPanel
          canvasRef={{ current: canvasRef.current?.canvas ?? null }}
        />
      </div>

      <ScreenshotList />

      <ExportDialog
        open={showExport}
        onOpenChange={setShowExport}
        onExport={handleExport}
      />
    </div>
  );
}
