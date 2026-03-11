import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MotionPage from './pages/MotionPage';
import MagicPage from './pages/MagicPage';
import SpringPage from './pages/SpringPage';
import MagicMotionPage from './pages/MagicMotionPage';
import GSAPPage from './pages/GSAPPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/motion" element={<MotionPage />} />
            <Route path="/magic" element={<MagicPage />} />
            <Route path="/spring" element={<SpringPage />} />
            <Route path="/magicmotion" element={<MagicMotionPage />} />
            <Route path="/gsap" element={<GSAPPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
