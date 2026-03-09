"use client";

import { Plus, X, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEditorStore } from "@/stores/editor-store";
import { cn } from "@/lib/utils";

export function ScreenshotList() {
  const {
    screenshots,
    activeScreenshotIndex,
    setActiveScreenshot,
    addScreenshot,
    removeScreenshot,
    duplicateScreenshot,
  } = useEditorStore();

  return (
    <div className="flex h-20 items-center gap-2 border-t border-border/50 bg-card/50 px-4 backdrop-blur-sm">
      <div className="flex items-center gap-2 overflow-x-auto">
        {screenshots.map((screenshot, index) => (
          <div
            key={screenshot.id}
            className="group relative flex-shrink-0"
          >
            <button
              onClick={() => setActiveScreenshot(index)}
              className={cn(
                "relative flex h-14 w-10 items-center justify-center rounded-lg border-2 transition-all",
                activeScreenshotIndex === index
                  ? "border-purple-500 bg-purple-500/10 shadow-sm shadow-purple-500/20"
                  : "border-border/50 bg-muted/30 hover:border-border"
              )}
            >
              {screenshot.thumbnail ? (
                <img
                  src={screenshot.thumbnail}
                  alt={screenshot.name}
                  className="h-full w-full rounded-md object-cover"
                />
              ) : (
                <span className="text-[10px] font-medium text-muted-foreground">
                  {index + 1}
                </span>
              )}
            </button>

            {/* Actions on hover */}
            <div className="absolute -right-1 -top-1 hidden gap-0.5 group-hover:flex">
              <Tooltip>
                <TooltipTrigger>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      duplicateScreenshot(index);
                    }}
                    className="flex h-4 w-4 items-center justify-center rounded-full bg-card shadow-sm"
                  >
                    <Copy className="h-2.5 w-2.5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Duplicate</TooltipContent>
              </Tooltip>
              {screenshots.length > 1 && (
                <Tooltip>
                  <TooltipTrigger>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeScreenshot(index);
                      }}
                      className="flex h-4 w-4 items-center justify-center rounded-full bg-card shadow-sm text-destructive"
                    >
                      <X className="h-2.5 w-2.5" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Remove</TooltipContent>
                </Tooltip>
              )}
            </div>
          </div>
        ))}
      </div>

      {screenshots.length < 10 && (
        <Button
          variant="outline"
          size="icon"
          className="h-14 w-10 flex-shrink-0 border-dashed"
          onClick={addScreenshot}
        >
          <Plus className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
