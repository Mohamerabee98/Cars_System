import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CreditCard,
  Wallet,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  X,
  HelpCircle,
  Lock,
} from "lucide-react";
import { useCart } from "../context/CartContext";

const SHIPPING_FEE = 1200;
const TAX_RATE = 0.14; // 14%

export default function PaymentPage() {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();

  const [payMethod, setPayMethod] = useState("card");
  const [form, setForm] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoMsg, setPromoMsg] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Compute real totals from cart
  const subtotal = cartItems.reduce((s, c) => s + (Number(c.price) || 0), 0);
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + SHIPPING_FEE + tax - discount;

  const handleCardNumber = (e) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
    const formatted = raw.replace(/(.{4})/g, "$1 ").trim();
    setForm((f) => ({ ...f, cardNumber: formatted }));
  };

  const handleExpiry = (e) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 4);
    const formatted =
      raw.length >= 3 ? raw.slice(0, 2) + " / " + raw.slice(2) : raw;
    setForm((f) => ({ ...f, expiry: formatted }));
  };

  const handleApplyPromo = () => {
    const code = promo.trim().toUpperCase();
    if (code === "AUTO10") {
      const disc = Math.round(subtotal * 0.1);
      setDiscount(disc);
      setPromoMsg(`✓ خصم 10% تم تطبيقه (${disc.toLocaleString()} ج.م)`);
    } else if (code === "SAVE5000") {
      setDiscount(5000);
      setPromoMsg("✓ خصم ثابت 5,000 ج.م تم تطبيقه");
    } else {
      setPromoMsg("✗ كود الخصم غير صحيح");
    }
  };

  const handleConfirm = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setShowSuccess(true);
    // Clear cart after success
    setTimeout(() => {
      clearCart();
      setShowSuccess(false);
      navigate("/");
    }, 3500);
  };

  // If cart is empty, redirect hint
  if (cartItems.length === 0 && !showSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white" dir="rtl">
        <p className="text-slate-500 text-lg">لا توجد عناصر في السلة للدفع</p>
        <button
          onClick={() => navigate("/cart")}
          className="px-6 py-2.5 bg-orange-500 text-white rounded-xl font-bold text-sm hover:bg-orange-600 transition"
        >
          العودة للسلة
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-['Inter',_sans-serif]" dir="rtl">
      {/* ─── Main ─── */}
      <main className="max-w-4xl mx-auto px-6 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm mb-8">
          <button
            onClick={() => navigate("/cart")}
            className="text-slate-400 hover:text-slate-600 transition"
          >
            السلة
          </button>
          <ChevronRight size={14} className="text-slate-300" />
          <span className="text-slate-400">الشحن</span>
          <ChevronRight size={14} className="text-slate-300" />
          <span className="text-orange-500 font-bold">الدفع</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* ─── Left: Payment Form ─── */}
          <div className="lg:col-span-3">
            <h1 className="text-2xl font-black text-slate-900 mb-6">
              طريقة الدفع
            </h1>

            {/* Method Toggle */}
            <div className="grid grid-cols-2 gap-3 mb-7">
              {[
                { value: "card", label: "بطاقة ائتمانية", icon: CreditCard },
                { value: "cod", label: "الدفع عند الاستلام", icon: Wallet },
              ].map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => setPayMethod(value)}
                  className={`border-2 rounded-2xl p-4 flex flex-col items-center gap-2 transition ${
                    payMethod === value
                      ? "border-orange-500 bg-orange-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="w-full flex justify-end -mb-2">
                    {payMethod === value && (
                      <CheckCircle2 size={15} className="text-orange-500" />
                    )}
                  </div>
                  <Icon
                    size={24}
                    className={payMethod === value ? "text-orange-500" : "text-slate-400"}
                  />
                  <span
                    className={`text-sm font-bold ${
                      payMethod === value ? "text-orange-600" : "text-slate-500"
                    }`}
                  >
                    {label}
                  </span>
                </button>
              ))}
            </div>

            {/* Credit Card Form */}
            {payMethod === "card" && (
              <div className="border border-slate-200 rounded-2xl p-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">
                    اسم حامل البطاقة
                  </label>
                  <input
                    type="text"
                    placeholder="أحمد محمد"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">
                    رقم البطاقة
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      value={form.cardNumber}
                      onChange={handleCardNumber}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 pl-11 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition tracking-widest"
                    />
                    <CreditCard
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1.5">
                      تاريخ الانتهاء
                    </label>
                    <input
                      type="text"
                      placeholder="MM / YY"
                      value={form.expiry}
                      onChange={handleExpiry}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1.5">
                      CVV
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="•••"
                        maxLength={4}
                        value={form.cvv}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            cvv: e.target.value.replace(/\D/g, "").slice(0, 4),
                          }))
                        }
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 pl-11 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                      />
                      <HelpCircle
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* COD Info */}
            {payMethod === "cod" && (
              <div className="border border-slate-200 rounded-2xl p-6 text-center text-slate-500 text-sm">
                <Wallet size={36} className="mx-auto mb-3 text-orange-400" />
                <p>
                  ستدفع نقداً عند استلام السيارة. سيتصل بك مندوبنا لتأكيد موعد
                  التسليم.
                </p>
              </div>
            )}

            {/* Confirm Button */}
            <button
              onClick={handleConfirm}
              disabled={loading}
              className="mt-6 w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-70 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition text-sm"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  جاري معالجة الدفع...
                </span>
              ) : (
                <>
                  تأكيد الدفع
                  <ChevronRight size={16} />
                </>
              )}
            </button>

            {/* Security icons */}
            <div className="flex justify-center gap-5 mt-5">
              <ShieldCheck size={22} className="text-slate-300" />
              <CreditCard size={22} className="text-slate-300" />
              <Lock size={22} className="text-slate-300" />
            </div>
          </div>

          {/* ─── Right: Order Summary ─── */}
          <div className="lg:col-span-2">
            <div className="border border-slate-200 rounded-2xl p-6 sticky top-6">
              <h3 className="font-black text-slate-900 text-lg mb-5">
                ملخص الطلب
              </h3>

              {/* Cars list */}
              {cartItems.map((car) => (
                <div key={car.id} className="flex justify-between text-xs mb-2">
                  <span className="text-slate-500 capitalize truncate max-w-[140px]">
                    {car.company}
                  </span>
                  <span className="font-semibold text-slate-900">
                    {Number(car.price).toLocaleString()} ج.م
                  </span>
                </div>
              ))}

              <div className="border-t border-slate-100 my-3" />

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">المجموع الفرعي</span>
                  <span className="font-semibold text-slate-900">
                    {subtotal.toLocaleString()} ج.م
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">رسوم التوصيل</span>
                  <span className="font-semibold text-slate-900">
                    {SHIPPING_FEE.toLocaleString()} ج.م
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">الضريبة (14%)</span>
                  <span className="font-semibold text-slate-900">
                    {tax.toLocaleString()} ج.م
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">خصم الكود</span>
                    <span className="font-semibold text-green-600">
                      -{discount.toLocaleString()} ج.م
                    </span>
                  </div>
                )}
              </div>

              <div className="border-t border-slate-100 pt-4 flex justify-between items-center mb-5">
                <span className="font-black text-slate-900 text-base">الإجمالي</span>
                <span className="text-2xl font-black text-orange-500">
                  {total.toLocaleString()} ج.م
                </span>
              </div>

              {/* Promo Code */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="كود الخصم"
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  className="flex-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                />
                <button
                  onClick={handleApplyPromo}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl transition"
                >
                  تطبيق
                </button>
              </div>
              {promoMsg && (
                <p
                  className={`text-xs mt-1.5 ${
                    promoMsg.startsWith("✓") ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {promoMsg}
                </p>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* ─── Success Toast ─── */}
      {showSuccess && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 text-white rounded-2xl px-5 py-4 flex items-start gap-3 shadow-2xl max-w-sm">
          <CheckCircle2 size={22} className="flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-bold text-sm">تم الدفع بنجاح! 🎉</p>
            <p className="text-xs text-emerald-100 mt-0.5 leading-relaxed">
              طلبك تم تأكيده. سنتواصل معك قريباً لترتيب التسليم.
            </p>
          </div>
          <button onClick={() => setShowSuccess(false)} className="text-emerald-200 hover:text-white transition">
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
