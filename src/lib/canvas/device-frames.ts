import { DEVICES } from "@/lib/constants/devices";
import type { DeviceType } from "@/types/device";

export function getDeviceSpec(deviceType: DeviceType) {
  return DEVICES[deviceType] || DEVICES["iphone-6.9"];
}

export function getDeviceDimensions(
  deviceType: DeviceType,
  orientation: "portrait" | "landscape"
) {
  const spec = getDeviceSpec(deviceType);
  if (orientation === "landscape") {
    return { width: spec.height, height: spec.width };
  }
  return { width: spec.width, height: spec.height };
}

export function getScreenArea(
  deviceType: DeviceType,
  orientation: "portrait" | "landscape"
) {
  const spec = getDeviceSpec(deviceType);
  if (orientation === "landscape") {
    return {
      x: spec.screenY,
      y: spec.screenX,
      width: spec.screenHeight,
      height: spec.screenWidth,
    };
  }
  return {
    x: spec.screenX,
    y: spec.screenY,
    width: spec.screenWidth,
    height: spec.screenHeight,
  };
}
