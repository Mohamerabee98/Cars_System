import { Navigate, Outlet } from "react-router-dom";

export const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user?.role !== "admin") {
    return <Navigate to="/login" />;
  }
  return  <Outlet />;
};