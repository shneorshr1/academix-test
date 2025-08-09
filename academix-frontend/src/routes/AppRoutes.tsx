import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Home from '../pages/Home';
import CourseCalendar from '../components/calendar/CourseCalendar';

export default function AppRoutes() {

  return (
    <Router>
      <Layout>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/1" element={<CourseCalendar/>} />
          <Route path="/2" element={<div>תכני קורס</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}
