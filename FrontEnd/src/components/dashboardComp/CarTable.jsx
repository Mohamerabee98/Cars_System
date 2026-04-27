import { useState } from "react";

export const CarTable = ({ cars }) => {
    let [carCount, setCarCount] = useState(5);
    
    return (
        <section className='bg-white rounded-2xl shadow p-4 md:p-5'>
            <div className="flex justify-between items-center">
                <h3 className='font-bold mb-4 text-lg'>أحدث السيارات</h3>
                <button className='font-bold mb-4 text-lg text-orange-400  ' onClick={() => {
                    setCarCount(prev => prev === 5 ? cars.length : 5)
                }}>عرض الكل</button>
            </div>

            {/* Desktop Table */}

            <div className='hidden md:block overflow-x-auto'>
                <table className='w-full text-sm'>
                    <thead>
                        <tr className='border-b text-gray-500'>
                            <th className='py-3 text-right'>#</th>
                            <th className='py-3 text-right'>الصورة</th>
                            <th className='py-3 text-right'>الاسم</th>
                            <th className='py-3 text-right'>اللون</th>
                            <th className='py-3 text-right'>السعر</th>
                            <th className='py-3 text-right'>الكميه</th>

                        </tr>
                    </thead>

                    <tbody>
                        {cars.slice(0, carCount).map((car, index) => (
                            <tr
                                key={car.id || index}
                                className='border-b last:border-0'
                            >
                                <td className='py-3'>{index + 1}</td>

                                <td className='py-3'>
                                    <img
                                        src={
                                            car.image
                                                ? (() => {
                                                    try {
                                                        return JSON.parse(car.image)[0];
                                                    } catch {
                                                        return car.image;
                                                    }
                                                })()
                                                : ""
                                        }
                                        alt={car.company}
                                        className='w-16 h-12 rounded-lg object-cover'
                                    />
                                </td>
                                <td className='py-3'>{car.company}</td>
                                <td className='py-3'>{car.color}</td>
                                <td className='py-3'>{Number(car.price || 0).toLocaleString()}</td>
                                <td className='py-3'>{car.stock}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}

            <div className='grid grid-cols-1 gap-3 md:hidden'>
                {cars.slice(0, 5).map((car, index) => (
                    <div
                        key={car.id || index}
                        className='bg-gray-50 border rounded-2xl p-3 shadow-sm'
                    >
                        <div className='flex gap-3'>
                            <img
                                src={
                                    car.image
                                        ? (() => {
                                            try {
                                                return JSON.parse(car.image)[0];
                                            } catch {
                                                return car.image;
                                            }
                                        })()
                                        : ""
                                }
                                alt={car.company}
                                className='w-24 h-20 rounded-xl object-cover shrink-0'
                            />

                            <div className='flex-1 min-w-0'>
                                <div className='flex justify-between items-start gap-2'>
                                    <h4 className='font-bold text-sm truncate'>
                                        {car.company}
                                    </h4>

                                    <span className='text-xs text-gray-400 shrink-0'>
                                        #{index + 1}
                                    </span>
                                </div>

                                <p className='text-sm text-gray-500 mt-2'>
                                    اللون: {car.color}
                                </p>

                                <p className='text-orange-500 font-bold text-sm mt-1 break-words'>
                                    {Number(car.price || 0).toLocaleString()} ج.م
                                </p>

                                <p className='text-sm text-red-400 mt-2'>الكمية في المخزون : {car.stock}</p>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}