import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">LOGO</div>
      <nav>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><Link to="/team">Explore</Link></li> {/* Corrected Link usage */}
          <li><a href="#campaigns">Campaigns</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="#donate" className="donate-btn">Donate</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
