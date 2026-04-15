import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Car,
  Settings,
  Bell,
  Heart,
  Wallet,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronDown,
  Pencil,
  ShieldCheck,
} from "lucide-react";

const BASE_URL = "http://localhost:3000";

const STATUS_MAP = {
  completed: { label: "مكتمل", color: "bg-green-100 text-green-700" },
  pending: { label: "قيد الانتظار", color: "bg-yellow-100 text-yellow-700" },
  paid: { label: "تم الدفع", color: "bg-blue-100 text-blue-700" },
  cancelled: { label: "ملغي", color: "bg-red-100 text-red-600" },
};

const FILTER_TABS = [
  { key: "all", label: "الكل" },
  { key: "pending", label: "قيد الانتظار" },
  { key: "completed", label: "مكتمل" },
];

// ─── Mock sales data (rendered when API has no sales endpoint yet) ─────────
const MOCK_SALES = [
  {
    id: "AV-92811",
    carName: "2024 بورش تايكان توربو S",
    price: "9,450,000",
    date: "12 أكتوبر 2023",
    status: "completed",
    image:
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "AV-93104",
    carName: "2023 بي إم دبليو M5 كومبيتيشن",
    price: "5,420,000",
    date: "05 ديسمبر 2023",
    status: "paid",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "AV-94220",
    carName: "2024 أودي RS Q8",
    price: "6,100,000",
    date: "14 فبراير 2024",
    status: "pending",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=400&auto=format&fit=crop",
  },
];

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);   // "unauthenticated" | "server" | null
  const [activeFilter, setActiveFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(3);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

  // ── Fetch profile ────────────────────────────────────────────────────────
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const token = user?.token;
    console.log(token);

    if (!token) {
      setError("unauthenticated");
      setLoading(false);
    }
    const get = async () => {
      try {
        const res = await fetch(`${BASE_URL}/profile/get`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        // API returns { success, message, data: { name, email, ... } }
        const profileData = json.data ?? json;
        setProfile(profileData);
        setEditForm(profileData);
      } catch (err) {
        console.error("Profile fetch error:", err);
        setError("server");
      } finally {
        setLoading(false);
      }
    };
    get();
  },[])

  // ── Save profile ─────────────────────────────────────────────────────────
  const handleSave = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const token = user?.token;
    try {
      const res = await fetch(`${BASE_URL}/profile/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      });
      const json = await res.json();
      const updated = json.data ?? json;
      setProfile(updated);
      setEditing(false);
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  // ── Filtered sales ───────────────────────────────────────────────────────
  const filteredSales =
    activeFilter === "all"
      ? MOCK_SALES
      : MOCK_SALES.filter((s) => s.status === activeFilter);

  const visibleSales = filteredSales.slice(0, visibleCount);

  // ── Loading / Error states ───────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error === "unauthenticated") {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 px-4" dir="rtl">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-10 flex flex-col items-center text-center max-w-sm w-full">
          <div className="w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center mb-5">
            <User size={36} className="text-orange-400" />
          </div>
          <h2 className="text-xl font-black text-slate-900 mb-2">أنت غير مسجّل الدخول</h2>
          <p className="text-sm text-slate-400 leading-relaxed mb-7">
            سجّل دخولك أو أنشئ حساباً جديداً عشان تقدر تدخل على بروفايلك وسجل طلباتك.
          </p>
          <div className="flex flex-col gap-3 w-full">
            <Link
              to="/login"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md shadow-orange-200"
            >
              <User size={16} />
              تسجيل الدخول
            </Link>
            <Link
              to="/register"
              className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 border border-slate-100"
            >
              إنشاء حساب جديد
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 text-slate-600 gap-2" dir="rtl">
        <AlertCircle className="text-orange-500" />
        <p>خطأ في الاتصال بالخادم. حاول مرة أخرى لاحقاً.</p>
      </div>
    );
  }

  const displayName = profile?.name || "مستخدم";
  const joinYear = profile?.createdAt
    ? new Date(profile.createdAt).getFullYear()
    : "2022";

  return (
    <div className="min-h-screen bg-slate-50 font-['Inter',sans-serif]" dir="rtl">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* ── Top Bar ──────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-xl hover:bg-white transition-colors text-slate-500 hover:text-slate-700">
              <Settings size={20} />
            </button>
            <button className="p-2 rounded-xl hover:bg-white transition-colors text-slate-500 hover:text-slate-700 relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full" />
            </button>
          </div>
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <span>Auto Show</span>
            <div className="bg-orange-500 p-1.5 rounded-lg">
              <Car size={16} className="text-white" />
            </div>
          </div>
        </div>

        {/* ── Main Grid ────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* ── Left Sidebar ─────────────────────────────────────────── */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            {/* Avatar Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col items-center text-center">
              <div className="relative mb-3">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-200">
                  <span className="text-3xl font-black text-white">
                    {displayName.charAt(0)}
                  </span>
                </div>
                <button className="absolute bottom-0 left-0 w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center shadow-md hover:bg-orange-600 transition-colors">
                  <Pencil size={12} className="text-white" />
                </button>
              </div>
              <h2 className="text-xl font-black text-slate-900 mb-0.5">
                {displayName}
              </h2>
              <p className="text-xs text-slate-400 mb-4">
                عضو بلاتيني منذ {joinYear}
              </p>
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md shadow-orange-200 text-sm">
                <User size={15} />
                نظرة عامة على الحساب
              </button>

              {/* Side nav links */}
              <div className="w-full mt-5 flex flex-col gap-1">
                {[
                  { icon: <Car size={16} />, label: "أسطولي" },
                  { icon: <Heart size={16} />, label: "قائمة المراقبة" },
                  { icon: <Wallet size={16} />, label: "طرق الدفع" },
                ].map(({ icon, label }) => (
                  <button
                    key={label}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-colors text-sm font-medium w-full text-right"
                  >
                    <span className="text-slate-400">{icon}</span>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Support Status */}
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
              <p className="text-orange-500 font-bold text-sm mb-2">
                حالة الدعم
              </p>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow shadow-green-300" />
                <span className="text-sm font-bold text-slate-800">
                  الدعم ذو الأولوية نشط
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                بصفتك عضواً بلاتينياً، لديك حساب مدير مخصص متاح على مدار الساعة طوال أيام الأسبوع.
              </p>
            </div>
          </div>

          {/* ── Right Content ─────────────────────────────────────────── */}
          <div className="lg:col-span-9 flex flex-col gap-6">
            {/* Personal Info Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-black text-slate-900">
                  المعلومات الشخصية
                </h2>
                {!editing ? (
                  <button
                    onClick={() => setEditing(true)}
                    className="text-orange-500 hover:text-orange-600 font-semibold text-sm flex items-center gap-1.5 transition-colors"
                  >
                    <Pencil size={14} />
                    تعديل البيانات
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditing(false)}
                      className="text-slate-500 hover:text-slate-700 font-semibold text-sm px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      إلغاء
                    </button>
                    <button
                      onClick={handleSave}
                      className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-4 py-1.5 rounded-lg transition-colors shadow-md shadow-orange-200"
                    >
                      حفظ
                    </button>
                  </div>
                )}
              </div>

              {!editing ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6">
                  {[
                    { label: "الاسم الكامل", value: profile?.name, icon: <User size={14} /> },
                    { label: "رقم الهاتف", value: profile?.phone, icon: <Phone size={14} /> },
                    { label: "البريد الإلكتروني", value: profile?.email, icon: <Mail size={14} /> },
                    { label: "الموقع", value: "القاهرة، مصر", icon: <MapPin size={14} /> },
                    {
                      label: "رقم الرخصة",
                      value: profile?.national_id || "—",
                      icon: <CreditCard size={14} />,
                    },
                    {
                      label: "نوع الحساب",
                      value: profile?.role === "employee" ? "أعمال بلاتيني" : "عميل",
                      icon: <ShieldCheck size={14} />,
                      orange: true,
                    },
                  ].map(({ label, value, icon, orange }) => (
                    <div key={label} className="flex flex-col gap-1">
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        {icon} {label}
                      </span>
                      <span
                        className={`text-sm font-bold ${
                          orange ? "text-orange-500" : "text-slate-900"
                        }`}
                      >
                        {value || "—"}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: "الاسم الكامل", key: "name", type: "text" },
                    { label: "رقم الهاتف", key: "phone", type: "tel" },
                    { label: "البريد الإلكتروني", key: "email", type: "email" },
                    { label: "رقم الرخصة / الهوية", key: "national_id", type: "text" },
                  ].map(({ label, key, type }) => (
                    <div key={key} className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-500">
                        {label}
                      </label>
                      <input
                        type={type}
                        value={editForm[key] || ""}
                        onChange={(e) =>
                          setEditForm({ ...editForm, [key]: e.target.value })
                        }
                        className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Orders / Sales Log */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-black text-slate-900">
                  سجل الطلبات
                </h2>
                {/* Filter tabs */}
                <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-xl">
                  {FILTER_TABS.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => {
                        setActiveFilter(tab.key);
                        setVisibleCount(3);
                      }}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                        activeFilter === tab.key
                          ? "bg-white text-slate-900 shadow-sm"
                          : "text-slate-400 hover:text-slate-600"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sale rows */}
              <div className="flex flex-col gap-3">
                {visibleSales.length === 0 ? (
                  <p className="text-center text-slate-400 text-sm py-8">
                    لا توجد طلبات في هذه الفئة
                  </p>
                ) : (
                  visibleSales.map((sale) => {
                    const status = STATUS_MAP[sale.status] || STATUS_MAP.pending;
                    return (
                      <div
                        key={sale.id}
                        className="flex items-center gap-4 p-3 rounded-2xl border border-slate-100 hover:border-orange-200 hover:bg-orange-50/30 transition-all"
                      >
                        {/* Action button */}
                        <div className="shrink-0">
                          <button
                            className={`text-xs font-bold px-3 py-2 rounded-xl border-2 transition-all w-20 text-center ${
                              sale.status === "completed"
                                ? "border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                                : sale.status === "paid"
                                ? "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                                : "border-slate-300 text-slate-500 hover:bg-slate-100"
                            }`}
                          >
                            {sale.status === "completed"
                              ? "عرض التفاصيل"
                              : sale.status === "paid"
                              ? "تتبع الطلب"
                              : "إتمام الدفع"}
                          </button>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${status.color}`}
                            >
                              {status.label}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              رقم الطلب #{sale.id}
                            </span>
                          </div>
                          <p className="text-sm font-bold text-slate-900 truncate">
                            {sale.carName}
                          </p>
                          <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-400">
                            <span className="flex items-center gap-1">
                              <Wallet size={11} />
                              {sale.price} ج.م
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock size={11} />
                              {sale.date}
                            </span>
                          </div>
                        </div>

                        {/* Car Thumbnail */}
                        <div className="shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-slate-100">
                          <img
                            src={sale.image}
                            alt={sale.carName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Load more */}
              {visibleCount < filteredSales.length && (
                <button
                  onClick={() => setVisibleCount((v) => v + 3)}
                  className="w-full mt-5 flex items-center justify-center gap-1.5 text-sm text-slate-500 hover:text-orange-500 font-semibold transition-colors"
                >
                  تحميل المزيد من السجل
                  <ChevronDown size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
