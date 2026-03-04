import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import InventoryPage from "./pages/InventoryPage";
import "./App.css";
import Login from "./auth/Login";
import Register from "./auth/Register";
import AuthRoutes from "./routes/AuthRoutes";
import DashboardRoutes from "./routes/DashboardRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/inventory" element={<InventoryPage />} />
        </Routes>
        <AuthRoutes />
        <DashboardRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
