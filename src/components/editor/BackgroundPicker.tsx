"use client";

import { useEditorStore } from "@/stores/editor-store";
import { PRESET_COLORS, PRESET_GRADIENTS } from "@/lib/constants/colors";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function BackgroundPicker() {
  const { background, setBackground } = useEditorStore();

  const handleSolidColor = (color: string) => {
    setBackground({ type: "solid", color });
  };

  const handleGradient = (gradient: (typeof PRESET_GRADIENTS)[0]) => {
    setBackground({
      type: "gradient",
      gradient: {
        type: "linear",
        angle: gradient.angle,
        stops: gradient.stops,
      },
    });
  };

  return (
    <div className="space-y-4">
      {/* Type selector */}
      <div className="flex gap-1 rounded-lg border border-border/50 p-1">
        <button
          onClick={() =>
            setBackground({ type: "solid", color: background.color || "#4361ee" })
          }
          className={cn(
            "flex-1 rounded-md px-2 py-1 text-xs font-medium transition-colors",
            background.type === "solid"
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Solid
        </button>
        <button
          onClick={() =>
            setBackground({
              type: "gradient",
              gradient: background.gradient || {
                type: "linear",
                angle: 135,
                stops: [
                  { offset: 0, color: "#4361ee" },
                  { offset: 1, color: "#7209b7" },
                ],
              },
            })
          }
          className={cn(
            "flex-1 rounded-md px-2 py-1 text-xs font-medium transition-colors",
            background.type === "gradient"
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Gradient
        </button>
        <button
          onClick={() =>
            setBackground({
              type: "image",
              image: background.image || { url: "", blur: 0, opacity: 1 },
            })
          }
          className={cn(
            "flex-1 rounded-md px-2 py-1 text-xs font-medium transition-colors",
            background.type === "image"
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Image
        </button>
      </div>

      {/* Solid Color Picker */}
      {background.type === "solid" && (
        <div className="space-y-3">
          <div>
            <Label className="text-xs text-muted-foreground">Color</Label>
            <div className="mt-1 flex items-center gap-2">
              <input
                type="color"
                value={background.color || "#4361ee"}
                onChange={(e) => handleSolidColor(e.target.value)}
                className="h-8 w-8 cursor-pointer rounded border-none bg-transparent"
              />
              <Input
                value={background.color || "#4361ee"}
                onChange={(e) => handleSolidColor(e.target.value)}
                className="h-7 text-xs"
              />
            </div>
          </div>
          <Separator />
          <Label className="text-xs text-muted-foreground">Presets</Label>
          <div className="grid grid-cols-6 gap-1.5">
            {PRESET_COLORS.map((color) => (
              <button
                key={color}
                onClick={() => handleSolidColor(color)}
                className={cn(
                  "h-7 w-7 rounded-md border transition-transform hover:scale-110",
                  background.color === color
                    ? "border-white ring-1 ring-white/50"
                    : "border-border/50"
                )}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Gradient Presets */}
      {background.type === "gradient" && (
        <div className="space-y-3">
          <Label className="text-xs text-muted-foreground">
            Gradient Presets
          </Label>
          <div className="grid grid-cols-3 gap-2">
            {PRESET_GRADIENTS.map((gradient) => (
              <button
                key={gradient.name}
                onClick={() => handleGradient(gradient)}
                className="group relative h-12 overflow-hidden rounded-lg border border-border/50 transition-transform hover:scale-105"
                style={{
                  background: `linear-gradient(${gradient.angle}deg, ${gradient.stops
                    .map((s) => `${s.color} ${s.offset * 100}%`)
                    .join(", ")})`,
                }}
              >
                <span className="absolute inset-0 flex items-center justify-center bg-black/0 text-[9px] font-medium text-white opacity-0 transition-opacity group-hover:bg-black/30 group-hover:opacity-100">
                  {gradient.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Image Background */}
      {background.type === "image" && (
        <div className="space-y-3">
          <Label className="text-xs text-muted-foreground">
            Upload Background Image
          </Label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                  setBackground({
                    type: "image",
                    image: {
                      url: reader.result as string,
                      blur: 0,
                      opacity: 1,
                    },
                  });
                };
                reader.readAsDataURL(file);
              }
            }}
            className="w-full text-xs"
          />
        </div>
      )}
    </div>
  );
}
