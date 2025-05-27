"use client";

import createGlobe, { COBEOptions } from "cobe";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0.9,
  diffuse: 0.1,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [0.55, 0.55, 0.55],
  markerColor: [0.9, 0.9, 0.9],
  glowColor: [0.25, 0.25, 0.25],
  markers: [
    // Jakarta, Indonesia coordinates
    { location: [-6.2088, 106.8456], size: 0.12 },
  ],
};

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  let phi = 0;
  let width = 0;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const previousMousePosition = useRef<number | null>(null);
  const [r, setR] = useState(0);
  const lastPhi = useRef(phi);

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    previousMousePosition.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (
      pointerInteracting.current !== null &&
      previousMousePosition.current !== null
    ) {
      const delta = clientX - previousMousePosition.current;
      const rotationFactor = 0.005;
      const newR = delta * rotationFactor;

      lastPhi.current += newR;
      setR(newR);

      previousMousePosition.current = clientX;
    }
  };

  const onRender = useCallback(
    (state: Record<string, number>) => {
      if (!pointerInteracting.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        phi += 0.002;
      } else {
        phi = lastPhi.current;
      }
      state.phi = phi + r;
      state.width = width * 2;
      state.height = width * 2;
    },
    [r],
  );

  const onResize = () => {
    if (canvasRef.current) {
      width = canvasRef.current.offsetWidth;
    }
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender,
    });

    setTimeout(() => (canvasRef.current!.style.opacity = "1"));
    return () => globe.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]",
        className,
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]",
        )}
        ref={canvasRef}
        onPointerDown={(e) => updatePointerInteraction(e.clientX)}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  );
}
