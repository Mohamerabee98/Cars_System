import { Mail, Car } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 pt-14 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1 – Logo & Description */}
          <div>
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xl mb-4">
              <Car className="w-5 h-5" />
              <span>AutoShow</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Your trusted marketplace for premium new and pre-owned vehicles.
              Drive your dream car today.
            </p>
          </div>

          {/* Column 2 – Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-500">
              {["Home", "Inventory", "Car Wash", "About Us", "Contact"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="hover:text-blue-600 transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Column 3 – Support */}
          <div>
            <h4 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4">
              Support
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-500">
              {[
                "FAQ",
                "Financing",
                "Return Policy",
                "Privacy Policy",
                "Terms of Service",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-blue-600 transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 – Newsletter */}
          <div>
            <h4 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4">
              Newsletter
            </h4>
            <p className="text-sm text-gray-500 mb-4">
              Get the latest deals and inventory updates in your inbox.
            </p>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="newsletter-input"
                  type="email"
                  placeholder="your@email.com"
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                />
              </div>
              <button
                id="newsletter-submit"
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors duration-200 whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-gray-200 pt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} AutoShow. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
