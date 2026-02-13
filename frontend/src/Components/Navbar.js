import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check for auth token on mount to determine button visibility
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <nav className="w-full flex justify-end items-center px-10 py-6 absolute top-0 right-0 z-30">
      <div className="flex items-center gap-8">
        {/* Login button only renders if the user is NOT authenticated */}
        {!isLoggedIn && (
          <Link to="/login" className="text-slate-500 hover:text-slate-900 transition-colors text-sm font-semibold">
            Login
          </Link>
        )}
        <button className="text-slate-900 font-bold hover:text-cyan-600 transition-colors text-sm">
          Support
        </button>
      </div>
    </nav>
  );
};

export default Navbar;