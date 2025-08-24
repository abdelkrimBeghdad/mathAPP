import React from 'react';
import { useApp } from '../context/AppContext';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const { state } = useApp();
  const { darkMode } = state;

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-all duration-300`} dir="rtl">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 lg:mr-72">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;