export interface FontOption {
  family: string;
  weights: number[];
  category: "sans-serif" | "serif" | "display" | "monospace";
}

export const CURATED_FONTS: FontOption[] = [
  { family: "Inter", weights: [300, 400, 500, 600, 700, 800, 900], category: "sans-serif" },
  { family: "Plus Jakarta Sans", weights: [300, 400, 500, 600, 700, 800], category: "sans-serif" },
  { family: "DM Sans", weights: [300, 400, 500, 600, 700], category: "sans-serif" },
  { family: "Space Grotesk", weights: [300, 400, 500, 600, 700], category: "sans-serif" },
  { family: "Outfit", weights: [300, 400, 500, 600, 700, 800, 900], category: "sans-serif" },
  { family: "Sora", weights: [300, 400, 500, 600, 700, 800], category: "sans-serif" },
  { family: "Manrope", weights: [300, 400, 500, 600, 700, 800], category: "sans-serif" },
  { family: "Urbanist", weights: [300, 400, 500, 600, 700, 800, 900], category: "sans-serif" },
  { family: "Poppins", weights: [300, 400, 500, 600, 700, 800, 900], category: "sans-serif" },
  { family: "Montserrat", weights: [300, 400, 500, 600, 700, 800, 900], category: "sans-serif" },
  { family: "Nunito", weights: [300, 400, 500, 600, 700, 800, 900], category: "sans-serif" },
  { family: "Rubik", weights: [300, 400, 500, 600, 700, 800, 900], category: "sans-serif" },
  { family: "Work Sans", weights: [300, 400, 500, 600, 700, 800, 900], category: "sans-serif" },
  { family: "Lora", weights: [400, 500, 600, 700], category: "serif" },
  { family: "Playfair Display", weights: [400, 500, 600, 700, 800, 900], category: "serif" },
  { family: "DM Serif Display", weights: [400], category: "serif" },
  { family: "Fraunces", weights: [300, 400, 500, 600, 700, 800, 900], category: "serif" },
  { family: "Archivo Black", weights: [400], category: "display" },
  { family: "Bebas Neue", weights: [400], category: "display" },
  { family: "Anton", weights: [400], category: "display" },
  { family: "Righteous", weights: [400], category: "display" },
  { family: "Pacifico", weights: [400], category: "display" },
  { family: "JetBrains Mono", weights: [300, 400, 500, 600, 700, 800], category: "monospace" },
  { family: "Fira Code", weights: [300, 400, 500, 600, 700], category: "monospace" },
];

export const DEFAULT_FONT = "Inter";
export const DEFAULT_FONT_SIZE = 48;
export const DEFAULT_FONT_WEIGHT = 700;

export function getGoogleFontsUrl(fonts: string[]): string {
  const families = fonts
    .map((f) => f.replace(/ /g, "+"))
    .join("&family=");
  return `https://fonts.googleapis.com/css2?family=${families}&display=swap`;
}
