import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import './Specialists.css';

const Specialists = () => {
  const [specialistsList, setSpecialistsList] = useState([]);
  const [metrics, setMetrics] = useState({ total: 3, active: 0, capacity: 0 });

  useEffect(() => {
    const fetchSpecialistsData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'bookings'));
        const allBookings = [];
        querySnapshot.forEach((doc) => {
          allBookings.push(doc.data());
        });

        const today = new Date();
        const isToday = (dateStr) => {
          if (!dateStr) return false;
          const d = new Date(dateStr);
          if (isNaN(d)) return dateStr.toString().includes(today.getDate().toString());
          return d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
        };
        const todayBookings = allBookings.filter(b => isToday(b.date));

        // Base Specialists matching the public Step 2 Booking page
        const baseSpecialists = [
          { name: 'Susanne Oster', role: 'CREATIVE DIRECTOR', image: '/Images/Member1.jpg', tags: ['Styling', 'Editorial'] },
          { name: 'Anna Schwab', role: 'MAKE-UP SPECIALIST', image: '/Images/Member2.jpg', tags: ['Make-Up', 'Bridal'] },
          { name: 'Karin Baader', role: 'NAIL SPECIALIST', image: '/Images/Member3.jpg', tags: ['Manicure', 'Pedicure'] }
        ];

        const staffMap = {};
        baseSpecialists.forEach(spec => {
           staffMap[spec.name] = {
              ...spec,
              isBookedToday: false
           };
        });

        // Check if any specialists have bookings today
        todayBookings.forEach(b => {
          if (b.specialist && staffMap[b.specialist]) {
            staffMap[b.specialist].isBookedToday = true;
          } else if (b.specialist && !staffMap[b.specialist]) {
            // If there's a booking for a discontinued/mock staff member, dynamically add them so the UI doesn't break
            staffMap[b.specialist] = {
               name: b.specialist,
               role: 'SPECIALIST',
               image: '/Images/Member1.jpg',
               tags: ['General Services'],
               isBookedToday: true
            };
          }
        });

        const staffArray = Object.values(staffMap);
        setSpecialistsList(staffArray);

        const activeStaff = staffArray.filter(s => s.isBookedToday).length;
        // Assume 4 bookings per day per staff is full capacity
        let cap = Math.round((todayBookings.length / (staffArray.length * 4)) * 100);
        if (cap > 100) cap = 100;

        setMetrics({
          total: staffArray.length < 10 ? `0${staffArray.length}` : staffArray.length,
          active: activeStaff < 10 ? `0${activeStaff}` : activeStaff,
          capacity: cap
        });

      } catch (error) {
         console.error("Error fetching specialist data:", error);
      }
    };
    fetchSpecialistsData();
  }, []);

  return (
    <div className="specialists-container">
      
      {/* Intro Header */}
      <div className="spec-intro-header">
        <p className="spec-subtitle">
          Curate your world-class team. Monitor availability, assign services, and manage the artistic talent behind The Atelier.
        </p>
        <button className="btn-dark add-spec-btn">
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
          Add New Specialist
        </button>
      </div>

      {/* KPI Row */}
      <div className="spec-kpi-row">
        <div className="kpi-card">
          <span className="kpi-label">TOTAL ARTISTS</span>
          <span className="kpi-val">{metrics.total}</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">CURRENTLY ACTIVE</span>
          <span className="kpi-val pink-text">{metrics.active}</span>
        </div>
        <div className="kpi-card solid-pink">
          <span className="kpi-label">DAILY CAPACITY</span>
          <span className="kpi-val">{metrics.capacity}<span className="kpi-percent">%</span></span>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="spec-bento-grid">
        
        {specialistsList.length === 0 ? (
          <p style={{color: '#888'}}>Awaiting data...</p>
        ) : (
          specialistsList.map((spec, index) => (
            <div className="spec-bento-card" key={index}>
              <div className="spec-card-image">
                <img src={spec.image} alt={spec.name} />
                <span className={`status-pill ${spec.isBookedToday ? 'in-service' : 'available'}`}>
                  {spec.isBookedToday ? 'IN SERVICE' : 'AVAILABLE'}
                </span>
              </div>
              <div className="spec-card-info">
                <div className="info-header">
                  <div>
                    <h3>{spec.name}</h3>
                    <span className="spec-role">{spec.role}</span>
                  </div>
                  <button className="action-menu-btn">⋮</button>
                </div>
                <div className="spec-tags">
                  {spec.tags.map((tag, tIdx) => (
                    <span className="spec-tag" key={tIdx}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}

      </div>

      {/* Optimization Insights Block */}
      <div className="insights-block">
        <div className="insights-content">
          <h2 className="insights-title">Optimization Insights</h2>
          <p className="insights-desc">
            Your specialists are currently performing at {metrics.capacity}% capacity. To maintain the "Golden Hour" experience for clients, consider adding a Junior Assistant to support booking overload during peak hours.
          </p>
          
          <div className="insights-metrics">
            <div className="im-box">
              <span className="im-val">{Math.min(metrics.capacity + 12, 100)}%</span>
              <span className="im-label">EFFICIENCY</span>
            </div>
            <div className="im-box">
              <span className="im-val">4.9/5</span>
              <span className="im-label">TEAM RATING</span>
            </div>
          </div>
        </div>

        <div className="quick-actions-box">
          <h4>Quick Actions</h4>
          <ul className="qa-list">
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              <span>Sync Calendars</span>
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
              <span>Review Commissions</span>
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              <span>Team Bulletin</span>
            </li>
          </ul>
        </div>
        
        {/* Background Decorative Shapes */}
        <div className="deco-shape shape-1"></div>
        <div className="deco-shape shape-2"></div>
      </div>

    </div>
  );
};

export default Specialists;
