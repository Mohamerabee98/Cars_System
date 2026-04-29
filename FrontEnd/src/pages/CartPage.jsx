import { useNavigate } from "react-router-dom";
import {
  Trash2,
  Calendar,
  ShieldCheck,
  RefreshCcw,
  Info,
  ChevronRight,
  ShoppingBag,
} from "lucide-react";
import { useCart } from "../context/CartContext";

const DESTINATION_FEE = 1200;
const ORDER_DEPOSIT = -500;

export default function CartPage() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart } = useCart();

  // Build per-item breakdown using actual API data
  const getExtras = (car) => [
    { label: "سعر السيارة الأساسي", amount: Number(car.price) || 0 },
    { label: "رسوم التوصيل", amount: DESTINATION_FEE },
    { label: "عربون الحجز (خصم)", amount: ORDER_DEPOSIT },
  ];

  const itemTotal = (car) => getExtras(car).reduce((s, e) => s + e.amount, 0);

  const grandTotal = cartItems.reduce((s, car) => s + itemTotal(car), 0);

  const fmt = (n) =>
    n < 0
      ? `-${Math.abs(n).toLocaleString()} ج.م`
      : `${Number(n).toLocaleString()} ج.م`;

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

  return (
    <div className="min-h-screen bg-white font-['Inter',_sans-serif] flex flex-col" dir="rtl">
      {/* ─── Main Content ─── */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-black text-slate-900">سلة التسوق</h1>
          {cartItems.length > 0 && (
            <span className="text-sm bg-slate-100 text-slate-600 font-semibold px-3 py-1.5 rounded-full">
              {cartItems.length} {cartItems.length === 1 ? "سيارة" : "سيارات"}
            </span>
          )}
        </div>

        {/* ─── Empty State ─── */}
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center">
              <ShoppingBag size={36} className="text-slate-300" />
            </div>
            <p className="text-slate-400 text-lg font-medium">السلة فارغة</p>
            <p className="text-slate-400 text-sm">أضف سيارة من المعرض لتظهر هنا</p>
            <button
              onClick={() => navigate("/inventory")}
              className="mt-2 px-6 py-2.5 bg-orange-500 text-white rounded-xl font-bold text-sm hover:bg-orange-600 transition"
            >
              تصفح المعرض
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* ─── Left: Car Items ─── */}
            <div className="lg:col-span-3 space-y-5">
              {cartItems.map((car) => {
                const image = getImage(car);
                const isNew = car.status === "1" || car.status === 1;

                return (
                  <div
                    key={car.id}
                    className="border border-slate-200 rounded-2xl p-5 flex gap-5 relative"
                  >
                    {/* Delete */}
                    <button
                      onClick={() => removeFromCart(car.id)}
                      className="absolute top-4 left-4 text-slate-300 hover:text-red-400 transition"
                    >
                      <Trash2 size={18} />
                    </button>

                    {/* Image */}
                    <div className="w-44 h-32 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
                      {image ? (
                        <img
                          src={image}
                          alt={car.company}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300 text-xs">
                          لا توجد صورة
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
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
                          <Calendar size={13} />
                          <span>توصيل خلال 7-14 يوم عمل</span>
                        </div>
                        <span className="text-xl font-black text-orange-500">
                          {Number(car.price).toLocaleString()} ج.م
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Promo Banner */}
              <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 flex gap-3">
                <Info size={18} className="text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-orange-600 text-sm mb-1">
                    عرض محدود مشمول
                  </p>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    احصل على فحص مجاني للسيارة وضمان 6 أشهر على كل مركبة مضافة
                    إلى السلة.
                  </p>
                </div>
              </div>
            </div>

            {/* ─── Right: Order Summary ─── */}
            <div className="lg:col-span-2">
              <div className="border border-slate-200 rounded-2xl p-6 sticky top-6">
                <h3 className="font-black text-slate-900 text-lg mb-5">
                  ملخص الطلب
                </h3>

                {cartItems.map((car) => (
                  <div key={car.id} className="mb-4 pb-4 border-b border-slate-100 last:border-0 last:mb-0 last:pb-0">
                    <p className="text-xs font-bold text-slate-500 mb-2 capitalize">
                      {car.company}
                    </p>
                    {getExtras(car).map((e) => (
                      <div key={e.label} className="flex justify-between text-sm mb-1.5">
                        <span className="text-slate-400 text-xs">{e.label}</span>
                        <span
                          className={`font-semibold text-xs ${
                            e.amount < 0 ? "text-green-600" : "text-slate-900"
                          }`}
                        >
                          {fmt(e.amount)}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}

                <div className="border-t border-slate-100 pt-4 flex justify-between items-end mb-5">
                  <div>
                    <p className="font-black text-slate-900 text-base">
                      الإجمالي
                    </p>
                    <p className="text-[10px] text-slate-400">
                      شامل رسوم التوصيل
                    </p>
                  </div>
                  <span className="text-2xl font-black text-slate-900">
                    {grandTotal.toLocaleString()} ج.م
                  </span>
                </div>

                <button
                  onClick={() => navigate("/payment")}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition mb-3 text-sm"
                >
                  إتمام الشراء
                  <ChevronRight size={16} />
                </button>

                <button
                  onClick={() => navigate("/inventory")}
                  className="w-full border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3 rounded-xl text-sm transition"
                >
                  مواصلة التسوق
                </button>

                {/* Trust badges */}
                <div className="mt-5 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <ShieldCheck size={14} className="text-orange-400" />
                    دفع مشفر بـ SSL بـ 256-bit
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <RefreshCcw size={14} className="text-orange-400" />
                    ضمان استرداد الأموال خلال 7 أيام
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
