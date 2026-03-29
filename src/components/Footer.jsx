import React from 'react';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <h3>Salon</h3>
            <p>Your destination where beauty dreams come to life. Excellence combined with passion.</p>
          </div>

          <div className="footer-links-group">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#services">Our Services</a></li>
              <li><a href="#team">Expert Team</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h4>Services</h4>
            <ul>
              <li><a href="#">Hair Styling</a></li>
              <li><a href="#">Color & Glow</a></li>
              <li><a href="#">Nail Artistry</a></li>
              <li><a href="#">Facials</a></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Get In Touch</h4>
            <ul>
              <li>123 Beauty Blvd, Suite 100</li>
              <li>Accra Ghana</li>
              <li>055-123-4567</li>
              <li>hello@salon.com</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Salon. All rights reserved.</p>
          <div className="social-links">
            <a href="#" aria-label="Instagram">IG</a>
            <a href="#" aria-label="Facebook">FB</a>
            <a href="#" aria-label="Twitter">X</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
