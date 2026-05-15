import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Plus,
  Edit3,
  Trash2,
  Clock3,
  Tag,
  Sparkles,
  Droplets,
  BrushCleaning,
  ShieldCheck,
  CarFront,
} from "lucide-react";

const ServicesPrices = () => {

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState("all");

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    category: "",
    status: true, // ✅ boolean بدل string
  });

  const token = localStorage.getItem("token");
  const API_URL = "http://localhost:3000/api";

  // ================= FETCH =================
  const fetchServices = async () => {

    try {
      setLoading(true);

      const res = await axios.get(API_URL, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const data = res.data?.data || res.data || [];

      setServices(data);

    } catch (err) {
      console.log("FETCH ERROR:", err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // ================= FILTER =================
  const categories = useMemo(() => {
    return [...new Set(services.map((s) => s.category))];
  }, [services]);

  const filteredServices = useMemo(() => {
    if (filter === "all") return services;
    return services.filter((s) => s.category === filter);
  }, [services, filter]);

  // ================= DELETE =================
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm("هل أنت متأكد من حذف الخدمة؟");
    if (!confirmDelete) return;

    try {

      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      setServices((prev) =>
        prev.filter((s) => s.id !== id)
      );

    } catch (err) {
      console.log("DELETE ERROR:", err.response?.data || err);
    }
  };

  // ================= STATUS TOGGLE =================
  const toggleStatus = async (service) => {

    try {

      const updatedStatus = !service.status; // ✅ قلب boolean

      const payload = {
        ...service,
        status: updatedStatus,
      };

      const res = await axios.put(
        `${API_URL}/${service.id}`,
        payload,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const updated = res.data?.data || res.data;

      setServices((prev) =>
        prev.map((s) =>
          s.id === service.id ? { ...s, ...updated } : s
        )
      );

    } catch (err) {
      console.log("STATUS ERROR:", err.response?.data || err);
    }
  };

  // ================= EDIT =================
  const openEdit = (service) => {

    setForm({
      name: service.name || "",
      description: service.description || "",
      price: service.price || "",
      duration: service.duration || "",
      category: service.category || "",
      status: service.status, // boolean
    });

    setEditId(service.id);
    setShowModal(true);
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const payload = {
        ...form,
        status: Boolean(form.status), // ✅ مهم جدًا
      };

      if (editId) {

        const res = await axios.put(
          `${API_URL}/${editId}`,
          payload,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        const updated = res.data?.data || res.data;

        setServices((prev) =>
          prev.map((s) =>
            s.id === editId ? { ...s, ...updated } : s
          )
        );

      } else {

        const res = await axios.post(
          API_URL,
          payload,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        const created = res.data?.data || res.data;

        setServices((prev) => [created, ...prev]);
      }

      setShowModal(false);
      setEditId(null);

      setForm({
        name: "",
        description: "",
        price: "",
        duration: "",
        category: "",
        status: true,
      });

    } catch (err) {
      console.log("SUBMIT ERROR:", err.response?.data || err);
    }
  };

  // ================= ICONS =================
  const getServiceIcon = (name = "") => {

    const lower = name.toLowerCase();

    if (lower.includes("تلميع")) {
      return <div className="service-icon-box purple"><Sparkles size={18} /></div>;
    }

    if (lower.includes("داخلي")) {
      return <div className="service-icon-box orange"><BrushCleaning size={18} /></div>;
    }

    if (lower.includes("نانو")) {
      return <div className="service-icon-box green"><ShieldCheck size={18} /></div>;
    }

    if (lower.includes("عفشة")) {
      return <div className="service-icon-box yellow"><CarFront size={18} /></div>;
    }

    return <div className="service-icon-box blue"><Droplets size={18} /></div>;
  };

  // ================= FILTERS =================
  const filters = [
    { key: "all", label: `الكل (${services.length})` },
    ...categories.map((c) => ({ key: c, label: c })),
  ];

  if (loading) {
    return <div className="services-loading">جاري تحميل الخدمات...</div>;
  }

  return (
    <div className="services-wrapper">

      {/* TOPBAR */}
      <div className="services-topbar">

        <div className="services-filters">

          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`services-filter-btn ${filter === f.key ? "active" : ""}`}
            >
              {f.label}
            </button>
          ))}

        </div>

        <button
          className="service-add-btn"
          onClick={() => {
            setShowModal(true);
            setEditId(null);
            setForm({
              name: "",
              description: "",
              price: "",
              duration: "",
              category: "",
              status: true,
            });
          }}
        >
          <Plus size={18} />
          إضافة خدمة
        </button>

      </div>

      {/* GRID */}
      <div className="services-grid">

        {/* ADD CARD */}
        <div
          className="add-service-card"
          onClick={() => {
            setShowModal(true);
            setEditId(null);
            setForm({
              name: "",
              description: "",
              price: "",
              duration: "",
              category: "",
              status: true,
            });
          }}
        >
          <div className="add-circle"><Plus size={22} /></div>
          <h4>إضافة خدمة جديدة</h4>
          <p>قم بإضافة وتحديد أسعار وخدمات جديدة</p>
        </div>

        {/* SERVICES */}
        {filteredServices.map((s) => (

          <div className="service-card" key={s.id}>

            {/* STATUS */}
            <div className="service-status">

              <button
                className={`status-toggle ${s.status ? "active" : "inactive"}`}
                onClick={() => toggleStatus(s)}
              >
                <div className="status-circle"></div>
              </button>

              <span className={s.status ? "status-active" : "status-inactive"}>
                {s.status ? "نشط" : "متوقف"}
              </span>

            </div>

            {/* ICON */}
            <div className="service-card-top">
              {getServiceIcon(s.name)}
            </div>

            {/* CONTENT */}
            <div className="service-content">
              <h3>{s.name}</h3>
              <p>{s.description || "خدمة احترافية للحفاظ على نظافة السيارة"}</p>
            </div>

            {/* META */}
            <div className="service-meta">

              <div className="meta-row">
                <div className="meta-label"><Tag size={15} /> السعر</div>
                <div className="meta-value">{s.price} ج.م</div>
              </div>

              <div className="meta-row">
                <div className="meta-label"><Clock3 size={15} /> الوقت المتوقع</div>
                <div className="meta-value">{s.duration}</div>
              </div>

            </div>

            {/* ACTIONS */}
            <div className="service-actions">

              <button className="delete-btn" onClick={() => handleDelete(s.id)}>
                <Trash2 size={15} />
              </button>

              <button className="edit-btn" onClick={() => openEdit(s)}>
                <Edit3 size={15} />
                تعديل
              </button>

            </div>

          </div>
        ))}

      </div>

      {/* MODAL */}
      {showModal && (
        <div className="service-modal-backdrop">

          <div className="service-modal">

            <div className="modal-header-custom">
              <h3>{editId ? "تعديل خدمة" : "إضافة خدمة"}</h3>
              <button onClick={() => setShowModal(false)}>✕</button>
            </div>

            <form onSubmit={handleSubmit}>

              <div className="form-group">
                <label>اسم الخدمة</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>الوصف</label>
                <textarea
                  required
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>السعر</label>
                <input
                  type="number"
                  required
                  value={form.price}
                  onChange={(e) =>
                    setForm({ ...form, price: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>المدة</label>
                <input
                  value={form.duration}
                  onChange={(e) =>
                    setForm({ ...form, duration: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>التصنيف</label>
                <input
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>الحالة</label>
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      status: e.target.value === "true",
                    })
                  }
                >
                  <option value="true">نشط</option>
                  <option value="false">متوقف</option>
                </select>
              </div>

              <div className="modal-actions">

                <button type="button" onClick={() => setShowModal(false)}>
                  إلغاء
                </button>

                <button type="submit">
                  حفظ الخدمة
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
};

export default ServicesPrices;

