import { Routes, Route } from "react-router-dom";

import DashboardLayout from "../pages/dashboard/DashboardLayout";
import DashboardHome from "../pages/dashboard/DashboardHome";
import Bookings from "../pages/dashboard/Bookings";
import DashCars from "../pages/dashboard/DashCars";
import ServicesPrices from "../pages/dashboard/ServicesPrices";
import Customers from "../pages/dashboard/Customers";
import Sales from "../pages/dashboard/Sales";
import Reports from "../pages/dashboard/Reports";
import Settings from "../pages/dashboard/Settings";

import DashInventory from "../pages/dashboard/DashInventory";
import AddToInventory from "../pages/dashboard/AddToInventory";
import '../pages/dashboard/style/DashStyle.css';

export default function DashboardRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardLayout />}>
      
        <Route index element={<DashboardHome />} />

        <Route path="bookings" element={<Bookings />} />

        <Route path="cars" element={<DashCars />} />

        <Route path="services-prices" element={<ServicesPrices />} />

        <Route path="customers" element={<Customers />} />

        <Route path="sales" element={<Sales />} />

        <Route path="inventory" element={<DashInventory />} />

        <Route path="add-to-inventory" element={<AddToInventory />} />

        <Route path="reports" element={<Reports />} />

        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
