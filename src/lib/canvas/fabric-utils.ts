import * as fabric from "fabric";

export function generateObjectId(): string {
  return `obj-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
}

export function createTextbox(
  text: string,
  options: Partial<fabric.Textbox> = {}
): fabric.Textbox {
  const textbox = new fabric.Textbox(text, {
    fontSize: 48,
    fontFamily: "Inter",
    fontWeight: 700,
    fill: "#ffffff",
    textAlign: "center",
    width: 400,
    ...options,
  });
  (textbox as fabric.Object & { id?: string }).id = generateObjectId();
  return textbox;
}

export async function loadImageToCanvas(
  dataUrl: string,
  maxWidth: number,
  maxHeight: number
): Promise<fabric.FabricImage> {
  const img = await fabric.FabricImage.fromURL(dataUrl);
  const scale = Math.min(
    maxWidth / (img.width || 1),
    maxHeight / (img.height || 1),
    1
  );
  img.scale(scale);
  (img as fabric.Object & { id?: string }).id = generateObjectId();
  return img;
}
