import { Routes, Route } from "react-router-dom";

import DashboardLayout from "../pages/dashboard/DashboardLayout";

export default function DashboardRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<div className="p-3 text-end">محتوى لوحة التحكم</div>} />
      </Route>
    </Routes>
  );
}
