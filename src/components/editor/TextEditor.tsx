"use client";

import { Button } from "@/components/ui/button";
import { Type, Heading1, Heading2, AlignCenter } from "lucide-react";

interface TextPreset {
  label: string;
  icon: typeof Type;
  text: string;
  fontSize: number;
  fontWeight: number;
  fill: string;
}

const textPresets: TextPreset[] = [
  {
    label: "Headline",
    icon: Heading1,
    text: "Your Headline Here",
    fontSize: 72,
    fontWeight: 800,
    fill: "#ffffff",
  },
  {
    label: "Subtitle",
    icon: Heading2,
    text: "Add a subtitle",
    fontSize: 36,
    fontWeight: 400,
    fill: "#ffffff",
  },
  {
    label: "Body Text",
    icon: Type,
    text: "Body text goes here",
    fontSize: 24,
    fontWeight: 400,
    fill: "#ffffff",
  },
  {
    label: "Caption",
    icon: AlignCenter,
    text: "Caption",
    fontSize: 18,
    fontWeight: 500,
    fill: "#ffffffcc",
  },
];

export function TextEditor() {
  const addTextToCanvas = (preset: TextPreset) => {
    // Dispatch custom event to Canvas component
    window.dispatchEvent(
      new CustomEvent("editor:addText", {
        detail: {
          text: preset.text,
          fontSize: preset.fontSize,
          fontWeight: preset.fontWeight,
          fill: preset.fill,
          fontFamily: "Inter",
          textAlign: "center",
        },
      })
    );
  };

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">
        Click to add text to the canvas
      </p>
      {textPresets.map((preset) => (
        <Button
          key={preset.label}
          variant="outline"
          className="h-auto w-full justify-start gap-3 p-3"
          onClick={() => addTextToCanvas(preset)}
        >
          <preset.icon className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
          <div className="text-left">
            <p className="text-sm font-medium">{preset.label}</p>
            <p className="text-[10px] text-muted-foreground">
              {preset.fontSize}px, {preset.fontWeight >= 700 ? "Bold" : "Regular"}
            </p>
          </div>
        </Button>
      ))}
    </div>
  );
}
