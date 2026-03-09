import JSZip from "jszip";
import { saveAs } from "file-saver";
import type { ExportSize } from "@/types/device";

export async function exportScreenshotsAsZip(
  blobs: { blob: Blob; size: ExportSize; screenshotIndex: number }[]
): Promise<void> {
  const zip = new JSZip();

  for (const { blob, size, screenshotIndex } of blobs) {
    const platform = size.platform === "ios" ? "AppStore" : "GooglePlay";
    const deviceName = size.device.replace(/[^a-zA-Z0-9-]/g, "-");
    const folder = `${platform}/${deviceName}`;
    const filename = `screenshot-${screenshotIndex + 1}.png`;
    zip.file(`${folder}/${filename}`, blob);
  }

  const content = await zip.generateAsync({ type: "blob" });
  saveAs(content, "screenshots.zip");
}

export function downloadBlob(blob: Blob, filename: string): void {
  saveAs(blob, filename);
}
