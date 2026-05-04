import { useNavigate } from "react-router-dom";
import {
  Trash2,
  CalendarCheck,
  ShieldCheck,
  RefreshCcw,
  Info,
  ChevronRight,
  Car,
} from "lucide-react";
import { useCart } from "../context/CartContext";

export default function BookingsPage() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart } = useCart();

  // Parse image safely (stored as JSON array string in API)
  const getImage = (car) => {
    try {
      if (!car.image) return null;
      const parsed = typeof car.image === "string" ? JSON.parse(car.image) : car.image;
      return Array.isArray(parsed) ? parsed[0] : parsed;
    } catch {
      return car.image;
    }
  };

  const fmt = (n) => `${Number(n).toLocaleString()} ج.م`;

  return (
    <div className="min-h-screen bg-white font-['Inter',_sans-serif] flex flex-col" dir="rtl">
      {/* ─── Main Content ─── */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-orange-50 flex items-center justify-center">
              <CalendarCheck className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900">حجوزاتي</h1>
              <p className="text-xs text-slate-400 mt-0.5">السيارات المحجوزة في انتظار تأكيدك</p>
            </div>
          </div>
          {cartItems.length > 0 && (
            <span className="text-sm bg-orange-50 text-orange-600 font-semibold px-3 py-1.5 rounded-full border border-orange-100">
              {cartItems.length} {cartItems.length === 1 ? "سيارة" : "سيارات"} محجوزة
            </span>
          )}
        </div>

        {/* ─── Empty State ─── */}
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center">
              <CalendarCheck size={40} className="text-orange-300" />
            </div>
            <p className="text-slate-700 text-xl font-bold">لا توجد حجوزات بعد</p>
            <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
              تصفح معرضنا واحجز السيارة التي تناسبك، سنتواصل معك لإتمام إجراءات الحجز.
            </p>
            <button
              onClick={() => navigate("/inventory")}
              className="mt-2 px-8 py-3 bg-orange-500 text-white rounded-xl font-bold text-sm hover:bg-orange-600 transition shadow-lg shadow-orange-200"
            >
              تصفح المعرض
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* ─── Left: Booked Cars ─── */}
            <div className="lg:col-span-3 space-y-5">
              {cartItems.map((car) => {
                const image = getImage(car);
                const isNew = car.status === "1" || car.status === 1;

                return (
                  <div
                    key={car.id}
                    className="border border-slate-200 rounded-2xl p-5 flex gap-5 relative hover:border-orange-200 hover:shadow-sm transition-all"
                  >
                    {/* Delete */}
                    <button
                      onClick={() => removeFromCart(car.id)}
                      className="absolute top-4 left-4 text-slate-300 hover:text-red-400 transition"
                      title="إلغاء الحجز"
                    >
                      <Trash2 size={18} />
                    </button>

                    {/* Status badge */}
                    <div className="absolute top-4 right-4">
                      <span className="flex items-center gap-1 text-[10px] font-bold text-orange-600 bg-orange-50 border border-orange-100 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse inline-block" />
                        في انتظار التأكيد
                      </span>
                    </div>

                    {/* Image */}
                    <div className="w-44 h-32 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
                      {image ? (
                        <img
                          src={image}
                          alt={car.company}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                          <Car size={36} />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0 pt-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`text-[10px] font-black border rounded px-1.5 py-0.5 tracking-widest ${
                            isNew
                              ? "text-orange-500 border-orange-400"
                              : "text-slate-500 border-slate-300"
                          }`}
                        >
                          {isNew ? "جديد" : "مستعمل"}
                        </span>
                        <span className="text-xs text-slate-400">
                          كود #{car.id}
                        </span>
                      </div>
                      <h2 className="font-black text-slate-900 text-lg leading-tight mb-1 capitalize">
                        {car.company}
                      </h2>
                      {car.color && (
                        <p className="text-sm text-slate-400 mb-3 capitalize">
                          اللون: {car.color}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                          <CalendarCheck size={13} />
                          <span>سيتواصل معك المعرض قريباً</span>
                        </div>
                        <span className="text-xl font-black text-orange-500">
                          {Number(car.price).toLocaleString()} ج.م
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Info Banner */}
              <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 flex gap-3">
                <Info size={18} className="text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-orange-600 text-sm mb-1">
                    كيف تعمل عملية الحجز؟
                  </p>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    بعد تأكيد الحجز، سيقوم فريق المعرض بالتواصل معك خلال 24 ساعة لتحديد موعد المعاينة وإتمام إجراءات الشراء.
                  </p>
                </div>
              </div>
            </div>

            {/* ─── Right: Booking Summary ─── */}
            <div className="lg:col-span-2">
              <div className="border border-slate-200 rounded-2xl p-6 sticky top-6">
                <h3 className="font-black text-slate-900 text-lg mb-5 flex items-center gap-2">
                  <CalendarCheck size={20} className="text-orange-500" />
                  ملخص الحجز
                </h3>

                {cartItems.map((car) => (
                  <div key={car.id} className="mb-4 pb-4 border-b border-slate-100 last:border-0 last:mb-0 last:pb-0">
                    <p className="text-xs font-bold text-slate-500 mb-2 capitalize">
                      {car.company}
                    </p>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-slate-400 text-xs">سعر السيارة</span>
                      <span className="font-semibold text-xs text-slate-900">
                        {fmt(car.price)}
                      </span>
                    </div>
                  </div>
                ))}

                <div className="border-t border-slate-100 pt-4 mb-5">
                  <p className="text-xs text-slate-400 leading-relaxed text-center bg-slate-50 rounded-xl p-3">
                    يتم تحديد السعر النهائي بعد التواصل مع فريق المعرض
                  </p>
                </div>

                <button
                  onClick={() => navigate("/payment")}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition mb-3 text-sm shadow-lg shadow-orange-200"
                >
                  تأكيد الحجز
                  <ChevronRight size={16} />
                </button>

                <button
                  onClick={() => navigate("/inventory")}
                  className="w-full border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3 rounded-xl text-sm transition"
                >
                  إضافة سيارة أخرى
                </button>

                {/* Trust badges */}
                <div className="mt-5 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <ShieldCheck size={14} className="text-orange-400" />
                    حجزك مؤمن ومضمون من أوتو شو
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <RefreshCcw size={14} className="text-orange-400" />
                    إلغاء مجاني قبل تأكيد المعرض
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ─── Footer ─── */}
      <footer className="bg-slate-900 text-slate-400 text-center py-6 text-xs mt-auto">
        <p className="mb-2">© 2024 Auto Show. جميع الحقوق محفوظة.</p>
        <div className="flex justify-center gap-6">
          <button className="hover:text-white transition">سياسة الخصوصية</button>
          <button className="hover:text-white transition">الشروط والأحكام</button>
          <button className="hover:text-white transition">مركز المساعدة</button>
        </div>
      </footer>
    </div>
  );
}
