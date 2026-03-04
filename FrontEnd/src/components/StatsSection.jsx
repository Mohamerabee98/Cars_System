const STATS = [
  { value: "1,200+", label: "سيارة مدرجة" },
  { value: "340+", label: "وكيل موثوق" },
  { value: "98%", label: "رضا العملاء" },
  { value: "24/7", label: "دعم متخصص" },
];

const FEATURES = [
  {
    icon: "🛡️",
    title: "جودة معتمدة",
    desc: "كل سيارة تجتاز فحصاً شاملاً من 150 نقطة قبل إدراجها.",
  },
  {
    icon: "💳",
    title: "تمويل سهل",
    desc: "احصل على موافقة مبدئية في دقائق بمساعدة شركائنا الماليين.",
  },
  {
    icon: "🔄",
    title: "إرجاع خلال 7 أيام",
    desc: "غير راضٍ؟ أعد السيارة خلال 7 أيام بدون أي أسئلة.",
  },
  {
    icon: "📍",
    title: "توصيل داخل المملكة",
    desc: "نوصّل السيارة إلى بابك في أي مكان داخل المملكة.",
  },
];

export default function StatsSection() {
  return (
    <section className="bg-slate-50 py-20 border-none" dir="rtl">
      <div className="max-w-7xl mx-auto px-6">
        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-3xl shadow-lg shadow-slate-200/50 p-6 text-center hover:scale-105 transition-transform duration-300"
            >
              <p className="text-3xl font-black text-orange-600 mb-1">{s.value}</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Why Choose Us */}
        <div className="text-center mb-12">
          <span className="text-orange-600 text-[11px] font-black uppercase tracking-[0.2em]">
            لماذا اختارنا الآلاف؟
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-3 leading-tight">
            الطريقة الأذكى لتملك سيارة أحلامك
          </h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto text-base font-medium leading-relaxed">
            لقد صممنا تجربة تليق بك — حيث تلتقي الفخامة بالسهولة في كل خطوة من رحلتك.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-[2rem] p-7 shadow-lg shadow-slate-100/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-2xl mb-5">
                {f.icon}
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-3">{f.title}</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
