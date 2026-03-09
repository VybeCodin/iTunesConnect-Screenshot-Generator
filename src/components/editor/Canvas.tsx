"use client";

import {
  useEffect,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import * as fabric from "fabric";
import { useEditorStore } from "@/stores/editor-store";
import { DEVICES } from "@/lib/constants/devices";

export interface CanvasHandle {
  canvas: fabric.Canvas | null;
  exportToBlob: (width: number, height: number) => Promise<Blob | null>;
}

export const Canvas = forwardRef<CanvasHandle>(function Canvas(_, ref) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isLoadingRef = useRef(false);

  const {
    deviceType,
    zoom,
    background,
    canvasJSON,
    setCanvasJSON,
    setSelectedObjectIds,
    pushHistory,
    historyIndex,
    history,
  } = useEditorStore();

  const device = DEVICES[deviceType];

  useImperativeHandle(ref, () => ({
    canvas: fabricRef.current,
    exportToBlob: async (width: number, height: number) => {
      const canvas = fabricRef.current;
      if (!canvas) return null;

      const multiplier = width / device.width;

      return new Promise<Blob | null>((resolve) => {
        const dataUrl = canvas.toDataURL({
          format: "png",
          multiplier,
          width: device.width,
          height: device.height,
        });

        // Convert dataURL to blob
        fetch(dataUrl)
          .then((res) => res.blob())
          .then(resolve)
          .catch(() => resolve(null));
      });
    },
  }));

  // Initialize Fabric canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: device.width,
      height: device.height,
      backgroundColor: "transparent",
      selection: true,
      preserveObjectStacking: true,
    });

    fabricRef.current = canvas;

    // Selection events
    canvas.on("selection:created", (e) => {
      const ids = e.selected?.map((o) => (o as fabric.Object & { id?: string }).id || "").filter(Boolean) || [];
      setSelectedObjectIds(ids);
    });

    canvas.on("selection:updated", (e) => {
      const ids = e.selected?.map((o) => (o as fabric.Object & { id?: string }).id || "").filter(Boolean) || [];
      setSelectedObjectIds(ids);
    });

    canvas.on("selection:cleared", () => {
      setSelectedObjectIds([]);
    });

    // Track modifications for undo/redo
    canvas.on("object:modified", () => {
      if (!isLoadingRef.current) {
        const json = JSON.stringify(canvas.toJSON());
        pushHistory(json);
      }
    });

    return () => {
      canvas.dispose();
      fabricRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update canvas dimensions when device changes
  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    canvas.setDimensions({ width: device.width, height: device.height });
    canvas.renderAll();
  }, [device.width, device.height]);

  // Apply background
  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    if (background.type === "solid") {
      canvas.backgroundColor = background.color || "#4361ee";
    } else if (background.type === "gradient" && background.gradient) {
      const { angle, stops } = background.gradient;
      const rad = (angle * Math.PI) / 180;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);

      const grad = new fabric.Gradient({
        type: "linear",
        coords: {
          x1: device.width / 2 - (cos * device.width) / 2,
          y1: device.height / 2 - (sin * device.height) / 2,
          x2: device.width / 2 + (cos * device.width) / 2,
          y2: device.height / 2 + (sin * device.height) / 2,
        },
        colorStops: stops.map((s) => ({
          offset: s.offset,
          color: s.color,
        })),
      });
      canvas.backgroundColor = grad as unknown as string;
    } else if (background.type === "image" && background.image?.url) {
      fabric.FabricImage.fromURL(background.image.url).then((img) => {
        if (!img) return;
        img.scaleToWidth(device.width);
        img.scaleToHeight(device.height);
        canvas.backgroundImage = img;
        canvas.renderAll();
      });
    }
    canvas.renderAll();
  }, [background, device.width, device.height]);

  // Load canvas from store (undo/redo)
  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    const json = history[historyIndex];
    if (!json || json === "{}") return;

    isLoadingRef.current = true;
    canvas.loadFromJSON(json).then(() => {
      canvas.renderAll();
      isLoadingRef.current = false;
    });
  }, [historyIndex, history]);

  // Handle custom events from sidebar panels
  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    const handleAddText = (e: Event) => {
      const event = e as CustomEvent;
      const { text, fontSize, fontWeight, fill, fontFamily, textAlign } =
        event.detail;

      const textbox = new fabric.Textbox(text, {
        left: device.width / 2 - 200,
        top: device.height * 0.15,
        width: 400,
        fontSize,
        fontWeight,
        fill,
        fontFamily,
        textAlign,
        originX: "left",
        originY: "top",
      });
      // Assign unique id
      (textbox as fabric.Object & { id?: string }).id = `text-${Date.now()}`;
      (textbox as fabric.Object & { name?: string }).name = text.substring(0, 20);

      canvas.add(textbox);
      canvas.setActiveObject(textbox);
      canvas.renderAll();

      const json = JSON.stringify(canvas.toJSON());
      pushHistory(json);
    };

    const handleAddImage = (e: Event) => {
      const event = e as CustomEvent;
      const { dataUrl } = event.detail;

      fabric.FabricImage.fromURL(dataUrl).then((img) => {
        if (!img) return;
        // Scale to fit within canvas
        const maxWidth = device.width * 0.6;
        const maxHeight = device.height * 0.5;
        const scale = Math.min(
          maxWidth / (img.width || 1),
          maxHeight / (img.height || 1)
        );
        img.scale(scale);
        img.set({
          left: device.width / 2,
          top: device.height / 2,
          originX: "center",
          originY: "center",
        });
        (img as fabric.Object & { id?: string }).id = `img-${Date.now()}`;
        (img as fabric.Object & { name?: string }).name = "Image";

        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();

        const json = JSON.stringify(canvas.toJSON());
        pushHistory(json);
      });
    };

    const handleApplyTemplate = (e: Event) => {
      const event = e as CustomEvent;
      const template = event.detail;

      // Clear canvas
      canvas.clear();

      // Set background based on template gradient
      const gradientClasses = template.gradient as string;
      // Parse Tailwind gradient to real colors (simplified mapping)
      const gradientMap: Record<string, [string, string]> = {
        "from-slate-100 to-slate-200": ["#f1f5f9", "#e2e8f0"],
        "from-purple-500 to-blue-600": ["#a855f7", "#2563eb"],
        "from-gray-900 to-gray-800": ["#111827", "#1f2937"],
        "from-pink-500 to-orange-400": ["#ec4899", "#fb923c"],
        "from-blue-400 to-teal-500": ["#60a5fa", "#14b8a6"],
        "from-emerald-600 to-green-500": ["#059669", "#22c55e"],
        "from-indigo-900 to-blue-800": ["#312e81", "#1e40af"],
        "from-red-400 to-pink-500": ["#f87171", "#ec4899"],
        "from-purple-400 to-indigo-300": ["#c084fc", "#a5b4fc"],
        "from-blue-100 to-cyan-50": ["#dbeafe", "#ecfeff"],
        "from-violet-600 to-fuchsia-500": ["#7c3aed", "#d946ef"],
        "from-amber-600 to-orange-500": ["#d97706", "#f97316"],
      };

      const colors = gradientMap[gradientClasses] || ["#4361ee", "#7209b7"];

      useEditorStore.getState().setBackground({
        type: "gradient",
        gradient: {
          type: "linear",
          angle: 135,
          stops: [
            { offset: 0, color: colors[0] },
            { offset: 1, color: colors[1] },
          ],
        },
      });

      // Add template text elements
      const headline = new fabric.Textbox("Your App Name", {
        left: device.width / 2,
        top: device.height * 0.08,
        width: device.width * 0.8,
        fontSize: 72,
        fontWeight: 800,
        fill: "#ffffff",
        fontFamily: "Inter",
        textAlign: "center",
        originX: "center",
        originY: "top",
      });
      (headline as fabric.Object & { id?: string }).id = `text-headline-${Date.now()}`;
      (headline as fabric.Object & { name?: string }).name = "Headline";

      const subtitle = new fabric.Textbox("Describe your amazing feature", {
        left: device.width / 2,
        top: device.height * 0.18,
        width: device.width * 0.7,
        fontSize: 32,
        fontWeight: 400,
        fill: "#ffffffcc",
        fontFamily: "Inter",
        textAlign: "center",
        originX: "center",
        originY: "top",
      });
      (subtitle as fabric.Object & { id?: string }).id = `text-subtitle-${Date.now()}`;
      (subtitle as fabric.Object & { name?: string }).name = "Subtitle";

      // Add a phone mockup rectangle as placeholder
      const phoneMock = new fabric.Rect({
        left: device.width / 2,
        top: device.height * 0.55,
        width: device.width * 0.55,
        height: device.height * 0.5,
        rx: 30,
        ry: 30,
        fill: "rgba(255,255,255,0.12)",
        originX: "center",
        originY: "center",
      });
      (phoneMock as fabric.Object & { id?: string }).id = `rect-phone-${Date.now()}`;
      (phoneMock as fabric.Object & { name?: string }).name = "Phone Placeholder";

      canvas.add(phoneMock, headline, subtitle);
      canvas.renderAll();

      const json = JSON.stringify(canvas.toJSON());
      pushHistory(json);
    };

    const handleRequestLayers = () => {
      updateLayers();
    };

    const handleLayerAction = (e: Event) => {
      const event = e as CustomEvent;
      const { action, id } = event.detail;
      const objects = canvas.getObjects();
      const obj = objects.find(
        (o) => (o as fabric.Object & { id?: string }).id === id
      );
      if (!obj) return;

      switch (action) {
        case "hide":
          obj.visible = false;
          break;
        case "show":
          obj.visible = true;
          break;
        case "lock":
          obj.selectable = false;
          obj.evented = false;
          break;
        case "unlock":
          obj.selectable = true;
          obj.evented = true;
          break;
        case "moveUp":
          canvas.bringObjectForward(obj);
          break;
        case "moveDown":
          canvas.sendObjectBackwards(obj);
          break;
        case "delete":
          canvas.remove(obj);
          break;
      }
      canvas.renderAll();
      updateLayers();
    };

    const updateLayers = () => {
      const objects = canvas.getObjects();
      const layers = objects.map((obj) => ({
        id: (obj as fabric.Object & { id?: string }).id || "",
        type: obj.type || "object",
        name: (obj as fabric.Object & { name?: string }).name || obj.type || "Object",
        visible: obj.visible !== false,
        locked: !obj.selectable,
      }));
      window.dispatchEvent(
        new CustomEvent("editor:layersUpdated", { detail: layers })
      );
    };

    // Refresh layers on any canvas change
    canvas.on("object:added", updateLayers);
    canvas.on("object:removed", updateLayers);
    canvas.on("object:modified", updateLayers);

    window.addEventListener("editor:addText", handleAddText);
    window.addEventListener("editor:addImage", handleAddImage);
    window.addEventListener("editor:applyTemplate", handleApplyTemplate);
    window.addEventListener("editor:requestLayers", handleRequestLayers);
    window.addEventListener("editor:layerAction", handleLayerAction);

    return () => {
      canvas.off("object:added", updateLayers);
      canvas.off("object:removed", updateLayers);
      canvas.off("object:modified", updateLayers);
      window.removeEventListener("editor:addText", handleAddText);
      window.removeEventListener("editor:addImage", handleAddImage);
      window.removeEventListener("editor:applyTemplate", handleApplyTemplate);
      window.removeEventListener("editor:requestLayers", handleRequestLayers);
      window.removeEventListener("editor:layerAction", handleLayerAction);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [device.width, device.height]);

  // Zoom handler
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = -e.deltaY / 500;
        useEditorStore.getState().setZoom(zoom + delta);
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [zoom]);

  return (
    <div
      ref={containerRef}
      className="flex flex-1 items-center justify-center overflow-auto bg-[radial-gradient(circle_at_50%_50%,rgba(100,100,100,0.06)_1px,transparent_1px)] bg-[length:24px_24px]"
      style={{ backgroundColor: "hsl(var(--background))" }}
    >
      <div
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: "center center",
          transition: "transform 0.1s ease-out",
        }}
      >
        <div
          className="relative shadow-2xl"
          style={{
            width: device.width,
            height: device.height,
            borderRadius: device.cornerRadius,
            overflow: "hidden",
          }}
        >
          <canvas ref={canvasRef} />
        </div>
      </div>
    </div>
  );
});
