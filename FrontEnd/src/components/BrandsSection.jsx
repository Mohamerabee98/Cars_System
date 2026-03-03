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
    <section className="bg-gray-50 py-16 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
            Top Brands
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 mt-2">
            Brands You Trust
          </h2>
          <p className="text-gray-500 mt-2 max-w-md mx-auto text-sm">
            We carry the world's most recognized automotive brands under one roof.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {BRANDS.map((b) => (
            <div
              key={b.name}
              className="bg-white rounded-2xl p-5 flex flex-col items-center gap-2 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 hover:border-blue-200 transition-all duration-200 cursor-pointer group"
            >
              <span className="text-3xl">{b.emoji}</span>
              <span className="text-xs font-semibold text-gray-700 group-hover:text-blue-600 transition-colors duration-200">
                {b.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
