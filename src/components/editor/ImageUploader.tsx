"use client";

import { useCallback, useState } from "react";
import { Upload, Image as ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ImageUploader() {
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    const file = files[0];
    if (!file || !file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = () => {
      window.dispatchEvent(
        new CustomEvent("editor:addImage", {
          detail: { dataUrl: reader.result as string },
        })
      );
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">
        Upload screenshots or images to add to your canvas
      </p>

      {/* Drop zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors",
          isDragging
            ? "border-purple-500 bg-purple-500/10"
            : "border-border/50 hover:border-border"
        )}
      >
        <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
        <p className="text-xs text-muted-foreground">
          Drag & drop or click to upload
        </p>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFiles(e.target.files)}
          className="absolute inset-0 cursor-pointer opacity-0"
          style={{ position: "relative", width: "100%", marginTop: "8px" }}
        />
      </div>

      <Button
        variant="outline"
        className="w-full gap-2"
        onClick={() => {
          const input = document.createElement("input");
          input.type = "file";
          input.accept = "image/*";
          input.onchange = (e) => {
            const target = e.target as HTMLInputElement;
            handleFiles(target.files);
          };
          input.click();
        }}
      >
        <ImageIcon className="h-4 w-4" />
        Upload Image
      </Button>
    </div>
  );
}
