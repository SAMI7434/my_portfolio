'use client';

import GlobeCanvas from '@/components/globe';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SkillsPage from './skills/page';
import ProjectsPage from './projects/page';


export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">

        {/* Video */}
        <video
          className="absolute inset-0 h-full w-full origin-top scale-125 object-cover object-top"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260217_030345_246c0224-10a4-422c-b324-070b7c0eceda.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 z-10"
          style={{ height: '300px', background: 'linear-gradient(to bottom, transparent, #0a0a0a)' }}
        />

        {/* Globe — bottom left */}
        <div
          className="absolute z-20"
          style={{ bottom: '40px', left: '40px', width: '150px', height: '150px' }}
        >
          <GlobeCanvas />
          <p
            style={{
              position: 'absolute',
              bottom: '6px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '7px',
              color: 'rgba(100,180,255,0.35)',
              letterSpacing: '0.2em',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              fontFamily: 'monospace',
            }}
          >
            SAMIRAN
          </p>
        </div>

      </section>

      <SkillsPage />
      <ProjectsPage />
      <Footer />
    </main>
  );
}