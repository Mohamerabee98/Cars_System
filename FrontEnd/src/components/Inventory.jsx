import { useState } from "react";
import { SlidersHorizontal, Search, ChevronDown } from "lucide-react";
import { CARS, BRANDS, PRICE_RANGES, CONDITIONS } from "../data/cars";
import CarCard from "./CarCard";

function FilterDropdown({ label, options, value, onChange }) {
  return (
    <div className="relative">
      <select
        id={`filter-${label.replace(/\s+/g, "-").toLowerCase()}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-white border border-gray-200 text-gray-600 text-sm font-medium px-4 py-3 pr-9 rounded-xl hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  );
}

export default function Inventory() {
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("All Brands");
  const [priceRange, setPriceRange] = useState("Any Price");
  const [condition, setCondition] = useState("All Conditions");
  const [visibleCount, setVisibleCount] = useState(9);

  const filteredCars = CARS.filter((car) => {
    const matchesSearch =
      car.name.toLowerCase().includes(search.toLowerCase()) ||
      car.description.toLowerCase().includes(search.toLowerCase());

    const matchesBrand =
      brand === "All Brands" || car.brand === brand || car.name.startsWith(brand);

    const matchesCondition =
      condition === "All Conditions" || car.condition === condition;

    return matchesSearch && matchesBrand && matchesCondition;
  });

  const visibleCars = filteredCars.slice(0, visibleCount);
  const hasMore = visibleCount < filteredCars.length;

  return (
    <>
      {/* Hero Section */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="inline-block text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">
            Browse our collection
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Explore Inventory
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
            Discover a curated selection of premium new and pre-owned vehicles —
            all in one place.
          </p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="inventory-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by brand, model or keywords..."
              className="w-full pl-12 pr-5 py-3 bg-white border border-gray-200 rounded-full text-sm text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            <FilterDropdown label="Brand" options={BRANDS} value={brand} onChange={setBrand} />
            <FilterDropdown label="Price Range" options={PRICE_RANGES} value={priceRange} onChange={setPriceRange} />
            <FilterDropdown label="Condition" options={CONDITIONS} value={condition} onChange={setCondition} />
            <button
              id="advanced-filter-btn"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-3 rounded-xl transition-colors duration-200 shadow-sm shadow-blue-200"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>
        </div>

        <p className="mt-5 text-sm text-gray-400">
          Showing{" "}
          <span className="font-semibold text-gray-600">{visibleCars.length}</span>
          {" "}of{" "}
          <span className="font-semibold text-gray-600">{filteredCars.length}</span>
          {" "}vehicles
        </p>
      </section>

      {/* Cars Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        {visibleCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 text-gray-400">
            <p className="text-5xl mb-4">🚗</p>
            <p className="text-lg font-medium">No vehicles match your search.</p>
            <p className="text-sm mt-1">Try adjusting your filters or search term.</p>
          </div>
        )}

        {hasMore && (
          <div className="flex justify-center mt-12">
            <button
              id="load-more-btn"
              onClick={() => setVisibleCount((c) => c + 3)}
              className="border-2 border-blue-600 text-blue-600 font-semibold px-8 py-3 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-200"
            >
              Load More Vehicles
            </button>
          </div>
        )}
      </section>
    </>
  );
}
