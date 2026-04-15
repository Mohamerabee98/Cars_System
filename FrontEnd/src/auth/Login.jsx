
import "./authStyle.css";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

const LoginSchema = Yup.object({
  email: Yup.string()
    .required("البريد الإلكتروني مطلوب")
    .email("صيغة البريد غير صحيحة"),
  password: Yup.string()
    .required("كلمة المرور مطلوبة")
    .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
  remember: Yup.boolean(),
});

export default function Login() {

 const navigate = useNavigate();

const onSubmit = async (values) => {
  try {
    const payload = {
      email: values.email,
      password: values.password,
    };

    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "البريد الإلكتروني أو كلمة المرور غير صحيحة");
      return;
    }

    console.log("This IS Token: ", data.user.token);
    
    
    localStorage.setItem("token", data.user.token);

  
    localStorage.setItem("user", JSON.stringify(data.user));

    alert("تم تسجيل الدخول بنجاح!");
    navigate("/"); 
  } catch (err) {
    console.error(err);
    alert("حدث خطأ في السيرفر، حاول مرة أخرى");
  }
};

  return (
    <div className="login-page d-flex justify-content-center align-items-center">
      <div className="login-card text-center">
        <h3 className="login-title">تسجيل الدخول</h3>
        <p className="login-subtitle">
          أهلاً بك مجدداً! يرجى إدخال تفاصيل حسابك.
        </p>

        <Formik
          initialValues={{ email: "", password: "", remember: false }}
          validationSchema={LoginSchema}
          onSubmit={onSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form className="mt-4" onSubmit={handleSubmit} noValidate>
              <div className="mb-3 text-end">
                <label className="form-label">البريد الإلكتروني</label>
                <div className="input-group">
                  <input
                    type="email"
                    name="email"
                    className={`form-control custom-input ${
                      touched.email && errors.email ? "is-invalid" : ""
                    }`}
                    placeholder="admin@gmail.com"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>

                {touched.email && errors.email && (
                  <div className="invalid-feedback d-block">
                    {errors.email}
                  </div>
                )}
              </div>

              <div className="mb-3 text-end">
                <label className="form-label">كلمة المرور</label>
                <div className="input-group">
                  <input
                    type="password"
                    name="password"
                    className={`form-control custom-input ${
                      touched.password && errors.password ? "is-invalid" : ""
                    }`}
                    placeholder="********"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>

                {touched.password && errors.password && (
                  <div className="invalid-feedback d-block">
                    {errors.password}
                  </div>
                )}
              </div>

              <div className="d-flex justify-content-between align-items-center mb-4">
                <a href="#" className="forgot-password">
                  هل نسيت كلمة السر؟
                </a>
                <div>
                  <input
                    type="checkbox"
                    id="remember"
                    name="remember"
                    checked={values.remember}
                    onChange={handleChange}
                  />
                  <label htmlFor="remember" className="me-2">
                    تذكرني
                  </label>
                </div>
              </div>

              <button type="submit" className="btn login-btn w-100">
                تسجيل الدخول
              </button>
            </form>
          )}
        </Formik>

        <div className="mt-4">
          <span>ليس لدي حساب؟ </span>
          <Link to="/register" className="create-account">
            إنشاء حساب جديد
          </Link>
        </div>
      </div>
    </div>
  );
}