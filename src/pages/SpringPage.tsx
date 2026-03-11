import { useState } from 'react';
import { useSpring, animated, useTransition, useTrail } from '@react-spring/web';

const SpringPage = () => {
  const [toggle, setToggle] = useState(false);
  const [items, setItems] = useState([1, 2, 3, 4]);
  
  const transitions = useTransition(toggle, {
    from: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
    enter: { opacity: 1, transform: 'translate3d(0,0px,0)' },
    leave: { opacity: 0, transform: 'translate3d(0,40px,0)' },
  });

  const trail = useTrail(items.length, {
    from: { opacity: 0, x: -20 },
    to: { opacity: 1, x: 0 },
    config: { mass: 5, tension: 2000, friction: 200 }
  });

  // Physics-based spring animation
  const spring1 = useSpring({ 
    x: 0,
    config: { mass: 1, tension: 180, friction: 12 }
  });

  const spring2 = useSpring({ 
    x: 0, 
    y: 0,
    config: { mass: 5, tension: 550, friction: 140 }
  });

  const handleSpringClick = () => {
    const newVal = spring1.x.get() === 0 ? 200 : 0;
    spring1.x.set(newVal);
  };

  const handleDrag = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    spring2.x.set(x);
    spring2.y.set(y);
  };

  const handleDragEnd = () => {
    spring2.x.set(0);
    spring2.y.set(0);
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item !== id));
  };

  return (
    <div className="page">
      <h1 className="page-title">🌀 React Spring</h1>
      <p className="page-subtitle">
        Physics-based animations that feel natural and responsive.
      </p>

      <div className="demo-grid">
        {/* Spring Physics */}
        <div className="demo-card">
          <h3 className="demo-title">Spring Physics</h3>
          <p className="demo-description">Click to see physics-based bounce</p>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
            <animated.button
              onClick={handleSpringClick}
              style={{
                padding: '20px 40px',
                background: '#ec4899',
                border: 'none',
                borderRadius: '12px',
                color: 'white',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <animated.span style={{ display: 'block', transform: spring1.x.to((v: number) => `translateX(${v}px)`) as any }}>
                Click Me!
              </animated.span>
            </animated.button>
          </div>
        </div>

        {/* Draggable */}
        <div className="demo-card">
          <h3 className="demo-title">Draggable Spring</h3>
          <p className="demo-description">Drag the box and release</p>
          <div style={{ 
            height: '150px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            marginTop: '20px',
            background: '#0a0a0a',
            borderRadius: '12px'
          }}>
            <animated.div
              onMouseDown={() => {}}
              onMouseUp={handleDragEnd}
              onMouseMove={handleDrag}
              onMouseLeave={handleDragEnd}
              style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                borderRadius: '12px',
                cursor: 'grab',
                x: spring2.x as any,
                y: spring2.y as any
              }}
            />
          </div>
        </div>

        {/* Toggle Transition */}
        <div className="demo-card">
          <h3 className="demo-title">Toggle Transition</h3>
          <p className="demo-description">Click to toggle visibility</p>
          <div style={{ height: '100px', marginTop: '20px', position: 'relative' }}>
            {transitions((style, item) => (
              item && (
                <animated.div
                  style={{
                    ...style,
                    position: 'absolute',
                    width: '100%',
                    padding: '30px',
                    background: '#1a1a1a',
                    borderRadius: '12px',
                    textAlign: 'center',
                    color: 'white'
                  }}
                >
                  I'm animated!
                </animated.div>
              )
            ))}
          </div>
          <button 
            onClick={() => setToggle(!toggle)}
            style={{
              marginTop: '10px',
              padding: '10px 20px',
              background: '#22c55e',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            Toggle
          </button>
        </div>

        {/* Trail Animation */}
        <div className="demo-card">
          <h3 className="demo-title">Trail Animation</h3>
          <p className="demo-description">Staggered spring trail</p>
          <div style={{ marginTop: '20px' }}>
            {trail.map((props, index) => (
              <animated.div
                key={items[index]}
                style={{
                  marginBottom: '10px',
                  padding: '15px',
                  background: '#1a1a1a',
                  borderRadius: '8px',
                  border: '1px solid #2a2a2a',
                  cursor: 'pointer',
                  opacity: props.opacity as any,
                  transform: props.x.to((v: number) => `translateX(${v}px)`) as any
                }}
                onClick={() => removeItem(items[index])}
              >
                Click to remove
              </animated.div>
            ))}
          </div>
        </div>

        {/* Parallax */}
        <div className="demo-card">
          <h3 className="demo-title">Parallax Effect</h3>
          <p className="demo-description">Move mouse to see parallax</p>
          <ParallaxCard />
        </div>

        {/* Config Variations */}
        <div className="demo-card">
          <h3 className="demo-title">Spring Configs</h3>
          <p className="demo-description">Different physics presets</p>
          <SpringConfigs />
        </div>
      </div>
    </div>
  );
};

const ParallaxCard = () => {
  const [{ y }, api] = useSpring(() => ({ y: 0 }));
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    api.start({ y: mouseY * 20, immediate: true });
  };

  return (
    <animated.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => api.start({ y: 0 })}
      style={{
        height: '120px',
        background: 'linear-gradient(135deg, #1a1a1a, #2a2a2a)',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: y.to((v: number) => `translateY(${v}px)`) as any,
        cursor: 'pointer'
      }}
    >
      <span style={{ color: '#a0a0a0' }}>Move your mouse here</span>
    </animated.div>
  );
};

const SpringConfigs = () => {
  const configs = [
    { name: 'Default', config: { mass: 1, tension: 170, friction: 26 } },
    { name: 'Gentle', config: { mass: 1, tension: 120, friction: 14 } },
    { name: 'Wobbly', config: { mass: 1, tension: 280, friction: 12 } },
  ];

  const [active, setActive] = useState(0);
  const [{ scale }, api] = useSpring(() => ({ scale: 1, config: configs[0].config }));

  const handleClick = (i: number) => {
    setActive(i);
    api.start({ 
      scale: 1.3, 
      config: configs[i].config,
      onRest: () => api.start({ scale: 1 })
    });
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {configs.map((c, i) => (
          <button
            key={c.name}
            onClick={() => handleClick(i)}
            style={{
              flex: 1,
              padding: '8px',
              background: active === i ? '#6366f1' : '#1a1a1a',
              border: '1px solid #2a2a2a',
              borderRadius: '6px',
              color: 'white',
              cursor: 'pointer',
              fontSize: '0.8rem'
            }}
          >
            {c.name}
          </button>
        ))}
      </div>
      <animated.div
        style={{
          width: '60px',
          height: '60px',
          background: '#a855f7',
          borderRadius: '12px',
          margin: '0 auto',
          scale: scale.to((v: number) => v) as any
        }}
      />
    </div>
  );
};

export default SpringPage;
