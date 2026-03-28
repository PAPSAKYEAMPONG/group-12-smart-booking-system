import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import './AdminLayout.css';

const AdminLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const path = location.pathname;

  let pageTitle = '';
  let pageDate = '';

  const getOrdinalSuffix = (i) => {
    const j = i % 10, k = i % 100;
    if (j === 1 && k !== 11) return i + "st";
    if (j === 2 && k !== 12) return i + "nd";
    if (j === 3 && k !== 13) return i + "rd";
    return i + "th";
  };

  const getFormattedDate = () => {
    const today = new Date();
    const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
    const monthName = today.toLocaleDateString('en-US', { month: 'long' });
    const dayNum = today.getDate();
    const year = today.getFullYear();
    return `${dayName}, ${monthName} ${getOrdinalSuffix(dayNum)}, ${year}`;
  };

  if (path.includes('appointments')) {
    pageTitle = 'Appointments';
    pageDate = getFormattedDate();
  } else if (path.includes('specialists')) {
    pageTitle = 'Specialists';
  } else if (path.includes('services')) {
    pageTitle = 'Services';
  } else if (path.includes('overview') || path === '/admin') {
    pageTitle = 'Good morning, Elena';
    pageDate = 'Here is what is happening at The Digital Atelier today.';
  }

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="admin-container">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div className="admin-mobile-overlay" onClick={closeMobileMenu}></div>
      )}

      {/* Left Sidebar */}
      <aside className={`admin-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-close-btn" onClick={closeMobileMenu}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </div>
        <div className="admin-brand">
          <h1>Atelier Admin</h1>
          <span>PREMIUM MANAGEMENT</span>
        </div>

        <nav className="admin-nav">
          <NavLink to="/admin/overview" onClick={closeMobileMenu} className={({ isActive }) => isActive ? 'admin-nav-link active' : 'admin-nav-link'}>
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h4v4H4V4zm6 0h10v4H10V4zM4 10h4v10H4V10zm6 6h10v4H10v-4zm0-6h10v4H10v-4z" /></svg>
            Overview
          </NavLink>
          <NavLink to="/admin/appointments" onClick={closeMobileMenu} className={({ isActive }) => isActive ? 'admin-nav-link active' : 'admin-nav-link'}>
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" /></svg>
            Appointments
          </NavLink>
          <NavLink to="/admin/specialists" onClick={closeMobileMenu} className={({ isActive }) => isActive ? 'admin-nav-link active' : 'admin-nav-link'}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
            Specialists
          </NavLink>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main">
        {/* Top Header */}
        <header className="admin-header">
          <div className="header-left-mobile">
            <button className="mobile-menu-toggle" onClick={() => setIsMobileMenuOpen(true)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
            <div className="search-bar hidden-mobile">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input type="text" placeholder="Search..." />
            </div>
          </div>

          <div className="header-right">
            <button className="header-icon-btn hidden-mobile">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" /></svg>
            </button>
            <button className="header-icon-btn hidden-mobile">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" /></svg>
            </button>

            <div className="user-profile">
              <div className="user-info hidden-mobile">
                <strong>Elena Rossi</strong>
                <span>SALON MANAGER</span>
              </div>
              <img src="/Images/Member1.jpg" alt="Profile" className="profile-img" />
            </div>
          </div>
        </header>

        <div className="admin-content-wrapper">
          {/* Dynamic Page Headers */}
          <div className="page-header">
            {path.includes('specialists') && <span className="management-label">MANAGEMENT</span>}
            <h2 className={path.includes('overview') || path === '/admin' ? 'page-header-title overview-title' : 'page-header-title'}>
              {pageTitle}
            </h2>
            {pageDate && <p className="page-header-date">{pageDate}</p>}
          </div>

          <div className="page-content-outlet">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
