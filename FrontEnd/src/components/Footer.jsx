import { Mail, Car, Instagram, Facebook, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 pt-20 pb-10 border-none" dir="rtl">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* Column 1 – Logo & Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 text-orange-600 font-black text-2xl mb-6">
              <Car className="w-8 h-8" />
              <span>Auto Show</span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed max-w-xs font-medium">
              الوجهة الأولى في المملكة للسيارات الفاخرة والمعتمدة. نحن نلتزم بتقديم تجربة شراء فريدة تليق بتطلعاتك.
            </p>
            <div className="flex gap-3.5 mt-6">
               {[Instagram, Facebook, Twitter].map((Icon, idx) => (
                 <a key={idx} href="#" className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-slate-400 hover:bg-orange-600 hover:text-white transition-all duration-300 shadow-sm">
                   <Icon className="w-4 h-4" />
                 </a>
               ))}
            </div>
          </div>

          {/* Column 2 – Links */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            <div>
              <h4 className="text-gray-300 font-black text-base mb-6 tracking-wide">الشركة</h4>
              <ul className="space-y-3.5 text-sm font-bold list-none p-0 my-0">
                {["عن أوتوشو", "المعرض الرسمي", "فريق العمل", "الوظائف"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-300  hover:text-orange-600 transition-colors duration-200">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-gray-300 font-black text-base mb-6 tracking-wide">الخدمات</h4>
              <ul className="space-y-3.5 text-sm font-bold list-none p-0 my-0">
                {["غسيل السيارات", "فحص دوري", "تأمين المركبات", "التمويل"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-300 hover:text-orange-600 transition-colors duration-200">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 3 – Newsletter */}
          <div>
            <h4 className="text-gray-300 font-black text-base mb-6 tracking-wide">النشرة البريدية</h4>
            <p className="text-gray-300 text-sm font-bold mb-6 leading-relaxed">
              اشترك للحصول على آخر العروض وتحديثات المخزون الحصرية.
            </p>
            <div className="flex flex-col gap-3">
              <div className="relative">
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="newsletter-input"
                  type="email"
                  placeholder="بريدك الإلكتروني"
                  className="w-full pr-11 pl-4 py-3.5 text-sm bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-600 text-gray-300 placeholder-slate-400 transition-all font-bold border-none shadow-sm"
                />
              </div>
              <button
                id="newsletter-submit"
                className="bg-orange-600 hover:bg-orange-500 text-white text-sm font-black py-3.5 rounded-xl shadow-lg shadow-orange-200 transition-all duration-300"
              >
                اشترك الآن
              </button>
            </div>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-400 text-xs font-bold">
          <p>© {new Date().getFullYear()} أوتوشو. جميع الحقوق محفوظة.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-slate-600 transition-colors">سياسة الخصوصية</a>
            <a href="#" className="hover:text-slate-600 transition-colors">شروط الاستخدام</a>
          </div>
        </div>
      </div>
    </footer>
  );
}