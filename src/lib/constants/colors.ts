export const PRESET_COLORS = [
  "#000000", "#1a1a2e", "#16213e", "#0f3460",
  "#ffffff", "#f8f9fa", "#e9ecef", "#dee2e6",
  "#e63946", "#f72585", "#b5179e", "#7209b7",
  "#560bad", "#480ca8", "#3a0ca3", "#3f37c9",
  "#4361ee", "#4895ef", "#4cc9f0", "#06d6a0",
  "#00b4d8", "#0077b6", "#023e8a", "#03045e",
  "#2dc653", "#52b788", "#40916c", "#2d6a4f",
  "#f77f00", "#fcbf49", "#eae2b7", "#d62828",
];

export interface PresetGradient {
  name: string;
  stops: { offset: number; color: string }[];
  angle: number;
}

export const PRESET_GRADIENTS: PresetGradient[] = [
  {
    name: "Sunset",
    stops: [
      { offset: 0, color: "#f72585" },
      { offset: 1, color: "#7209b7" },
    ],
    angle: 135,
  },
  {
    name: "Ocean",
    stops: [
      { offset: 0, color: "#0077b6" },
      { offset: 1, color: "#00b4d8" },
    ],
    angle: 135,
  },
  {
    name: "Forest",
    stops: [
      { offset: 0, color: "#2d6a4f" },
      { offset: 1, color: "#52b788" },
    ],
    angle: 135,
  },
  {
    name: "Fire",
    stops: [
      { offset: 0, color: "#d62828" },
      { offset: 1, color: "#f77f00" },
    ],
    angle: 135,
  },
  {
    name: "Lavender",
    stops: [
      { offset: 0, color: "#7209b7" },
      { offset: 1, color: "#4cc9f0" },
    ],
    angle: 135,
  },
  {
    name: "Midnight",
    stops: [
      { offset: 0, color: "#0f3460" },
      { offset: 1, color: "#1a1a2e" },
    ],
    angle: 180,
  },
  {
    name: "Coral",
    stops: [
      { offset: 0, color: "#e63946" },
      { offset: 1, color: "#fcbf49" },
    ],
    angle: 135,
  },
  {
    name: "Aurora",
    stops: [
      { offset: 0, color: "#4361ee" },
      { offset: 0.5, color: "#7209b7" },
      { offset: 1, color: "#f72585" },
    ],
    angle: 135,
  },
  {
    name: "Electric",
    stops: [
      { offset: 0, color: "#3a0ca3" },
      { offset: 1, color: "#4cc9f0" },
    ],
    angle: 135,
  },
  {
    name: "Peach",
    stops: [
      { offset: 0, color: "#fcbf49" },
      { offset: 1, color: "#f72585" },
    ],
    angle: 135,
  },
  {
    name: "Deep Space",
    stops: [
      { offset: 0, color: "#03045e" },
      { offset: 0.5, color: "#480ca8" },
      { offset: 1, color: "#b5179e" },
    ],
    angle: 180,
  },
  {
    name: "Fresh",
    stops: [
      { offset: 0, color: "#06d6a0" },
      { offset: 1, color: "#4895ef" },
    ],
    angle: 135,
  },
  {
    name: "Rose Gold",
    stops: [
      { offset: 0, color: "#f8f9fa" },
      { offset: 1, color: "#f72585" },
    ],
    angle: 135,
  },
  {
    name: "Nordic",
    stops: [
      { offset: 0, color: "#e9ecef" },
      { offset: 1, color: "#4895ef" },
    ],
    angle: 180,
  },
  {
    name: "Neon",
    stops: [
      { offset: 0, color: "#f72585" },
      { offset: 0.5, color: "#7209b7" },
      { offset: 1, color: "#4361ee" },
    ],
    angle: 45,
  },
  {
    name: "Emerald",
    stops: [
      { offset: 0, color: "#2dc653" },
      { offset: 1, color: "#023e8a" },
    ],
    angle: 135,
  },
  {
    name: "Warm Night",
    stops: [
      { offset: 0, color: "#1a1a2e" },
      { offset: 1, color: "#e63946" },
    ],
    angle: 180,
  },
  {
    name: "Sky",
    stops: [
      { offset: 0, color: "#4cc9f0" },
      { offset: 1, color: "#f8f9fa" },
    ],
    angle: 180,
  },
  {
    name: "Candy",
    stops: [
      { offset: 0, color: "#f72585" },
      { offset: 0.5, color: "#b5179e" },
      { offset: 1, color: "#4cc9f0" },
    ],
    angle: 135,
  },
  {
    name: "Charcoal",
    stops: [
      { offset: 0, color: "#1a1a2e" },
      { offset: 1, color: "#16213e" },
    ],
    angle: 180,
  },
];
