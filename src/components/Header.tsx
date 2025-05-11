import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToPackages = () => {
    if (location.pathname !== '/') {
      window.location.href = '/#packages';
      return;
    }
    
    const packagesSection = document.getElementById('packages');
    if (packagesSection) {
      packagesSection.scrollIntoView({ behavior: 'smooth' });
    }
    closeMenu();
  };

  const headerClass = isScrolled 
    ? 'bg-white shadow-md text-gray-800' 
    : 'bg-transparent text-white';

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${headerClass}`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold" onClick={closeMenu}>
          <Compass size={32} className={isScrolled ? 'text-teal-600' : 'text-teal-400'} />
          <span>MavikaJourney</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/"
            className={`text-lg font-medium hover:text-teal-400 transition-colors ${
              location.pathname === '/' ? (isScrolled ? 'text-teal-600' : 'text-teal-400') : ''
            }`}
            onClick={closeMenu}
          >
            Home
          </Link>
          <button
            onClick={scrollToPackages}
            className="text-lg font-medium hover:text-teal-400 transition-colors"
          >
            Packages
          </button>
          <Link 
            to="/about"
            className={`text-lg font-medium hover:text-teal-400 transition-colors ${
              location.pathname === '/about' ? (isScrolled ? 'text-teal-600' : 'text-teal-400') : ''
            }`}
            onClick={closeMenu}
          >
            About
          </Link>
          <Link 
            to="/contact"
            className={`text-lg font-medium hover:text-teal-400 transition-colors ${
              location.pathname === '/contact' ? (isScrolled ? 'text-teal-600' : 'text-teal-400') : ''
            }`}
            onClick={closeMenu}
          >
            Contact
          </Link>
          <Link 
            to="/contact" 
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              isScrolled 
                ? 'bg-teal-600 text-white hover:bg-teal-700' 
                : 'bg-white text-teal-600 hover:bg-gray-100'
            }`}
          >
            Book Now
          </Link>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-2xl focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white shadow-lg"
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/"
                className="text-lg font-medium text-gray-800 hover:text-teal-600 py-2"
                onClick={closeMenu}
              >
                Home
              </Link>
              <button
                onClick={scrollToPackages}
                className="text-lg font-medium text-gray-800 hover:text-teal-600 py-2 text-left"
              >
                Packages
              </button>
              <Link 
                to="/about"
                className="text-lg font-medium text-gray-800 hover:text-teal-600 py-2"
                onClick={closeMenu}
              >
                About
              </Link>
              <Link 
                to="/contact"
                className="text-lg font-medium text-gray-800 hover:text-teal-600 py-2"
                onClick={closeMenu}
              >
                Contact
              </Link>
              <Link 
                to="/contact" 
                className="px-6 py-3 bg-teal-600 text-white rounded-full font-medium text-center hover:bg-teal-700 transition-colors"
                onClick={closeMenu}
              >
                Book Now
              </Link>
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;