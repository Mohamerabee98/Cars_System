import Sidebar from "../../components/dashboardComp/Sidebar";
import Topbar from "../../components/dashboardComp/Topbar";
import { Outlet } from "react-router-dom";
import "./dashboard.css";

export default function DashboardLayout() {
  return (
    <div className="dash-root">

      {/* Sidebar Desktop */}
      <aside className="dash-sidebar d-none d-lg-block">
        <Sidebar />
      </aside>

      {/* Sidebar Mobile */}
      <div
        className="offcanvas offcanvas-end dash-offcanvas"
        tabIndex="-1"
        id="dashboardSidebar"
      >
        <div className="offcanvas-body p-0">
          <Sidebar />
        </div>
      </div>

      <main className="dash-main">

        {/* Topbar يظهر فقط تحت lg (موبايل + تابلت) */}
        <div className="d-lg-none">
          <Topbar
            onOpenSidebar={() => {
              const el = document.getElementById("dashboardSidebar");
              if (el) {
                const bsOffcanvas =
                  window.bootstrap?.Offcanvas?.getOrCreateInstance(el);
                bsOffcanvas?.show();
              }
            }}
          />
        </div>

        <div className="dash-content container-fluid">
          <Outlet />
        </div>
      </main>

    </div>
  );
} 