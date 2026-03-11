import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GSAPPage = () => {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const boxesRef = useRef<(HTMLDivElement | null)[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<HTMLDivElement>(null);
  const [timelineComplete, setTimelineComplete] = useState(false);

  const setBoxRef = (index: number) => (el: HTMLDivElement | null) => {
    boxesRef.current[index] = el;
  };

  // Timeline animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      timelineRef.current = gsap.timeline({
        onComplete: () => setTimelineComplete(true)
      });
      
      timelineRef.current.to(boxesRef.current, {
        x: (i) => i * 80,
        rotation: 360,
        scale: 1.2,
        borderRadius: '50%',
        backgroundColor: '#a855f7',
        duration: 1,
        stagger: 0.2,
        ease: 'power2.inOut'
      }).to(boxesRef.current, {
        x: 0,
        rotation: 0,
        scale: 1,
        borderRadius: '10px',
        backgroundColor: '#6366f1',
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out'
      });
    });

    return () => ctx.revert();
  }, []);

  // Scroll trigger animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.scroll-box', 
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: scrollRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, scrollRef);

    return () => ctx.revert();
  }, []);

  // Wave animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.wave-bar', {
        height: 'random(20, 100)%',
        duration: 'random(0.5, 1.5)',
        stagger: {
          each: 0.1,
          repeat: -1,
          yoyo: true
        },
        ease: 'sine.inOut'
      });
    }, waveRef);

    return () => ctx.revert();
  }, []);

  const replayTimeline = () => {
    setTimelineComplete(false);
    timelineRef.current?.restart();
  };

  return (
    <div className="page">
      <h1 className="page-title">⚡ GSAP</h1>
      <p className="page-subtitle">
        The industry-standard animation platform. Powerful timeline control.
      </p>

      <div className="demo-grid">
        {/* Timeline Animation */}
        <div className="demo-card">
          <h3 className="demo-title">Timeline Animation</h3>
          <p className="demo-description">Coordinated sequence with stagger</p>
          <div style={{ 
            height: '120px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px',
            marginTop: '20px',
            padding: '0 20px'
          }}>
            {[0, 1, 2, 3].map(i => (
              <div
                key={i}
                ref={setBoxRef(i)}
                style={{
                  width: '50px',
                  height: '50px',
                  background: '#6366f1',
                  borderRadius: '10px',
                  flexShrink: 0
                }}
              />
            ))}
          </div>
          <button
            onClick={replayTimeline}
            style={{
              marginTop: '15px',
              padding: '8px 16px',
              background: timelineComplete ? '#22c55e' : '#6366f1',
              border: 'none',
              borderRadius: '6px',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            {timelineComplete ? 'Replay ✓' : 'Playing...'}
          </button>
        </div>

        {/* Scroll Trigger */}
        <div className="demo-card">
          <h3 className="demo-title">Scroll-triggered</h3>
          <p className="demo-description">Animations triggered by scroll</p>
          <div ref={scrollRef} style={{ marginTop: '20px', padding: '20px 0' }}>
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className="scroll-box"
                style={{
                  padding: '20px',
                  marginBottom: '15px',
                  background: '#1a1a1a',
                  borderRadius: '10px',
                  border: '1px solid #2a2a2a'
                }}
              >
                Scroll to see me #{i}
              </div>
            ))}
          </div>
        </div>

        {/* Wave Animation */}
        <div className="demo-card">
          <h3 className="demo-title">Audio Wave</h3>
          <p className="demo-description">Randomized wave effect</p>
          <div 
            ref={waveRef}
            style={{ 
              height: '120px', 
              display: 'flex', 
              alignItems: 'flex-end', 
              justifyContent: 'center', 
              gap: '6px',
              marginTop: '20px',
              background: '#0a0a0a',
              borderRadius: '12px',
              padding: '20px'
            }}
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="wave-bar"
                style={{
                  width: '8px',
                  height: '30%',
                  background: `hsl(${i * 18 + 200}, 70%, 60%)`,
                  borderRadius: '4px'
                }}
              />
            ))}
          </div>
        </div>

        {/* Elastic Bounce */}
        <div className="demo-card">
          <h3 className="demo-title">Elastic Bounce</h3>
          <p className="demo-description">Physics-like elastic easing</p>
          <ElasticBounce />
        </div>

        {/* Flip Layout */}
        <div className="demo-card">
          <h3 className="demo-title">Layout Transition</h3>
          <p className="demo-description">Smooth layout changes</p>
          <LayoutTransition />
        </div>

        {/* Motion Path */}
        <div className="demo-card">
          <h3 className="demo-title">Motion Path</h3>
          <p className="demo-description">Animate along a path</p>
          <MotionPath />
        </div>
      </div>
    </div>
  );
};

