import { create } from "zustand";

interface ProjectMeta {
  id: string;
  name: string;
  updatedAt: number;
  thumbnail?: string;
}

interface ProjectStoreState {
  projects: ProjectMeta[];
  currentProjectId: string | null;
  loadProjects: () => void;
  saveProject: (id: string, name: string, data: string, thumbnail?: string) => void;
  deleteProject: (id: string) => void;
  getProjectData: (id: string) => string | null;
  setCurrentProject: (id: string | null) => void;
}

const PROJECTS_KEY = "screenshot-gen-projects";
const PROJECT_DATA_PREFIX = "screenshot-gen-data-";

export const useProjectStore = create<ProjectStoreState>((set, get) => ({
  projects: [],
  currentProjectId: null,

  loadProjects: () => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(PROJECTS_KEY);
      const projects: ProjectMeta[] = raw ? JSON.parse(raw) : [];
      set({ projects });
    } catch {
      set({ projects: [] });
    }
  },

  saveProject: (id: string, name: string, data: string, thumbnail?: string) => {
    if (typeof window === "undefined") return;
    const state = get();
    const now = Date.now();
    const meta: ProjectMeta = { id, name, updatedAt: now, thumbnail };
    const projects = state.projects.filter((p) => p.id !== id);
    projects.unshift(meta);
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
    localStorage.setItem(PROJECT_DATA_PREFIX + id, data);
    set({ projects, currentProjectId: id });
  },

  deleteProject: (id: string) => {
    if (typeof window === "undefined") return;
    const state = get();
    const projects = state.projects.filter((p) => p.id !== id);
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
    localStorage.removeItem(PROJECT_DATA_PREFIX + id);
    set({ projects });
  },

  getProjectData: (id: string) => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(PROJECT_DATA_PREFIX + id);
  },

  setCurrentProject: (id: string | null) => set({ currentProjectId: id }),
}));
