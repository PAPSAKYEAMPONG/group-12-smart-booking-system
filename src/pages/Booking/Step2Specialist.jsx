import React from 'react';
import './Step2Specialist.css';

const Step2Specialist = ({ onSelectSpecialist, selectedSpecialist }) => {

  const handleSelect = (specName) => {
    onSelectSpecialist(specName);
  };

  return (
    <div className="step2-container">
      <div className="specialist-header-row">
        <div className="specialist-header-text">
          <span className="step-badge">STEP 02 / 04</span>
          <h1 className="specialist-title">Select Your <br /><span className="title-highlight">Specialist</span></h1>
          <p className="specialist-subtitle">
            Experience luxury care from our collective of master artists and creative directors.
          </p>
        </div>
        <div className="specialist-counter">
          <span className="counter-number">3</span>
          <span className="counter-text">EXPERTS<br/>AVAILABLE TODAY</span>
        </div>
      </div>

      <div className="bento-grid">
        
        {/* Large Card: Susanne (Spans 2 columns) */}
        <div className={`bento-card card-large ${selectedSpecialist === 'Susanne Oster' ? 'card-selected' : ''}`} onClick={() => handleSelect('Susanne Oster')}>
          <div className="card-info-side">
            <div className="badge-row">
              <span className="role-badge">
                <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path></svg>
                CREATIVE DIRECTOR
              </span>
            </div>
            <h2 className="spec-name">Susanne Oster</h2>
            <div className="rating-row">
              <span className="star">★</span> 4.9 <span className="reviews">(128 reviews)</span>
            </div>
            <p className="spec-desc">
              Architect of GraceSalon's premium styling techniques. Susanne brings decades of high-fashion editorial experience to your personal look.
            </p>
            <button className="select-spec-btn btn-dark">
              {selectedSpecialist === 'Susanne Oster' ? 'SELECTED' : 'Select Susanne'}
            </button>
          </div>
          <div className="card-image-side">
            <img src="/Images/Member1.jpg" alt="Susanne Oster" />
          </div>
        </div>

        {/* Small Card: Anna (Spans 1 column) */}
        <div className={`bento-card card-small ${selectedSpecialist === 'Anna Schwab' ? 'card-selected' : ''}`} onClick={() => handleSelect('Anna Schwab')}>
          <div className="small-image-top">
            <div className="floating-badge">MASTER</div>
            <img src="/Images/Member2.jpg" alt="Anna Schwab" />
          </div>
          <div className="small-info-bottom">
            <h2 className="spec-name">Anna Schwab</h2>
            <span className="role-text">MAKE-UP SPECIALIST</span>
            <div className="rating-row">
              <span className="star">★</span> 5.0 <span className="reviews">(89 reviews)</span>
            </div>
            <button className="select-spec-btn btn-dark">
              {selectedSpecialist === 'Anna Schwab' ? 'SELECTED' : 'Select Anna'}
            </button>
          </div>
        </div>

        {/* Small Card: Karin (Spans 1 column) */}
        <div className={`bento-card card-small ${selectedSpecialist === 'Karin Baader' ? 'card-selected' : ''}`} onClick={() => handleSelect('Karin Baader')}>
          <div className="small-image-top">
            <img src="/Images/Member3.jpg" alt="Karin Baader" />
          </div>
          <div className="small-info-bottom">
            <h2 className="spec-name">Karin Baader</h2>
            <span className="role-text">NAIL SPECIALIST</span>
            <div className="rating-row">
              <span className="star">★</span> 4.8 <span className="reviews">(156 reviews)</span>
            </div>
            <button className="select-spec-btn btn-dark">
              {selectedSpecialist === 'Karin Baader' ? 'SELECTED' : 'Select Karin'}
            </button>
          </div>
        </div>

        {/* Removed No Preference option per request */}

      </div>
    </div>
  );
};

export default Step2Specialist;