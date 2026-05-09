'use client';

import { useEffect, useRef, useState } from 'react';

const projects = [
  {
    name: 'Human Activity Classification',
    techStack: 'PyTorch, OpenCV, ResNet18, LSTM, Gradio',
    purpose: 'AI video activity recognition',
    liveUrl: 'https://huggingface.co/spaces/samiran3474/human_activity_detection',
  },
  {
    name: 'AI Interview Platform',
    techStack: 'Next.js, Node.js, MongoDB, Socket.io, Gemini API',
    purpose: 'AI-powered mock interview system',
    liveUrl: 'https://ai-interview-platform-flame-iota.vercel.app/',
  },
  {
    name: 'Heart Disease Prediction',
    techStack: 'Scikit-learn, Pandas, Matplotlib',
    purpose: 'Predict heart disease risk using ML',
    liveUrl: 'https://oueb2ignq8rjdhghkjhltd.streamlit.app/',
  },
];

function smoothStep(x1: number, y1: number, x2: number, y2: number) {
  const midX = (x1 + x2) / 2;
  return `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;
}

interface Curve { d: string; key: string; }
interface Dot { key: string; cy: number; }

export default function ProjectsPage() {
  const sectionRef = useRef<HTMLElement>(null);

  // refs: [project][card] — 0=name, 1=live, 2=tech, 3=purpose
  const cardRefs = useRef<(HTMLDivElement | null)[][]>([]);
  projects.forEach((_, i) => { if (!cardRefs.current[i]) cardRefs.current[i] = []; });

  const [curves, setCurves] = useState<Curve[]>([]);
  const [dots, setDots] = useState<Dot[]>([]);
  const [svgBox, setSvgBox] = useState({ w: 0, h: 0 });

  useEffect(() => {
    function compute() {
      const sec = sectionRef.current;
      if (!sec) return;
      const cRect = sec.getBoundingClientRect();
      setSvgBox({ w: cRect.width, h: cRect.height });

      const spineX = cRect.width / 2;
      const newCurves: Curve[] = [];
      const newDots: Dot[] = [];

      projects.forEach((_, gi) => {
        const isLeft = gi % 2 === 0;
        const nameEl = cardRefs.current[gi]?.[0];
        const liveEl = cardRefs.current[gi]?.[1];
        const techEl = cardRefs.current[gi]?.[2];
        const purposeEl = cardRefs.current[gi]?.[3];
        if (!nameEl || !liveEl || !techEl || !purposeEl) return;

        const nameR = nameEl.getBoundingClientRect();
        const liveR = liveEl.getBoundingClientRect();
        const techR = techEl.getBoundingClientRect();
        const purposeR = purposeEl.getBoundingClientRect();

        const nameCY = nameR.top + nameR.height / 2 - cRect.top;
        const nameInnerX = isLeft ? nameR.right - cRect.left : nameR.left - cRect.left;

        // spine dot at name card center Y
        newDots.push({ key: `dot-${gi}`, cy: nameCY });

        // straight line: name card inner edge → spine
        newCurves.push({
          key: `spine-${gi}`,
          d: `M ${nameInnerX} ${nameCY} L ${spineX} ${nameCY}`,
        });

        // name card outer edge
        const nameOuterX = isLeft ? nameR.left - cRect.left : nameR.right - cRect.left;

        // live badge center
        const liveCY = liveR.top + liveR.height / 2 - cRect.top;
        const liveX = isLeft ? liveR.right - cRect.left : liveR.left - cRect.left;

        // name → live
        newCurves.push({
          key: `name-live-${gi}`,
          d: smoothStep(nameOuterX, nameCY, liveX, liveCY),
        });

        // live outer edge
        const liveOuterX = isLeft ? liveR.left - cRect.left : liveR.right - cRect.left;

        // live → tech
        const techCY = techR.top + techR.height / 2 - cRect.top;
        const techX = isLeft ? techR.right - cRect.left : techR.left - cRect.left;
        newCurves.push({
          key: `live-tech-${gi}`,
          d: smoothStep(liveOuterX, liveCY, techX, techCY),
        });

        // live → purpose
        const purposeCY = purposeR.top + purposeR.height / 2 - cRect.top;
        const purposeX = isLeft ? purposeR.right - cRect.left : purposeR.left - cRect.left;
        newCurves.push({
          key: `live-purpose-${gi}`,
          d: smoothStep(liveOuterX, liveCY, purposeX, purposeCY),
        });
      });

      setCurves(newCurves);
      setDots(newDots);
    }

    const raf = requestAnimationFrame(compute);
    const ro = new ResizeObserver(compute);
    if (sectionRef.current) ro.observe(sectionRef.current);
    window.addEventListener('scroll', compute, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('scroll', compute);
    };
  }, []);

  const cardBase = "rounded-xl border border-neutral-800 bg-neutral-900/70 px-4 py-3 text-center shadow-[0_0_20px_rgba(0,0,0,0.4)]";

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen pt-32 pb-28 flex flex-col justify-center">

        {/* SVG connector layer */}
        <svg className="pointer-events-none absolute inset-0 z-20 overflow-visible" width={svgBox.w} height={svgBox.h} aria-hidden="true">
          {curves.map(c => (
            <path key={c.key} d={c.d} fill="none" stroke="#525252" strokeWidth={1} strokeOpacity={0.7} />
          ))}
          {dots.map(d => (
            <circle key={d.key} cx={svgBox.w / 2} cy={d.cy} r={4} fill="#737373" />
          ))}
        </svg>

        {/* Vertical spine — on section so left-1/2 = screen center */}
        <div className="absolute left-1/2 top-61 h-96 w-px -translate-x-px bg-neutral-800 z-10" />

        <p className="relative z-10 mb-16 text-center text-sm uppercase tracking-[0.3em] text-neutral-500">
          My Projects
        </p>

        <div className="relative z-10 space-y-20">
          {projects.map((project, gi) => {
            const isLeft = gi % 2 === 0;
            return (
              <div key={project.name} className="grid w-full grid-cols-2">

                {/* LEFT HALF */}
                <div className="flex items-center justify-end">
                  {isLeft && (
                    <div className="flex items-center gap-8" style={{ paddingRight: '3rem' }}>
                      {/* Sub cards */}
                      <div className="flex flex-col gap-3">
                        <div ref={el => { cardRefs.current[gi][2] = el; }} className={`${cardBase} w-36`}>
                          <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-500">Tech Stack</p>
                          <p className="mt-1 text-[10px] leading-relaxed text-neutral-300">{project.techStack}</p>
                        </div>
                        <div ref={el => { cardRefs.current[gi][3] = el; }} className={`${cardBase} w-36`}>
                          <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-500">Purpose</p>
                          <p className="mt-1 text-[10px] leading-relaxed text-neutral-400">{project.purpose}</p>
                        </div>
                      </div>
                      {/* Live badge */}
                      <div ref={el => { cardRefs.current[gi][1] = el; }} className="shrink-0">
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full border border-neutral-700 bg-neutral-900/70 px-30 py-20 text-[0.55rem] uppercase tracking-[0.2em] text-neutral-300 transition hover:border-neutral-500 hover:text-white">
                          Live Project
                        </a>
                      </div>
                      {/* Name card — closest to spine */}
                      <div ref={el => { cardRefs.current[gi][0] = el; }} className={`${cardBase} w-44 shrink-0`}>
                        <h2 className="text-sm font-semibold leading-snug text-neutral-100">{project.name}</h2>
                      </div>
                    </div>
                  )}
                </div>

                {/* RIGHT HALF */}
                <div className="flex items-center justify-start">
                  {!isLeft && (
                    <div className="flex items-center gap-8" style={{ paddingLeft: '3rem' }}>
                      {/* Name card — closest to spine */}
                      <div ref={el => { cardRefs.current[gi][0] = el; }} className={`${cardBase} w-44 shrink-0`}>
                        <h2 className="text-sm font-semibold leading-snug text-neutral-100">{project.name}</h2>
                      </div>
                      {/* Live badge */}
                      <div ref={el => { cardRefs.current[gi][1] = el; }} className="shrink-0">
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full border border-neutral-700 bg-neutral-900/70 px-4 py-2 text-[0.55rem] uppercase tracking-[0.2em] text-neutral-300 transition hover:border-neutral-500 hover:text-white">
                          Live Project
                        </a>
                      </div>
                      {/* Sub cards */}
                      <div className="flex flex-col gap-3">
                        <div ref={el => { cardRefs.current[gi][2] = el; }} className={`${cardBase} w-36`}>
                          <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-500">Tech Stack</p>
                          <p className="mt-1 text-[10px] leading-relaxed text-neutral-300">{project.techStack}</p>
                        </div>
                        <div ref={el => { cardRefs.current[gi][3] = el; }} className={`${cardBase} w-36`}>
                          <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-500">Purpose</p>
                          <p className="mt-1 text-[10px] leading-relaxed text-neutral-400">{project.purpose}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </section>
  );
}