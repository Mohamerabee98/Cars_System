import { useState } from "react";
import { Link } from "react-router-dom";
import { Car, Palette, Gauge } from "lucide-react";

export default function CarCard({ car }) {
  const { id, company, color, price, status, stok, image } = car;

console.log(image, typeof image);
const parsedImage = image ? JSON.parse(image) : [];
  // status "1" = جديد | "0" = مستعمل
  const isNew = status === "1" || status === 1;

  const [imgError, setImgError] = useState(false);

  const formattedPrice = price
    ? Number(price).toLocaleString("ar-EG") + " جنيه"
    : "السعر عند الاستفسار";

  return (
    <div
      className="car_card bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col h-full"
      dir="rtl"
    >
      {/* ── Image ── */} 
      <div className="relative aspect-video overflow-hidden m-2 rounded-2xl bg-slate-100">
        {image && !imgError ? (
          <img

  src={parsedImage[0]}
  alt={company}
  onError={() => setImgError(true)}
  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
/>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-slate-100 to-slate-200">
            <Car className="w-12 h-12 text-slate-300" />
            <span className="text-xs text-slate-400 font-medium">{company}</span>
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-3 right-3 left-3 flex justify-between items-start">
          <span
            className={`text-xs font-bold px-3 py-1 rounded-lg shadow-sm ${
              isNew ? "bg-orange-500 text-white" : "bg-slate-900 text-white"
            }`}
          >
            {isNew ? "جديد" : "مستعمل"}
          </span>

          {!isNew && stok && (
            <span className="text-xs font-bold bg-slate-900 text-white px-3 py-1 rounded-lg flex items-center gap-1">
              <Gauge className="w-3 h-3" />
              {Number(stok).toLocaleString()} km
            </span>
          )}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="p-5 flex flex-col grow">
        {/* Title & Price */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="font-bold text-xl text-slate-900 group-hover:text-orange-500 transition-colors capitalize leading-tight">
            {company}
          </h3>
          <p className="text-base font-extrabold text-orange-500 shrink-0">{formattedPrice}</p>
        </div>

        {/* Color chip */}
        {color && (
          <div className="flex items-center gap-2 mb-5">
            <Palette className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-sm text-slate-500 font-medium capitalize">{color}</span>
          </div>
        )}

        {/* View Details Button */}
        <div className="main-nav mt-auto">
          <Link
            to={`/car/${id}`}
            className="w-full bg-slate-50 hover:bg-orange-500 hover:text-white text-slate-900 text-sm font-bold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn"
          >
            <span>عرض التفاصيل</span>
            <span className="text-lg group-hover/btn:translate-x-[-4px] transition-transform">
              ←
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}