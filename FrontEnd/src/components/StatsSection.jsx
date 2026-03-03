const STATS = [
  { value: "1,200+", label: "Vehicles Listed" },
  { value: "340+", label: "Trusted Dealers" },
  { value: "98%", label: "Customer Satisfaction" },
  { value: "24/7", label: "Expert Support" },
];

const FEATURES = [
  {
    icon: "🛡️",
    title: "Certified Quality",
    desc: "Every car passes a 150-point inspection before being listed.",
  },
  {
    icon: "💳",
    title: "Easy Financing",
    desc: "Get pre-approved in minutes with our partner lenders.",
  },
  {
    icon: "🔄",
    title: "7-Day Returns",
    desc: "Not happy? Return it within 7 days, no questions asked.",
  },
  {
    icon: "📍",
    title: "Nationwide Delivery",
    desc: "We deliver straight to your door anywhere in the country.",
  },
];

export default function StatsSection() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center hover:shadow-md transition-shadow duration-200"
            >
              <p className="text-3xl font-extrabold text-blue-600 mb-1">{s.value}</p>
              <p className="text-sm text-gray-500 font-medium">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Why Choose Us */}
        <div className="text-center mb-12">
          <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
            Why AutoShow
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
            The Smarter Way to Buy a Car
          </h2>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto">
            We've reimagined the car buying experience from the ground up — transparent, fast, and stress-free.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
            >
              <span className="text-3xl mb-4 block">{f.icon}</span>
              <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
