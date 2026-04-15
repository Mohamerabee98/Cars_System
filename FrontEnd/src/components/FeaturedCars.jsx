import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import CarCard from "./CarCard";

export default function FeaturedCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/cars")
      .then((r) => r.json())
      .then((data) => {
        const list = Array.isArray(data)
          ? data
          : data.cars ?? data.data ?? data.result ?? data.items ?? [];
        setCars(list.slice(0, 3));
      })
      .catch(() => setCars([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="featured" className="bg-white py-20 border-none" dir="rtl">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <span className="text-orange-600 text-[11px] font-black uppercase tracking-[0.2em]">
              مختارات النخبة
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 leading-tight">
              سيارات مميزة للبيع
            </h2>
          </div>
          <Link
            to="/inventory"
            id="featured-view-all"
            className="group flex items-center gap-2 bg-slate-900 text-white font-bold text-xs px-6 py-3.5 rounded-full hover:bg-orange-600 transition-all duration-300 shadow-lg"
          >
            <span>عرض جميع المركبات</span>
            <span className="group-hover:translate-x-[-4px] transition-transform duration-200">←</span>
          </Link>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
          </div>
        ) : cars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-slate-400">
            <p className="font-medium">لا توجد سيارات متاحة حالياً</p>
          </div>
        )}
      </div>
    </section>
  );
}