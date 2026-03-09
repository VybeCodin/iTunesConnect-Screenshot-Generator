"use client";

import { useEffect, useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Trash2,
  Copy,
} from "lucide-react";
import * as fabric from "fabric";
import { useEditorStore } from "@/stores/editor-store";
import { CURATED_FONTS } from "@/lib/constants/fonts";

interface SelectedObjectProps {
  type: string;
  left: number;
  top: number;
  width: number;
  height: number;
  angle: number;
  opacity: number;
  fill: string;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: string | number;
  fontStyle?: string;
  textAlign?: string;
  text?: string;
  letterSpacing?: number;
  lineHeight?: number;
}

interface PropertiesPanelProps {
  canvasRef: React.RefObject<fabric.Canvas | null>;
}

export function PropertiesPanel({ canvasRef }: PropertiesPanelProps) {
  const { selectedObjectIds } = useEditorStore();
  const [props, setProps] = useState<SelectedObjectProps | null>(null);

  const syncProps = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const activeObj = canvas.getActiveObject();
    if (!activeObj) {
      setProps(null);
      return;
    }

    const p: SelectedObjectProps = {
      type: activeObj.type || "object",
      left: Math.round(activeObj.left || 0),
      top: Math.round(activeObj.top || 0),
      width: Math.round((activeObj.width || 0) * (activeObj.scaleX || 1)),
      height: Math.round((activeObj.height || 0) * (activeObj.scaleY || 1)),
      angle: Math.round(activeObj.angle || 0),
      opacity: activeObj.opacity ?? 1,
      fill: (activeObj.fill as string) || "#000000",
    };

    if (activeObj.type === "textbox" || activeObj.type === "i-text" || activeObj.type === "text") {
      const textObj = activeObj as fabric.Textbox;
      p.fontFamily = textObj.fontFamily;
      p.fontSize = textObj.fontSize;
      p.fontWeight = textObj.fontWeight;
      p.fontStyle = textObj.fontStyle;
      p.textAlign = textObj.textAlign;
      p.text = textObj.text;
      p.letterSpacing = textObj.charSpacing ? textObj.charSpacing / 10 : 0;
      p.lineHeight = textObj.lineHeight;
    }

    setProps(p);
  }, [canvasRef]);

  useEffect(() => {
    syncProps();
  }, [selectedObjectIds, syncProps]);

  const updateProp = (key: string, value: unknown) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const activeObj = canvas.getActiveObject();
    if (!activeObj) return;

    if (key === "letterSpacing") {
      activeObj.set("charSpacing", (value as number) * 10);
    } else {
      activeObj.set(key as keyof fabric.Object, value);
    }
    canvas.renderAll();
    syncProps();
  };

  const deleteSelected = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const activeObj = canvas.getActiveObject();
    if (!activeObj) return;
    canvas.remove(activeObj);
    canvas.discardActiveObject();
    canvas.renderAll();
  };

  const duplicateSelected = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const activeObj = canvas.getActiveObject();
    if (!activeObj) return;
    const cloned = await activeObj.clone();
    cloned.set({ left: (cloned.left || 0) + 20, top: (cloned.top || 0) + 20 });
    canvas.add(cloned);
    canvas.setActiveObject(cloned);
    canvas.renderAll();
  };

  if (!props || selectedObjectIds.length === 0) {
    return (
      <div className="flex w-56 flex-col border-l border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="border-b border-border/50 px-4 py-3">
          <h3 className="text-sm font-semibold">Properties</h3>
        </div>
        <div className="flex flex-1 items-center justify-center p-4">
          <p className="text-center text-sm text-muted-foreground">
            Select an element to edit its properties
          </p>
        </div>
      </div>
    );
  }

  const isText =
    props.type === "textbox" || props.type === "i-text" || props.type === "text";

  return (
    <div className="flex w-56 flex-col border-l border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-border/50 px-4 py-3">
        <h3 className="text-sm font-semibold capitalize">{props.type}</h3>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={duplicateSelected}
          >
            <Copy className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-destructive"
            onClick={deleteSelected}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-4 p-4">
          {/* Position */}
          <div>
            <Label className="text-xs text-muted-foreground">Position</Label>
            <div className="mt-1 grid grid-cols-2 gap-2">
              <div>
                <span className="text-[10px] text-muted-foreground">X</span>
                <Input
                  type="number"
                  value={props.left}
                  onChange={(e) => updateProp("left", Number(e.target.value))}
                  className="h-7 text-xs"
                />
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground">Y</span>
                <Input
                  type="number"
                  value={props.top}
                  onChange={(e) => updateProp("top", Number(e.target.value))}
                  className="h-7 text-xs"
                />
              </div>
            </div>
          </div>

          {/* Size */}
          <div>
            <Label className="text-xs text-muted-foreground">Size</Label>
            <div className="mt-1 grid grid-cols-2 gap-2">
              <div>
                <span className="text-[10px] text-muted-foreground">W</span>
                <Input
                  type="number"
                  value={props.width}
                  className="h-7 text-xs"
                  readOnly
                />
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground">H</span>
                <Input
                  type="number"
                  value={props.height}
                  className="h-7 text-xs"
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Rotation */}
          <div>
            <Label className="text-xs text-muted-foreground">Rotation</Label>
            <div className="mt-1">
              <Input
                type="number"
                value={props.angle}
                onChange={(e) => updateProp("angle", Number(e.target.value))}
                className="h-7 text-xs"
              />
            </div>
          </div>

          {/* Opacity */}
          <div>
            <Label className="text-xs text-muted-foreground">Opacity</Label>
            <Slider
              value={[props.opacity * 100]}
              onValueChange={(val) => updateProp("opacity", (Array.isArray(val) ? val[0] : val) / 100)}
              max={100}
              step={1}
              className="mt-2"
            />
            <span className="text-[10px] text-muted-foreground">
              {Math.round(props.opacity * 100)}%
            </span>
          </div>

          {isText && (
            <>
              <Separator />

              {/* Font Family */}
              <div>
                <Label className="text-xs text-muted-foreground">Font</Label>
                <Select
                  value={props.fontFamily}
                  onValueChange={(v) => updateProp("fontFamily", v)}
                >
                  <SelectTrigger className="mt-1 h-7 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CURATED_FONTS.map((font) => (
                      <SelectItem key={font.family} value={font.family}>
                        <span style={{ fontFamily: font.family }}>
                          {font.family}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Font Size */}
              <div>
                <Label className="text-xs text-muted-foreground">Size</Label>
                <Input
                  type="number"
                  value={props.fontSize}
                  onChange={(e) =>
                    updateProp("fontSize", Number(e.target.value))
                  }
                  className="mt-1 h-7 text-xs"
                />
              </div>

              {/* Font Weight & Style */}
              <div className="flex gap-2">
                <Button
                  variant={
                    Number(props.fontWeight) >= 700 ? "secondary" : "ghost"
                  }
                  size="icon"
                  className="h-7 w-7"
                  onClick={() =>
                    updateProp(
                      "fontWeight",
                      Number(props.fontWeight) >= 700 ? 400 : 700
                    )
                  }
                >
                  <Bold className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant={props.fontStyle === "italic" ? "secondary" : "ghost"}
                  size="icon"
                  className="h-7 w-7"
                  onClick={() =>
                    updateProp(
                      "fontStyle",
                      props.fontStyle === "italic" ? "normal" : "italic"
                    )
                  }
                >
                  <Italic className="h-3.5 w-3.5" />
                </Button>
              </div>

              {/* Text Align */}
              <div>
                <Label className="text-xs text-muted-foreground">Align</Label>
                <div className="mt-1 flex gap-1">
                  {[
                    { val: "left", icon: AlignLeft },
                    { val: "center", icon: AlignCenter },
                    { val: "right", icon: AlignRight },
                  ].map(({ val, icon: Icon }) => (
                    <Button
                      key={val}
                      variant={props.textAlign === val ? "secondary" : "ghost"}
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => updateProp("textAlign", val)}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </Button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div>
                <Label className="text-xs text-muted-foreground">Color</Label>
                <div className="mt-1 flex items-center gap-2">
                  <input
                    type="color"
                    value={props.fill || "#ffffff"}
                    onChange={(e) => updateProp("fill", e.target.value)}
                    className="h-7 w-7 cursor-pointer rounded border-none bg-transparent"
                  />
                  <Input
                    value={props.fill || "#ffffff"}
                    onChange={(e) => updateProp("fill", e.target.value)}
                    className="h-7 text-xs"
                  />
                </div>
              </div>

              {/* Letter Spacing */}
              <div>
                <Label className="text-xs text-muted-foreground">
                  Letter Spacing
                </Label>
                <Slider
                  value={[props.letterSpacing || 0]}
                  onValueChange={(val) => updateProp("letterSpacing", Array.isArray(val) ? val[0] : val)}
                  min={-5}
                  max={50}
                  step={1}
                  className="mt-2"
                />
              </div>

              {/* Line Height */}
              <div>
                <Label className="text-xs text-muted-foreground">
                  Line Height
                </Label>
                <Slider
                  value={[(props.lineHeight || 1.2) * 100]}
                  onValueChange={(val) => updateProp("lineHeight", (Array.isArray(val) ? val[0] : val) / 100)}
                  min={80}
                  max={300}
                  step={5}
                  className="mt-2"
                />
              </div>
            </>
          )}

          {!isText && (
            <>
              <Separator />
              <div>
                <Label className="text-xs text-muted-foreground">Fill</Label>
                <div className="mt-1 flex items-center gap-2">
                  <input
                    type="color"
                    value={
                      typeof props.fill === "string" ? props.fill : "#000000"
                    }
                    onChange={(e) => updateProp("fill", e.target.value)}
                    className="h-7 w-7 cursor-pointer rounded border-none bg-transparent"
                  />
                  <Input
                    value={
                      typeof props.fill === "string" ? props.fill : "#000000"
                    }
                    onChange={(e) => updateProp("fill", e.target.value)}
                    className="h-7 text-xs"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
