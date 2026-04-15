import { useState } from "react";
import { Calendar, MapPin, Clock, CheckCircle2, Droplets, Sparkles, Wind, Star } from "lucide-react";

const SERVICES = [
  {
    id: 1,
    name: "غسيل خارجي",
    price: "80",
    badge: null,
    description: "غسيل خارجي بالرغوة الكثيفة، تنظيف، وتجفيف يدوي بالمايكروفايبر.",
    image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=2073&auto=format&fit=crop",
    icon: <Droplets size={18} className="text-orange-500" />,
  },
  {
    id: 2,
    name: "غسيل بالبخار",
    price: "150",
    badge: null,
    description: "غسيل بدون ماء بالبخار عالي الضغط لضمان فائق النظافة البكتيريا.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop",
    icon: <Wind size={18} className="text-orange-500" />,
  },
  {
    id: 3,
    name: "تنظيف داخلي احترافي",
    price: "200",
    badge: null,
    description: "شفط أرضية المقاعد، تنظيف المفصلات والتابلوه، والنوافذ الداخلية.",
    image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?q=80&w=2073&auto=format&fit=crop",
    icon: <Sparkles size={18} className="text-orange-500" />,
  },
  {
    id: 4,
    name: "تلميع ساطع (بوليش)",
    price: "500",
    badge: "الأكثر طلباً",
    description: "العناية القصوى: غسيل، تلميع ساطع وعكس، وتنظيف المحرك.",
    image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=2071&auto=format&fit=crop",
    icon: <Star size={18} className="text-orange-500" />,
  },
];

export default function CarWashPage() {
  const [selectedService, setSelectedService] = useState(SERVICES[3].id);


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
            لمّع عربيتك مع{" "}
            <span className="text-orange-400">نايل كلين</span>
          </h1>
          <p className="text-white/80 text-sm md:text-base max-w-md mb-6 leading-relaxed">
            أفضل خدمة غسيل سياراتك في مصر. بنهتم بكل تفصيلةفي عربيتك عشان ترجع كأنها
            زيرو. احجز ميعادك في أقل من دقيقة.
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
            امنح سيارتك الاهتمام الاحترافي الذي تستحقه. اختر من بين مجموعتنا الواسعة من خدمات التنظيف والتلميع.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service.id)}
              className={`bg-white rounded-3xl border-2 overflow-hidden cursor-pointer transition-all shadow-sm hover:shadow-xl group ${
                selectedService === service.id
                  ? "border-orange-500 shadow-lg shadow-orange-100"
                  : "border-slate-100"
              }`}
            >
              {/* Service Image */}
              <div className="relative h-[160px] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {service.badge && (
                  <span className="absolute top-3 right-3 bg-orange-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow">
                    {service.badge}
                  </span>
                )}
              </div>

              {/* Service Content */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-slate-900 text-base">
                    {service.name}
                  </h3>
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-xl font-black text-orange-500">
                      {service.price}
                    </span>
                    <span className="text-xs text-slate-400 font-medium"> ج.م</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed mb-4">
                  {service.description}
                </p>
                <button
                  className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all ${
                    selectedService === service.id
                      ? "bg-orange-500 text-white shadow-md shadow-orange-200"
                      : "bg-slate-50 hover:bg-orange-50 text-slate-700 hover:text-orange-500"
                  }`}
                >
                  {selectedService === service.id ? (
                    <span className="flex items-center justify-center gap-1.5">
                      <CheckCircle2 size={15} /> تم الاختيار
                    </span>
                  ) : (
                    "اختيار"
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
