import { create } from "zustand";
import type {
  EditorState,
  BackgroundConfig,
  Screenshot,
  SidebarPanel,
} from "@/types/editor";
import type { DeviceType, DeviceOrientation } from "@/types/device";

function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}

function createEmptyScreenshot(index: number): Screenshot {
  return {
    id: generateId(),
    name: `Screenshot ${index + 1}`,
    canvasJSON: "{}",
  };
}

const MAX_HISTORY = 50;

export const useEditorStore = create<EditorState>((set, get) => ({
  // Project
  projectName: "Untitled Project",
  screenshots: [createEmptyScreenshot(0)],
  activeScreenshotIndex: 0,

  // Canvas
  canvasJSON: "{}",
  selectedObjectIds: [],
  zoom: 0.3,

  // History
  history: ["{}"],
  historyIndex: 0,

  // Device
  deviceType: "iphone-6.9",
  deviceOrientation: "portrait",
  showDeviceFrame: true,

  // Background
  background: {
    type: "gradient",
    gradient: {
      type: "linear",
      angle: 135,
      stops: [
        { offset: 0, color: "#4361ee" },
        { offset: 1, color: "#7209b7" },
      ],
    },
  },

  // UI
  activeSidebarPanel: "templates",
  showProperties: true,

  // Actions
  setProjectName: (name: string) => set({ projectName: name }),

  setActiveScreenshot: (index: number) => {
    const state = get();
    // Save current canvas to current screenshot
    const screenshots = [...state.screenshots];
    screenshots[state.activeScreenshotIndex] = {
      ...screenshots[state.activeScreenshotIndex],
      canvasJSON: state.canvasJSON,
    };
    // Load new screenshot's canvas
    set({
      screenshots,
      activeScreenshotIndex: index,
      canvasJSON: screenshots[index].canvasJSON,
      history: [screenshots[index].canvasJSON],
      historyIndex: 0,
      selectedObjectIds: [],
    });
  },

  addScreenshot: () => {
    const state = get();
    const screenshots = [...state.screenshots];
    const newScreenshot = createEmptyScreenshot(screenshots.length);
    screenshots.push(newScreenshot);
    set({ screenshots });
  },

  removeScreenshot: (index: number) => {
    const state = get();
    if (state.screenshots.length <= 1) return;
    const screenshots = state.screenshots.filter((_, i) => i !== index);
    const newActiveIndex = Math.min(
      state.activeScreenshotIndex,
      screenshots.length - 1
    );
    set({
      screenshots,
      activeScreenshotIndex: newActiveIndex,
      canvasJSON: screenshots[newActiveIndex].canvasJSON,
    });
  },

  duplicateScreenshot: (index: number) => {
    const state = get();
    const screenshots = [...state.screenshots];
    const source = screenshots[index];
    const duplicate: Screenshot = {
      id: generateId(),
      name: `${source.name} (Copy)`,
      canvasJSON: source.canvasJSON,
      thumbnail: source.thumbnail,
    };
    screenshots.splice(index + 1, 0, duplicate);
    set({ screenshots });
  },

  reorderScreenshots: (from: number, to: number) => {
    const state = get();
    const screenshots = [...state.screenshots];
    const [moved] = screenshots.splice(from, 1);
    screenshots.splice(to, 0, moved);
    let newActiveIndex = state.activeScreenshotIndex;
    if (state.activeScreenshotIndex === from) {
      newActiveIndex = to;
    } else if (from < state.activeScreenshotIndex && to >= state.activeScreenshotIndex) {
      newActiveIndex--;
    } else if (from > state.activeScreenshotIndex && to <= state.activeScreenshotIndex) {
      newActiveIndex++;
    }
    set({ screenshots, activeScreenshotIndex: newActiveIndex });
  },

  updateScreenshotThumbnail: (index: number, thumbnail: string) => {
    const state = get();
    const screenshots = [...state.screenshots];
    screenshots[index] = { ...screenshots[index], thumbnail };
    set({ screenshots });
  },

  setCanvasJSON: (json: string) => set({ canvasJSON: json }),

  setSelectedObjectIds: (ids: string[]) => set({ selectedObjectIds: ids }),

  setZoom: (zoom: number) => set({ zoom: Math.max(0.1, Math.min(3, zoom)) }),

  pushHistory: (json: string) => {
    const state = get();
    const history = state.history.slice(0, state.historyIndex + 1);
    history.push(json);
    if (history.length > MAX_HISTORY) {
      history.shift();
    }
    set({
      history,
      historyIndex: history.length - 1,
      canvasJSON: json,
    });
  },

  undo: () => {
    const state = get();
    if (state.historyIndex > 0) {
      const newIndex = state.historyIndex - 1;
      set({
        historyIndex: newIndex,
        canvasJSON: state.history[newIndex],
      });
    }
  },

  redo: () => {
    const state = get();
    if (state.historyIndex < state.history.length - 1) {
      const newIndex = state.historyIndex + 1;
      set({
        historyIndex: newIndex,
        canvasJSON: state.history[newIndex],
      });
    }
  },

  canUndo: () => {
    const state = get();
    return state.historyIndex > 0;
  },

  canRedo: () => {
    const state = get();
    return state.historyIndex < state.history.length - 1;
  },

  setDeviceType: (deviceType: DeviceType) => set({ deviceType }),

  setDeviceOrientation: (orientation: DeviceOrientation) =>
    set({ deviceOrientation: orientation }),

  toggleDeviceFrame: () =>
    set((state) => ({ showDeviceFrame: !state.showDeviceFrame })),

  setBackground: (background: BackgroundConfig) => set({ background }),

  setActiveSidebarPanel: (panel: SidebarPanel) =>
    set({ activeSidebarPanel: panel }),

  setShowProperties: (show: boolean) => set({ showProperties: show }),
}));
