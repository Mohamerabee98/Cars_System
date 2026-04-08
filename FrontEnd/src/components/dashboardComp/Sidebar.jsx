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
} from "lucide-react";
import { NavLink } from "react-router-dom";
import Offcanvas from "bootstrap/js/dist/offcanvas";

export default function Sidebar() {
  const navItems = [
    {
      label: "لوحة التحكم",
      to: "/dashboard",
      icon: LayoutDashboard,
      end: true,
    },
    { label: "الحجوزات", to: "/dashboard/bookings", icon: CalendarCheck },
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
    { label: "الإعدادات", to: "/dashboard/settings", icon: Settings },
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

  return (
    <div className="sidebar-wrap d-flex flex-column h-100">
      <div className="sidebar-brand px-3 pt-3">
        <div className="brand-box">
          <div className="brand-title">نايل كلين للسيارات</div>
          <div className="brand-subtitle">نظام ادارة  </div>
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

      <div className="sidebar-user p-3">
        <div className="user-card d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <div className="user-avatar">م</div>
            <div className="text-end">
              <div className="user-name">زياد عماد</div>
              <div className="user-role">مدير النظام</div>
            </div>
          </div>
          <button className="user-logout">⎋</button>
        </div>
      </div>
    </div>
  );
}