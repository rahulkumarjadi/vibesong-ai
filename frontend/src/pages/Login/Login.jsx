// import { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { authApi } from "../../api/authApi";
// import { useAuthStore } from "../../store/authStore";
// import LoginForm from "./LoginForm";
// import GoogleButton from "./GoogleButton";
// import "./login.css";

// export default function Login() {
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState(null);
//   const setTokens = useAuthStore((s) => s.setTokens);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const redirectTo = location.state?.from?.pathname || "/";

//   const handleLogin = async ({ email, password }) => {
//     setSubmitting(true);
//     setError(null);
//     try {
//       const { data } = await authApi.login({ email, password });
//       setTokens(data.access_token, data.refresh_token);
//       navigate(redirectTo, { replace: true });
//     } catch (err) {
//       setError(err.response?.data?.detail || "Invalid email or password");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleGoogleCredential = async (idToken) => {
//     setSubmitting(true);
//     setError(null);
//     try {
//       const { data } = await authApi.loginWithGoogle(idToken);
//       setTokens(data.access_token, data.refresh_token);
//       navigate(redirectTo, { replace: true });
//     } catch (err) {
//       setError("Google sign-in failed");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="auth-page">
//       <div className="auth-card">
//         <h1>Welcome back to VibeSong</h1>
//         <LoginForm onSubmit={handleLogin} submitting={submitting} error={error} />
//         <div className="auth-divider">or</div>
//         <GoogleButton onCredential={handleGoogleCredential} />
//         <p className="auth-footer">
//           <Link to="/forgot-password">Forgot password?</Link>
//         </p>
//         <p className="auth-footer">
//           Don&apos;t have an account? <Link to="/register">Sign up</Link>
//         </p>
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authApi } from "../../api/authApi";
import { useAuthStore } from "../../store/authStore";
import LoginForm from "./LoginForm";
import GoogleButton from "./GoogleButton";
import "./login.css";

export default function Login() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const setTokens = useAuthStore((state) => state.setTokens);

  const navigate = useNavigate();
  const location = useLocation();

  // If the user was redirected here from a protected page,
  // go back there after login. Otherwise go to /home.
  const redirectTo = location.state?.from?.pathname || "/home";

  const handleLogin = async ({ email, password }) => {
    setSubmitting(true);
    setError(null);

    try {
      const { data } = await authApi.login({
        email,
        password,
      });

      // Save JWT tokens
      setTokens(data.access_token, data.refresh_token);

      // Redirect to Home
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.response?.data?.detail || "Invalid email or password");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleCredential = async (idToken) => {
    setSubmitting(true);
    setError(null);

    try {
      const { data } = await authApi.loginWithGoogle(idToken);

      setTokens(data.access_token, data.refresh_token);

      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError("Google sign-in failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Welcome back to VibeSong</h1>

        <LoginForm
          onSubmit={handleLogin}
          submitting={submitting}
          error={error}
        />

        <div className="auth-divider">or</div>

        <GoogleButton onCredential={handleGoogleCredential} />

        <p className="auth-footer">
          <Link to="/forgot-password">Forgot password?</Link>
        </p>

        <p className="auth-footer">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
