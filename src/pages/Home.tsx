import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const frameworks = [
  { name: 'Motion', path: '/motion', color: '#6366f1', icon: '🎬' },
  { name: 'Magic UI', path: '/magic', color: '#a855f7', icon: '✨' },
  { name: 'React Spring', path: '/spring', color: '#ec4899', icon: '🌀' },
  { name: 'Magic Motion', path: '/magicmotion', color: '#14b8a6', icon: '🔮' },
  { name: 'GSAP', path: '/gsap', color: '#22c55e', icon: '⚡' },
];

const Home = () => {
  return (
    <div className="page">
      <motion.div 
        className="hero"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1 
          className="hero-title"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          React Animation Showcase
        </motion.h1>
        <motion.p 
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Explore 5 powerful animation libraries for React. Each framework brings unique 
          superpowers to create stunning, interactive user interfaces.
        </motion.p>
      </motion.div>

      <motion.div 
        className="framework-links"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        {frameworks.map((fw, index) => (
          <motion.div
            key={fw.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
          >
            <Link 
              to={fw.path} 
              className="framework-link"
              style={{ borderColor: fw.color }}
            >
              <span style={{ marginRight: '10px' }}>{fw.icon}</span>
              {fw.name}
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Home;
