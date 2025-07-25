import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FaBars, FaTimes, FaTractor, FaUser, FaUserShield, FaLeaf, FaSun, FaMoon, FaPhoneAlt, FaStore, FaHome, FaSignInAlt, FaUserPlus, FaChevronDown,} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    let lastScroll = window.pageYOffset;
    const onScroll = () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll < 0) return;
      setShowNavbar(lastScroll > currentScroll || currentScroll < 100);
      lastScroll = currentScroll;
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  useEffect(() => {
    const background = document.body;
    if (darkMode) {
      background.classList.add("dark-background");
      background.classList.remove("light-background");
    } else {
      background.classList.add("light-background");
      background.classList.remove("dark-background");
    }
  }, [darkMode]);

  const handleLoginOption = (role) => {
    navigate(`/login/${role}`);
    setLoginOpen(false);
    setMobileOpen(false);
  };

  const navItems = [
    { path: "/", label: "Home", icon: <FaHome /> },
    { path: "/about", label: "About", icon: <FaLeaf /> },
    { path: "/contact", label: "Contact", icon: <FaPhoneAlt /> },
    { path: "/store", label: "AgriStore", icon: <FaStore /> },
  ];

  return (
    <motion.header
      className={`sticky top-0 z-50 backdrop-blur-md bg-opacity-60 border-b border-green-700 shadow-lg transition-transform duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-green-900"
      } ${showNavbar ? "translate-y-0" : "-translate-y-full"}`}
      role="banner"
      aria-label="Main Navigation"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <NavLink
          to="/"
          className="text-3xl font-extrabold tracking-wide flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-offset-1 rounded"
        >
          <motion.span
            className="text-yellow-400"
            animate={{ rotate: [10, 0, 10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            🌾
          </motion.span>
          Agri<span className="text-yellow-600">ZONE</span>
        </NavLink>

        <button
          className="sm:hidden text-3xl p-2 rounded-md hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 transition"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>

        <AnimatePresence>
          {(mobileOpen || window.innerWidth >= 640) && (
            <motion.nav
              ref={navRef}
              className={`fixed top-16 left-0 right-0 ${
                darkMode ? "bg-gray-900" : "bg-green-800"
              } sm:bg-transparent p-6 sm:p-0 shadow-lg sm:shadow-none rounded-b-md sm:static flex flex-col sm:flex-row items-start sm:items-center gap-6 text-lg font-medium backdrop-blur-md sm:backdrop-blur-none z-50`}
              initial={{ opacity: 0, x: "-100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {navItems.map(({ path, label, icon }) => (
                <NavLink
                  key={label}
                  to={path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 hover:text-yellow-400 transition-transform transform hover:scale-105 ${
                      isActive ? "text-yellow-400 font-semibold border-b-2 border-yellow-400 pb-0.5" : ""
                    }`
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  {icon} {label}
                </NavLink>
              ))}

              <div className="relative" ref={dropdownRef}>
                <button
                  className={`flex items-center gap-2 text-lg hover:text-yellow-400 transition duration-150 rounded px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 ${
                    loginOpen ? "text-yellow-400" : ""
                  }`}
                  onClick={() => setLoginOpen((open) => !open)}
                >
                  <FaSignInAlt />
                  Login
                  <motion.span
                    className="transform origin-center"
                    animate={{ rotate: loginOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <FaChevronDown />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {loginOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="absolute right-0 mt-2 w-52 rounded-md shadow-lg bg-white text-gray-800 ring-1 ring-black ring-opacity-10 origin-top-right z-40"
                    >
                      <button
                        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-green-100 hover:text-green-900 transition text-left rounded"
                        onClick={() => handleLoginOption("farmer")}
                      >
                        <FaTractor className="text-green-600" /> Farmer
                      </button>
                      <button
                        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-green-100 hover:text-green-900 transition text-left rounded"
                        onClick={() => handleLoginOption("customer")}
                      >
                        <FaUser className="text-yellow-600" /> Customer
                      </button>
                      <button
                        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-green-100 hover:text-green-900 transition text-left rounded"
                        onClick={() => handleLoginOption("admin")}
                      >
                        <FaUserShield className="text-blue-600" /> Admin
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `flex items-center gap-2 hover:text-yellow-400 transition-transform transform hover:scale-105 ${
                    isActive ? "text-yellow-400 font-semibold border-b-2 border-yellow-400 pb-0.5" : ""
                  }`
                }
              >
                <FaUserPlus /> Register
              </NavLink>

              <button
                className="sm:inline-flex items-center p-2 bg-white rounded-full transition cursor-pointer"
                onClick={() => setDarkMode((prev) => !prev)}
                aria-label="Toggle Dark Mode"
              >
                {darkMode ? <FaSun className="text-black " /> : <FaMoon className="text-black " />}
              </button>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Navbar;

