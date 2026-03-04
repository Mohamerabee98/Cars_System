const BRANDS = [
  { name: "BMW", emoji: "🇩🇪" },
  { name: "Mercedes", emoji: "⭐" },
  { name: "Audi", emoji: "🔘" },
  { name: "Tesla", emoji: "⚡" },
  { name: "Toyota", emoji: "🏆" },
  { name: "Porsche", emoji: "🏎️" },
  { name: "Ford", emoji: "🦅" },
  { name: "Honda", emoji: "🌸" },
];

export default function BrandsSection() {
  return (
    <section className="bg-slate-50 py-20 border-none" dir="rtl">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-orange-600 text-sm font-black uppercase tracking-[0.2em]">
            أبرز الماركات العالمية
          </span>
          <h2 className="text-3xl font-black text-slate-900 mt-4">
            تصفّح حسب علامتك المفضلة
          </h2>
          <p className="text-slate-500 mt-4 max-w-md mx-auto text-base font-medium">
            تجد لدينا نخبة من أشهر مصنعي السيارات في العالم.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6">
          {BRANDS.map((b) => (
            <div
              key={b.name}
              className="bg-white rounded-3xl p-8 flex flex-col items-center gap-4 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group border-none"
            >
              <span className="text-4xl group-hover:scale-125 transition-transform duration-300">{b.emoji}</span>
              <span className="text-xs font-black text-slate-700 group-hover:text-orange-600 tracking-wider">
                {b.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}