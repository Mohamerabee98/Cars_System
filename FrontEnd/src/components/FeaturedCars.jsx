import { Link } from "react-router-dom";
import { CARS } from "../data/cars";
import CarCard from "./CarCard";

const FEATURED_IDS = [1, 4, 6, 10]; // BMW, Tesla, Porsche, Lamborghini

export default function FeaturedCars() {
  const featured = CARS.filter((c) => FEATURED_IDS.includes(c.id));

  return (
    <section id="featured" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
              Hand-Picked
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-1">
              Featured Vehicles
            </h2>
          </div>
          <Link
            to="/inventory"
            id="featured-view-all"
            className="text-blue-600 font-medium hover:underline text-sm whitespace-nowrap"
          >
            View all vehicles →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
}
