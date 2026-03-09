import type { DeviceType, DeviceOrientation } from "./device";

export interface TextStyle {
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  fill: string;
  textAlign: "left" | "center" | "right";
  letterSpacing: number;
  lineHeight: number;
  shadow?: {
    color: string;
    offsetX: number;
    offsetY: number;
    blur: number;
  };
  stroke?: string;
  strokeWidth?: number;
}

export interface GradientStop {
  offset: number;
  color: string;
}

export interface BackgroundConfig {
  type: "solid" | "gradient" | "image";
  color?: string;
  gradient?: {
    type: "linear" | "radial";
    angle: number;
    stops: GradientStop[];
  };
  image?: {
    url: string;
    blur: number;
    opacity: number;
  };
}

export interface Screenshot {
  id: string;
  name: string;
  canvasJSON: string;
  thumbnail?: string;
}

export interface TextOptions {
  text: string;
  style?: Partial<TextStyle>;
  position?: { x: number; y: number };
}

export interface EditorState {
  // Project
  projectName: string;
  screenshots: Screenshot[];
  activeScreenshotIndex: number;

  // Canvas
  canvasJSON: string;
  selectedObjectIds: string[];
  zoom: number;

  // History
  history: string[];
  historyIndex: number;

  // Device
  deviceType: DeviceType;
  deviceOrientation: DeviceOrientation;
  showDeviceFrame: boolean;

  // Background
  background: BackgroundConfig;

  // UI
  activeSidebarPanel: SidebarPanel;
  showProperties: boolean;

  // Actions
  setProjectName: (name: string) => void;
  setActiveScreenshot: (index: number) => void;
  addScreenshot: () => void;
  removeScreenshot: (index: number) => void;
  duplicateScreenshot: (index: number) => void;
  reorderScreenshots: (from: number, to: number) => void;
  updateScreenshotThumbnail: (index: number, thumbnail: string) => void;

  setCanvasJSON: (json: string) => void;
  setSelectedObjectIds: (ids: string[]) => void;
  setZoom: (zoom: number) => void;

  pushHistory: (json: string) => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;

  setDeviceType: (device: DeviceType) => void;
  setDeviceOrientation: (orientation: DeviceOrientation) => void;
  toggleDeviceFrame: () => void;

  setBackground: (bg: BackgroundConfig) => void;

  setActiveSidebarPanel: (panel: SidebarPanel) => void;
  setShowProperties: (show: boolean) => void;
}

export type SidebarPanel =
  | "templates"
  | "text"
  | "background"
  | "images"
  | "layers";
