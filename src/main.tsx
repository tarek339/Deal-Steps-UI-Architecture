import axios from "axios";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import App from "./App.tsx";

import "./index.css";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_SERVER_URL ?? "";

axios.interceptors.request.use((request) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    request.headers.Authorization = token;
  }

  return request;
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
