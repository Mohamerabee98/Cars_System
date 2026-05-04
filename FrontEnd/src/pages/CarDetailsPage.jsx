import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Car,
  ChevronLeft,
  CalendarCheck,
  Calendar,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  Award,
  ShieldCheck,
  TrendingDown,
  Loader2,
  AlertCircle,
  Palette,
  Gauge,
} from "lucide-react";

import { useCart } from "../context/CartContext";

export default function CarDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();
  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedFeedback, setAddedFeedback] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3000/api/cars/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error(`فشل تحميل البيانات (${r.status})`);
        return r.json();
      })
      .then((data) => {
        // handle { data: {...} } or direct object
        const car = data.data ?? data;
        setCarData(car);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
          <p className="text-slate-500 font-medium">جاري تحميل تفاصيل السيارة...</p>
        </div>
      </div>
    );
  }

  /* ── Error ── */
  if (error || !carData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50" dir="rtl">
        <div className="flex flex-col items-center gap-4 text-center">
          <AlertCircle className="w-12 h-12 text-red-400" />
          <h2 className="text-xl font-bold text-slate-900">تعذّر تحميل السيارة</h2>
          <p className="text-slate-500">{error ?? "السيارة غير موجودة"}</p>
          <Link
            to="/inventory"
            className="mt-2 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors"
          >
            العودة للمعرض
          </Link>
        </div>
      </div>
    );
  }

  /* ── Derived values from API fields ── */
  const isNew = carData.status === "1" || carData.status === 1;
  const formattedPrice = carData.price
    ? Number(carData.price).toLocaleString("ar-EG") + " جنيه"
    : "السعر عند الاستفسار";
  const oldPrice = carData.price
    ? (Number(carData.price) + 150000).toLocaleString("ar-EG") + " جنيه"
    : null;
  const monthlyPayment = carData.price
    ? Math.round(Number(carData.price) / 60).toLocaleString("ar-EG") + " جنيه"
    : "—";

  const specs = [
    { label: "الشركة", value: carData.company },
    { label: "اللون", value: carData.color },
    { label: "الحالة", value: isNew ? "جديد" : "مستعمل" },
    { label: "المسافة المقطوعة", value: carData.stock ? `${Number(carData.stock).toLocaleString()} km` : null },
    { label: "كود السيارة", value: `#${carData.id}` },
    { label: "السعر", value: formattedPrice },
  ].filter((s) => s.value);

  const features = [
    "ضمان الجودة معتمد",
    "تقرير فحص شامل",
    "إمكانية التمويل البنكي",
    "توصيل لجميع المحافظات",
    "خدمة ما بعد البيع",
    "استبدال خلال 7 أيام",
  ];

  // Parse image from API — stored as JSON array string or plain URL or null
  const resolveImage = (raw) => {
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed[0] : String(parsed);
    } catch {
      return raw;
    }
  };
  const mainImage = resolveImage(carData.image);

  const thumbnails = [
    "https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?q=80&w=2062&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1611821064430-0d40291d0f0b?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop",
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-12" dir="rtl">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Link to="/inventory" className="hover:text-orange-500 transition-colors">المعرض</Link>
          <ChevronLeft size={16} />
          <span className="text-slate-900 font-medium capitalize">{carData.company}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* ── Sidebar ── */}
        <div className="lg:col-span-4 order-2 lg:order-1">
          <div className="sticky top-6 flex flex-col gap-6">
            {/* Main Info Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="bg-orange-100 text-orange-600 text-[10px] font-bold px-2 py-0.5 rounded-full mb-2 inline-block">
                    {isNew ? "وصلت حديثاً" : "مستعملة بحالة ممتازة"}
                  </span>
                  <h1 className="text-2xl font-bold text-slate-900 mb-1 capitalize">{carData.company}</h1>
                  <p className="text-xs text-slate-400">كود الإعلان: #{carData.id}</p>
                </div>
              </div>

              {/* Price */}
              <div className="bg-slate-50 rounded-2xl p-4 mb-6">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 mb-1">السعر</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-slate-900">{formattedPrice}</span>
                    {oldPrice && <span className="text-sm text-slate-400 line-through">{oldPrice}</span>}
                  </div>
                  {oldPrice && (
                    <div className="flex items-center gap-1.5 mt-2 text-green-600">
                      <TrendingDown size={14} />
                      <span className="text-[10px] font-bold">هبط السعر بمقدار 150,000 ج.م هذا الأسبوع</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Color chip */}
              {carData.color && (
                <div className="flex items-center gap-2 mb-5 text-slate-500">
                  <Palette size={14} />
                  <span className="text-sm font-medium capitalize">{carData.color}</span>
                </div>
              )}

              {/* Mileage */}
              {!isNew && carData.stock && (
                <div className="flex items-center gap-2 mb-5 text-slate-500">
                  <Gauge size={14} />
                  <span className="text-sm font-medium">{Number(carData.stock).toLocaleString()} km</span>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    if (isInCart(carData.id)) {
                      navigate("/bookings");
                    } else {
                      addToCart(carData);
                      setAddedFeedback(true);
                      setTimeout(() => setAddedFeedback(false), 2000);
                    }
                  }}
                  className={`w-full font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg ${
                    isInCart(carData.id)
                      ? "bg-green-500 hover:bg-green-600 text-white shadow-green-200"
                      : "bg-orange-500 hover:bg-orange-600 text-white shadow-orange-200"
                  }`}
                >
                  <CalendarCheck size={20} />
                  <span>
                    {isInCart(carData.id)
                      ? "عرض الحجوزات ←"
                      : addedFeedback
                      ? "✓ تم الحجز!"
                      : "احجز السيارة"}
                  </span>
                </button>

                <Link
                  to="/inventory"
                  className="w-full bg-white hover:bg-slate-50 text-slate-500 font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 border border-slate-100"
                >
                  <ArrowRight size={20} />
                  <span>العودة للمخزون</span>
                </Link>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-50 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-teal-500">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-900">معتمد من أوتو ماركت</p>
                    <p className="text-[10px] text-slate-400">تم فحص 150 نقطة فحص كاملة</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-900">تقرير كارفاكس نظيف</p>
                    <p className="text-[10px] text-slate-400">مالك واحد فقط، بدون حوادث</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Financing Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-4">تقدير التمويل</h3>
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-sm text-slate-500">القسط الشهري</span>
                <span className="text-2xl font-black text-slate-900">{monthlyPayment}</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed mb-6">
                بناء على دفعة مقدمة 10% لمدة 60 شهراً بفائدة 4.9% سنوياً.
              </p>
              <button className="text-orange-500 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                <span>احسب خطة التمويل الخاصة بي</span>
                <ChevronLeft size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Main Content ── */}
        <div className="lg:col-span-8 order-1 lg:order-2">
          {/* Main Image */}
          <div className="bg-white rounded-[2rem] p-2 shadow-sm mb-6 border border-slate-100 overflow-hidden">
            {mainImage ? (
              <img
                src={mainImage}
                alt={carData.company}
                className="w-full aspect-[16/10] object-cover rounded-[1.8rem]"
              />
            ) : (
              <div className="w-full aspect-[16/10] rounded-[1.8rem] bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center gap-3">
                <Car className="w-20 h-20 text-slate-300" />
                <span className="text-slate-400 font-medium capitalize text-lg">{carData.company}</span>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {thumbnails.map((thumb, idx) => (
              <div key={idx} className="bg-white p-1 rounded-2xl shadow-sm border border-slate-100 cursor-pointer hover:border-orange-500 transition-all overflow-hidden">
                <img src={thumb} alt="" className="w-full aspect-square object-cover rounded-xl" />
              </div>
            ))}
          </div>

          {/* Specifications */}
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 mb-8">
            <div className="flex items-center gap-2 mb-8">
              <Award className="text-orange-500" size={24} />
              <h2 className="text-xl font-bold text-slate-900">المواصفات التفصيلية</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-10">
              {specs.map((spec, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-[10px] text-slate-400 mb-1">{spec.label}</span>
                  <span className="text-sm font-bold text-slate-900 capitalize">{spec.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-slate-50">
              <h3 className="text-lg font-bold text-slate-900 mb-6">المميزات الرئيسية</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-orange-50 flex items-center justify-center">
                      <CheckCircle2 size={12} className="text-orange-500" />
                    </div>
                    <span className="text-sm text-slate-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Location and Seller */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-7 bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 h-[300px] flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-slate-100">
                <div className="w-full h-full opacity-50 bg-[radial-gradient(circle_at_center,_#ffffff_0.5px,_transparent_0.5px)] [background-size:24px_24px]" />
              </div>
              <div className="relative z-10 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                <MapPin size={32} className="text-orange-500" fill="currentColor" fillOpacity={0.2} />
                <div className="absolute inset-0 rounded-full border-4 border-orange-500/20 animate-ping" />
              </div>
            </div>

            <div className="md:col-span-5 bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 flex flex-col justify-between">
              <div>
                <h3 className="text-sm text-slate-400 mb-4">الموقع والبائع</h3>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300">
                    <Car size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">إليت موتورز العالمية</h4>
                    <div className="flex items-center gap-1">
                      <div className="flex text-orange-400">{"★".repeat(5)}</div>
                      <span className="text-[10px] text-slate-400">(128 تقييم) - 4.8</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">القاهرة، مصر - مدينة نصر</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button className="w-full bg-slate-900 hover:bg-black text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2">
                  <Mail size={18} />
                  <span>مراسلة البائع</span>
                </button>
                <button className="w-full bg-slate-50 hover:bg-slate-100 text-slate-900 font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2">
                  <Phone size={18} />
                  <span>اتصل الآن</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
