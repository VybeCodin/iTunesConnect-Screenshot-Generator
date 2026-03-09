"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Download, Loader2 } from "lucide-react";
import { EXPORT_SIZES } from "@/lib/constants/devices";
import { cn } from "@/lib/utils";

interface ExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onExport: (selectedSizes: typeof EXPORT_SIZES) => Promise<void>;
}

export function ExportDialog({
  open,
  onOpenChange,
  onExport,
}: ExportDialogProps) {
  const [selectedSizes, setSelectedSizes] = useState<Set<string>>(
    new Set(EXPORT_SIZES.filter((s) => s.required).map((s) => s.label))
  );
  const [isExporting, setIsExporting] = useState(false);

  const toggleSize = (label: string) => {
    const next = new Set(selectedSizes);
    if (next.has(label)) {
      next.delete(label);
    } else {
      next.add(label);
    }
    setSelectedSizes(next);
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const sizes = EXPORT_SIZES.filter((s) => selectedSizes.has(s.label));
      await onExport(sizes);
    } finally {
      setIsExporting(false);
    }
  };

  const iosSizes = EXPORT_SIZES.filter((s) => s.platform === "ios");
  const androidSizes = EXPORT_SIZES.filter((s) => s.platform === "android");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Export Screenshots</DialogTitle>
          <DialogDescription>
            Select the sizes you want to export. A ZIP file will be downloaded.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* iOS Sizes */}
          <div>
            <Label className="text-sm font-semibold">App Store (iOS)</Label>
            <div className="mt-2 space-y-2">
              {iosSizes.map((size) => (
                <label
                  key={size.label}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-lg border p-2.5 transition-colors",
                    selectedSizes.has(size.label)
                      ? "border-purple-500 bg-purple-500/10"
                      : "border-border/50 hover:border-border"
                  )}
                >
                  <input
                    type="checkbox"
                    checked={selectedSizes.has(size.label)}
                    onChange={() => toggleSize(size.label)}
                    className="rounded"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{size.device}</p>
                    <p className="text-xs text-muted-foreground">
                      {size.width} x {size.height}
                    </p>
                  </div>
                  {size.required && (
                    <span className="rounded bg-purple-500/20 px-1.5 py-0.5 text-[10px] font-medium text-purple-400">
                      Required
                    </span>
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Android Sizes */}
          <div>
            <Label className="text-sm font-semibold">Google Play (Android)</Label>
            <div className="mt-2 space-y-2">
              {androidSizes.map((size) => (
                <label
                  key={size.label}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-lg border p-2.5 transition-colors",
                    selectedSizes.has(size.label)
                      ? "border-purple-500 bg-purple-500/10"
                      : "border-border/50 hover:border-border"
                  )}
                >
                  <input
                    type="checkbox"
                    checked={selectedSizes.has(size.label)}
                    onChange={() => toggleSize(size.label)}
                    className="rounded"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{size.device}</p>
                    <p className="text-xs text-muted-foreground">
                      {size.width} x {size.height}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleExport}
            disabled={selectedSizes.size === 0 || isExporting}
            className="gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white"
          >
            {isExporting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            Export {selectedSizes.size} {selectedSizes.size === 1 ? "size" : "sizes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
