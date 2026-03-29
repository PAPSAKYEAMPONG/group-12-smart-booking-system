import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import './Overview.css';

const Overview = () => {
  const [recentBookings, setRecentBookings] = useState([]);
  const [metrics, setMetrics] = useState({ todaysBookings: 0, totalRevenue: 0, occupancy: 0 });
  const [staffPerformance, setStaffPerformance] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'bookings'));
        const allBookings = [];
        querySnapshot.forEach((doc) => {
          allBookings.push({ id: doc.id, ...doc.data() });
        });

        allBookings.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        setRecentBookings(allBookings.slice(0, 5));

        const today = new Date();
        const isToday = (dateStr) => {
          if (!dateStr) return false;
          const d = new Date(dateStr);
          // Fallback if parsing fails (e.g. if it's just '21' from older tests)
          if (isNaN(d)) return dateStr.toString().includes(today.getDate().toString());
          return d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
        };
        
        let todaysCount = 0;
        let revenue = 0;
        const staffCounts = {};

        allBookings.forEach(b => {
          if (isToday(b.date)) {
            todaysCount++;
          }
          
          if (b.service && b.service.price) {
            const priceStr = b.service.price.replace(/[^0-9]/g, '');
            revenue += parseInt(priceStr || '0', 10);
          }

          if (b.specialist) {
            staffCounts[b.specialist] = (staffCounts[b.specialist] || 0) + 1;
          }
        });

        const fakeCapacity = 24; 
        let occ = Math.round((todaysCount / fakeCapacity) * 100);
        if (occ > 100) occ = 100;

        setMetrics({
          todaysBookings: todaysCount || allBookings.length, 
          totalRevenue: revenue || allBookings.reduce((sum, b) => sum + parseInt(b.service?.price?.replace(/[^0-9]/g, '') || 0), 0),
          occupancy: occ || Math.min(Math.round((allBookings.length / 24)*100), 100)
        });

        const performanceArr = Object.keys(staffCounts).map(name => {
          const count = staffCounts[name];
          let percentage = Math.round((count / 4) * 100);
          if (percentage > 100) percentage = 100;
          return { name, percentage, label: percentage === 100 ? 'FULL' : `${percentage}% BOOKED` };
        }).sort((a,b) => b.percentage - a.percentage).slice(0,3);
        
        setStaffPerformance(performanceArr);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchAllData();
  }, []);

  const getInitials = (firstName, lastName) => {
    if (!firstName) return 'C';
    if (!lastName) return firstName[0].toUpperCase();
    return (firstName[0] + lastName[0]).toUpperCase();
  };

  return (
    <div className="overview-container">
      {/* Top Metrics Row */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-top">
            <span className="metric-label">TODAY'S BOOKINGS</span>
            <div className="metric-icon pink-icon">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5z"/></svg>
            </div>
          </div>
          <div className="metric-value">{metrics.todaysBookings}</div>
          <div className="metric-bottom">
            <span className="trend positive">+12%</span>
            <span className="trend-label">VS YESTERDAY</span>
          </div>
        </div>

        <div className="metric-card dark-metric">
          <div className="metric-top">
            <span className="metric-label">TOTAL REVENUE</span>
            <div className="metric-icon dark-icon">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>
            </div>
          </div>
          <div className="metric-value">GH₵{metrics.totalRevenue.toLocaleString()}</div>
          <div className="metric-bottom">
            <span className="trend positive">+5.4%</span>
            <span className="trend-label">MONTHLY TARGET</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-top">
            <span className="metric-label">OCCUPANCY</span>
            <div className="metric-icon gray-icon">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
            </div>
          </div>
          <div className="metric-value">{metrics.occupancy}<span className="percent-sign">%</span></div>
          <div className="metric-bottom progress-container">
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{width: `${metrics.occupancy}%`}}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="content-grid">
        {/* Left Column: Recent Bookings */}
        <div className="bookings-panel">
          <div className="panel-header">
            <h3>Recent Bookings</h3>
            <a href="#schedule" className="view-all-link">View All Schedule</a>
          </div>

          <div className="bookings-table">
            <div className="table-header">
              <div className="th-customer">CUSTOMER</div>
              <div className="th-service">SERVICE</div>
              <div className="th-time">TIME</div>
              <div className="th-specialist">SPECIALIST</div>
              <div className="th-action"></div>
            </div>

            <div className="table-body">
              {recentBookings.map((booking, idx) => {
                const fname = booking.customerDetails?.firstName || 'Unknown';
                const lname = booking.customerDetails?.lastName || '';
                const initials = booking.badge || getInitials(fname, lname);
                
                let badgeClass = 'badge-pink';
                if (booking.isDark || idx % 4 === 1) badgeClass = 'badge-dark';
                if (booking.isGold || idx % 4 === 2) badgeClass = 'badge-gold';
                if (booking.isPink || idx % 4 === 3) badgeClass = 'badge-lightpink';

                return (
                  <div className="table-row" key={booking.id || idx}>
                    <div className="td-customer">
                      <div className={`customer-badge ${badgeClass}`}>{initials}</div>
                      <span className="customer-name">{fname} {lname}</span>
                    </div>
                    <div className="td-service">{booking.service?.title || 'Unknown Service'}</div>
                    <div className="td-time">{booking.time || 'TBD'}</div>
                    <div className="td-specialist">
                      <img src="/Images/Member1.jpg" alt="Specialist" className="specialist-avatar" />
                      {booking.specialist || 'Unassigned'}
                    </div>
                    <div className="td-action">
                      <button className="action-menu-btn">⋮</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Performance & Insights */}
        <div className="right-panel">
          <div className="performance-card">
            <h3>Staff Performance</h3>
            
            {staffPerformance.length === 0 ? (
              <p style={{color: '#888', fontSize: '0.85rem'}}>Awaiting booking data...</p>
            ) : (
              staffPerformance.map((staff, idx) => (
                <div className="staff-stat" key={idx}>
                  <div className="stat-labels">
                    <span className="staff-name">{staff.name.toUpperCase()}</span>
                    <span className="staff-val">{staff.label}</span>
                  </div>
                  <div className="progress-bar-bg staff-progress-bg">
                    <div className="progress-bar-fill staff-progress-fill" style={{width: `${staff.percentage}%`}}></div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;