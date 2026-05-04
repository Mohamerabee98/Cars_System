import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarCheck,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  User,
  Phone,
  Mail,
  Car,
  Loader2,
} from "lucide-react";
import { useCart } from "../context/CartContext";

/* ── Full-Screen Booking Overlay ── */
function BookingOverlay({ phase }) {
  // phase: "processing" | "success"
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-900/95 backdrop-blur-sm px-6">
      {phase === "processing" ? (
        <>
          {/* Spinner */}
          <div className="relative mb-8">
            <div className="w-28 h-28 rounded-full border-4 border-slate-700 border-t-orange-500 animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <CalendarCheck size={36} className="text-orange-400" />
            </div>
          </div>
          <h2 className="text-2xl font-black text-white mb-2">جاري تأكيد الحجز</h2>
          <p className="text-slate-400 text-sm">يرجى الانتظار، لا تغلق الصفحة...</p>
          {/* Animated dots */}
          <div className="flex gap-1.5 mt-6">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Success checkmark */}
          <div className="relative mb-8">
            <div className="w-28 h-28 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <CheckCircle2 size={64} className="text-emerald-400" />
            </div>
            {/* Ripple */}
            <div className="absolute inset-0 rounded-full border-2 border-emerald-400/40 animate-ping" />
          </div>
          <h2 className="text-3xl font-black text-white mb-3 text-center">
            تم الحجز بنجاح! 🎉
          </h2>
          <p className="text-slate-300 text-base mb-2 text-center font-medium">
            سيقوم المعرض بالتواصل معك
          </p>
          <p className="text-slate-500 text-sm text-center max-w-xs leading-relaxed">
            خلال 24 ساعة عمل سيتصل بك فريقنا لتأكيد موعد المعاينة وإتمام إجراءات الاستلام.
          </p>
          <p className="text-slate-600 text-xs mt-5">جاري تحويلك للصفحة الرئيسية...</p>
        </>
      )}
    </div>
  );
}

export default function ConfirmBookingPage() {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();

  const [form, setForm] = useState({ name: "", phone: "", email: "", notes: "" });
  const [overlayPhase, setOverlayPhase] = useState(null); // null | "processing" | "success"

  // Parse image safely
  const getImage = (car) => {
    try {
      if (!car.image) return null;
      const parsed = typeof car.image === "string" ? JSON.parse(car.image) : car.image;
      return Array.isArray(parsed) ? parsed[0] : parsed;
    } catch {
      return car.image;
    }
  };

  const handleConfirm = async () => {
    setOverlayPhase("processing");
    await new Promise((r) => setTimeout(r, 2000)); // simulate API call
    setOverlayPhase("success");
    await new Promise((r) => setTimeout(r, 2800));
    clearCart();
    navigate("/");
  };

  if (cartItems.length === 0 && !overlayPhase) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white" dir="rtl">
        <CalendarCheck size={48} className="text-orange-300" />
        <p className="text-slate-500 text-lg">لا توجد حجوزات لتأكيدها</p>
        <button
          onClick={() => navigate("/bookings")}
          className="px-6 py-2.5 bg-orange-500 text-white rounded-xl font-bold text-sm hover:bg-orange-600 transition"
        >
          العودة للحجوزات
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-['Inter',_sans-serif]" dir="rtl">
      {/* Full-screen overlay */}
      {overlayPhase && <BookingOverlay phase={overlayPhase} />}

      <main className="max-w-4xl mx-auto px-6 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm mb-8">
          <button onClick={() => navigate("/bookings")} className="text-slate-400 hover:text-slate-600 transition">
            حجوزاتي
          </button>
          <ChevronRight size={14} className="text-slate-300" />
          <span className="text-orange-500 font-bold">تأكيد الحجز</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* ─── Left: Contact Form ─── */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                <User size={20} className="text-orange-500" />
              </div>
              <h1 className="text-2xl font-black text-slate-900">بياناتك للتواصل</h1>
            </div>

            {/* Contact Form */}
            <div className="border border-slate-200 rounded-2xl p-6 space-y-5 mb-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  الاسم الكامل <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="أحمد محمد علي"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 pr-11 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                  />
                  <User size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  رقم الهاتف <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="01XXXXXXXXX"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value.replace(/\D/g, "").slice(0, 11) }))}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 pr-11 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                    dir="ltr"
                  />
                  <Phone size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  البريد الإلكتروني
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="example@email.com"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 pr-11 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                    dir="ltr"
                  />
                  <Mail size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  ملاحظات إضافية (اختياري)
                </label>
                <textarea
                  rows={3}
                  placeholder="أي معلومات إضافية تريد إضافتها..."
                  value={form.notes}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition resize-none"
                />
              </div>
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleConfirm}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition text-base shadow-lg shadow-orange-200"
            >
              <CalendarCheck size={20} />
              تأكيد الحجز
            </button>

            {/* Security info */}
            <div className="flex justify-center gap-6 mt-5">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <ShieldCheck size={16} className="text-orange-400" />
                <span>بياناتك آمنة ومشفرة</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <CheckCircle2 size={16} className="text-orange-400" />
                <span>حجز مجاني بدون رسوم</span>
              </div>
            </div>
          </div>

          {/* ─── Right: Booking Summary ─── */}
          <div className="lg:col-span-2">
            <div className="border border-slate-200 rounded-2xl p-6 sticky top-6">
              <h3 className="font-black text-slate-900 text-lg mb-5 flex items-center gap-2">
                <Car size={20} className="text-orange-500" />
                السيارات المحجوزة
              </h3>

              <div className="space-y-4 mb-5">
                {cartItems.map((car) => {
                  const image = getImage(car);
                  const isNew = car.status === "1" || car.status === 1;
                  return (
                    <div key={car.id} className="flex gap-3 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                      {/* Mini image */}
                      <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100">
                        {image ? (
                          <img src={image} alt={car.company} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Car size={20} className="text-slate-300" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-slate-900 text-sm capitalize truncate">{car.company}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className={`text-[9px] font-bold border rounded px-1 py-0.5 ${
                            isNew ? "text-orange-500 border-orange-300" : "text-slate-400 border-slate-200"
                          }`}>
                            {isNew ? "جديد" : "مستعمل"}
                          </span>
                          {car.color && (
                            <span className="text-[10px] text-slate-400 capitalize">• {car.color}</span>
                          )}
                        </div>
                        <p className="text-orange-500 font-black text-sm mt-1">
                          {Number(car.price).toLocaleString()} ج.م
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* What happens next */}
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs font-bold text-slate-700 mb-3">ماذا يحدث بعد التأكيد؟</p>
                <div className="space-y-2.5">
                  {[
                    { step: "1", text: "يستلم فريق المعرض طلب حجزك" },
                    { step: "2", text: "يتصل بك أحد مندوبينا خلال 24 ساعة" },
                    { step: "3", text: "تحديد موعد المعاينة والاستلام" },
                  ].map(({ step, text }) => (
                    <div key={step} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-orange-500 text-white text-[10px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                        {step}
                      </span>
                      <span className="text-xs text-slate-500 leading-relaxed">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
