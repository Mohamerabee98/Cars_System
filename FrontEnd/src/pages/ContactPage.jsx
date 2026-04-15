import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  User,
  AtSign,
  MessageSquare,
  ChevronLeft,
  Car,
  Headphones,
} from "lucide-react";

/* ─── data ─────────────────────────────────────────── */
const CONTACT_METHODS = [
  {
    icon: Phone,
    label: "اتصل بنا",
    value: "+20 100 000 0000",
    sub: "متاح من 9ص حتى 8م",
    accent: "from-orange-400 to-orange-600",
    softBg: "bg-orange-50",
    softText: "text-orange-600",
  },
  {
    icon: Mail,
    label: "البريد الإلكتروني",
    value: "info@autoshow.com",
    sub: "نرد خلال 24 ساعة",
    accent: "from-slate-600 to-slate-800",
    softBg: "bg-slate-100",
    softText: "text-slate-700",
  },
  {
    icon: MapPin,
    label: "عنواننا",
    value: "المعادي، القاهرة",
    sub: "شارع التحرير، مصر",
    accent: "from-orange-400 to-orange-600",
    softBg: "bg-orange-50",
    softText: "text-orange-600",
  },
  {
    icon: Clock,
    label: "ساعات العمل",
    value: "السبت – الخميس",
    sub: "9 صباحاً – 8 مساءً",
    accent: "from-slate-600 to-slate-800",
    softBg: "bg-slate-100",
    softText: "text-slate-700",
  },
];

