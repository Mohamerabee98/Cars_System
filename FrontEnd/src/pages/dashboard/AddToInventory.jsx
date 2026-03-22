import { useState } from "react";
import axios from "axios";
import { uploadImages } from "../../utils/uploade";

export default function AddToInventory() {

  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);


  const [formData, setFormData] = useState({
    company: "",
    color: "",
    price: "",
    status: "",
    stock: "",
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

  // ================= handle images =================
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages(files);

    const previewUrls = files.map(file => URL.createObjectURL(file));
    setPreview(previewUrls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const urls = await uploadImages(images);

      const payload = {
        company: formData.company.trim(),
        color: formData.color.trim(),
        price: Number(formData.price),
        status: formData.status,
        stock: Number(formData.stock),
        image: urls
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
    });
    setImages([]);
    setPreview([]);

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
            <input
              type="file"
              multiple
              onChange={handleImageChange}
            />

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {preview.map((img, i) => (
                <img key={i} src={img} width="80" />
              ))}
            </div>
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