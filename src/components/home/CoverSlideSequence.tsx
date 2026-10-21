import React, { useEffect, useRef, useState } from 'react';

import marinaDusk from '../../../assets/landing pages image/dawid-tkocz-fbv1cPWR1j0-unsplash.jpg';
import marinaSkyline from '../../../assets/landing pages image/emma-harrisova-UDsO83Ts6tQ-unsplash.jpg';
import downtownDay from '../../../assets/landing pages image/k-t-2jfZ2Vj06sk-unsplash.jpg';
import skylineDusk from '../../../assets/landing pages image/paweldotio-ZyP4Apa8tvI-unsplash.jpg';

const FRAMES = [
  {
    src: marinaDusk,
    alt: 'Dubai Marina at sunset, with the waterfront towers reflected in the canal',
    index: '01',
    title: 'The evening holds',
    emphasis: 'the water',
    body: 'A private hour along the marina, when the towers take the last gold of the day and the shore grows quiet.'
  },
  {
    src: marinaSkyline,
    alt: 'Dubai Marina skyline seen across the water',
    index: '02',
    title: 'A skyline composed',
    emphasis: 'for the shore',
    body: 'Residences set against open water, with the city kept at a considered distance.'
  },
  {
    src: downtownDay,
    alt: 'Downtown Dubai in daylight, with the Burj Khalifa above the skyline',
    index: '03',
    title: 'Daylight, drawn',
    emphasis: 'to one spire',
    body: 'The heart of the city, clear and architectural, for those who prefer the centre.'
  },
  {
    src: skylineDusk,
    alt: 'Dubai skyline at dusk, with the city lights coming on',
    index: '04',
    title: 'When the city',
    emphasis: 'lowers its voice',
    body: 'Lights along the avenue, and a quieter grandeur for the evening ahead.'
  }
];

type Frame = (typeof FRAMES)[number];

function FrameImage({ frame }: { frame: Frame }) {
  return (
    <div className="absolute inset-0">
      <img src={frame.src} alt={frame.alt} className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B2135]/80 via-[#0B2135]/10 to-[#0B2135]/25" />
      <div className="absolute bottom-0 left-0 max-w-3xl p-8 sm:p-12 lg:p-16 text-[#F7F3EA]">
        <p className="crest-kicker text-[#D8C3A5] mb-4">{frame.index}</p>
        <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95]">
          {frame.title}
          <span className="italic text-[#D8C3A5]"> {frame.emphasis}</span>
        </h2>
        <p className="mt-5 max-w-md text-sm sm:text-base font-light leading-relaxed text-[#E9E1D4]">
          {frame.body}
        </p>
      </div>
    </div>
  );
}

export const CoverSlideSequence: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReducedMotion(media.matches);
    apply();
    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const update = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const distance = section.offsetHeight - window.innerHeight;
      const travelled = Math.min(Math.max(-rect.top, 0), Math.max(distance, 0));
      const next = distance > 0 ? travelled / distance : 0;
      setProgress((current) => (Math.abs(current - next) < 0.004 ? current : next));
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <section aria-label="Dubai in four views">
        {FRAMES.map((frame) => (
          <div key={frame.index} className="relative h-[100svh] overflow-hidden bg-[#0B2135]">
            <FrameImage frame={frame} />
          </div>
        ))}
      </section>
    );
  }

  const slides = 3;
  const segment = 1 / slides;

  return (
    <section ref={sectionRef} className="relative h-[400vh] bg-[#0B2135]" aria-label="Dubai in four views">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <FrameImage frame={FRAMES[0]} />
        {FRAMES.slice(1).map((frame, index) => {
          const start = index * segment;
          const local = Math.min(Math.max((progress - start) / segment, 0), 1);
          return (
            <div
              key={frame.index}
              className="absolute inset-0 will-change-transform shadow-[-32px_0_70px_rgba(11,33,53,0.5)]"
              style={{
                transform: `translate3d(${(1 - local) * 100}%, 0, 0)`,
                zIndex: index + 1
              }}
            >
              <FrameImage frame={frame} />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CoverSlideSequence;
