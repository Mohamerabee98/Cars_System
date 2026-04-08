import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import carPlaceholder from "../../assets/default Car.webp";

const DashInventory = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);
  const [updateLoadingId, setUpdateLoadingId] = useState(null);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("الكل");
  const [modelFilter, setModelFilter] = useState("الكل");

  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    id: "",
    price: "",
    stock: "",
  });

  const token = localStorage.getItem("token");
  const API_URL = "http://localhost:3000/api/cars";

  const getCarId = (car) => car?._id || car?.id;
  const getModelLabel = (car) =>
    car?.model || car?.carModel || car?.company || "غير محدد";
  const getStatusLabel = (car) => car?.status?.trim() || "غير محدد";

  const formatPrice = (price) => {
    if (price === undefined || price === null || price === "") return "-";
    return `EGP ${Number(price).toLocaleString("en-US")}`;
  };

  const fetchCars = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(API_URL, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.data || response.data?.cars || [];

      setCars(data);
    } catch (err) {
      console.error("Fetch cars error:", err.response?.data || err.message);
      setError("حصل خطأ أثناء تحميل بيانات المخزون");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleDelete = async (car) => {
    const carId = getCarId(car);

    if (!carId) {
      alert("معرف العربية غير موجود");
      return;
    }

    const confirmed = window.confirm("هل أنت متأكد إنك عايز تحذف العربية دي؟");
    if (!confirmed) return;

    try {
      setDeleteLoadingId(carId);

      await axios.delete(`${API_URL}/${carId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      setCars((prev) => prev.filter((item) => getCarId(item) !== carId));
      alert("تم حذف العربية بنجاح");
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
      alert(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "حصل خطأ أثناء حذف العربية"
      );
    } finally {
      setDeleteLoadingId(null);
    }
  };

  const openEditModal = (car) => {
    setEditFormData({
      id: getCarId(car) || "",
      price: car.price ?? "",
      stock: car.stock ?? "",
    });

    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditFormData({
      id: "",
      price: "",
      stock: "",
    });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;

    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = (car) => {
    openEditModal(car);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const carId = editFormData.id;

    if (!carId) {
      alert("معرف العربية غير موجود");
      return;
    }

    try {
      setUpdateLoadingId(carId);

      const payload = {
        price: Number(editFormData.price),
        stock: Number(editFormData.stock),
      };

      await axios.put(`${API_URL}/${carId}`, payload, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      setCars((prev) =>
        prev.map((item) =>
          getCarId(item) === carId
            ? {
                ...item,
                ...payload,
              }
            : item
        )
      );

      closeEditModal();
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);
      alert(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "حصل خطأ أثناء تعديل العربية"
      );
    } finally {
      setUpdateLoadingId(null);
    }
  };

  const modelOptions = useMemo(() => {
    const uniqueModels = [
      ...new Set(cars.map((car) => getModelLabel(car)).filter(Boolean)),
    ];
    return uniqueModels;
  }, [cars]);

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const statusLabel = getStatusLabel(car);
      const modelLabel = getModelLabel(car);

      const searchableText = [
        car.company,
        modelLabel,
        car.color,
        statusLabel,
        car.stock,
        car.price,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchableText.includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "الكل" ? true : statusLabel === statusFilter;

      const matchesModel =
        modelFilter === "الكل" ? true : modelLabel === modelFilter;

      return matchesSearch && matchesStatus && matchesModel;
    });
  }, [cars, searchTerm, statusFilter, modelFilter]);

  return (
    <div className="dash-inventory p-3 p-lg-4">
      <div className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3 mb-4">
        <div className="text-end">
          <h3 className="mb-1 fw-bold" style={{ color: "var(--text)" }}>
            المخزون
          </h3>
          <p className="mb-0 small" style={{ color: "var(--muted)" }}>
            عرض وإدارة كل العربيات الموجودة في المخزون
          </p>
        </div>

        <div className="d-flex flex-wrap gap-2 justify-content-lg-end">
          <span
            className="px-3 py-2 rounded-3 fw-semibold"
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--border)",
              color: "var(--text)",
            }}
          >
            إجمالي العربيات: {cars.length}
          </span>

          <span
            className="px-3 py-2 rounded-3 fw-semibold"
            style={{
              background: "#fff7ed",
              border: "1px solid #fed7aa",
              color: "#c2410c",
            }}
          >
            المعروض: {filteredCars.length}
          </span>
        </div>
      </div>

      <div
        className="inventory-toolbar card border-0 mb-4"
        style={{
          background: "var(--card-bg)",
          borderRadius: "var(--radius)",
          boxShadow: "var(--shadow)",
        }}
      >
        <div className="card-body">
          <div className="row g-3 align-items-end">
            <div className="col-12 col-lg-5">
              <label className="form-label fw-semibold">بحث</label>
              <input
                type="text"
                className="form-control"
                placeholder="ابحث بالماركة أو الموديل أو اللون أو الحالة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ borderRadius: "12px" }}
              />
            </div>

            <div className="col-12 col-md-6 col-lg-3">
              <label className="form-label fw-semibold">فلتر الحالة</label>
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{ borderRadius: "12px" }}
              >
                <option value="الكل">الكل</option>
                <option value="جديد">جديد</option>
                <option value="مستعمل">مستعمل</option>
                <option value="غير محدد">غير محدد</option>
              </select>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <label className="form-label fw-semibold">فلتر الموديل</label>
              <select
                className="form-select"
                value={modelFilter}
                onChange={(e) => setModelFilter(e.target.value)}
                style={{ borderRadius: "12px" }}
              >
                <option value="الكل">الكل</option>
                {modelOptions.map((model, index) => (
                  <option key={`${model}-${index}`} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div
        className="card border-0"
        style={{
          background: "var(--card-bg)",
          borderRadius: "var(--radius)",
          boxShadow: "var(--shadow)",
          overflow: "hidden",
        }}
      >
        {loading ? (
          <div className="p-4 text-center">جارٍ تحميل العربيات...</div>
        ) : error ? (
          <div className="p-4 text-center text-danger">{error}</div>
        ) : filteredCars.length === 0 ? (
          <div className="p-4 text-center">لا توجد بيانات مطابقة</div>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle mb-0 inventory-table">
              <thead style={{ background: "#f9fafb" }}>
                <tr>
                  <th className="text-end px-3 py-3">الصورة</th>
                  <th className="text-end px-3 py-3">الماركة</th>
                  <th className="text-end px-3 py-3">الموديل</th>
                  <th className="text-end px-3 py-3">اللون</th>
                  <th className="text-end px-3 py-3">السعر</th>
                  <th className="text-end px-3 py-3">الحالة</th>
                  <th className="text-end px-3 py-3">المخزون</th>
                  <th className="text-end px-3 py-3">الإجراءات</th>
                </tr>
              </thead>

              <tbody>
                {filteredCars.map((car) => {
                  const carId = getCarId(car);
                  const modelLabel = getModelLabel(car);
                  const statusLabel = getStatusLabel(car);
                  const firstImage =
                    Array.isArray(car.image) && car.image.length > 0 && car.image[0]
                      ? car.image[0]
                      : carPlaceholder;

                  return (
                    <tr key={carId || Math.random()}>
                      <td className="text-end px-3 py-3">
                        <img
                          src={firstImage}
                          alt={car.company || "car"}
                          width="120"
                          height="84"
                          style={{
                            objectFit: "cover",
                            borderRadius: "16px",
                            border: "1px solid var(--border)",
                            background: "#f3f4f6",
                          }}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = carPlaceholder;
                          }}
                        />
                      </td>

                      <td className="text-end px-3 py-3 fw-semibold">
                        {car.company || "-"}
                      </td>

                      <td className="text-end px-3 py-3">{modelLabel}</td>

                      <td className="text-end px-3 py-3">{car.color || "-"}</td>

                      <td className="text-end px-3 py-3">
                        {formatPrice(car.price)}
                      </td>

                      <td className="text-end px-3 py-3">
                        <span
                          className="badge rounded-pill px-3 py-2"
                          style={{
                            background:
                              statusLabel === "جديد"
                                ? "#ecfdf3"
                                : statusLabel === "مستعمل"
                                ? "#fff7ed"
                                : "#f3f4f6",
                            color:
                              statusLabel === "جديد"
                                ? "#027a48"
                                : statusLabel === "مستعمل"
                                ? "#c2410c"
                                : "#6b7280",
                            border:
                              statusLabel === "جديد"
                                ? "1px solid #abefc6"
                                : statusLabel === "مستعمل"
                                ? "1px solid #fed7aa"
                                : "1px solid #d1d5db",
                            fontWeight: 600,
                          }}
                        >
                          {statusLabel}
                        </span>
                      </td>

                      <td className="text-end px-3 py-3">
                        <span
                          className="badge rounded-pill px-3 py-2"
                          style={{
                            background:
                              Number(car.stock) > 0 ? "#eff6ff" : "#fef2f2",
                            color:
                              Number(car.stock) > 0 ? "#1d4ed8" : "#dc2626",
                            border:
                              Number(car.stock) > 0
                                ? "1px solid #bfdbfe"
                                : "1px solid #fecaca",
                            fontWeight: 600,
                          }}
                        >
                          {car.stock ?? 0}
                        </span>
                      </td>

                      <td className="text-end px-3 py-3">
                        <div className="d-flex gap-2 justify-content-end flex-wrap">
                          <button
                            className="btn btn-sm"
                            style={{
                              background: "#fff",
                              border: "1px solid var(--border)",
                              borderRadius: "12px",
                              minWidth: "76px",
                            }}
                            onClick={() => handleEdit(car)}
                            disabled={updateLoadingId === carId}
                          >
                            تعديل
                          </button>

                          <button
                            className="btn btn-sm"
                            style={{
                              background: "#fee2e2",
                              border: "1px solid #fecaca",
                              color: "#b91c1c",
                              borderRadius: "12px",
                              minWidth: "76px",
                            }}
                            onClick={() => handleDelete(car)}
                            disabled={deleteLoadingId === carId}
                          >
                            {deleteLoadingId === carId ? "جارٍ..." : "حذف"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showEditModal && (
        <div className="edit-modal-backdrop" onClick={closeEditModal}>
          <div
            className="edit-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="mb-0 fw-bold">تعديل البيانات</h4>
              <button
                type="button"
                className="btn-close"
                onClick={closeEditModal}
              ></button>
            </div>

            <form onSubmit={handleEditSubmit}>
              <div className="d-flex flex-column gap-3">
                <div>
                  <label className="form-label fw-semibold">السعر</label>
                  <input
                    type="number"
                    name="price"
                    className="form-control"
                    value={editFormData.price}
                    onChange={handleEditInputChange}
                  />
                </div>

                <div>
                  <label className="form-label fw-semibold">الكمية</label>
                  <input
                    type="number"
                    name="stock"
                    className="form-control"
                    value={editFormData.stock}
                    onChange={handleEditInputChange}
                  />
                </div>
              </div>

              <div className="d-flex justify-content-end gap-2 mt-4">
                <button
                  type="button"
                  className="btn"
                  onClick={closeEditModal}
                  style={{
                    border: "1px solid var(--border)",
                    background: "#fff",
                    borderRadius: "12px",
                    minWidth: "90px",
                  }}
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  className="btn"
                  disabled={updateLoadingId === editFormData.id}
                  style={{
                    background: "var(--orange)",
                    color: "#111",
                    borderRadius: "12px",
                    minWidth: "110px",
                    fontWeight: 700,
                  }}
                >
                  {updateLoadingId === editFormData.id ? "جارٍ الحفظ..." : "حفظ التعديل"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashInventory;