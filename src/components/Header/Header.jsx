import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import IconCard from '../IconCard/IconCard';

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);


  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
    navigate('/');
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
          </nav>

          <div className="flex items-center space-x-4">
            <Link to="/favourite">
              <svg fill="#fff" width="25px" height="25px" viewBox="0 0 0.75 0.75" xmlns="http://www.w3.org/2000/svg" id="favourite" className="icon glyph"><path d="M0.634 0.148a0.182 0.182 0 0 0 -0.259 0 0.182 0.182 0 0 0 -0.259 0 0.186 0.186 0 0 0 0 0.261l0.237 0.238a0.031 0.031 0 0 0 0.044 0l0.237 -0.238a0.185 0.185 0 0 0 0 -0.261" /></svg>
            </Link>
            {/* {user && (
              <span className="text-sm">
                Welcome, <span className="font-semibold">{user.name}</span>
              </span>
            )} */}
            <div className="relative ml-3">
              <button
                onClick={() => setOpenDropdown(!openDropdown)}
                className="flex rounded-full focus:outline-none"
              >
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                  alt="profile"
                  className="h-8 w-8 rounded-full"
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
