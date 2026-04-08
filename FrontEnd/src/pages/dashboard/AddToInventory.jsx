import { useState } from "react";
import axios from "axios";

export default function AddToInventory() {
  const [formData, setFormData] = useState({
    company: "",
    color: "",
    price: "",
    status: "",
    stock: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        company: formData.company.trim(),
        color: formData.color.trim(),
        price: Number(formData.price),
        status: formData.status,
        stock: Number(formData.stock),
        image: formData.imageUrl
          .split(",")
          .map((url) => url.trim())
          .filter(Boolean),
      };

      console.log("Payload:", payload);

      const response = await axios.post(
        "http://localhost:3000/api/cars",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      

      console.log("Car saved:", response.data);

      setFormData({
        company: "",
        color: "",
        price: "",
        status: "",
        stock: "",
        imageUrl: "",
      });

      alert("تم حفظ السيارة بنجاح");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "حصل خطأ أثناء حفظ السيارة"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      company: "",
      color: "",
      price: "",
      status: "",
      stock: "",
      imageUrl: "",
    });
  };

  return (
    <form className="add-inventory-page" onSubmit={handleSubmit}>
      <div className="inventory-card">
        <h3 className="inventory-card__title">بيانات أساسية</h3>

        <div className="inventory-grid">
          <div className="inventory-field">
            <label>ماركة السيارة</label>
            <input
              type="text"
              name="company"
              placeholder="مثلاً: BMW"
              value={formData.company}
              onChange={handleChange}
              required
            />
          </div>

          <div className="inventory-field">
            <label>السعر المطلوب</label>
            <input
              type="number"
              name="price"
              placeholder="0.00"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="inventory-field">
            <label>اللون</label>
            <input
              type="text"
              name="color"
              placeholder="مثلاً: أبيض"
              value={formData.color}
              onChange={handleChange}
              required
            />
          </div>

          <div className="inventory-field">
            <label>الحالة</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="">اختر الحالة</option>
              <option value="جديد">جديد</option>
              <option value="مستعمل">مستعمل</option>
            </select>
          </div>

          <div className="inventory-field">
            <label>الكمية في المخزون</label>
            <input
              type="number"
              name="stock"
              placeholder="مثلاً: 3"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </div>

          <div className="inventory-field">
            <label>روابط الصور</label>
            <textarea
              name="imageUrl"
              placeholder="حط لينك صورة أو أكتر، وافصل بينهم بفاصلة"
              value={formData.imageUrl}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>
        </div>
      </div>

      <div className="inventory-actions">
        <button type="submit" className="save-btn" disabled={loading}>
          {loading ? "جارٍ الحفظ..." : "حفظ تفاصيل السيارة"}
        </button>

        <button
          type="button"
          className="cancel-btn"
          onClick={handleCancel}
          disabled={loading}
        >
          إلغاء
        </button>
      </div>
    </form>
  );
}