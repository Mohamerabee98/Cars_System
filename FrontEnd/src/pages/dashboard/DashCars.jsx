
import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  FaPlusCircle,
  FaListUl,
  FaCar,
  FaChartBar,
  FaEdit,
  FaTrash,
  FaSyncAlt,
} from "react-icons/fa";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const API_BASE = "http://localhost:3000";
const PRIMARY = "#FF7A1A";
const PRIMARY_SOFT = "rgba(255, 122, 26, 0.12)";

const weeklyIncomeDummy = [
  { day: "السبت", income: 4200, highlight: false },
  { day: "الأحد", income: 5100, highlight: false },
  { day: "الاثنين", income: 3800, highlight: false },
  { day: "الثلاثاء", income: 4600, highlight: false },
  { day: "الأربعاء", income: 6200, highlight: true },
  { day: "الخميس", income: 5400, highlight: false },
  { day: "الجمعة", income: 4900, highlight: false },
];

function statusBadgeMeta(status) {
  const s = (status || "").toLowerCase();
  if (s === "pending" || s === "waiting" || s === "بانتظار") {
    return { label: "بانتظار", className: "sp-badge sp-badge-wait" };
  }
  if (
    s === "in_progress" ||
    s === "processing" ||
    s === "active" ||
    s === "قيد العمل"
  ) {
    return { label: "قيد العمل", className: "sp-badge sp-badge-progress" };
  }
  if (
    s === "done" ||
    s === "completed" ||
    s === "finished" ||
    s === "منتهي"
  ) {
    return { label: "منتهي", className: "sp-badge sp-badge-done" };
  }
  return { label: status || "غير محدد", className: "sp-badge sp-badge-muted" };
}

