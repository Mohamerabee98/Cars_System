import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import InventoryPage from "./pages/InventoryPage";
import CarDetailsPage from "./pages/CarDetailsPage";
import CarWashPage from "./pages/CarWashPage";
import ProfilePage from "./pages/ProfilePage";
import ContactPage from "./pages/ContactPage";
import "./App.css";
import AuthRoutes from "./routes/AuthRoutes";
import DashboardRoutes from "./routes/DashboardRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* All public pages share the Layout (Navbar + Footer) */}
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/car/:id" element={<CarDetailsPage />} />
            <Route path="/car-wash" element={<CarWashPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>
        </Routes>
        <AuthRoutes />
        <DashboardRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;

