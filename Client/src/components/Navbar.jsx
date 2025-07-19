import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <aside className="w-full bg-green-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        <div className="text-2xl font-bold tracking-wide">
          <NavLink to="/" className="hover:text-yellow-300 transition">🌾 AgriZone</NavLink>
        </div>

        <nav className="space-x-6 text-sm sm:text-base font-medium">
          <NavLink
            to="/"
            className={({ isActive }) => isActive ? 'text-yellow-300 font-semibold' : 'hover:text-yellow-300 transition'} > Home </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? 'text-yellow-300 font-semibold' : 'hover:text-yellow-300 transition'}   >  About </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? 'text-yellow-300 font-semibold' : 'hover:text-yellow-300 transition'
            }
          >
            Contact us
          </NavLink>

          <NavLink
            to="/store"
            className={({ isActive }) =>  isActive ? 'text-yellow-300 font-semibold' : 'hover:text-yellow-300 transition'
            }
          >
            AgriStore
          </NavLink>

          <NavLink
            to="/login"
            className={({ isActive }) => isActive ? 'text-yellow-300 font-semibold' : 'hover:text-yellow-300 transition'
            }
          >
            Login
          </NavLink>

          <NavLink
            to="/register"
            className={({ isActive }) =>  isActive ? 'text-yellow-300 font-semibold' : 'hover:text-yellow-300 transition'
            }
          >
            Register
          </NavLink>
        </nav>
      </div>
    </aside>
  );
};

export default Navbar;