const ElasticBounce = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  const bounce = () => {
    setCount(c => c + 1);
    gsap.to(boxRef.current, {
      y: -50,
      duration: 0.3,
      ease: 'power2.out',
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        gsap.to(boxRef.current, {
          y: 0,
          duration: 0.8,
          ease: 'elastic.out(1, 0.3)'
        });
      }
    });
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <div
        ref={boxRef}
        onClick={bounce}
        style={{
          width: '80px',
          height: '80px',
          background: 'linear-gradient(135deg, #ec4899, #a855f7)',
          borderRadius: '16px',
          margin: '0 auto 20px',
          cursor: 'pointer'
        }}
      />
      <div style={{ textAlign: 'center', color: '#a0a0a0' }}>
        Click count: {count}
      </div>
    </div>
  );
};

const LayoutTransition = () => {
  const [grid, setGrid] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    setGrid(!grid);
  };

  useEffect(() => {
    if (!containerRef.current) return;
    
    gsap.fromTo(containerRef.current.children,
      { scale: 0.8, opacity: 0, rotate: 10 },
      {
        scale: 1,
        opacity: 1,
        rotate: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'back.out(1.7)'
      }
    );
  }, [grid]);

  return (
    <div style={{ marginTop: '20px' }}>
      <button
        onClick={toggle}
        style={{
          padding: '10px 20px',
          background: '#22c55e',
          border: 'none',
          borderRadius: '8px',
          color: 'white',
          cursor: 'pointer',
          marginBottom: '15px',
          width: '100%'
        }}
      >
        Toggle Layout
      </button>
      <div
        ref={containerRef}
        style={{
          display: grid ? 'grid' : 'flex',
          gridTemplateColumns: 'repeat(3, 1fr)',
          flexWrap: 'wrap',
          gap: '10px',
          justifyContent: 'center'
        }}
      >
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div
            key={i}
            style={{
              width: grid ? 'auto' : '45%',
              aspectRatio: '1',
              background: '#6366f1',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold'
            }}
          >
            {i}
          </div>
        ))}
      </div>
    </div>
  );
};

const MotionPath = () => {
  const ballRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing || !ballRef.current) return;

    gsap.to(ballRef.current, {
      x: 200,
      y: -50,
      duration: 1,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true
    });
  }, [playing]);

  return (
    <div style={{ marginTop: '20px', position: 'relative', height: '150px' }}>
      <button
        onClick={() => setPlaying(!playing)}
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '10px 20px',
          background: playing ? '#ec4899' : '#6366f1',
          border: 'none',
          borderRadius: '8px',
          color: 'white',
          cursor: 'pointer',
          zIndex: 10
        }}
      >
        {playing ? 'Stop' : 'Play'}
      </button>
      <svg 
        viewBox="0 0 300 120" 
        style={{ 
          position: 'absolute', 
          top: 30, 
          left: 0, 
          width: '100%', 
          height: '100px' 
        }}
      >
        <path
          d="M 30 80 Q 100 10 170 80 T 270 80"
          fill="none"
          stroke="#2a2a2a"
          strokeWidth="2"
        />
      </svg>
      <div
        ref={ballRef}
        style={{
          position: 'absolute',
          top: 60,
          left: 30,
          width: '30px',
          height: '30px',
          background: '#a855f7',
          borderRadius: '50%',
          boxShadow: '0 0 20px #a855f7'
        }}
      />
    </div>
  );
};

export default GSAPPage;
