import { useState, useEffect } from "react";
import {
  CheckCircle2,
  Droplets,
  Sparkles,
  Wind,
  Star,
  Loader2,
  AlertCircle,
} from "lucide-react";

// Map category names to icons (fallback since API doesn't return icons)
const categoryIcons = {
  external: <Droplets size={18} className="text-orange-500" />,
  steam: <Wind size={18} className="text-orange-500" />,
  internal: <Sparkles size={18} className="text-orange-500" />,
  polish: <Star size={18} className="text-orange-500" />,
  default: <Droplets size={18} className="text-orange-500" />,
};

// Fallback images per category
const categoryImages = {
  external:
    "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=2073&auto=format&fit=crop",
  steam:
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop",
  internal:
    "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?q=80&w=2073&auto=format&fit=crop",
  polish:
    "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=2071&auto=format&fit=crop",
  default:
    "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=2073&auto=format&fit=crop",
};

export default function CarWashPage() {
  const [selectedService, setSelectedService] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAllServices = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:3000/api", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`فشل تحميل الخدمات (${response.status})`);
        }

        const data = await response.json();
        setServices(data.data);
        console.log(data)
      } catch (err) {
        console.error(err);
        setError(err.message || "حدث خطأ أثناء تحميل الخدمات");
      } finally {
        setLoading(false);
      }
    };


    getAllServices();
  }, []);

  return (
    <div
      className="min-h-screen bg-slate-50 font-['Inter',_sans-serif]"
      dir="rtl"
    >
      {/* ─── Hero Section ─── */}
      <div className="relative h-[320px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=2073&auto=format&fit=crop"
          alt="غسيل السيارات"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3 leading-tight drop-shadow">
            لمّع عربيتك مع <span className="text-orange-400">نايل كلين</span>
          </h1>
          <p className="text-white/80 text-sm md:text-base max-w-md mb-6 leading-relaxed">
            أفضل خدمة غسيل سياراتك في مصر. بنهتم بكل تفصيلة في عربيتك عشان
            ترجع كأنها زيرو. احجز ميعادك في أقل من دقيقة.
          </p>
        </div>
      </div>

      {/* ─── Services Section ─── */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-slate-900 mb-2">
            خدمات العناية المتميزة بالسيارات
          </h2>
          <p className="text-slate-500 text-sm">
            امنح سيارتك الاهتمام الاحترافي الذي تستحقه. اختر من بين مجموعتنا
            الواسعة من خدمات التنظيف والتلميع.
          </p>
        </div>

        {/* ─── Loading State ─── */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 size={40} className="text-orange-500 animate-spin" />
            <p className="text-slate-500 text-sm">جاري تحميل الخدمات...</p>
          </div>
        )}

        {/* ─── Error State ─── */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <AlertCircle size={40} className="text-red-400" />
            <p className="text-red-500 font-medium">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 px-5 py-2 bg-orange-500 text-white rounded-xl text-sm font-bold hover:bg-orange-600 transition"
            >
              إعادة المحاولة
            </button>
          </div>
        )}

        {/* ─── Empty State ─── */}
        {!loading && !error && services.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <p className="text-slate-400 text-base">
              لا توجد خدمات متاحة حالياً
            </p>
          </div>
        )}

        {/* ─── Services Grid ─── */}
        {!loading && !error && services.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((service) => {
              const category = service.category?.toLowerCase() || "default";
              const icon =
                categoryIcons[category] || categoryIcons["default"];
              const image =
                service.image ||
                categoryImages[category] ||
                categoryImages["default"];

              return (
                <div
                  key={service.id}
                  className={`bg-white rounded-3xl border-2 overflow-hidden cursor-pointer transition-all shadow-sm hover:shadow-xl group ${
                    selectedService?.id === service.id
                      ? "border-orange-500 shadow-lg shadow-orange-100"
                      : "border-slate-100"
                  }`}
                >
                  {/* Service Image */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={image}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {service.status && service.status !== "active" && (
                      <span className="absolute top-3 right-3 bg-orange-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow">
                        {service.status}
                      </span>
                    )}
                  </div>

                  {/* Service Content */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        {icon}
                        <h3 className="font-bold text-slate-900 text-base">
                          {service.name}
                        </h3>
                      </div>
                      <div className="flex items-baseline gap-0.5">
                        <span className="text-xl font-black text-orange-500">
                          {service.price}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">
                          {" "}
                          ج.م
                        </span>
                      </div>
                    </div>

                    {service.duration && (
                      <p className="text-[10px] text-orange-400 font-medium mb-1">
                        ⏱ {service.duration} دقيقة
                      </p>
                    )}

                    <p className="text-[11px] text-slate-500 leading-relaxed mb-4">
                      {service.description}
                    </p>

                    <button
                      className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all ${
                        selectedService?.id === service.id
                          ? "bg-orange-500 text-white shadow-md shadow-orange-200"
                          : "bg-slate-50 hover:bg-orange-50 text-slate-700 hover:text-orange-500"
                      }`}
                      onClick={() =>
                        setSelectedService(
                          selectedService?.id === service.id ? null : service
                        )
                      }
                    >
                      {selectedService?.id === service.id ? (
                        <span className="flex items-center justify-center gap-1.5">
                          <CheckCircle2 size={15} /> تم الاختيار
                        </span>
                      ) : (
                        "اختيار"
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ─── Selected Service Summary ─── */}
      {selectedService && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md">
          <div className="bg-slate-900 text-white rounded-2xl px-5 py-4 flex items-center justify-between shadow-2xl">
            <div>
              <p className="text-xs text-slate-400 mb-0.5">الخدمة المختارة</p>
              <p className="font-bold text-base">{selectedService.name}</p>
            </div>
            <div className="text-left">
              <span className="text-2xl font-black text-orange-400">
                {selectedService.price}
              </span>
              <span className="text-xs text-slate-400"> ج.م</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
