// src/pages/dashboard/Customers.jsx

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  FaSearch,
  FaEdit,
  FaTrash,
  FaEye,
  FaUsers,
  FaTimes,
} from "react-icons/fa";

const API_BASE_URL = "http://localhost:3000"; // example: http://localhost:5000

const Customers = () => {
  const token = localStorage.getItem("token");


  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("الكل");

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteCustomerId, setDeleteCustomerId] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: "",
  });

  const customersPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  // ================================
  // Axios Instance
  // ================================
  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // ================================
  // Toast Helper
  // ================================
  const showToast = (type, message) => {
    setToast({
      show: true,
      type,
      message,
    });

    setTimeout(() => {
      setToast({
        show: false,
        type: "",
        message: "",
      });
    }, 3000);
  };

  // ================================
  // Fetch Customers
  // ================================
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await api.get("/profile/users");

      const users = data?.data?.data || [];
      console.log(data.data.data);

   const formattedUsers = users.map((user, index) => ({
  id: user.id,
  fullName: user.name,
  email: user.email,
  phone: user.phone,
  avatar: `https://ui-avatars.com/api/?name=${user.name}`,
  joinDate: user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("ar-EG")
    : "غير متوفر",
  status: user.status || "نشط",
}));

      setCustomers(formattedUsers);
      setFilteredCustomers(formattedUsers);
    } catch (err) {
      console.error(err);
      setError("حدث خطأ أثناء تحميل العملاء");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // ================================
  // Search + Filter
  // ================================
  useEffect(() => {
    let data = [...customers];

    // Search
    if (search.trim()) {
      data = data.filter(
        (customer) =>
          customer.fullName.toLowerCase().includes(search.toLowerCase()) ||
          customer.email.toLowerCase().includes(search.toLowerCase()) ||
          customer.phone.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Filter
    if (statusFilter !== "الكل") {
      data = data.filter((customer) => customer.status === statusFilter);
    }

    setFilteredCustomers(data);
    setCurrentPage(1);
  }, [search, statusFilter, customers]);

  // ================================
  // Pagination
  // ================================
  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

  const paginatedCustomers = useMemo(() => {
    const start = (currentPage - 1) * customersPerPage;
    return filteredCustomers.slice(start, start + customersPerPage);
  }, [filteredCustomers, currentPage]);

  // ================================
  // Delete Customer
  // ================================
  const handleDelete = async () => {
    try {
      setActionLoading(true);

      await api.delete("/profile/delete", {
        data: {
          userId: deleteCustomerId,
        },
      });

      setCustomers((prev) =>
        prev.filter((item) => item.id !== deleteCustomerId),
      );

      showToast("success", "تم حذف العميل بنجاح");

      setShowDeleteModal(false);
      setDeleteCustomerId(null);
    } catch (err) {
      console.error(err);
      showToast("error", "فشل حذف العميل");
    } finally {
      setActionLoading(false);
    }
  };

  // ================================
  // Open Edit Modal
  // ================================
  const openEditModal = (customer) => {
    setSelectedCustomer(customer);

    setEditData({
      fullName: customer.fullName,
      email: customer.email,
      phone: customer.phone,
    });

    setShowEditModal(true);
  };

  // ================================
  // Update Customer
// const handleUpdate = async () => {
//   try {
//     setActionLoading(true);

//     await api.put("/profile/update", {
//       name: editData.fullName,
//       email: editData.email,
//       phone: editData.phone,
//     });

//     setCustomers((prev) =>
//       prev.map((customer) =>
//         customer.id === selectedCustomer.id
//           ? {
//               ...customer,
//               fullName: editData.fullName,
//               email: editData.email,
//               phone: editData.phone,
//             }
//           : customer
//       )
//     );

//     showToast("success", "تم تحديث العميل بنجاح");
//     setShowEditModal(false);

//   } catch (err) {
//     console.log(err?.response?.data);
//     showToast("error", err?.response?.data?.message || "فشل التحديث");

//   } finally {
//     setActionLoading(false);
//   }
// };

  return (
    <div
      dir="rtl"
      className="customers-page p-3 p-lg-4"
      style={{
        minHeight: "100vh",
        background: "#f5f6fa",
      }}
    >
      {/* ========================= */}
      {/* Header */}
      {/* ========================= */}
      <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center mb-4 gap-3">
        <div>
          <h3 className="fw-bold mb-1" style={{ color: "#111827" }}>
            قائمة العملاء
          </h3>

          <p className="text-muted mb-0">
            إدارة ومتابعة بيانات العملاء داخل النظام
          </p>
        </div>

        {/* <button
          className="btn text-white fw-semibold px-4 py-2"
          style={{
            background: "#ff7a1a",
            borderRadius: "12px",
            border: "none",
          }}
        >
          + إضافة عميل جديد
        </button> */}
      </div>

      {/* ========================= */}
      {/* Main Card */}
      {/* ========================= */}
      <div
        className="card border-0"
        style={{
          borderRadius: "24px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
        }}
      >
        <div className="card-body p-3 p-lg-4">
          {/* ========================= */}
          {/* Search + Filter */}
          {/* ========================= */}
          <div className="row g-3 mb-4">
            <div className="col-lg-8">
              <div
                className="d-flex align-items-center px-3"
                style={{
                  background: "#f8fafc",
                  borderRadius: "14px",
                  height: "52px",
                  border: "1px solid #e5e7eb",
                }}
              >
                <FaSearch size={16} className="text-muted ms-2" />

                <input
                  type="text"
                  className="form-control border-0 bg-transparent shadow-none"
                  placeholder="بحث باسم العميل، البريد الإلكتروني أو رقم الهاتف..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="col-lg-4">
              <select
                className="form-select shadow-none"
                style={{
                  height: "52px",
                  borderRadius: "14px",
                  border: "1px solid #e5e7eb",
                  backgroundColor: "#f8fafc",
                }}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="الكل">جميع الحالات</option>
                <option value="نشط">نشط</option>
                <option value="غير نشط">غير نشط</option>
              </select>
            </div>
          </div>

          {/* ========================= */}
          {/* Loading */}
          {/* ========================= */}
          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border" style={{ color: "#ff7a1a" }} />

              <p className="mt-3 text-muted">جاري تحميل العملاء...</p>
            </div>
          )}

          {/* ========================= */}
          {/* Error */}
          {/* ========================= */}
          {!loading && error && (
            <div className="alert alert-danger text-center">{error}</div>
          )}

          {/* ========================= */}
          {/* Empty State */}
          {/* ========================= */}
          {!loading && !error && filteredCustomers.length === 0 && (
            <div className="text-center py-5">
              <div
                className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "50%",
                  background: "#fff7ed",
                }}
              >
                <FaUsers size={35} color="#ff7a1a" />
              </div>

              <h5 className="fw-bold mb-2">لا يوجد عملاء</h5>

              <p className="text-muted">لم يتم العثور على أي عملاء حالياً</p>
            </div>
          )}

          {/* ========================= */}
          {/* Table */}
          {/* ========================= */}
          {!loading && !error && filteredCustomers.length > 0 && (
            <>
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead>
                    <tr
                      style={{
                        background: "#f8fafc",
                      }}
                    >
                      <th className="py-3">العميل</th>
                      <th className="py-3">البريد الإلكتروني</th>
                      <th className="py-3">رقم الهاتف</th>
                      <th className="py-3">تاريخ الانضمام</th>
                      <th className="py-3">الحالة</th>
                      <th className="py-3 text-center">الإجراءات</th>
                    </tr>
                  </thead>

                  <tbody>
                    {paginatedCustomers.map((customer) => (
                      <tr
                        key={customer.id}
                        style={{
                          transition: "0.3s",
                        }}
                        className="customer-row"
                      >
                        {/* Customer */}
                        <td className="py-3">
                          <div className="d-flex align-items-center gap-3">
                            <img
                              src={customer.avatar}
                              alt={customer.name}
                              style={{
                                width: "48px",
                                height: "48px",
                                borderRadius: "50%",
                                objectFit: "cover",
                              }}
                            />

                            <div>
                              <h6 className="mb-1 fw-bold">
                                {customer.name}
                              </h6>

                              <small className="text-muted">
                                ID: {customer.id}
                              </small>
                            </div>
                          </div>
                        </td>

                        {/* Email */}
                        <td>{customer.email}</td>

                        {/* Phone */}
                        <td>{customer.phone}</td>

                        {/* Date */}
                        <td>{customer.joinDate}</td>

                        {/* Status */}
                        <td>
                          <span
                            className="badge px-3 py-2"
                            style={{
                              borderRadius: "30px",
                              background:
                                customer.status === "نشط"
                                  ? "#dcfce7"
                                  : "#fee2e2",
                              color:
                                customer.status === "نشط"
                                  ? "#15803d"
                                  : "#dc2626",
                            }}
                          >
                            {customer.status}
                          </span>
                        </td>

                        {/* Actions */}
                        <td>
                          <div className="d-flex justify-content-center gap-2">
                            {/* View */}
                            <button
                              className="btn btn-light border"
                              onClick={() => {
                                setSelectedCustomer(customer);
                                setShowViewModal(true);
                              }}
                            >
                              <FaEye />
                            </button>

                            {/* Edit */}
                            {/* <button
                              className="btn btn-light border"
                              onClick={() => openEditModal(customer)}
                            >
                              <FaEdit color="#2563eb" />
                            </button> */}

                            {/* Delete */}
                            <button
                              className="btn btn-light border"
                              onClick={() => {
                                setDeleteCustomerId(customer.id);
                                setShowDeleteModal(true);
                              }}
                            >
                              <FaTrash color="#dc2626" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ========================= */}
              {/* Pagination */}
              {/* ========================= */}
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-4 gap-3">
                <p className="text-muted mb-0">
                  عرض{" "}
                  {filteredCustomers.length > 0
                    ? (currentPage - 1) * customersPerPage + 1
                    : 0}{" "}
                  إلى{" "}
                  {Math.min(
                    currentPage * customersPerPage,
                    filteredCustomers.length,
                  )}{" "}
                  من أصل {filteredCustomers.length} عميل
                </p>

                <div className="d-flex align-items-center gap-2">
                  <button
                    className="btn btn-light border"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                  >
                    السابق
                  </button>

                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      className="btn"
                      onClick={() => setCurrentPage(index + 1)}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                        background:
                          currentPage === index + 1 ? "#ff7a1a" : "#fff",
                        color: currentPage === index + 1 ? "#fff" : "#111",
                        border: "1px solid #e5e7eb",
                      }}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    className="btn btn-light border"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                  >
                    التالي
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ========================= */}
      {/* View Modal */}
      {/* ========================= */}
      {showViewModal && selectedCustomer && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0">بيانات العميل</h5>

              <button
                className="btn btn-light"
                onClick={() => setShowViewModal(false)}
              >
                <FaTimes />
              </button>
            </div>

            <div className="text-center mb-4">
              <img
                src={selectedCustomer.avatar}
                alt=""
                style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            </div>

            <div className="row g-3">
              <div className="col-12">
                <label className="fw-semibold mb-2">الاسم</label>

                <div className="form-control py-2">
                  {selectedCustomer.fullName}
                </div>
              </div>

              <div className="col-12">
                <label className="fw-semibold mb-2">البريد الإلكتروني</label>

                <div className="form-control py-2">
                  {selectedCustomer.email}
                </div>
              </div>

              <div className="col-12">
                <label className="fw-semibold mb-2">رقم الهاتف</label>

                <div className="form-control py-2">
                  {selectedCustomer.phone}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================= */}
      {/* Edit Modal */}
      {/* ========================= */}
      {showEditModal && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0">تعديل العميل</h5>

              <button
                className="btn btn-light"
                onClick={() => setShowEditModal(false)}
              >
                <FaTimes />
              </button>
            </div>

            <div className="mb-3">
              <label className="mb-2 fw-semibold">الاسم الكامل</label>

              <input
                type="text"
                className="form-control"
                value={editData.fullName}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    fullName: e.target.value,
                  })
                }
              />
            </div>

            <div className="mb-3">
              <label className="mb-2 fw-semibold">البريد الإلكتروني</label>

              <input
                type="email"
                className="form-control"
                value={editData.email}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    email: e.target.value,
                  })
                }
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 fw-semibold">رقم الهاتف</label>

              <input
                type="text"
                className="form-control"
                value={editData.phone}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    phone: e.target.value,
                  })
                }
              />
            </div>

            <button
              className="btn w-100 text-white fw-semibold"
              style={{
                background: "#ff7a1a",
                borderRadius: "12px",
                height: "48px",
              }}
              onClick={handleUpdate}
              disabled={actionLoading}
            >
              {actionLoading ? "جاري الحفظ..." : "حفظ التعديلات"}
            </button>
          </div>
        </div>
      )}

      {/* ========================= */}
      {/* Delete Modal */}
      {/* ========================= */}
      {showDeleteModal && (
        <div className="custom-modal-overlay">
          <div className="custom-modal text-center">
            <div
              className="mx-auto mb-4 d-flex align-items-center justify-content-center"
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                background: "#fee2e2",
              }}
            >
              <FaTrash size={24} color="#dc2626" />
            </div>

            <h5 className="fw-bold mb-2">حذف العميل</h5>

            <p className="text-muted mb-4">هل أنت متأكد من حذف هذا العميل؟</p>

            <div className="d-flex gap-3">
              <button
                className="btn btn-light border w-50"
                onClick={() => setShowDeleteModal(false)}
              >
                إلغاء
              </button>

              <button
                className="btn btn-danger w-50"
                onClick={handleDelete}
                disabled={actionLoading}
              >
                {actionLoading ? "جاري الحذف..." : "حذف"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================= */}
      {/* Toast */}
      {/* ========================= */}
      {toast.show && (
        <div
          className="position-fixed top-0 start-0 p-4"
          style={{
            zIndex: 999999,
          }}
        >
          <div
            className={`alert ${
              toast.type === "success" ? "alert-success" : "alert-danger"
            } shadow`}
            style={{
              minWidth: "280px",
              borderRadius: "14px",
            }}
          >
            {toast.message}
          </div>
        </div>
      )}

      {/* ========================= */}
      {/* Styles */}
      {/* ========================= */}
      <style>{`
        .customers-page .table th {
          font-size: 14px;
          color: #6b7280;
          font-weight: 600;
          border-bottom: 1px solid #f1f5f9;
          white-space: nowrap;
        }

        .customers-page .table td {
          vertical-align: middle;
          border-bottom: 1px solid #f1f5f9;
          font-size: 14px;
          color: #111827;
        }

        .customer-row:hover {
          background: #fafafa;
        }

        .custom-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 99999;
          padding: 20px;
        }

        .custom-modal {
          width: 100%;
          max-width: 500px;
          background: #fff;
          border-radius: 24px;
          padding: 24px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          .customers-page {
            padding: 16px !important;
          }

          .custom-modal {
            padding: 20px;
          }

          .table {
            min-width: 900px;
          }
        }
      `}</style>
    </div>
  );
};

export default Customers;
