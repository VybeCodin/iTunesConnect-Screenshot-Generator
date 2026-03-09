export type DeviceType =
  | "iphone-6.9"
  | "iphone-6.7"
  | "iphone-6.1"
  | "iphone-5.5"
  | "ipad-13"
  | "ipad-12.9"
  | "android-phone"
  | "android-tablet-7"
  | "android-tablet-10";

export type DeviceOrientation = "portrait" | "landscape";

export type Platform = "ios" | "android" | "both";

export interface DeviceSpec {
  id: DeviceType;
  name: string;
  platform: Platform;
  width: number;
  height: number;
  screenX: number;
  screenY: number;
  screenWidth: number;
  screenHeight: number;
  cornerRadius: number;
  frameAsset?: string;
}

export interface ExportSize {
  label: string;
  width: number;
  height: number;
  platform: Platform;
  device: string;
  required: boolean;
}
