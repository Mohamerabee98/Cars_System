import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid } from 'recharts';

export const Charts = ({ sales ,stats}) => {
    const salesChart = sales.map((s, i) => ({
        name: `عملية البيع  ${i + 1}`,
        total: Number(s.total_price || 0),
    }));

    const pieData = [
        { name: 'سيارات', value: stats.cars || 0 },
        { name: 'مبيعات', value: stats.sales || 0 },
        { name: 'خدمات', value: stats.services || 0 },
    ];
    const colors = ['#f97316', '#fb923c', '#fdba74'];

return(
<section className='grid xl:grid-cols-3 gap-6'>
    <div className='bg-white rounded-2xl shadow p-5 w-full  xl:col-span-2 flex flex-col justify-center'>
        <h3 className='font-bold mb-4'>إحصائيات المبيعات</h3>
        <ResponsiveContainer width='100%' height={350}>
            <BarChart data={salesChart}  >
                <XAxis dataKey='name' />
                <Tooltip />
                <Bar dataKey='total' radius={[8, 8, 0, 0]} fill='#f97316' />
            </BarChart>
        </ResponsiveContainer>
    </div>

    <div className='bg-white rounded-2xl shadow p-5'>
        <h3 className='font-bold mb-4'>توزيع البيانات</h3>
        <ResponsiveContainer width='100%' height={320}>
            <PieChart>
                <Pie data={pieData} dataKey='value' innerRadius={70} outerRadius={100} paddingAngle={4}>
                    {pieData.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
                </Pie>
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    </div>
</section>
)
}