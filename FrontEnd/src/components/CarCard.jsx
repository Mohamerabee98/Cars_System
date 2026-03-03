import { useState } from "react";

export default function CarCard({ car }) {
  const { name, description, price, condition, year, mileage, image } = car;
  const isNew = condition === "NEW";
  const [imgError, setImgError] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      {/* Car Image */}
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden rounded-t-xl">
        {image && !imgError ? (
          <img
            src={image}
            alt={name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          /* Graceful fallback if image fails to load */
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <svg
              viewBox="0 0 200 80"
              className="w-48 h-24 text-gray-400 fill-current"
            >
              <path d="M175,45 L160,30 L140,25 L100,20 L70,22 L45,30 L30,45 L20,50 L20,60 L35,60 A15,15 0 0,0 65,60 L135,60 A15,15 0 0,0 165,60 L180,60 L180,50 Z" />
            </svg>
          </div>
        )}

        {/* Condition Badge */}
        <span
          className={`absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full tracking-wide shadow ${
            isNew ? "bg-blue-600 text-white" : "bg-gray-800 text-white"
          }`}
        >
          {condition}
        </span>

        {/* Year Badge */}
        <span className="absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full bg-white/80 text-gray-700 backdrop-blur-sm shadow">
          {year}
        </span>
      </div>

      {/* Card Body */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-semibold text-lg text-gray-900 leading-tight group-hover:text-blue-600 transition-colors duration-200">
            {name}
          </h3>
          <span className="text-blue-600 font-bold text-lg ml-2 whitespace-nowrap">
            {price}
          </span>
        </div>

        <p className="text-sm text-gray-500 mb-1">{description}</p>
        {mileage && (
          <p className="text-xs text-gray-400 mb-4">🛣 {mileage} miles</p>
        )}

        <button
          id={`view-details-${name.replace(/\s+/g, "-").toLowerCase()}`}
          className="w-full bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-700 text-sm font-medium py-2.5 rounded-lg transition-all duration-200 mt-1"
        >
          View Details →
        </button>
      </div>
    </div>
  );
}