function DashCars() {
  const token = localStorage.getItem("token");

  const api = useMemo(
    () =>
      axios.create({
        baseURL: API_BASE,
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
        },
      }),
    [token]
  );

  const [plateNumber, setPlateNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [carType, setCarType] = useState("");
  const [serviceType, setServiceType] = useState("");

  const [services, setServices] = useState([]);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    variant: "success",
    message: "",
  });

  const showToast = useCallback((variant, message) => {
    setToast({ show: true, variant, message });
    const t = setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 4000);
    return () => clearTimeout(t);
  }, []);

  const fetchServices = useCallback(async () => {
    setServicesLoading(true);
    try {
      const { data } = await api.get("/api");
      const list = Array.isArray(data) ? data : data?.data ?? [];
      setServices(list);
    } catch (err) {
      console.error(err);
      showToast(
        "danger",
        err.response?.data?.message || "تعذر تحميل أنواع الخدمات."
      );
      setServices([]);
    } finally {
      setServicesLoading(false);
    }
  }, [api, showToast]);

  const fetchOrders = useCallback(async () => {
    setOrdersLoading(true);
    try {
      const { data } = await api.get("/orders");
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      showToast(
        "danger",
        err.response?.data?.message || "تعذر تحميل الطلبات."
      );
      setOrders([]);
    } finally {
      setOrdersLoading(false);
    }
  }, [api, showToast]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!plateNumber.trim() || !carType.trim() || !serviceType) {
      showToast("warning", "يرجى تعبئة رقم اللوحة ونوع السيارة ونوع الخدمة.");
      return;
    }
    setSubmitLoading(true);
    try {
      await api.post("/orders/create", {
        plate_number: plateNumber.trim(),
        car_type: carType.trim(),
        service_id: Number(serviceType),
      });
      showToast("success", "تم تسجيل المركبة بنجاح.");
      setPlateNumber("");
      setCustomerName("");
      setCarType("");
      setServiceType("");
      fetchOrders();
    } catch (err) {
      console.error(err);
      showToast(
        "danger",
        err.response?.data?.message || "حدث خطأ أثناء تسجيل الطلب."
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  const chartFormatter = (value) =>
    `${Number(value).toLocaleString("ar-EG")} ج.م`;

  return (
    <div className="services-prices-page" dir="rtl" lang="ar">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap');
        .services-prices-page {
          font-family: 'Tajawal', 'Segoe UI', Tahoma, sans-serif;
          color: #1f2937;
          background: transparent;
        }
        .services-prices-page .sp-card {
          background: #fff;
          border-radius: 12px;
          border: 1px solid rgba(0,0,0,0.04);
          box-shadow: 0 10px 35px rgba(15, 23, 42, 0.06);
          transition: box-shadow 0.2s ease, transform 0.2s ease;
        }
        .services-prices-page .sp-card:hover {
          box-shadow: 0 14px 40px rgba(15, 23, 42, 0.08);
        }
        .services-prices-page .sp-card-title {
          font-weight: 700;
          font-size: 1.05rem;
          color: #111827;
        }
        .services-prices-page .sp-muted {
          color: #6b7280;
          font-size: 0.875rem;
        }
        .services-prices-page .sp-label {
          font-weight: 600;
          font-size: 0.9rem;
          margin-bottom: 0.35rem;
          color: #374151;
        }
        .services-prices-page .form-control,
        .services-prices-page .form-select {
          border-radius: 10px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          padding: 0.65rem 0.85rem;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }
        .services-prices-page .form-control:focus,
        .services-prices-page .form-select:focus {
          border-color: ${PRIMARY};
          box-shadow: 0 0 0 0.2rem rgba(255, 122, 26, 0.18);
          background: #fff;
        }
        .services-prices-page .sp-input-icon-wrap {
          position: relative;
        }
        .services-prices-page .sp-input-icon {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 12px;
          color: #9ca3af;
          pointer-events: none;
          font-size: 1rem;
        }
        .services-prices-page .sp-input-icon-wrap .form-control,
        .services-prices-page .sp-input-icon-wrap .form-select {
          padding-right: 2.25rem;
        }
        .services-prices-page .btn-sp-primary {
          background: ${PRIMARY};
          border-color: ${PRIMARY};
          color: #fff;
          font-weight: 600;
          border-radius: 10px;
          padding: 0.65rem 1rem;
          transition: background 0.15s ease, transform 0.1s ease;
        }
        .services-prices-page .btn-sp-primary:hover:not(:disabled) {
          background: #e96d15;
          border-color: #e96d15;
          color: #fff;
        }
        .services-prices-page .btn-sp-primary:disabled {
          opacity: 0.65;
        }
        .services-prices-page .sp-link-action {
          color: ${PRIMARY};
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          border: 0;
          background: none;
          transition: opacity 0.15s ease;
        }
        .services-prices-page .sp-link-action:hover {
          opacity: 0.85;
          text-decoration: underline;
        }
        .services-prices-page .table thead th {
          color: #6b7280;
          font-weight: 600;
          font-size: 0.85rem;
          border-bottom-width: 1px;
          white-space: nowrap;
        }
        .services-prices-page .table tbody tr {
          transition: background 0.12s ease;
        }
        .services-prices-page .table-hover tbody tr:hover {
          background: #f9fafb;
        }
        .services-prices-page .sp-service-pill {
          display: inline-block;
          padding: 0.25rem 0.65rem;
          border-radius: 999px;
          background: #f3f4f6;
          color: #374151;
          font-size: 0.8rem;
          font-weight: 500;
        }
        .services-prices-page .sp-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.25rem 0.6rem;
          border-radius: 999px;
          font-size: 0.78rem;
          font-weight: 600;
        }
        .services-prices-page .sp-badge-wait {
          background: ${PRIMARY_SOFT};
          color: ${PRIMARY};
        }
        .services-prices-page .sp-badge-progress {
          background: #e0e7ff;
          color: #4338ca;
        }
        .services-prices-page .sp-badge-done {
          background: #d1fae5;
          color: #047857;
        }
        .services-prices-page .sp-badge-muted {
          background: #f3f4f6;
          color: #4b5563;
        }
        .services-prices-page .sp-toast-host {
          position: fixed;
          top: 1rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1080;
          min-width: min(420px, 92vw);
        }
        .services-prices-page .recharts-cartesian-grid-horizontal line,
        .services-prices-page .recharts-cartesian-grid-vertical line {
          stroke: #e5e7eb;
        }
        @keyframes sp-rot {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .services-prices-page .sp-animate-spin {
          display: inline-flex;
          animation: sp-rot 0.85s linear infinite;
        }
      `}</style>

      {toast.show && (
        <div className="sp-toast-host px-2">
          <div
            className={`alert alert-${toast.variant} shadow mb-0 py-2 px-3`}
            role="alert"
          >
            {toast.message}
          </div>
        </div>
      )}

      <div className="container-fluid px-0 pb-4">
        <div className="row g-4 flex-column flex-lg-row">
          <div className="col-12 col-lg-8 order-2 order-lg-1">
            <div className="sp-card p-3 p-md-4 h-100">
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
                <div className="d-flex align-items-center gap-2 sp-card-title">
                  <FaListUl className="text-secondary" aria-hidden />
                  قائمة العمليات الحالية
                </div>
                <button
                  type="button"
                  className="sp-link-action d-inline-flex align-items-center gap-2"
                  onClick={() => fetchOrders()}
                  disabled={ordersLoading}
                >
                  <span
                    className={ordersLoading ? "sp-animate-spin" : ""}
                    aria-hidden
                  >
                    <FaSyncAlt />
                  </span>
                  تحديث البيانات
                </button>
              </div>

              {/* Orders Table */}
              <div className="table-responsive rounded-3 border">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th scope="col">رقم اللوحة</th>
                      <th scope="col">الموديل</th>
                      <th scope="col">الخدمة المطلوبة</th>
                      <th scope="col">الوقت التقديري</th>
                      <th scope="col">الحالة</th>
                      {/* <th scope="col" className="text-center">
                        إجراءات
                      </th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {ordersLoading ? (
                      <tr>
                        <td colSpan={6} className="text-center py-5">
                          <div
                            className="spinner-border text-secondary"
                            role="status"
                            style={{ width: "2.5rem", height: "2.5rem" }}
                          >
                            <span className="visually-hidden">جاري التحميل</span>
                          </div>
                          <div className="sp-muted mt-2">جاري تحميل البيانات…</div>
                        </td>
                      </tr>
                    ) : orders.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-4 sp-muted">
                          لا توجد عمليات حالية.
                        </td>
                      </tr>
                    ) : (
                      orders.map((row) => {
                        const svc = row.Service || row.service;
                        const duration =
                          svc?.duration != null ? `${svc.duration} دقيقة` : "—";
                        const badge = statusBadgeMeta(row.status);
                        const plate = row.plate_number ?? row.plateNumber ?? "—";
                        const model = row.car_type ?? row.carType ?? "—";
                        const serviceName = svc?.name ?? "—";

                        return (
                          <tr key={row.id ?? `${plate}-${model}`}>
                            <td className="fw-semibold text-nowrap">{plate}</td>
                            <td>
                              <span className="d-inline-flex align-items-center gap-2">
                                <FaCar className="text-secondary" aria-hidden />
                                {model}
                              </span>
                            </td>
                            <td>
                              <span className="sp-service-pill">{serviceName}</span>
                            </td>
                            <td className="text-nowrap">{duration}</td>
                            <td>
                              <span className={badge.className}>{badge.label}</span>
                            </td>
                            {/* <td className="text-center text-nowrap">
                              <div className="d-flex justify-content-center gap-2 flex-wrap">
                                <button
                                  type="button"
                                  className="btn btn-sm btn-outline-secondary rounded-pill px-3"
                                  title="تعديل"
                                >
                                  <FaEdit className="ms-1" aria-hidden />
                                  تعديل
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-sm btn-outline-danger rounded-pill px-3"
                                  title="حذف"
                                >
                                  <FaTrash className="ms-1" aria-hidden />
                                  حذف
                                </button>
                              </div>
                            </td> */}
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
                {/* Add Car Form */}

          <div className="col-12 col-lg-4 order-1 order-lg-2">
            <div className="sp-card p-3 p-md-4 h-100">
              <div className="d-flex align-items-center gap-2 mb-4 sp-card-title">
                <FaPlusCircle style={{ color: PRIMARY }} aria-hidden />
                إضافة سيارة جديدة
              </div>

              <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                <div>
                  <label className="sp-label" htmlFor="sp-plate">
                    رقم اللوحة (مصري)
                  </label>
                  <input
                    id="sp-plate"
                    className="form-control"
                    placeholder="مثال: أ ب ج 1234"
                    value={plateNumber}
                    onChange={(e) => setPlateNumber(e.target.value)}
                    autoComplete="off"
                  />
                </div>

                <div>
                  <label className="sp-label" htmlFor="sp-customer">
                    اسم العميل
                  </label>
                  <input
                    id="sp-customer"
                    className="form-control"
                    placeholder="مثال: أحمد محمد"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    autoComplete="name"
                  />
                 
                </div>

                <div>
                  <label className="sp-label" htmlFor="sp-car">
                    نوع السيارة
                  </label>
                  <div className="sp-input-icon-wrap">
                    <FaCar className="sp-input-icon" aria-hidden />
                    <input
                      id="sp-car"
                      className="form-control"
                      placeholder="مثال: هيونداي إلنترا"
                      value={carType}
                      onChange={(e) => setCarType(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="sp-label" htmlFor="sp-service">
                    نوع الخدمة
                  </label>
                  <div className="sp-input-icon-wrap">
                    <FaCar className="sp-input-icon" aria-hidden />
                    <select
                      id="sp-service"
                      className="form-select"
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      disabled={servicesLoading}
                    >
                      <option value="">
                        {servicesLoading ? "جاري التحميل…" : "اختر الخدمة"}
                      </option>
                      {services.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-sp-primary w-100 mt-2 d-inline-flex align-items-center justify-content-center gap-2"
                  disabled={submitLoading}
                >
                  {submitLoading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden
                      />
                      جاري التسجيل…
                    </>
                  ) : (
                    <>
                      <FaPlusCircle aria-hidden />
                      تسجيل المركبة
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Charts */}

        <div className="row mt-4 g-4">
          <div className="col-12">
            <div className="sp-card p-3 p-md-4">
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
                <div className="d-flex align-items-center gap-2 sp-card-title">
                  <FaChartBar style={{ color: PRIMARY }} aria-hidden />
                  تحليل الدخل الأسبوعي
                </div>
                <select
                  className="form-select form-select-sm w-auto"
                  style={{ maxWidth: 180, borderRadius: 10 }}
                  defaultValue="7"
                  aria-label="نطاق التحليل"
                >
                  <option value="7">آخر 7 أيام</option>
                  <option value="14">آخر 14 يومًا</option>
                </select>
              </div>

              <div dir="ltr" style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={weeklyIncomeDummy}
                    margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="day"
                      tick={{ fill: "#6b7280", fontSize: 12 }}
                      axisLine={{ stroke: "#e5e7eb" }}
                    />
                    <YAxis
                      tickFormatter={chartFormatter}
                      tick={{ fill: "#6b7280", fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      formatter={(v) => [`${Number(v).toLocaleString("ar-EG")} ج.م`, "الدخل"]}
                      labelStyle={{ direction: "rtl", fontFamily: "Tajawal" }}
                      contentStyle={{ borderRadius: 10, borderColor: "#e5e7eb" }}
                    />
                    <Bar dataKey="income" radius={[8, 8, 0, 0]} maxBarSize={48}>
                      {weeklyIncomeDummy.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.highlight ? PRIMARY : "#e5e7eb"}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashCars;

