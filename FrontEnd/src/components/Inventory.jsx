import { useState, useEffect } from "react";
import { Search, ChevronDown, AlertCircle, Loader2 } from "lucide-react";
import CarCard from "./CarCard";

export default function Inventory() {
  const [search, setSearch] = useState("");
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(9);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("http://localhost:3000/api/cars");
        if (!res.ok) throw new Error(`فشل تحميل البيانات (${res.status})`);
        const data = await res.json();
        console.log(data)
        // Handle different API response shapes: [] or { cars/data/result: [] }
        const list = Array.isArray(data)
          ? data
          : data.cars ?? data.data ?? data.result ?? data.items ?? [];
        setCars(list);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const filteredCars = cars.filter((car) => {
    const q = search.toLowerCase();
    return (
      (car.company ?? "").toLowerCase().includes(q) ||
      (car.color ?? "").toLowerCase().includes(q)
    );
  });

  const visibleCars = filteredCars.slice(0, visibleCount);
  const hasMore = visibleCount < filteredCars.length;

  return (
    <div className="bg-white min-h-screen border-none pt-12" dir="rtl">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">استكشف المعرض</h1>
        <p className="text-slate-500 text-lg">ابحث عن سيارتك المثالية من مجموعتنا المتميزة</p>
      </section>

      {/* Search */}
      <section className="max-w-7xl mx-auto px-6 mb-12">
        <div className="relative w-full max-w-xl">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="البحث حسب الاسم، الماركة، الوصف..."
            className="w-full pr-12 pl-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium shadow-sm"
          />
        </div>
      </section>

      {/* Cars Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
            <p className="text-slate-500 font-medium">جاري تحميل السيارات...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 bg-red-50 rounded-3xl">
            <AlertCircle className="w-12 h-12 text-red-400" />
            <h3 className="text-xl font-bold text-slate-900">حدث خطأ أثناء التحميل</h3>
            <p className="text-slate-500">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors"
            >
              إعادة المحاولة
            </button>
          </div>
        ) : visibleCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-3xl">
            <h3 className="text-xl font-bold text-slate-900 mb-2">عذراً، لم نجد ما تبحث عنه</h3>
            <p className="text-slate-500">جرب البحث بكلمات أخرى.</p>
          </div>
        )}

        {!loading && !error && hasMore && (
          <div className="flex justify-center mt-16">
            <button
              onClick={() => setVisibleCount((c) => c + 9)}
              className="flex items-center gap-2 border border-orange-500 text-orange-600 font-bold px-8 py-3.5 rounded-xl hover:bg-orange-50 transition-colors group"
            >
              <span>تحميل المزيد من المركبات</span>
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>
        )}
      </section>
    </div>
  );
}