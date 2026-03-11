import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

const MotionPage = () => {
  const [clicked, setClicked] = useState(false);
  const [items, setItems] = useState([1, 2, 3]);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  const removeItem = (id: number) => {
    setItems(items.filter(item => item !== id));
  };

  const addItem = () => {
    setItems([...items, items.length + 1]);
  };

  return (
    <div className="page">
      <h1 className="page-title">🎬 Motion (Framer Motion)</h1>
      <p className="page-subtitle">
        The modern animation library for React. Beautiful, declarative animations.
      </p>

      <div className="demo-grid">
        {/* Animated Button */}
        <div className="demo-card">
          <h3 className="demo-title">Animated Button</h3>
          <p className="demo-description">Hover and click to see scale and color transitions</p>
          <div className="btn-demo">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setClicked(!clicked)}
              style={{
                padding: '15px 30px',
                background: clicked ? '#22c55e' : '#6366f1',
                border: 'none',
                borderRadius: '10px',
                color: 'white',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {clicked ? 'Clicked!' : 'Click Me!'}
            </motion.button>
          </div>
        </div>

        {/* Layout Transitions */}
        <div className="demo-card">
          <h3 className="demo-title">Layout Transitions</h3>
          <p className="demo-description">Add or remove items with smooth layout animations</p>
          <div className="btn-demo">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={addItem}
              style={{
                padding: '10px 20px',
                background: '#22c55e',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              Add Item
            </motion.button>
          </div>
          <motion.div 
            layout 
            style={{ 
              marginTop: '15px', 
              display: 'flex', 
              gap: '10px', 
              flexWrap: 'wrap' 
            }}
          >
            <AnimatePresence>
              {items.map(item => (
                <motion.div
                  key={item}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  style={{
                    width: '50px',
                    height: '50px',
                    background: '#6366f1',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                  onClick={() => removeItem(item)}
                  whileHover={{ scale: 1.1 }}
                >
                  {item}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Scroll Animation */}
        <div className="demo-card">
          <h3 className="demo-title">Scroll-triggered Rotation</h3>
          <p className="demo-description">Scroll down to see the rotation animation</p>
          <div ref={containerRef} style={{ height: '200px', overflow: 'hidden', marginTop: '20px' }}>
            <motion.div
              style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                borderRadius: '16px',
                margin: '60px auto',
                rotate
              }}
            />
            <p style={{ textAlign: 'center', color: '#a0a0a0', fontSize: '0.9rem' }}>
              ↓ Scroll to rotate
            </p>
          </div>
        </div>

        {/* Gesture Animation */}
        <div className="demo-card">
          <h3 className="demo-title">Drag Gesture</h3>
          <p className="demo-description">Drag this card around</p>
          <motion.div
            drag
            dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: '100%',
              height: '100px',
              background: 'linear-gradient(135deg, #ec4899, #a855f7)',
              borderRadius: '16px',
              marginTop: '20px',
              cursor: 'grab',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 600
            }}
          >
            Drag Me!
          </motion.div>
        </div>

        {/* Stagger Children */}
        <div className="demo-card">
          <h3 className="demo-title">Staggered Animation</h3>
          <p className="demo-description">Children animate one after another</p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            style={{ marginTop: '20px' }}
          >
            {[0, 1, 2, 3].map(i => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
                style={{
                  padding: '12px',
                  marginBottom: '8px',
                  background: '#1a1a1a',
                  borderRadius: '8px',
                  border: '1px solid #2a2a2a'
                }}
              >
                Item {i + 1}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Loading Animation */}
        <div className="demo-card">
          <h3 className="demo-title">Loading Animation</h3>
          <p className="demo-description">Continuous looping animation</p>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              width: '60px',
              height: '60px',
              background: '#6366f1',
              borderRadius: '50%',
              margin: '30px auto 0'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MotionPage;
