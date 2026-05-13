import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

interface P5WrapperProps {
  sketch: (p: p5) => void;
  options?: any;
}

export default function P5Wrapper({ sketch, options }: P5WrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<p5 | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Cleanup previous instance
    if (canvasRef.current) {
      canvasRef.current.remove();
    }

    const wrapper = (p: p5) => {
      (p as any).customOptions = options;
      sketch(p);
    };

    const p5Instance = new p5(wrapper, containerRef.current);
    canvasRef.current = p5Instance;

    const resizeObserver = new ResizeObserver(() => {
      if (containerRef.current && p5Instance) {
        const width = containerRef.current.offsetWidth;
        const height = containerRef.current.offsetHeight;
        if (width > 0 && height > 0) {
          p5Instance.resizeCanvas(width, height);
        }
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
      if (canvasRef.current) {
        canvasRef.current.remove();
      }
    };
  }, [sketch, options]);

  return <div ref={containerRef} className="w-full h-full min-h-[400px] bg-white rounded-xl overflow-hidden" />;
}
