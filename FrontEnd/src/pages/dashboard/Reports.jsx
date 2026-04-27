import React from 'react'
import { useReport } from '../../hook/report.js';
import { Car, DollarSign, ShoppingCart, Users, Wrench } from 'lucide-react';
import { Charts } from '../../components/dashboardComp/Chart.jsx';
import { CarTable } from '../../components/dashboardComp/CarTable.jsx';

const Reports = () => {
  const { stats, cars, sales } = useReport();


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
          <StatCard title='العملاء' value={stats.customers+ "عميل"} icon={Users} />
          <StatCard title='السيارات' value={stats.cars + "سيارة"} icon={Car} />
          <StatCard title='المبيعات' value={stats.sales} icon={ShoppingCart} />
          <StatCard title='الإيرادات' value={stats.revenue?.toLocaleString()} icon={DollarSign} />
          <StatCard title='الخدمات' value={stats.services} icon={Wrench} />
        </section>
        <Charts sales={sales} stats={stats}/>
        <CarTable cars={cars}/>
      </main>
    </div>
  )
};
export default Reports