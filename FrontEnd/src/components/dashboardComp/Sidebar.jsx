import {
  LayoutDashboard,
  CalendarCheck,
  Car,
  Boxes,
  Tags,
  Users,
  ShoppingCart,
  PackagePlus,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import Offcanvas from "bootstrap/js/dist/offcanvas";
import { useProfile } from "../../hook/profile";
export default function Sidebar() {
  const { user } = useProfile();
  const navigate = useNavigate();

  const displayName = user?.name?.trim() || user?.email?.trim() || "مستخدم";
  const initial =
    displayName.replace(/[^\p{L}\p{N}]/gu, "").charAt(0) ||
    displayName.charAt(0) ||
    "؟";

  const navItems = [
    {
      label: "لوحة التحكم",
      to: "/dashboard",
      icon: LayoutDashboard,
      end: true,
    },
    // { label: "الحجوزات", to: "/dashboard/bookings", icon: CalendarCheck },
    { label: "المغسلة", to: "/dashboard/cars", icon: Car },
    { label: "المخزون", to: "/dashboard/inventory", icon: Boxes },
    { label: "الخدمات والأسعار", to: "/dashboard/services-prices", icon: Tags },
    { label: "العملاء", to: "/dashboard/customers", icon: Users },
    { label: "المبيعات", to: "/dashboard/sales", icon: ShoppingCart },
    {
      label: "أضف إلى المخزون",
      to: "/dashboard/add-to-inventory",
      icon: PackagePlus,
    },
    { label: "التقارير", to: "/dashboard/reports", icon: FileText },
    // { label: "الإعدادات", to: "/dashboard/settings", icon: Settings },
  ];

  const handleCloseOffcanvas = () => {
    const offcanvasEl = document.getElementById("dashboardSidebar");
    if (!offcanvasEl) return;

    const bsOffcanvas = Offcanvas.getOrCreateInstance(offcanvasEl);
    bsOffcanvas.hide();

    setTimeout(() => {
      offcanvasEl.classList.remove("show");

      document
        .querySelectorAll(".offcanvas-backdrop")
        .forEach((el) => el.remove());

      document.body.classList.remove("modal-open");
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }, 200);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    handleCloseOffcanvas();
    navigate("/login", { replace: true });
  };

  return (
    <div className="sidebar-wrap d-flex flex-column h-100">
      <div className="sidebar-brand px-3 pt-3">
        <div className="brand-box">
          <div className="brand-title">نايل كلين للسيارات</div>
          <div className="brand-subtitle">نظام ادارة </div>
        </div>
      </div>

      <nav className="sidebar-nav px-2 mt-3 flex-grow-1">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.end}
              onClick={handleCloseOffcanvas}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-user px-3 pb-3 pt-1">
        <div className="user-card">
          <div className="d-flex align-items-center gap-3">
            <div className="user-avatar" aria-hidden>
              {initial}
            </div>
            <div className="user-meta text-end flex-grow-1 min-w-0">
              <div className="user-name text-truncate" title={displayName}>
                {displayName}
              </div>
              <div className="user-role-label text-truncate">مدير النظام</div>
            </div>
          </div>
          <button
            type="button"
            className="user-logout-full w-100 mt-3"
            dir="rtl"
            onClick={handleLogout}
          >
            <span>LogOut</span>
            <LogOut size={17} strokeWidth={2} aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
