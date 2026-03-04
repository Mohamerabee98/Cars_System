import { useState } from "react";
import { SlidersHorizontal, Search, ChevronDown } from "lucide-react";
import { CARS, BRANDS, PRICE_RANGES, CONDITIONS } from "../data/cars";
import CarCard from "./CarCard";

function FilterDropdown({ label, options, value, onChange }) {
  return (
    <div className="relative group">
      <select
        id={`filter-${label.replace(/\s+/g, "-").toLowerCase()}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-slate-50 border-none text-slate-900 text-xs font-black px-5 py-3.5 pr-11 rounded-xl hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all duration-300 cursor-pointer w-full sm:w-auto min-w-[150px] shadow-sm"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-hover:text-orange-500 transition-colors" />
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

    const carPrice = car.price; // لازم يكون رقم في البيانات
    const matchesPrice =
      priceRange === "Any Price" ||
      (priceRange === "Under $25k" && carPrice < 25000) ||
      (priceRange === "$25k–$50k" && carPrice >= 25000 && carPrice <= 50000) ||
      (priceRange === "$50k–$80k" && carPrice > 50000 && carPrice <= 80000) ||
      (priceRange === "Above $80k" && carPrice > 80000);

    return matchesSearch && matchesBrand && matchesCondition && matchesPrice;
  });

  const visibleCars = filteredCars.slice(0, visibleCount);
  const hasMore = visibleCount < filteredCars.length;

  const resetFilters = () => {
    setSearch("");
    setBrand("All Brands");
    setPriceRange("Any Price");
    setCondition("All Conditions");
  };

  return (
    <div className="bg-white min-h-screen border-none pt-12" dir="rtl">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">استكشف المعرض</h1>
        <p className="text-slate-500 text-lg">ابحث عن سيارتك المثالية من مجموعتنا المتميزة</p>
      </section>

      {/* Search & Filters */}
      <section className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex flex-col lg:flex-row items-center gap-4">
          {/* Search Input */}
          <div className="relative flex-grow w-full">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="البحث حسب الماركة، الموديل..."
              className="w-full pr-12 pl-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium shadow-sm"
            />
          </div>

          {/* Dropdowns */}
          <div className="flex flex-wrap md:flex-nowrap items-center gap-3 w-full lg:w-auto">
            <FilterDropdown 
              label="الماركة" 
              options={BRANDS.map(b => b === "All Brands" ? "الماركة" : b)} 
              value={brand === "All Brands" ? "الماركة" : brand} 
              onChange={(val) => setBrand(val === "الماركة" ? "All Brands" : val)} 
            />
            <FilterDropdown 
              label="نطاق السعر" 
              options={PRICE_RANGES.map(p => p === "Any Price" ? "نطاق السعر" : p)} 
              value={priceRange === "Any Price" ? "نطاق السعر" : priceRange} 
              onChange={(val) => setPriceRange(val === "نطاق السعر" ? "Any Price" : val)} 
            />
            <FilterDropdown 
              label="الحالة" 
              options={CONDITIONS.map(c => c === "All Conditions" ? "الحالة" : (c === "NEW" ? "جديد" : "مستعمل"))} 
              value={condition === "All Conditions" ? "الحالة" : (condition === "NEW" ? "جديد" : "مستعمل")} 
              onChange={(val) => setCondition(val === "الحالة" ? "All Conditions" : (val === "جديد" ? "NEW" : "USED"))} 
            />
            <span> Reset </span>
            <button
              className="p-3.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-colors shadow-lg shadow-orange-200 cursor-pointer"
              aria-label="تصفية"
              onClick={resetFilters}
            >
              
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Cars Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        {visibleCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-3xl">
            <h3 className="text-xl font-bold text-slate-900 mb-2">عذراً، لم نجد ما تبحث عنه</h3>
            <p className="text-slate-500">جرب تغيير الفلاتر أو البحث بكلمات أخرى.</p>
          </div>
        )}

        {hasMore && (
          <div className="flex justify-center mt-16">
            <button
              onClick={() => setVisibleCount((c) => c + 3)}
              className="flex items-center gap-2 border border-orange-500 text-orange-600 font-bold px-8 py-3.5 rounded-xl hover:bg-orange-50 transition-colors group"
            >
              <span>تحميل المزيد من المركبات</span>
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>
        )}
      </section>
    </div>
  );
}