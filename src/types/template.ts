import type { BackgroundConfig, TextStyle } from "./editor";
import type { DeviceType } from "./device";

export type TemplateCategory =
  | "minimal"
  | "bold"
  | "dark"
  | "gradient"
  | "panoramic";

export interface TemplateVariable {
  default: string;
  position: { x: number; y: number };
  style: Partial<TextStyle>;
}

export interface Template {
  id: string;
  name: string;
  category: TemplateCategory;
  preview: string;
  canvas: object;
  variables: {
    headline: TemplateVariable;
    subtitle?: TemplateVariable;
    background: BackgroundConfig;
    accentColor: string;
  };
  supportedDevices: DeviceType[];
}
