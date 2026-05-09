'use client';

import { useEffect, useRef, useState } from 'react';

const skillGroups = [
  { title: 'Programming Languages', items: ['Python', 'C', 'C++'] },
  { title: 'Machine Learning AI', items: ['PyTorch', 'Scikit-learn', 'OpenCV', 'NumPy', 'Pandas', 'Matplotlib', 'Seaborn'] },
  { title: 'Web Development', items: ['HTML', 'JavaScript', 'TypeScript', 'Next.js', 'Node.js', 'Express.js', 'Tailwind CSS', 'MongoDB', 'Mongoose'] },
  { title: 'Deep Learning', items: ['CNN', 'LSTM'] },
  { title: 'Computer Vision', items: ['OpenCV'] },
  { title: 'Tools & Platforms', items: ['Git', 'GitHub', 'Docker', 'AWS', 'Hugging Face', 'Gradio', 'Vercel', 'Render'] },
  { title: 'Core CS Concepts', items: ['Data Structures & Algorithms', 'Object-Oriented Programming', 'Operating Systems', 'DBMS', 'Computer Networks'] },
];

function smoothStepPath(x1: number, y1: number, x2: number, y2: number): string {
  const midX = (x1 + x2) / 2;
  return `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;
}

interface Curve { d: string; key: string; type: 'spine' | 'sub'; }
interface SpineDot { key: string; cy: number; }

export default function SkillsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const subCardRefs = useRef<(HTMLDivElement | null)[][]>([]);
  const [curves, setCurves] = useState<Curve[]>([]);
  const [spineDots, setSpineDots] = useState<SpineDot[]>([]);
  const [svgBox, setSvgBox] = useState({ width: 0, height: 0 });

  skillGroups.forEach((_, i) => {
    if (!subCardRefs.current[i]) subCardRefs.current[i] = [];
  });

  useEffect(() => {
    function compute() {
      const container = containerRef.current;
      if (!container) return;

      const cRect = container.getBoundingClientRect();
      setSvgBox({ width: cRect.width, height: cRect.height });

      // spineX is always true center of the section (full-width element)
      const spineX = cRect.width / 2;

      const newCurves: Curve[] = [];
      const newDots: SpineDot[] = [];

      skillGroups.forEach((group, gi) => {
        const mainEl = mainCardRefs.current[gi];
        if (!mainEl) return;
        const mRect = mainEl.getBoundingClientRect();
        const isLeft = gi % 2 === 0;

        const mainCY = mRect.top + mRect.height / 2 - cRect.top;
        const mainInnerX = isLeft ? mRect.right - cRect.left : mRect.left - cRect.left;
        const mainOuterX = isLeft ? mRect.left - cRect.left : mRect.right - cRect.left;

        newCurves.push({
          key: `spine-${gi}`,
          type: 'spine',
          d: `M ${mainInnerX} ${mainCY} L ${spineX} ${mainCY}`,
        });
        newDots.push({ key: `dot-${gi}`, cy: mainCY });

        group.items.forEach((_, si) => {
          const subEl = subCardRefs.current[gi]?.[si];
          if (!subEl) return;
          const sRect = subEl.getBoundingClientRect();
          const subX = isLeft ? sRect.right - cRect.left : sRect.left - cRect.left;
          const subY = sRect.top + sRect.height / 2 - cRect.top;
          newCurves.push({
            key: `sub-${gi}-${si}`,
            type: 'sub',
            d: smoothStepPath(mainOuterX, mainCY, subX, subY),
          });
        });
      });

      setCurves(newCurves);
      setSpineDots(newDots);
    }

    const raf = requestAnimationFrame(compute);
    const ro = new ResizeObserver(compute);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener('scroll', compute, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('scroll', compute);
    };
  }, []);

  return (
    // containerRef is on the section — full viewport width, so left-1/2 = true screen center
    <section
  ref={containerRef}
  className="relative w-full px-6 pt-20 pb-40 "
  style={{
  background: 'linear-gradient(to bottom, transparent 0%, #0a0a0a 200px)',
  paddingTop: '6rem',
}}
>

      {/* SVG covers the full section — all paths are in same coord space as spine */}
      <svg
        className="pointer-events-none absolute inset-0 z-20 overflow-visible"
        width={svgBox.width}
        height={svgBox.height}
        aria-hidden="true"
      >
        {curves.filter(c => c.type === 'sub').map(c => (
          <path key={c.key} d={c.d} fill="none" stroke="#525252" strokeWidth={1} strokeOpacity={0.65} />
        ))}
        {curves.filter(c => c.type === 'spine').map(c => (
          <path key={c.key} d={c.d} fill="none" stroke="#737373" strokeWidth={1} strokeOpacity={0.9} />
        ))}
        {spineDots.map(dot => (
          <circle key={dot.key} cx={svgBox.width / 2} cy={dot.cy} r={4} fill="#737373" />
        ))}
      </svg>

     <div
  className="absolute left-1/2 w-px -translate-x-px bg-neutral-700 z-10"
  style={{
    top: '12rem',
    bottom: '0',
  }}
/>

      <p className="relative z-10 mb-12 text-center text-sm uppercase tracking-[0.3em] text-neutral-500">
        My Skills
      </p>

      {/* Cards grid — also full width, grid-cols-2 splits exactly at spine */}
      <div className="relative z-10 space-y-10">
        {skillGroups.map((group, gi) => {
          const isLeft = gi % 2 === 0;
          return (
            <div key={group.title} className="grid w-full grid-cols-2">

              {/* LEFT HALF — padding-right creates the gap from spine to main card */}
                    <div className="flex items-center justify-end" style={{ paddingRight: '3rem' }}>
                    {isLeft ? (
                        <div className="flex items-center gap-16">
                        <div className="flex flex-col items-end gap-3">
                            {group.items.map((item, si) => (
                            <div
                                key={item}
                                ref={el => { subCardRefs.current[gi][si] = el; }}
                                className="flex h-10 w-32 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900/60 px-3"
                            >
                                <span className="text-[0.55rem] uppercase tracking-[0.18em] text-neutral-400">{item}</span>
                            </div>
                            ))}
                        </div>
                        <div
                            ref={el => { mainCardRefs.current[gi] = el; }}
                            className="flex h-16 w-36 shrink-0 items-center justify-center rounded-2xl border border-neutral-700 bg-neutral-900/80 p-4 text-center"
                        >
                            <h2 className="text-xs font-semibold leading-tight text-neutral-100">{group.title}</h2>
                        </div>
                        </div>
                    ) : <div />}
                    </div>

                    {/* RIGHT HALF — padding-left creates the gap from spine to main card */}
                    <div className="flex items-center justify-start" style={{ paddingLeft: '3rem' }}>
                    {!isLeft ? (
                        <div className="flex items-center gap-16">
                        <div
                            ref={el => { mainCardRefs.current[gi] = el; }}
                            className="flex h-16 w-36 shrink-0 items-center justify-center rounded-2xl border border-neutral-700 bg-neutral-900/80 p-4 text-center"
                        >
                            <h2 className="text-xs font-semibold leading-tight text-neutral-100">{group.title}</h2>
                        </div>
                        <div className="flex flex-col items-start gap-3">
                            {group.items.map((item, si) => (
                            <div
                                key={item}
                                ref={el => { subCardRefs.current[gi][si] = el; }}
                                className="flex h-10 w-32 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900/60 px-3"
                            >
                                <span className="text-[0.55rem] uppercase tracking-[0.18em] text-neutral-400">{item}</span>
                            </div>
                            ))}
                        </div>
                        </div>
                    ) : <div />}
                        </div>
              

            </div>
          );
        })}
      </div>
    </section>
  );
}