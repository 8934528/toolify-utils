import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSession } from '../../hooks/useSession';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [location, isOpen]); 

  const navLinks = [
    { path: '/', icon: 'fi fi-rr-home', label: 'Home' },
    { path: '/calculator', icon: 'fi fi-rr-calculator', label: 'Calculator' },
    { path: '/temperature', icon: 'fi fi-rr-temperature-high', label: 'Converter' },
    { path: '/todo', icon: 'fi fi-rr-list-check', label: 'To-Do' },
  ];

  const getLinkWithSession = (path: string) => {
    return session ? `${path}?session=${session.id}` : path;
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to={getLinkWithSession('/')} className="navbar-brand">
          <i className="fi fi-rr-apps"></i>
          <span>Toolify-Utils</span>
        </Link>

        <button 
          className={`navbar-toggler ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`navbar-menu ${isOpen ? 'open' : ''}`}>
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={getLinkWithSession(link.path)}
              className={`navbar-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              <i className={link.icon}></i>
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
