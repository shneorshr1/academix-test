// Layout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import './Layout.css';
import Sidebar from './Sidebar';
import Topbar from './Topbar';


export default function Layout() {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <div className="page-content">
           <Outlet />
        </div>
      </div>
    </div>
  );
}
