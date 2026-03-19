import { useState } from "react";
import { Link } from "react-router-dom";
import { Car } from "lucide-react";
export default function CarCard({ car }) {
  const { id, name, description, price, condition, image, mileage } = car;
  const isNew = condition === "NEW";
  const [imgError, setImgError] = useState(false);

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col h-full" dir="rtl">
      {/* Car Image Wrapper */}
      <div className="relative aspect-16/10 overflow-hidden m-2 rounded-2xl">
        {image && !imgError ? (
          <img
            src={image}
            alt={name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
            <Car className="w-12 h-12 text-slate-300" />
          </div>
        )}

        {/* Condition Badge */}
        <div className="absolute flex justify-between px-2 top-3  w-full">
          <span
            className={`text-xs font-bold uppercase px-3 py-1 rounded-lg shadow-sm ${
              isNew ? "bg-orange-500 text-white" : "bg-slate-900 text-white"
            }`}
          >
            {condition === "NEW" ? "جديد" : "مستعمل"}
          </span>
          

          <span
            className={`text-xs font-bold uppercase px-3 py-1 rounded-lg  ${
              isNew ? "" : "bg-slate-900 text-white"
            }`}
          >
              {condition === "USED" ? `${mileage} km` : ""}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col grow">
        {/* Title & Price Row */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-xl text-slate-900 group-hover:text-orange-500 transition-colors line-clamp-1">
            {name}
          </h3>
          <p className="text-xl font-bold text-orange-500">
            {price}
          </p>
        </div>

        {/* Description/Details */}
        <p className="text-sm text-slate-500 font-medium mb-6 line-clamp-1">
          {description}
        </p>

        {/* View Details Button */}
        <div className="main-nav mt-auto">
          <Link
            to={`/car/${id}`}
            className="w-full bg-slate-50 hover:bg-slate-100 text-slate-900 text-sm font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 group/btn"
          >
            <span>عرض التفاصيل</span>
            <span className="text-lg group-hover/btn:translate-x-[-4px] transition-transform">←</span>
          </Link>
        </div>
      </div>
    </div>
  );
}