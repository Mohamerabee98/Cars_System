import React from 'react'
import { useReport } from '../../hook/report.js';
import { Car, DollarSign, ShoppingCart, Users, Wrench } from 'lucide-react';
import { Charts } from '../../components/dashboardComp/Chart.jsx';
import { CarTable } from '../../components/dashboardComp/CarTable.jsx';

// 🧪 REALISTIC FALLBACK DATA
const fallbackCars = [
  { id: 1, company: "Toyota", price: 200000, stock: 5 },
  { id: 2, company: "BMW", price: 550000, stock: 2 },
  { id: 3, company: "Kia", price: 160000, stock: 8 },
  { id: 4, company: "Hyundai", price: 180000, stock: 6 },
  { id: 5, company: "Mercedes", price: 750000, stock: 3 },
];


const fallbackSales = [
  { id: 1, sale_date: "2026-04-28", total_price: 240000, Car: { company: "Toyota" }, Customer: { name: "Ahmed Ali" } },
  { id: 2, sale_date: "2026-04-27", total_price: 520000, Car: { company: "BMW" }, Customer: { name: "Sara Mohamed" } },
  { id: 3, sale_date: "2026-04-26", total_price: 180000, Car: { company: "Kia" }, Customer: { name: "Omar Hassan" } },
  { id: 4, sale_date: "2026-04-20", total_price: 300000, Car: { company: "BMW" }, Customer: { name: "Mona Adel" } },
  { id: 5, sale_date: "2026-04-18", total_price: 260000, Car: { company: "Toyota" }, Customer: { name: "Kareem Tarek" } },
  { id: 6, sale_date: "2026-04-15", total_price: 400000, Car: { company: "Mercedes" }, Customer: { name: "Ali Hassan" } },
  { id: 7, sale_date: "2026-03-28", total_price: 150000, Car: { company: "Kia" }, Customer: { name: "Youssef Samir" } },
  { id: 8, sale_date: "2026-03-25", total_price: 500000, Car: { company: "BMW" }, Customer: { name: "Hassan Ali" } },
  { id: 9, sale_date: "2026-03-20", total_price: 220000, Car: { company: "Toyota" }, Customer: { name: "Nour Khaled" } },
  { id: 10, sale_date: "2026-02-15", total_price: 350000, Car: { company: "Mercedes" }, Customer: { name: "Ahmed Mostafa" } },
];


const Reports = () => {

  const { stats, cars, sales } = useReport();
  const allCars = cars ? cars : fallbackCars;
  const allSales = sales ? sales : fallbackSales

  const StatCard = ({ title, value, icon: Icon }) => (
    <div className='bg-white rounded-2xl shadow p-5  flex items-center flex-col relative'>
      <div className='flex items-center justify-center gap-8 '>
        <p className='text-md text-gray-500 font-extrabold '>{title}</p>
        <Icon className='text-orange-500 w-6 h-6 absolute top-2 right-2' />
      </div>
      <div className=''>
        <h3 className='text-5xl text-red-600 font-bold mt-2'>{value ?? 0}</h3>
      </div>
    </div>
  );

  return (
    <div className='min-h-screen bg-gray-100 flex' dir='rtl'>
      <main className='flex-1 p-6 space-y-6'>
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-bold'>التقارير</h2>
        </div>
        <section className='grid md:grid-cols-2 xl:grid-cols-5 gap-4'>
          <StatCard title='العملاء' value={stats.customers + "عميل"} icon={Users} />
          <StatCard title='السيارات' value={stats.cars + "سيارة"} icon={Car} />
          <StatCard title='المبيعات' value={stats.sales} icon={ShoppingCart} />
          <StatCard title='الإيرادات' value={stats.revenue?.toLocaleString()} icon={DollarSign} />
          <StatCard title='الخدمات' value={stats.services} icon={Wrench} />
        </section>
        <Charts sales={allSales} stats={stats} />
        <CarTable cars={allCars} />
      </main>
    </div>
  )
};
export default Reports