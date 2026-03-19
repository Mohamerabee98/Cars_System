import { Menu, Bell, Search } from "lucide-react";

export default function Topbar({ onOpenSidebar }) {
  return (
    <header className="topbar d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center gap-2">
        <button
          type="button"
          className="icon-btn d-lg-none"
          onClick={onOpenSidebar}
          aria-label="Open menu"
          data-bs-toggle="offcanvas"
          data-bs-target="#dashboardSidebar"
        >
          <Menu size={18} />
        </button>

        <button className="icon-btn">
          <Bell size={18} />
        </button>

        <div className="search-wrap ">
          <Search size={18} className="search-icon" />
          <input className="search-input" placeholder="ابحث عن رقم لوحة..." />
        </div>
      </div>
      <div className="text-end d-none d-lg-block">
        <div className="page-title">لوحة التحكم</div>
      </div>
    </header>
  );
}
