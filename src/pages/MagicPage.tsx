import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const MagicPage = () => {
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => [
        ...prev.slice(-15),
        { id: Date.now(), x: Math.random() * 100, y: Math.random() * 100 }
      ]);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const [shimmerTexts] = useState(['Magic', 'Beautiful', 'Stunning', 'Amazing']);

  return (
    <div className="page">
      <h1 className="page-title">✨ Magic UI</h1>
      <p className="page-subtitle">
        Beautiful, animated UI components built with Tailwind CSS and Motion.
      </p>

      <div className="demo-grid">
        {/* Animated Border */}
        <div className="demo-card">
          <h3 className="demo-title">Animated Gradient Border</h3>
          <p className="demo-description">Gradient border that animates continuously</p>
          <motion.div
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              padding: '3px',
              borderRadius: '16px',
              background: 'linear-gradient(90deg, #6366f1, #a855f7, #ec4899, #6366f1)',
              backgroundSize: '300% 100%',
              marginTop: '20px'
            }}
          >
            <div style={{
              background: '#1a1a1a',
              padding: '30px',
              borderRadius: '14px',
              textAlign: 'center',
              color: 'white'
            }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Hover Me!</span>
            </div>
          </motion.div>
        </div>

        {/* Shimmer Effect */}
        <div className="demo-card">
          <h3 className="demo-title">Shimmer Effect</h3>
          <p className="demo-description">Text with animated shimmer glow</p>
          <div style={{ marginTop: '20px', position: 'relative', overflow: 'hidden', padding: '20px' }}>
            {shimmerTexts.map((text, i) => (
              <motion.div
                key={text}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  marginBottom: '10px',
                  position: 'relative',
                  display: 'inline-block'
                }}
              >
                <motion.span
                  animate={{
                    backgroundPosition: ['200% center', '-200% center']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    background: 'linear-gradient(90deg, #6366f1, #fff, #a855f7, #6366f1)',
                    backgroundSize: '200% 100%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  {text}
                </motion.span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Particles */}
        <div className="demo-card">
          <h3 className="demo-title">Floating Particles</h3>
          <p className="demo-description">Animated particle effects</p>
          <div style={{ 
            marginTop: '20px', 
            height: '150px', 
            position: 'relative', 
            background: '#0a0a0a',
            borderRadius: '12px',
            overflow: 'hidden'
          }}>
            {particles.map(p => (
              <motion.div
                key={p.id}
                initial={{ opacity: 1, scale: 0 }}
                animate={{ 
                  opacity: 0, 
                  scale: 1,
                  y: [0, -100],
                  x: [0, (Math.random() - 0.5) * 50]
                }}
                transition={{ duration: 2, ease: "easeOut" }}
                style={{
                  position: 'absolute',
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: '8px',
                  height: '8px',
                  background: '#a855f7',
                  borderRadius: '50%',
                  boxShadow: '0 0 10px #a855f7'
                }}
              />
            ))}
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666',
              fontSize: '0.9rem'
            }}>
              Particles spawning...
            </div>
          </div>
        </div>

        {/* Bounce Animation */}
        <div className="demo-card">
          <h3 className="demo-title">Bounce Animations</h3>
          <p className="demo-description">Buttons with bounce effects</p>
          <div className="btn-demo" style={{ marginTop: '20px' }}>
            {['Primary', 'Secondary', 'Accent'].map((label, i) => (
              <motion.button
                key={label}
                animate={{
                  y: [0, -10, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
                style={{
                  padding: '12px 24px',
                  background: i === 0 ? '#6366f1' : i === 1 ? '#a855f7' : '#ec4899',
                  border: 'none',
                  borderRadius: '10px',
                  color: 'white',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Animated Grid */}
        <div className="demo-card">
          <h3 className="demo-title">Animated Grid</h3>
          <p className="demo-description">Grid with hover wave effect</p>
          <div className="grid-container" style={{ marginTop: '20px' }}>
            {Array.from({ length: 9 }).map((_, i) => (
              <motion.div
                key={i}
                className="grid-item"
                whileHover={{
                  background: '#6366f1',
                  scale: 1.1
                }}
                transition={{ type: 'spring', stiffness: 300 }}
              />
            ))}
          </div>
        </div>

        {/* Glow Card */}
        <div className="demo-card" style={{ position: 'relative', overflow: 'hidden' }}>
          <h3 className="demo-title">Glow Effect</h3>
          <p className="demo-description">Card with ambient glow</p>
          <motion.div
            animate={{
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '150px',
              height: '150px',
              background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)',
              filter: 'blur(40px)',
              zIndex: 0
            }}
          />
          <div style={{ 
            position: 'relative', 
            zIndex: 1, 
            padding: '40px 20px',
            textAlign: 'center',
            color: 'white'
          }}>
            <span style={{ fontSize: '1.3rem', fontWeight: 600 }}>Glowing Card</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MagicPage;
