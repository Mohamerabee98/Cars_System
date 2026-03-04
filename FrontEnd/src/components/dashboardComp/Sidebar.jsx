import {
  LayoutDashboard,
  CalendarCheck,
  Car,
  Boxes,
  Tags,
  FileText,
  Users,
  Settings,
} from "lucide-react";

export default function Sidebar() {
    const navItems = [
  { label: "لوحة التحكم", icon: LayoutDashboard },
  { label: "الحجوزات", icon: CalendarCheck },
  { label: "السيارات", icon: Car },
  { label: "المخزون", icon: Boxes },
  { label: "الخدمات والأسعار", icon: Tags },
  { label: "التقارير", icon: FileText },
  { label: "العملاء", icon: Users },
  { label: "الإعدادات", icon: Settings },
];

  return (
    <div className="sidebar-wrap d-flex flex-column h-100">
      <div className="sidebar-brand px-3 pt-3">
        <div className="brand-box">
          <div className="brand-title">نايل كلين للسيارات</div>
          <div className="brand-subtitle">نظام ادارة فرع القاهرة</div>
        </div>
      </div>

     <nav className="sidebar-nav px-2 mt-3 flex-grow-1">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = idx === 0; 
          return (
            <button key={item.label} data-bs-dismiss="offcanvas" className={`nav-item ${isActive ? "active" : ""}`}>
              <Icon size={18} />
              {item.label}
            </button>
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
