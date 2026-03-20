import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import IconCard from '../IconCard/IconCard';
import { getCurrentUser, clearAuthData } from '../../utils/auth';

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const user = getCurrentUser();
    setUser(user);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      
      if (refreshToken) {
        // Call backend logout endpoint
        await fetch('http://localhost:3001/api/user/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          },
          body: JSON.stringify({ refreshToken })
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Continue with local logout even if backend call fails
    } finally {
      // Clear all authentication data
      clearAuthData();
      setUser(null);
      navigate('/');
    }
  };

  return (
    <header className="bg-[#101828] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold cursor-pointer" onClick={() => navigate('/home')}>
              <IconCard type="logo" />
            </h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => navigate('/home')}
              className="hover:text-indigo-200 transition cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => navigate('/search')}
              className="hover:text-indigo-200 transition cursor-pointer"
            >
              Search
            </button>
            <button
              onClick={() => navigate('/about')}
              className="hover:text-indigo-200 transition cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="hover:text-indigo-200 transition cursor-pointer"
            >
              Contact Us
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <Link to="/favourite">
              <svg
                fill="#fff"
                width="25px"
                height="25px"
                viewBox="0 0 0.75 0.75"
                xmlns="http://www.w3.org/2000/svg"
                id="favourite"
                className="icon glyph">
                <path d="M0.634 0.148a0.182 0.182 0 0 0 -0.259 0 0.182 0.182 0 0 0 -0.259 0 0.186 0.186 0 0 0 0 0.261l0.237 0.238a0.031 0.031 0 0 0 0.044 0l0.237 -0.238a0.185 0.185 0 0 0 0 -0.261" />
              </svg>
            </Link>
            {/* {user && (
              <span className="text-sm">
                Welcome, <span className="font-semibold">{user.name}</span>
              </span>
            )} */}
            <div className="relative ml-3" ref={dropdownRef}>
              <button
                onClick={() => setOpenDropdown(!openDropdown)}
                className="flex rounded-full focus:outline-none cursor-pointer"
              >
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                  alt="profile"
                  className="h-8 w-8 rounded-full object-cover"
                />

              </button>
              {openDropdown && (
                <div className="absolute right-0 mt-2 p-2 w-48 bg-[#1e2939] rounded-md shadow-lg z-50">
                  <button
                    onClick={() => navigate('/profile')}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-[#ffffff1a] cursor-pointer"
                  >
                    Your Profile
                  </button>

                  <button
                    onClick={() => navigate('/cart')}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-[#ffffff1a] cursor-pointer"
                  >
                    Cart
                  </button>

                  <button
                    onClick={() => navigate('/settings')}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-[#ffffff1a] cursor-pointer"
                  >
                    Settings
                  </button>

                  <button
                    onClick={() => navigate('/users')}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-[#ffffff1a] cursor-pointer"
                  >
                    All Users
                  </button>

                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-fg-danger text-sm hover:bg-[#ffffff1a] cursor-pointer"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
