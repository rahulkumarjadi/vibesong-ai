// // import { Routes, Route } from 'react-router-dom'
// // import Home from '../pages/Home.jsx'
// // import Results from '../pages/Results.jsx'
// // import About from '../pages/About.jsx'
// // import NotFound from '../pages/NotFound.jsx'
// // import Login from "../pages/Login/Login";
// // import Register from "../pages/Register/Register";

// // export default function AppRoutes() {
// //   return (
// //     <Routes>
// //       <Route path="/" element={<Home />} />
// //       <Route path="/results" element={<Results />} />
// //       <Route path="/about" element={<About />} />
// //       <Route path="*" element={<NotFound />} />
// //     </Routes>
// //   )
// // }


// // import { Routes, Route } from "react-router-dom";

// // import Home from "../pages/Home";
// // import Results from "../pages/Results";
// // import About from "../pages/About";
// // import Login from "../pages/Login/Login";
// // import Register from "../pages/Register/Register";
// // import NotFound from "../pages/NotFound";

// // export default function AppRoutes() {
// //   return (
// //     <Routes>
// //       <Route path="/" element={<Home />} />
// //       <Route path="/results" element={<Results />} />
// //       <Route path="/about" element={<About />} />

// //       <Route path="/login" element={<Login />} />
// //       <Route path="/register" element={<Register />} />

// //       <Route path="*" element={<NotFound />} />
// //     </Routes>
// //   );
// // }



// import { Routes, Route } from "react-router-dom";

// import Home from "../pages/Home";
// import Results from "../pages/Results";
// import About from "../pages/About";
// import Login from "../pages/Login/Login";
// import Register from "../pages/Register/Register";
// import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
// import ResetPassword from "../pages/ResetPassword/ResetPassword";
// import NotFound from "../pages/NotFound";

// export default function AppRoutes() {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/results" element={<Results />} />
//       <Route path="/about" element={<About />} />

//       {/* Authentication */}
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/forgot-password" element={<ForgotPassword />} />
//       <Route path="/reset-password" element={<ResetPassword />} />

//       {/* 404 */}
//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// }


// import { Routes, Route, Navigate } from "react-router-dom";

// import Home from "../pages/Home";
// import Results from "../pages/Results";
// import About from "../pages/About";
// import Login from "../pages/Login/Login";
// import Register from "../pages/Register/Register";
// import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
// import ResetPassword from "../pages/ResetPassword/ResetPassword";
// import NotFound from "../pages/NotFound";

// import ProtectedRoute from "../components/ProtectedRoute";
// import { useAuthStore } from "../store/authStore";

// export default function AppRoutes() {
//   const accessToken = useAuthStore((state) => state.accessToken);

//   return (
//     <Routes>
//       {/* Default route */}
//       <Route
//         path="/"
//         element={
//           accessToken ? (
//             <ProtectedRoute>
//               <Home />
//             </ProtectedRoute>
//           ) : (
//             <Navigate to="/login" replace />
//           )
//         }
//       />

//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/forgot-password" element={<ForgotPassword />} />
//       <Route path="/reset-password" element={<ResetPassword />} />

//       <Route
//         path="/results"
//         element={
//           <ProtectedRoute>
//             <Results />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/about"
//         element={
//           <ProtectedRoute>
//             <About />
//           </ProtectedRoute>
//         }
//       />

//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// }




// import { Routes, Route, Navigate } from "react-router-dom";

// import Home from "../pages/Home";
// import Results from "../pages/Results";
// import About from "../pages/About";
// import Login from "../pages/Login/Login";
// import Register from "../pages/Register/Register";
// import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
// import ResetPassword from "../pages/ResetPassword/ResetPassword";
// import NotFound from "../pages/NotFound";

// import ProtectedRoute from "../components/ProtectedRoute";
// import { useAuthStore } from "../store/authStore";

// export default function AppRoutes() {
//   const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

//   return (
//     <Routes>
//       {/* Default route */}
//       <Route
//         path="/"
//         element={
//           isAuthenticated ? <Home /> : <Navigate to="/login" replace />
//         }
//       />

//       {/* Protected pages */}
//       <Route
//         path="/results"
//         element={
//           <ProtectedRoute>
//             <Results />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/about"
//         element={
//           <ProtectedRoute>
//             <About />
//           </ProtectedRoute>
//         }
//       />

//       {/* Public pages */}
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/forgot-password" element={<ForgotPassword />} />
//       <Route path="/reset-password" element={<ResetPassword />} />

//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// }



import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Results from "../pages/Results";
import About from "../pages/About";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Default page */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Protected routes */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/results"
        element={
          <ProtectedRoute>
            <Results />
          </ProtectedRoute>
        }
      />

      <Route
        path="/about"
        element={
          <ProtectedRoute>
            <About />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}