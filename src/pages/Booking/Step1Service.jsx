import React from 'react';
import './Step1Service.css';

const hairServices = [
  {
    id: 's1',
    title: "Precision Hair Styling",
    price: "GH₵145",
    duration: "75 MIN",
    description: "From classic cuts to trendy blowouts, our stylists create looks that define you.",
    badge: "POPULAR",
    theme: "light"
  },
  {
    id: 's2',
    title: "Signature Blowouts",
    price: "GH₵85",
    duration: "60 MIN",
    description: "Experience our signature blowouts for volume, shine, and long-lasting perfection.",
    theme: "light"
  },
  {
    id: 's3',
    title: "Artistic Color & Glow",
    price: "GH₵320+",
    duration: "180 MIN",
    description: "Master balayage, highlights, and full transformations using premium, ammonia-free dyes.",
    badge: "MASTER STYLIST ONLY",
    theme: "dark"
  }
];

const beautyServices = [
  {
    id: 's4',
    title: "Rejuvenating Facials",
    price: "GH₵185",
    duration: "60 MIN",
    description: "Deep-cleansing skin treatments designed to restore your natural, healthy glow.",
  },
  {
    id: 's5',
    title: "Bridal & Event Makeup",
    price: "GH₵240",
    duration: "90 MIN",
    description: "Flawless, professional makeup application for your most important milestones.",
  }
];

const nailServices = [
  {
    id: 's6',
    title: "Luxury Nail Artistry",
    price: "GH₵65",
    duration: "45 MIN",
    description: "Long-lasting manicures and pedicures with a focus on nail health and creative design."
  }
];

const Step1Service = ({ onSelectService, selectedService }) => {
  return (
    <div className="step1-container">
      {/* Hair Section */}
      <div className="category-section">
        <div className="category-header">
          <h2>Hair</h2>
          <span className="category-meta">01 — SCULPTING & COLOR</span>
        </div>
        <div className="service-cards-grid">
          {hairServices.map(service => {
            const isSelected = selectedService?.id === service.id;
            return (
              <div className={`service-card-booking ${service.theme === 'dark' ? 'dark-card' : ''} ${isSelected ? 'card-selected' : ''}`} key={service.id}>
                {service.badge && (
                  <div className="card-badge">{service.badge}</div>
                )}
                
                <div className="card-top-content">
                  <div className="card-price-row">
                    <h3 className="card-title">{service.title}</h3>
                    <span className="card-price">{service.price}</span>
                  </div>
                  <p className="card-desc">{service.description}</p>
                </div>

                <div className="card-bottom-row">
                  <div className="card-duration">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    {service.duration}
                  </div>
                  <button 
                    className={`select-btn ${service.theme === 'dark' ? 'btn-red' : 'btn-dark'}`}
                    onClick={() => onSelectService(service)}
                  >
                    {isSelected ? 'SELECTED' : (service.theme === 'dark' ? 'ENQUIRE' : 'SELECT')}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Skincare / Makeup Section */}
      <div className="category-section mt-6">
        <div className="category-header">
          <h2>Skincare & Makeup</h2>
          <span className="category-meta">02 — RADIANT GLOW</span>
        </div>
        <div className="beauty-grid">
          <div className="beauty-image-wrapper">
            <img src="/Images/Rejuvenating Facials.jpg" alt="Skincare" className="beauty-side-image" />
          </div>
          <div className="beauty-cards-col">
            {beautyServices.map(service => {
              const isSelected = selectedService?.id === service.id;
              return (
                <div className={`service-card-booking ${isSelected ? 'card-selected' : ''}`} key={service.id}>
                  <div className="card-top-content">
                    <span className="card-price beauty-price">{service.price}</span>
                    <h3 className="card-title beaut-title">{service.title}</h3>
                    <p className="card-desc">{service.description}</p>
                  </div>
                  <div className="card-bottom-row">
                    <div className="card-duration">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      {service.duration}
                    </div>
                    <button className="select-btn btn-dark" onClick={() => onSelectService(service)}>
                      {isSelected ? 'SELECTED' : 'SELECT'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Nails Section */}
      <div className="category-section mt-6">
        <div className="category-header">
          <h2>Nails</h2>
          <span className="category-meta">03 — POLISHED DETAILS</span>
        </div>
        <div className="nails-grid">
          {nailServices.map(service => {
            const isSelected = selectedService?.id === service.id;
            return (
              <div className={`nail-pill-card ${isSelected ? 'pill-selected' : ''}`} key={service.id} onClick={() => onSelectService(service)}>
                <div className="nail-info">
                  <h4>{service.title}</h4>
                  <span>{service.duration} • {service.price}</span>
                </div>
                <div className="nail-hover-effect"></div>
              </div>
            );
          })}
        </div>
      </div>
      
    </div>
  );
};

export default Step1Service;