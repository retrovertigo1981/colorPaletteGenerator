import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../src/routes/App";
import Home from "../src/pages/Home.jsx";
import Dashboard from "../src/features/dashboard/pages/Dashboard.jsx";
import About from "../src/pages/About.jsx";
import Login from "../src/features/auth/pages/Login.jsx";
import Register from "../src/features/auth/pages/Register.jsx";
import { AuthProvider } from "../src/features/auth/context/AuthContext.jsx";
import { ProtectedRoute } from "./utils/ProtectedRoute.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/generate/:palette?" element={<App />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
