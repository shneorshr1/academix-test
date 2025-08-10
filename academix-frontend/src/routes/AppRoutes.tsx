import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Home from '../pages/Home';

export default function AppRoutes() {

  return (
    <Router>
      <Layout>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/1" element={<div>לוח שנה</div>} />
          <Route path="/2" element={<div>תכני קורס</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}
