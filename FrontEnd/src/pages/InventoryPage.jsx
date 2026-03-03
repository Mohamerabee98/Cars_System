import Navbar from "../components/Navbar";
import Inventory from "../components/Inventory";
import Footer from "../components/Footer";

export default function InventoryPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <Inventory />
      <Footer />
    </div>
  );
}
