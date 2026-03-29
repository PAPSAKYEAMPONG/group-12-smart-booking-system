import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="logo"><Link to="/" style={{color: 'inherit', textDecoration: 'none'}}>Salon</Link></div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <a href="/#services">Services</a>
        <a href="/#team">Expert Team</a>
        <a href="/#contact">Contact</a>
      </div>
      <button className="btn-primary appointment-btn" onClick={() => navigate('/booking')}>Appointment</button>
    </nav>
  );
};

export default Navbar;
