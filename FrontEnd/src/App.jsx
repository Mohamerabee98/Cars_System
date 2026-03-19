import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import InventoryPage from "./pages/InventoryPage";
import CarDetailsPage from "./pages/CarDetailsPage";
import "./App.css";
import AuthRoutes from "./routes/AuthRoutes";
import DashboardRoutes from "./routes/DashboardRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/car/:id" element={<CarDetailsPage />} />
        </Routes>
        <AuthRoutes />
        <DashboardRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
