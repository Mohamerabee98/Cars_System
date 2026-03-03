import { NavLink } from "react-router-dom";
import { ShoppingCart, User, Car, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold"
      : "text-gray-600 hover:text-blue-600 transition-colors duration-200";

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 text-blue-600 font-bold text-xl">
          <Car className="w-6 h-6" />
          <span className="tracking-tight">AutoShow</span>
        </NavLink>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium my-0">
          <li>
            <NavLink to="/" end className={linkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/inventory" className={linkClass}>
              Inventory
            </NavLink>
          </li>
          <li>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
              Car Wash
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
              Contact
            </a>
          </li>
        </ul>

        {/* Right icons */}
        <div className="flex items-center gap-2">
          <button
            id="cart-btn"
            className="p-2 rounded-xl text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
            aria-label="Cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
          <button
            id="user-btn"
            className="p-2 rounded-xl text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
            aria-label="User profile"
          >
            <User className="w-5 h-5" />
          </button>

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-btn"
            className="md:hidden p-2 rounded-xl text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 ml-1"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-6 py-4 flex flex-col gap-4 text-sm font-medium">
          <NavLink to="/" end className={linkClass} onClick={() => setMobileOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/inventory" className={linkClass} onClick={() => setMobileOpen(false)}>
            Inventory
          </NavLink>
          <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
            Car Wash
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
            Contact
          </a>
        </div>
      )}
    </nav>
  );
}
