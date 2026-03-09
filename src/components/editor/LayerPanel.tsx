"use client";

import { Eye, EyeOff, Lock, Unlock, ArrowUp, ArrowDown, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface LayerItem {
  id: string;
  type: string;
  name: string;
  visible: boolean;
  locked: boolean;
}

export function LayerPanel() {
  const [layers, setLayers] = useState<LayerItem[]>([]);

  useEffect(() => {
    const handleLayersUpdate = (e: Event) => {
      const event = e as CustomEvent<LayerItem[]>;
      setLayers(event.detail);
    };
    window.addEventListener("editor:layersUpdated", handleLayersUpdate);
    // Request initial layers
    window.dispatchEvent(new CustomEvent("editor:requestLayers"));
    return () => {
      window.removeEventListener("editor:layersUpdated", handleLayersUpdate);
    };
  }, []);

  const dispatchLayerAction = (action: string, id: string) => {
    window.dispatchEvent(
      new CustomEvent("editor:layerAction", { detail: { action, id } })
    );
  };

  if (layers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <p className="text-xs text-muted-foreground">
          No layers yet. Add elements to the canvas.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {[...layers].reverse().map((layer) => (
        <div
          key={layer.id}
          className="flex items-center gap-1 rounded-md border border-border/50 p-1.5 text-xs"
        >
          <span className="flex-1 truncate" title={layer.name}>
            {layer.name}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5"
            onClick={() =>
              dispatchLayerAction(layer.visible ? "hide" : "show", layer.id)
            }
          >
            {layer.visible ? (
              <Eye className="h-3 w-3" />
            ) : (
              <EyeOff className="h-3 w-3" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5"
            onClick={() =>
              dispatchLayerAction(layer.locked ? "unlock" : "lock", layer.id)
            }
          >
            {layer.locked ? (
              <Lock className="h-3 w-3" />
            ) : (
              <Unlock className="h-3 w-3" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5"
            onClick={() => dispatchLayerAction("moveUp", layer.id)}
          >
            <ArrowUp className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5"
            onClick={() => dispatchLayerAction("moveDown", layer.id)}
          >
            <ArrowDown className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 text-destructive"
            onClick={() => dispatchLayerAction("delete", layer.id)}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      ))}
    </div>
  );
}
