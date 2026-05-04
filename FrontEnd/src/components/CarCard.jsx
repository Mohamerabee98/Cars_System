import { useState } from "react";
import { Link } from "react-router-dom";
import { Car, Palette, Gauge, CalendarCheck, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CarCard({ car }) {
  // API fields: id, company, color, price, status, stock, image
  const { id, company, color, price, status, stock, image } = car;

  const { addToCart, isInCart } = useCart();
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  // status "1" = جديد | "0" = مستعمل
  const isNew = status === "1" || status === 1;

  // Parse image — may be null, a JSON array string, or a plain URL
  const resolveImage = () => {
    if (!image) return null;
    try {
      const parsed = JSON.parse(image);
      return Array.isArray(parsed) ? parsed[0] : String(parsed);
    } catch {
      return image;
    }
  };
  const imgSrc = resolveImage();
  const showImg = imgSrc && !imgError;

  const formattedPrice = price
    ? Number(price).toLocaleString("ar-EG") + " ج.م"
    : "السعر عند الاستفسار";

  const handleBook = (e) => {
    e.preventDefault(); // prevent Link navigation
    if (isInCart(id)) return;
    addToCart(car);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const alreadyBooked = isInCart(id);

  return (
    <div
      className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group flex flex-col h-full"
      dir="rtl"
    >
      {/* ── Image ── */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 mx-3 mt-3 rounded-2xl">
        {showImg ? (
          <img
            src={imgSrc}
            alt={company}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-white/60 flex items-center justify-center shadow-sm">
              <Car className="w-9 h-9 text-slate-300" />
            </div>
            <span className="text-xs text-slate-400 font-medium capitalize">{company}</span>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-3 right-3 left-3 flex justify-between items-start">
          <span
            className={`text-[10px] font-black px-2.5 py-1 rounded-lg shadow-sm backdrop-blur-sm ${
              isNew
                ? "bg-orange-500 text-white"
                : "bg-slate-800/80 text-white"
            }`}
          >
            {isNew ? "🆕 جديد" : "مستعمل"}
          </span>

          {!isNew && stock && (
            <span className="text-[10px] font-bold bg-slate-800/80 text-white px-2.5 py-1 rounded-lg backdrop-blur-sm flex items-center gap-1">
              <Gauge className="w-3 h-3" />
              {Number(stock).toLocaleString()} km
            </span>
          )}
        </div>

        {/* Quick book button (hover) */}
        <button
          onClick={handleBook}
          className={`absolute bottom-3 left-3 w-9 h-9 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 ${
            alreadyBooked
              ? "bg-green-500 text-white"
              : "bg-white text-orange-500 hover:bg-orange-500 hover:text-white"
          }`}
          title={alreadyBooked ? "محجوز" : "احجز السيارة"}
        >
          {alreadyBooked ? (
            <CheckCircle2 size={16} />
          ) : (
            <CalendarCheck size={16} />
          )}
        </button>
      </div>

      {/* ── Content ── */}
      <div className="p-5 flex flex-col grow">
        {/* Title & Price */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="font-black text-lg text-slate-900 group-hover:text-orange-500 transition-colors capitalize leading-tight">
            {company}
          </h3>
          <div className="text-right shrink-0">
            <p className="text-base font-extrabold text-orange-500 leading-tight">{formattedPrice}</p>
          </div>
        </div>

        {/* Meta chips */}
        <div className="flex flex-wrap gap-2 mb-5">
          {color && (
            <span className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg font-medium capitalize">
              <Palette className="w-3 h-3 text-slate-400" />
              {color}
            </span>
          )}
          {!isNew && stock && (
            <span className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg font-medium">
              <Gauge className="w-3 h-3 text-slate-400" />
              {Number(stock).toLocaleString()} km
            </span>
          )}
          <span
            className={`text-xs px-2.5 py-1 rounded-lg font-medium ${
              isNew ? "bg-orange-50 text-orange-600" : "bg-slate-50 text-slate-500"
            }`}
          >
            {isNew ? "جديد" : "مستعمل"}
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-50 mb-4" />

        {/* Actions */}
        <div className="mt-auto flex gap-2">
          {/* Book button */}
          <button
            onClick={handleBook}
            className={`addTocart flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl text-xs font-bold transition-all shrink-0 ${
              alreadyBooked
                ? "bg-green-50 text-green-600 border border-green-200 cursor-default"
                : added
                ? "bg-green-50 text-green-600 border border-green-200"
                : "bg-orange-50 text-orange-600 border border-orange-100 hover:bg-orange-500 hover:text-white hover:border-orange-500"
            }`}
          >
            {alreadyBooked ? (
              <><CheckCircle2 size={14} /> محجوز</>
            ) : added ? (
              <><CheckCircle2 size={14} /> تم الحجز!</>
            ) : (
              <><CalendarCheck size={14} /> احجز</>
            )}
          </button>

          {/* View details */}
          <Link
            to={`/car/${id}`}
            className="flex-1 bg-slate-900 hover:bg-orange-500 text-white text-xs font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn"
          >
            <span>عرض التفاصيل</span>
            <ArrowLeft size={14} className="group-hover/btn:-translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}