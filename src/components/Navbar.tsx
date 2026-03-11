import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand">
        ⚡ React Animation Demos
      </NavLink>
      <ul className="navbar-links">
        <li><NavLink to="/motion">Motion</NavLink></li>
        <li><NavLink to="/magic">Magic UI</NavLink></li>
        <li><NavLink to="/spring">React Spring</NavLink></li>
        <li><NavLink to="/magicmotion">Magic Motion</NavLink></li>
        <li><NavLink to="/gsap">GSAP</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;
