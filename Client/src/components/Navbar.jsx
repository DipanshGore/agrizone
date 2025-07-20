import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaTractor, FaUser, FaUserShield } from "react-icons/fa";


const Navbar = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const navigate = useNavigate();

 
  const handleLoginOption = (role) => {
    navigate(`/login/${role}`);
    setLoginOpen(false);
  };

  return (
    <aside className="w-full bg-green-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-2xl font-bold tracking-wide">
          <NavLink to="/" className="hover:text-yellow-300 transition-colors">🌾 AgriZone</NavLink>
        </div>
        <nav className="space-x-6 text-sm sm:text-base font-medium flex items-center">
          <NavLink
            to="/"
            className={({ isActive }) => isActive ? 'text-yellow-300 font-semibold' : 'hover:text-yellow-300 transition-colors'} > Home </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => isActive ? 'text-yellow-300 font-semibold' : 'hover:text-yellow-300 transition-colors'}> About </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => isActive ? 'text-yellow-300 font-semibold' : 'hover:text-yellow-300 transition-colors'}> Contact us </NavLink>
          <NavLink
            to="/store"
            className={({ isActive }) => isActive ? 'text-yellow-300 font-semibold' : 'hover:text-yellow-300 transition-colors'}> AgriStore </NavLink>

         
          <div
            className="relative inline-block"
            onMouseEnter={() => setLoginOpen(true)}
            onMouseLeave={() => setLoginOpen(false)}
          >
            <button
              className={`flex items-center gap-1 hover:text-yellow-300 transition-colors duration-150 ${loginOpen ? "text-yellow-300" : ""}`}
              aria-haspopup="true"
              aria-expanded={loginOpen}
              type="button"
            >
              Login
            </button>
            <div
              className={`
                absolute right-0 z-20 mt-2 w-48 rounded-md shadow-lg bg-white text-gray-800 py-2 ring-1 ring-black ring-opacity-5
                ${loginOpen
                  ? "opacity-100 scale-100 pointer-events-auto"
                  : "opacity-0 scale-95 pointer-events-none"
                }
                transform transition-all duration-150 origin-top-right
              `}
            >
              <button
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-green-100 hover:text-green-800 transition-colors text-left"
                onClick={() => handleLoginOption('farmer')}
              >
                <FaTractor className="text-green-600" /> Farmer
              </button>
              <button
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-green-100 hover:text-green-800 transition-colors text-left"
                onClick={() => handleLoginOption('customer')}
              >
                <FaUser className="text-yellow-600" /> Customer
              </button>
              <button
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-green-100 hover:text-green-800 transition-colors text-left"
                onClick={() => handleLoginOption('admin')}
              >
                <FaUserShield className="text-blue-600" /> Admin
              </button>
            </div>
          </div>

          <NavLink
            to="/register"
            className={({ isActive }) => isActive ? 'text-yellow-300 font-semibold' : 'hover:text-yellow-300 transition-colors'}
          > Register </NavLink>
        </nav>
      </div>
    </aside>
  );
};

export default Navbar;
