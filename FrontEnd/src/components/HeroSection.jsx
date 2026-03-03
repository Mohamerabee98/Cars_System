import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-slate-800 to-blue-950 text-white overflow-hidden min-h-[92vh] flex items-center">

      {/* Decorative blurred orbs */}
      <div className="absolute top-[-100px] right-[30%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-80px] left-[-60px] w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Grid dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ── LEFT: Text content ── */}
          <div>
            <span className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              #1 Premium Car Marketplace
            </span>

            <h1 className="text-5xl md:text-6xl xl:text-7xl font-extrabold leading-[1.08] tracking-tight mb-6">
              Find Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-300">
                Perfect
              </span>
              <br />
              Drive Today
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-lg">
              Browse over <span className="text-white font-semibold">1,200+</span> hand-verified
              new &amp; pre-owned vehicles. Transparent pricing, trusted dealers, no hassle.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Link
                to="/inventory"
                id="hero-browse-btn"
                className="bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-blue-900/50 hover:shadow-blue-500/30 hover:scale-105"
              >
                Browse Inventory →
              </Link>
              <a
                href="#featured"
                id="hero-featured-btn"
                className="border border-white/20 hover:border-white/50 hover:bg-white/5 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200"
              >
                View Featured Cars
              </a>
            </div>

            {/* Quick stats strip */}
            <div className="flex flex-wrap gap-8">
              {[
                { value: "1,200+", label: "Vehicles" },
                { value: "340+", label: "Dealers" },
                { value: "98%", label: "Satisfaction" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-extrabold text-white">{s.value}</p>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Car Image ── */}
          <div className="relative flex items-center justify-center lg:justify-end">

            {/* Glowing ring behind car */}
            <div className="absolute w-[420px] h-[420px] rounded-full bg-blue-600/10 border border-blue-500/10 blur-sm" />
            <div className="absolute w-[340px] h-[340px] rounded-full bg-blue-600/10 border border-blue-400/15" />

            {/* Floating badge – top left */}
            <div className="absolute top-4 left-4 lg:left-0 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-3 shadow-xl z-20">
              <p className="text-xs text-gray-300 font-medium">Top Pick</p>
              <p className="text-sm text-white font-bold">Porsche Cayenne</p>
              <p className="text-blue-400 font-bold text-sm">$79,500</p>
            </div>

            {/* Floating badge – bottom right */}
            <div className="absolute bottom-4 right-4 lg:right-0 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-3 shadow-xl z-20 flex items-center gap-3">
              <span className="text-2xl">⚡</span>
              <div>
                <p className="text-xs text-gray-300 font-medium">Electric</p>
                <p className="text-sm text-white font-bold">Tesla Model 3</p>
              </div>
            </div>

            {/* Car image */}
            <div className="relative z-10 w-full max-w-xl">
              <img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=85&fit=crop"
                alt="Featured car – Porsche Cayenne"
                className="w-full h-auto object-contain drop-shadow-[0_20px_60px_rgba(59,130,246,0.35)] select-none"
                draggable="false"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Bottom fade to match next section bg */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50/10 to-transparent pointer-events-none" />

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-12 fill-gray-50">
          <path d="M0,60 C480,0 960,60 1440,0 L1440,60 Z" />
        </svg>
      </div>
    </section>
  );
}
