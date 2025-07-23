import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FaBars, FaTimes, FaTractor, FaUser, FaUserShield } from "react-icons/fa";

const Navbar = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLoginOption = (role) => {
    navigate(`/login/${role}`);
    setLoginOpen(false);
    setMobileOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLoginOpen(false);
      }
    }
    if (loginOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [loginOpen]);

  return (
    <header className="sticky top-0 z-50 bg-green-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <NavLink
          to="/"
          className="text-3xl font-extrabold tracking-wide flex items-center gap-2 hover:text-yellow-400 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 rounded"
        >
          <span role="img" className="text-yellow-400">🌾</span>
          AgriZone
        </NavLink>

        <button
          className="sm:hidden text-3xl p-2 rounded-md hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 transition"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>

       
        <nav
          className={`
            fixed top-16 left-0 right-0 bg-green-800 sm:bg-transparent p-6 sm:p-0 shadow-lg sm:shadow-none rounded-b-md
            sm:static flex flex-col sm:flex-row items-start sm:items-center gap-6 text-lg font-medium text-white
            transition-transform duration-300 ease-in-out
            ${mobileOpen ? "translate-y-0 visible opacity-100" : "translate-y-[-20px] invisible opacity-0 sm:opacity-100 sm:visible"}
            sm:translate-y-0 sm:flex
          `}
          role="navigation"
          aria-label="Main"
        >
          {["/", "/about", "/contact", "/store"].map((path, idx) => {
            const labels = ["Home", "About", "Contact", "AgriStore"];
            return (
              <NavLink
                key={labels[idx]}
                to={path}
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-400 font-semibold border-b-2 border-yellow-400 pb-0.5"
                    : "hover:text-yellow-400 transition-colors"
                }
              >
                {labels[idx]}
              </NavLink>
            );
          })}
         
          <div className="relative" ref={dropdownRef}>
            <button
              className={`flex items-center gap-1 cursor-pointer text-lg hover:text-yellow-400 transition-colors duration-150 rounded px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 ${
                loginOpen ? "text-yellow-400" : ""
              }`}
              type="button"
              aria-haspopup="true"
              aria-expanded={loginOpen}
              onClick={() => setLoginOpen((open) => !open)}
            >
              Login
              <span className={`transform transition-transform duration-300 ${loginOpen ? "rotate-180" : "rotate-0"}`}>
                ▼
              </span>
            </button>
            <div
              className={`
                absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white text-gray-800 ring-1 ring-black ring-opacity-10
                origin-top-right transform transition-all duration-200
                ${loginOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}
              `}
            >
              <button
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-green-100 hover:text-green-900 transition-colors text-left rounded-sm"
                onClick={() => handleLoginOption("farmer")}
              >
                <FaTractor className="text-green-600" /> Farmer
              </button>
              <button
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-green-100 hover:text-green-900 transition-colors text-left rounded-sm"
                onClick={() => handleLoginOption("customer")}
              >
                <FaUser className="text-yellow-600" /> Customer
              </button>
              <button
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-green-100 hover:text-green-900 transition-colors text-left rounded-sm"
                onClick={() => handleLoginOption("admin")}
              >
                <FaUserShield className="text-blue-600" /> Admin
              </button>
            </div>
          </div>

          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-400 font-semibold border-b-2 border-yellow-400 pb-0.5"
                : "hover:text-yellow-400 transition-colors"
            }
          >
            Register
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
