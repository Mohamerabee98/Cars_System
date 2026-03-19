
import "./authStyle.css";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

const RegisterSchema = Yup.object({
  name: Yup.string()
    .required("الاسم الكامل مطلوب")
    .min(3, "الاسم يجب أن يكون 3 أحرف على الأقل"),

  email: Yup.string()
    .required("البريد الإلكتروني مطلوب")
    .email("صيغة البريد غير صحيحة"),

  phone: Yup.string()
    .required("رقم الهاتف مطلوب")
    .matches(/^\d{11}$/, "رقم الهاتف يجب أن يكون 11 رقم"),

  national_id: Yup.string()
    .required("الرقم القومي مطلوب")
    .matches(/^\d{14}$/, "الرقم القومي يجب أن يكون 14 رقم"),

  password: Yup.string()
    .required("كلمة المرور مطلوبة")
    .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),

  confirmPassword: Yup.string()
    .required("تأكيد كلمة المرور مطلوب")
    .oneOf([Yup.ref("password")], "كلمة المرور غير متطابقة"),

  terms: Yup.boolean().oneOf([true], "يجب الموافقة على الشروط والأحكام"),
});

export default function Register() {
  const navigate = useNavigate();
  const onSubmit = async (values) => {
   
  const payload = {
  name: values.name,
  email: values.email,
  phone: values.phone,
  national_id: values.national_id,
  password: values.password,
  confirmPassword: values.confirmPassword,
  terms: values.terms,
};
    

    try {
      const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.message || "حدث خطأ أثناء التسجيل");
        return;
      }

      alert("تم إنشاء الحساب بنجاح!");
      navigate("/"); 
    } catch (err) {
      console.error(err);
      alert("حدث خطأ في السيرفر، حاول مرة أخرى");
    }
  };


  return (
    <div className="login-page d-flex justify-content-center align-items-center">
      <div className="login-card text-center">
        <div className="mb-1 fw-bold">AutoCRM</div>
        <h3 className="login-title">إنشاء حساب جديد</h3>

       
        <Formik
          initialValues={{
            name: "",
            email: "",
            phone: "",
            national_id: "",
            password: "",
            confirmPassword: "",
            terms: false,
          }}
          validationSchema={RegisterSchema}
          onSubmit={onSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <form className="mt-3" onSubmit={handleSubmit} noValidate>
              {/* الاسم */}
              <div className="mb-3 text-end">
                <label className="form-label">الاسم الكامل</label>
                <input
                  type="text"
                  name="name"
                  className={`form-control custom-input ${
                    touched.name && errors.name ? "is-invalid" : ""
                  }`}
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="ادخل اسمك بالكامل"
                />
                {touched.name && errors.name && (
                  <div className="invalid-feedback d-block">{errors.name}</div>
                )}
              </div>

              {/* البريد الإلكتروني */}
              <div className="mb-3 text-end">
                <label className="form-label">البريد الإلكتروني</label>
                <input
                  type="email"
                  name="email"
                  className={`form-control custom-input ${
                    touched.email && errors.email ? "is-invalid" : ""
                  }`}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="ziademad@gmail.com"
                />
                {touched.email && errors.email && (
                  <div className="invalid-feedback d-block">{errors.email}</div>
                )}
              </div>

              {/* الهاتف */}
              <div className="mb-3 text-end">
                <label className="form-label">رقم الهاتف</label>
                <input
                  type="text"
                  name="phone"
                  className={`form-control custom-input ${
                    touched.phone && errors.phone ? "is-invalid" : ""
                  }`}
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="01012345678"
                />
                {touched.phone && errors.phone && (
                  <div className="invalid-feedback d-block">{errors.phone}</div>
                )}
              </div>

              {/* الرقم القومي */}
              <div className="mb-3 text-end">
                <label className="form-label">الرقم القومي</label>
                <input
                  type="text"
                  name="national_id"
                  className={`form-control custom-input ${
                    touched.national_id && errors.national_id ? "is-invalid" : ""
                  }`}
                  value={values.national_id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="30232010111233"
                />
                {touched.national_id && errors.national_id && (
                  <div className="invalid-feedback d-block">{errors.national_id}</div>
                )}
              </div>

              {/* كلمة المرور */}
              <div className="mb-3 text-end">
                <label className="form-label">كلمة المرور</label>
                <input
                  type="password"
                  name="password"
                  className={`form-control custom-input ${
                    touched.password && errors.password ? "is-invalid" : ""
                  }`}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="********"
                />
                {touched.password && errors.password && (
                  <div className="invalid-feedback d-block">{errors.password}</div>
                )}
              </div>

              {/* تأكيد كلمة المرور */}
              <div className="mb-3 text-end">
                <label className="form-label">تأكيد كلمة المرور</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className={`form-control custom-input ${
                    touched.confirmPassword && errors.confirmPassword ? "is-invalid" : ""
                  }`}
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="********"
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <div className="invalid-feedback d-block">{errors.confirmPassword}</div>
                )}
              </div>

              {/* الشروط */}
              <div className="d-flex justify-content-end align-items-center mb-4">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  checked={values.terms}
                  onChange={handleChange}
                />
                <label htmlFor="terms" className="me-2">
                  أوافق على{" "}
                  <span className="create-account">
                    الشروط والأحكام وسياسة الخصوصية
                  </span>
                </label>
              </div>
              {touched.terms && errors.terms && (
                <div className="text-danger mb-3">{errors.terms}</div>
              )}

              <button type="submit" className="btn login-btn w-100">
                إنشاء حساب
              </button>
            </form>
          )}
        </Formik>

        <div className="mt-4">
          <span>لديك حساب بالفعل؟ </span>
          <Link to="/login" className="create-account">
            تسجيل الدخول
          </Link>
        </div>
      </div>
    </div>
  );
}
