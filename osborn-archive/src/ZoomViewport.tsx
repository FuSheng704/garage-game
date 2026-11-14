import { useEffect, useState, type ReactNode } from 'react';

interface ZoomViewportProps { children: ReactNode; }

export default function ZoomViewport({ children }: ZoomViewportProps) {
  const [viewport, setViewport] = useState({ width: window.innerWidth, height: window.innerHeight });
  useEffect(() => {
    const resize = () => setViewport({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);
  // Preserve the existing 1024px layout breakpoint and Figma canvas dimensions.
  const desktop = viewport.width >= 1024;
  const width = desktop ? 1920 : 667;
  const height = desktop ? 1081 : 375;
  // Mobile can grow beyond its 667×375 canvas; desktop keeps its existing cap.
  const scale = Math.min(viewport.width / width, viewport.height / height, desktop ? 1 : Infinity);
  return <>
    <div className="h-dvh w-full overflow-auto bg-[#050d0f]">
      <div className="relative mx-auto" style={{ width: width * scale, height: height * scale }}>
        <div style={{ width, height, transform: `scale(${scale})`, transformOrigin: 'top left' }}>{children}</div>
      </div>
    </div>
  </>;
}
