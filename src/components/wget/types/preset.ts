import { WgetOptions } from "@/types/wget";

export interface Preset {
  name: string;
  description: string;
  commands: string[];
  options: Partial<WgetOptions>;
}