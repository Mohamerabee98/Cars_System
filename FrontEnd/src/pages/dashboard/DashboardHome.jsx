import React, { useEffect, useMemo, useState, useCallback } from "react";
import axios from "axios";
import {
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Line,
  Area,
  AreaChart,
} from "recharts";

const DashboardHome = () => {
  const [filter, setFilter] = useState("all");
  const [cars, setCars] = useState([]);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

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

  // 🔗 API FETCH
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const [carsRes, salesRes] = await Promise.all([
        axios.get("http://localhost:3000/api/cars", {
          headers: { authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:3000/api/sales", {
          headers: { authorization: `Bearer ${token}` },
        }),
      ]);

      setCars(carsRes?.data?.data?.length ? carsRes.data.data : fallbackCars);
      setSales(salesRes?.data?.data?.length ? salesRes.data.data : fallbackSales);

    } catch (err) {
      setCars(fallbackCars);
      setSales(fallbackSales);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 🔥 FILTER
  const filteredSales = useMemo(() => {
    const now = new Date();

    return sales.filter((s) => {
      const d = new Date(s.sale_date);
      const diffDays = (now - d) / (1000 * 60 * 60 * 24);

      if (filter === "7d") return diffDays <= 7;
      if (filter === "30d") return diffDays <= 30;
      return true;
    });
  }, [filter, sales]);

  // 🔥 ANALYTICS
  const analytics = useMemo(() => {
    const carsCount = cars.length;
    const salesCount = filteredSales.length;

    const totalSalesValue = filteredSales.reduce(
      (acc, s) => acc + (s.total_price || 0),
      0
    );

    const inventoryValue = cars.reduce(
      (acc, c) => acc + (c.price || 0) * (c.stock || 0),
      0
    );

    const chart = filteredSales.map((s) => ({
      name: s.Car?.company || "Car",
      value: s.total_price || 0,
      customer: s.Customer?.name || "Unknown",
    }));

    return {
      carsCount,
      salesCount,
      totalSalesValue,
      inventoryValue,
      chart,
      list: filteredSales,
    };
  }, [cars, filteredSales]);

  const format = (v) => Number(v || 0).toLocaleString();

  if (loading) {
    return <div className="p-5 text-center text-muted">Loading...</div>;
  }

  return (
    <div className="p-4 bg-light min-vh-100">

      {/* FILTER */}
      <div className="mb-4 d-flex gap-2 flex-wrap">
        {[
          { key: "all", label: "الكل" },
          { key: "7d", label: "آخر 7 أيام" },
          { key: "30d", label: "آخر 30 يوم" },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`btn btn-sm px-3 rounded-pill ${
              filter === f.key ? "btn-dark" : "btn-outline-dark"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* KPI */}
      <div className="row g-3 mb-4">

        <div className="col-md-3">
          <div className="card border-0 shadow-sm rounded-4 p-3">
            <p className="text-muted small mb-1">إجمالي السيارات</p>
            <h4 className="fw-bold">{format(analytics.carsCount)}</h4>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm rounded-4 p-3">
            <p className="text-muted small mb-1">عدد عمليات البيع</p>
            <h4 className="fw-bold">{format(analytics.salesCount)}</h4>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm rounded-4 p-3">
            <p className="text-muted small mb-1">إجمالي المبيعات</p>
            <h4 className="fw-bold">{format(analytics.totalSalesValue)}</h4>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm rounded-4 p-3">
            <p className="text-muted small mb-1">قيمة المخزون</p>
            <h4 className="fw-bold">{format(analytics.inventoryValue)}</h4>
          </div>
        </div>

      </div>

      {/* CHART */}
      <div className="card border-0 shadow-sm rounded-4 p-3 mb-4">

        <h5 className="fw-bold mb-1">تحليل المبيعات</h5>
        <p className="text-muted small mb-3">
          عرض حركة المبيعات حسب الفترات المختلفة
        </p>

        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={analytics.chart}>

            <defs>
              <linearGradient id="sales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="name" hide />

            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const d = payload[0].payload;

                  return (
                    <div
                      style={{
                        background: "#fff",
                        padding: "10px 12px",
                        borderRadius: 10,
                        border: "1px solid #eee",
                      }}
                    >
                      <p style={{ margin: 0, fontWeight: 600 }}>
                        الإجمالي: {format(d.value)}
                      </p>
                      <p style={{ margin: 0 }}>السيارة: {d.name}</p>
                      <p style={{ margin: 0 }}>المشتري: {d.customer}</p>
                    </div>
                  );
                }
                return null;
              }}
            />

            <Area
              type="monotone"
              dataKey="value"
              fill="url(#sales)"
              stroke="none"
            />

            <Line
              type="monotone"
              dataKey="value"
              stroke="#f97316"
              strokeWidth={3}
              dot={{ r: 4 }}
            />

          </AreaChart>
        </ResponsiveContainer>

      </div>

      {/* TABLE */}
      <div className="card border-0 shadow-sm rounded-4 p-3">

        <h5 className="fw-bold mb-3">أحدث عمليات البيع</h5>

        <div className="table-responsive">

          <table className="table align-middle mb-0">

            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>العميل</th>
                <th>السيارة</th>
                <th>التاريخ</th>
                <th>القيمة</th>
              </tr>
            </thead>

            <tbody>
              {analytics.list.map((s, i) => (
                <tr key={s.id}>
                  <td className="text-muted">{i + 1}</td>
                  <td className="fw-semibold">{s.Customer?.name}</td>
                  <td className="text-muted">{s.Car?.company}</td>
                  <td className="text-muted">
                    {new Date(s.sale_date).toLocaleDateString()}
                  </td>
                  <td className="fw-bold">
                    EGP {format(s.total_price)}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default DashboardHome;