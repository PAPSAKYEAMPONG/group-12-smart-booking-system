import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ClientLayout = () => {
  return (
    <>
      <div className="nav-wrapper">
        <Navbar />
      </div>
      <Outlet />
      <Footer />
    </>
  );
};

export default ClientLayout;
