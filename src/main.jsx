import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../src/routes/App";
import Home from "../src/routes/Home";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/generate"
          element={<App key={window.location.pathname} />}
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
