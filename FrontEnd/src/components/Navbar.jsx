import { NavLink ,Link} from "react-router-dom";
import { ShoppingCart, User, Car, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Function to handle NavLink styling
  const linkClass = () =>
    `text-base font-medium transition-colors duration-200 text-gray-400 hover:text-orange-500`;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100" dir="rtl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo Section */}
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="bg-orange-500 p-2 rounded-xl transition-transform group-hover:scale-105">
            <Car className="w-6 h-6 text-white" />
          </div>
          <span className="text-black font-bold text-2xl tracking-tight">Auto Show</span>
        </NavLink>

        {/* Desktop Navigation */}
        <ul className="main-nav hidden md:flex items-center gap-10 my-0">
          <li>
            <NavLink to="/" end className={linkClass}>
              الرئيسية
            </NavLink>
          </li>
          <li>
            <NavLink to="/inventory" className={linkClass}>
              المعرض
            </NavLink>
          </li>
          <li>
            <a
              href="#"
              className="text-base font-medium text-gray-400 hover:text-orange-500 transition-colors"
            >
              غسيل السيارات
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-base font-medium text-gray-400 hover:text-orange-500 transition-colors"
            >
              تواصل معنا
            </a>
          </li>
        </ul>

        {/* Action Icons */}
        <div className="flex items-center gap-4">
          <button
            className="p-3 rounded-full bg-orange-50 text-orange-500 hover:bg-orange-100 transition-colors relative"
            aria-label="سلة التسوق"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full border-2 border-white"></span>
          </button>

          <button
            className="p-3 rounded-full bg-orange-50 text-orange-500 hover:bg-orange-100 transition-colors"
            aria-label="الملف الشخصي"
          >
            <NavLink to={"/login"}>
            <User className="w-5 h-5" />
            </NavLink>
          </button>

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-btn"
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="القائمة"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-50 px-6 py-6 flex flex-col gap-5 shadow-xl animate-in slide-in-from-top duration-300">
          <NavLink
            to="/"
            end
            className={linkClass}
            onClick={() => setMobileOpen(false)}
          >
            الرئيسية
          </NavLink>
          <NavLink
            to="/inventory"
            className={linkClass}
            onClick={() => setMobileOpen(false)}
          >
            المعرض
          </NavLink>
          <a
            href="#"
            className="text-base font-medium text-gray-400 hover:text-orange-500 transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            غسيل السيارات
          </a>
          <a
            href="#"
            className="text-base font-medium text-gray-400 hover:text-orange-500 transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            تواصل معنا
          </a>
        </div>
      )}
    </nav>
  );
}