/* ─── floating-label input ──────────────────────────── */
function FloatField({ id, name, label, type = "text", icon: Icon, value, onChange, required }) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative">
      <div
        className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
          active ? "text-orange-500" : "text-slate-400"
        }`}
      >
        <Icon className="w-4 h-4" />
      </div>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={label}
        className={`w-full pr-11 pl-4 py-4 rounded-2xl border text-slate-900 font-medium text-sm
          placeholder-slate-400 transition-all duration-200 focus:outline-none
          ${
            active
              ? "border-orange-400 bg-white shadow-[0_0_0_4px_rgba(249,115,22,0.08)]"
              : "border-slate-200 bg-slate-50 hover:border-slate-300"
          }`}
      />
    </div>
  );
}

/* ─── page ──────────────────────────────────────────── */
export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1600);
  };

  const reset = () => {
    setSubmitted(false);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="bg-white min-h-screen overflow-x-hidden" dir="rtl">

      {/* ══════════ HERO ══════════ */}
      <section className="relative overflow-hidden bg-slate-900 pt-20 pb-28">
        {/* decorative blobs */}
        <div className="absolute top-[-80px] left-[-80px] w-[420px] h-[420px] rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-60px] right-[-60px] w-[300px] h-[300px] rounded-full bg-orange-400/10 blur-2xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.07),transparent_60%)] pointer-events-none" />

        {/* dot grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6">
          {/* pill badge */}
          <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/25 text-orange-400 text-xs font-bold px-4 py-2 rounded-full mb-6 tracking-widest uppercase">
            <Headphones className="w-3.5 h-3.5" />
            فريق الدعم
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-5">
            كيف يمكننا<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-orange-400 to-orange-600">
              مساعدتك؟
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-lg leading-relaxed">
            فريقنا المتخصص جاهز للرد على جميع استفساراتك. تواصل معنا بالطريقة التي تناسبك.
          </p>

          {/* stat strip */}
          <div className="flex flex-wrap gap-10 mt-10 pt-10 border-t border-white/10">
            {[["< 24h", "وقت الرد"], ["7 أيام", "خدمة متواصلة"], ["100%", "رضا العملاء"]].map(
              ([val, label]) => (
                <div key={label}>
                  <p className="text-3xl font-extrabold text-white">{val}</p>
                  <p className="text-slate-500 text-sm mt-0.5">{label}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ══════════ CONTACT METHOD CARDS ══════════ */}
      <section className="max-w-7xl mx-auto px-6 -mt-14 mb-20 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CONTACT_METHODS.map(({ icon: Icon, label, value, sub, softBg, softText }) => (
            <div
              key={label}
              className="group bg-white rounded-2xl p-6 border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default"
            >
              <div className={`w-12 h-12 ${softBg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className={`w-5 h-5 ${softText}`} />
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
              <p className="font-bold text-slate-900 text-sm leading-snug">{value}</p>
              <p className="text-xs text-slate-400 mt-1">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ MAIN SECTION: FORM + SIDEBAR ══════════ */}
      <section className="max-w-7xl mx-auto px-6 pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

          {/* ── FORM ── */}
          <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-100 shadow-lg p-8 md:p-10">

            {submitted ? (
              /* Success State */
              <div className="flex flex-col items-center justify-center py-16 gap-5 text-center">
                <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-2">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900">تم إرسال رسالتك!</h2>
                <p className="text-slate-500 max-w-xs leading-relaxed">
                  شكراً لتواصلك معنا. سيتولى أحد أعضاء فريقنا الرد عليك قريباً.
                </p>
                <button
                  onClick={reset}
                  className="mt-4 flex items-center gap-2 px-7 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors shadow-lg shadow-orange-200"
                >
                  <Send className="w-4 h-4" />
                  إرسال رسالة أخرى
                </button>
              </div>
            ) : (
              <>
                {/* Form header */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-white" />
                    </div>
                    <h2 className="text-2xl font-extrabold text-slate-900">أرسل رسالة</h2>
                  </div>
                  <p className="text-slate-400 text-sm mr-12">
                    املأ النموذج وسنرد عليك في أقرب وقت.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FloatField id="contact-name"    name="name"    label="الاسم الكامل"        icon={User}         value={form.name}    onChange={handleChange} required />
                    <FloatField id="contact-email"   name="email"   label="البريد الإلكتروني"   icon={AtSign}       value={form.email}   onChange={handleChange} required type="email" />
                  </div>
                  <FloatField   id="contact-subject" name="subject" label="موضوع الرسالة"       icon={MessageSquare} value={form.subject} onChange={handleChange} required />

                  {/* Textarea */}
                  <div className="relative">
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      required
                      value={form.message}
                      onChange={handleChange}
                      placeholder="اكتب رسالتك هنا..."
                      className="w-full px-4 py-4 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400
                        text-sm font-medium focus:outline-none focus:border-orange-400 focus:bg-white
                        focus:shadow-[0_0_0_4px_rgba(249,115,22,0.08)] transition-all duration-200 resize-none
                        hover:border-slate-300"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    id="contact-submit-btn"
                    className="group relative flex items-center justify-center gap-2.5
                      bg-gradient-to-l from-orange-500 to-orange-600
                      hover:from-orange-600 hover:to-orange-700
                      disabled:opacity-60 text-white font-bold py-4 rounded-2xl
                      transition-all duration-300 shadow-lg shadow-orange-200 mt-2
                      overflow-hidden"
                  >
                    {/* shine sweep */}
                    <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

                    {loading ? (
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span>إرسال الرسالة</span>
                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>

          {/* ── SIDEBAR ── */}
          <div className="lg:col-span-2 flex flex-col gap-5 sticky top-28">

            {/* Dark info panel */}
            <div className="relative overflow-hidden bg-slate-900 rounded-3xl p-7 text-white">
              <div className="absolute top-[-40px] left-[-40px] w-[200px] h-[200px] rounded-full bg-orange-500/10 blur-2xl pointer-events-none" />

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                  <Car className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-extrabold text-white text-lg leading-none">Auto Show</p>
                  <p className="text-slate-400 text-xs mt-0.5">مركز بيع وصيانة السيارات</p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {[
                  { icon: Phone, val: "+20 100 000 0000" },
                  { icon: Mail,  val: "info@autoshow.com" },
                  { icon: MapPin, val: "المعادي، القاهرة، مصر" },
                  { icon: Clock, val: "السبت–الخميس 9ص–8م" },
                ].map(({ icon: Icon, val }) => (
                  <div key={val} className="flex items-center gap-3 group">
                    <div className="w-8 h-8 bg-white/5 hover:bg-orange-500/20 rounded-lg flex items-center justify-center transition-colors shrink-0">
                      <Icon className="w-3.5 h-3.5 text-orange-400" />
                    </div>
                    <span className="text-slate-300 text-sm">{val}</span>
                  </div>
                ))}
              </div>

              {/* divider */}
              <div className="border-t border-white/10 my-6" />

              <p className="text-slate-400 text-xs leading-relaxed">
                نحن ملتزمون بتقديم أفضل تجربة لكل عميل. لا تتردد في التواصل معنا في أي وقت.
              </p>
            </div>

            {/* Map */}
            <div className="rounded-3xl overflow-hidden border border-slate-100 shadow-md h-56">
              <iframe
                title="موقعنا على الخريطة"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.2!2d31.2565!3d29.97!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDU4JzEyLjAiTiAzMcKwMTUnMjMuNCJF!5e0!3m2!1sar!2seg!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
