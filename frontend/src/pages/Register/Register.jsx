// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { authApi } from "../../api/authApi";
// import { useAuthStore } from "../../store/authStore";
// import RegisterForm from "./RegisterForm";
// import "./register.css";

// export default function Register() {
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState(null);
//   // const setTokens = useAuthStore((s) => s.setTokens);
//   // const navigate = useNavigate();
//   await authApi.register(payload);

//   // Registration successful.
//   // Redirect user to login.
//   navigate("/login");

//   const handleRegister = async (payload) => {
//     setSubmitting(true);
//     setError(null);
//     try {
//       const { data } = await authApi.register(payload);
//       setTokens(data.access_token, data.refresh_token);
//       navigate("/", { replace: true });
//     } catch (err) {
//       setError(err.response?.data?.detail || "Could not create account");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="auth-page">
//       <div className="auth-card">
//         <h1>Create your VibeSong account</h1>
//         <RegisterForm onSubmit={handleRegister} submitting={submitting} error={error} />
//         <p className="auth-footer">
//           Already have an account? <Link to="/login">Sign in</Link>
//         </p>
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../../api/authApi";
import RegisterForm from "./RegisterForm";
import "./register.css";

export default function Register() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (payload) => {
    setSubmitting(true);
    setError("");

    try {
      await authApi.register(payload);

      // Registration successful → go to Login page
      navigate("/login");
    } catch (err) {
      const detail = err.response?.data?.detail;

      if (Array.isArray(detail)) {
        setError(detail.map((e) => e.msg).join(", "));
      } else {
        setError(detail || "Could not create account");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Create your VibeSong account</h1>

        <RegisterForm
          onSubmit={handleRegister}
          submitting={submitting}
          error={error}
        />

        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
