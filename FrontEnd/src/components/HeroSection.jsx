import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative bg-slate-900 text-white min-h-[100vh] flex items-center overflow-hidden border-none" dir="rtl">

      {/* Glow Orbs */}
      <div className="absolute top-[-100px] right-[20%] w-[600px] h-[600px] rounded-full blur-[150px] opacity-30 select-none pointer-events-none" style={{ backgroundColor: "rgba(234,88,12,0.6)" }} />
      <div className="absolute bottom-[-100px] left-[-50px] w-[400px] h-[400px] rounded-full blur-[100px] opacity-20 select-none pointer-events-none" style={{ backgroundColor: "rgba(234,88,12,0.4)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* TEXT CONTENT */}
          <div className="text-center lg:text-right">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 font-bold text-xs bg-orange-600/10 text-orange-400">
              <span className="w-2 h-2 rounded-full animate-pulse bg-orange-500" />
              #1 سوق السيارات الفاخرة المعتمد
            </span>

            <h1 className="text-xl sm:text-5xl xl:text-4xl font-black leading-normal mb-8   tracking-tight">
              اعثر على{" "}
              <span className="text-orange-500">سيارتك المثالية</span>
              <br />
              في لحظات
            </h1>

            <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto lg:mr-0">
              تصفّح أكثر من <span className="text-white font-bold underline decoration-orange-500 underline-offset-4">1,200+</span> سيارة تم فحصها بمعايير عالمية. تميز بالفخامة والقوة والراحة.
            </p>

            {/* CTA Buttons - REDUCED PADDING */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-12">
              <Link
                to="/inventory"
                className="bg-orange-600 hover:bg-orange-500 text-white font-bold text-base px-7 py-3.5 rounded-full shadow-xl shadow-orange-600/30 transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                تصفّح المعرض الآن
              </Link>

              <a
                href="#featured"
                className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-base px-7 py-3.5 rounded-full backdrop-blur-md transition-all duration-300 hover:text-orange-400"
              >
                السيارات المميزة
              </a>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-10">
              {[
                { value: "1,200+", label: "سيارة فاخرة" },
                { value: "98%", label: "رضا العملاء" },
                { value: "340+", label: "وكيل معتمد" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-black text-white">{s.value}</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* IMAGE CONTENT */}
          <div className="relative flex items-center justify-center">
            <div className="absolute w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] rounded-full bg-orange-600/5 blur-[80px]" />
            <div className="relative z-10 w-full">
              <img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1000&q=95&fit=crop"
                alt="سيارة فاخرة"
                className="w-full h-auto object-contain drop-shadow-[0_30px_60px_rgba(234,88,12,0.25)] select-none pointer-events-none rounded-[2rem]"
                draggable="false"
              />
            </div>
          </div>

        </div>
      </div>
      
      {/* OVERLAY REMOVED AS REQUESTED */}
    </section>
  );
}