declare module "cobe" {
  export interface COBEOptions {
    width: number;
    height: number;
    onRender: (state: Record<string, any>) => void;
    devicePixelRatio?: number;
    phi?: number;
    theta?: number;
    dark?: number;
    diffuse?: number;
    mapSamples?: number;
    mapBrightness?: number;
    baseColor?: [number, number, number];
    markerColor?: [number, number, number];
    glowColor?: [number, number, number];
    markers?: Array<{
      location: [number, number];
      size: number;
    }>;
  }

  export default function createGlobe(
    canvas: HTMLCanvasElement | null,
    options: COBEOptions
  ): {
    destroy: () => void;
  };
}
