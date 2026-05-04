import { useState, useEffect } from "react";
import {
  CheckCircle2,
  Droplets,
  Sparkles,
  Wind,
  Star,
  Loader2,
  AlertCircle,
  Car,
  Hash,
  CalendarCheck,
  X,
  ChevronRight,
} from "lucide-react";

const BASE_URL = "http://localhost:3000";

// Map category names to icons
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

/* ── Order Modal ─────────────────────────────────────────────────────────── */
function OrderModal({ service, onClose }) {
  const [form, setForm] = useState({ plate_number: "", car_type: "" });
  const [submitting, setSubmitting] = useState(false);
  const [phase, setPhase] = useState("form"); // "form" | "success" | "error"
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.plate_number.trim() || !form.car_type.trim()) return;

    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMsg("يجب تسجيل الدخول أولاً لإتمام الطلب.");
      setPhase("error");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${BASE_URL}/orders/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          plate_number: form.plate_number,
          car_type: form.car_type,
          service_id: service.id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "حدث خطأ في إنشاء الطلب");
      }

      setPhase("success");
    } catch (err) {
      setErrorMsg(err.message);
      setPhase("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div
        className="bg-white rounded-3xl w-full max-w-md shadow-2xl relative overflow-hidden"
        dir="rtl"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition"
        >
          <X size={16} />
        </button>

        {/* ── Success Screen ── */}
        {phase === "success" && (
          <div className="flex flex-col items-center justify-center p-10 text-center">
            <div className="relative mb-6">
              <div className="w-24 h-24 rounded-full bg-emerald-50 flex items-center justify-center">
                <CheckCircle2 size={52} className="text-emerald-500" />
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-emerald-400/30 animate-ping" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-2">تم إرسال طلبك! 🎉</h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-1">
              طلبك لخدمة <span className="font-bold text-orange-500">{service.name}</span> تم بنجاح.
            </p>
            <p className="text-slate-400 text-xs mb-8">
              سيتم التواصل معك قريباً لتأكيد الموعد.
            </p>
            <button
              onClick={onClose}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl transition shadow-lg shadow-orange-200"
            >
              حسناً، شكراً!
            </button>
          </div>
        )}

        {/* ── Error Screen ── */}
        {phase === "error" && (
          <div className="flex flex-col items-center justify-center p-10 text-center">
            <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-5">
              <AlertCircle size={40} className="text-red-400" />
            </div>
            <h2 className="text-xl font-black text-slate-900 mb-2">حدث خطأ</h2>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed">{errorMsg}</p>
            <button
              onClick={() => setPhase("form")}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl transition"
            >
              حاول مرة أخرى
            </button>
          </div>
        )}

        {/* ── Form Screen ── */}
        {phase === "form" && (
          <>
            {/* Header */}
            <div className="bg-gradient-to-l from-orange-50 to-white p-6 border-b border-slate-100">
              <span className="text-[10px] font-black text-orange-500 bg-orange-100 px-2.5 py-0.5 rounded-full mb-2 inline-block">
                طلب جديد
              </span>
              <h2 className="text-xl font-black text-slate-900 mb-0.5">{service.name}</h2>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-orange-500">{service.price}</span>
                <span className="text-sm text-slate-400">ج.م</span>
              </div>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Plate Number */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  رقم اللوحة <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="مثال: ABC 1234"
                    value={form.plate_number}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, plate_number: e.target.value }))
                    }
                    required
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 pr-11 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                  />
                  <Hash
                    size={16}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300"
                  />
                </div>
              </div>

              {/* Car Type */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  نوع السيارة <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="مثال: BMW X5"
                    value={form.car_type}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, car_type: e.target.value }))
                    }
                    required
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 pr-11 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                  />
                  <Car
                    size={16}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300"
                  />
                </div>
              </div>

              {/* Service (read-only) */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  الخدمة المختارة
                </label>
                <div className="flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-xl px-4 py-3">
                  <CheckCircle2 size={16} className="text-orange-500 flex-shrink-0" />
                  <span className="text-sm font-bold text-orange-700">{service.name}</span>
                  {service.duration && (
                    <span className="text-[10px] text-orange-400 mr-auto">
                      ⏱ {service.duration} دقيقة
                    </span>
                  )}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-orange-200 text-sm mt-2"
              >
                {submitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    جاري إرسال الطلب...
                  </>
                ) : (
                  <>
                    <CalendarCheck size={18} />
                    تأكيد الطلب
                    <ChevronRight size={16} />
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Main Page ───────────────────────────────────────────────────────────── */
export default function CarWashPage() {
  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAllServices = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${BASE_URL}/api`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok)
          throw new Error(`فشل تحميل الخدمات (${response.status})`);
        const data = await response.json();
        setServices(data.data);
      } catch (err) {
        console.error(err);
        setError(err.message || "حدث خطأ أثناء تحميل الخدمات");
      } finally {
        setLoading(false);
      }
    };
    getAllServices();
  }, []);

  const handleSelectService = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-['Inter',_sans-serif]" dir="rtl">
      {/* ── Order Modal ── */}
      {showModal && selectedService && (
        <OrderModal
          service={selectedService}
          onClose={() => {
            setShowModal(false);
            setSelectedService(null);
          }}
        />
      )}

      {/* ── Hero Section ── */}
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

      {/* ── Services Section ── */}
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

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 size={40} className="text-orange-500 animate-spin" />
            <p className="text-slate-500 text-sm">جاري تحميل الخدمات...</p>
          </div>
        )}

        {/* Error */}
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

        {/* Empty */}
        {!loading && !error && services.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <p className="text-slate-400 text-base">لا توجد خدمات متاحة حالياً</p>
          </div>
        )}

        {/* Services Grid */}
        {!loading && !error && services.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((service) => {
              const category = service.category?.toLowerCase() || "default";
              const icon = categoryIcons[category] || categoryIcons["default"];
              const image =
                service.image ||
                categoryImages[category] ||
                categoryImages["default"];

              return (
                <div
                  key={service.id}
                  className="bg-white rounded-3xl border-2 border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:border-orange-200 hover:-translate-y-0.5 transition-all duration-300 group flex flex-col"
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
                  <div className="p-4 flex flex-col flex-1">
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
                        <span className="text-xs text-slate-400 font-medium"> ج.م</span>
                      </div>
                    </div>

                    {service.duration && (
                      <p className="text-[10px] text-orange-400 font-medium mb-1">
                        ⏱ {service.duration} دقيقة
                      </p>
                    )}

                    <p className="text-[11px] text-slate-500 leading-relaxed mb-4 flex-1">
                      {service.description}
                    </p>

                    <button
                      onClick={() => handleSelectService(service)}
                      className="w-full py-2.5 rounded-xl text-sm font-bold transition-all bg-slate-50 hover:bg-orange-500 text-slate-700 hover:text-white border border-slate-100 hover:border-orange-500 flex items-center justify-center gap-1.5"
                    >
                      <CalendarCheck size={15} />
                      احجز الآن
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
