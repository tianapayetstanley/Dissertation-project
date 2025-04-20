import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import DashboardPage from '../pages/DashboardPage';
import DeliveriesPage from '../pages/DeliveriesPage';
import OrgPage from '../pages/OrgPage';
import AboutPage from '../pages/AboutPage';

const AppRoutes = ({ account }) => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/deliveries" element={<DeliveriesPage />} />
      <Route
        path="/org"
        element={account ? <OrgPage account={account} /> : <Navigate to="/" />}
      />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
};

export default AppRoutes;
