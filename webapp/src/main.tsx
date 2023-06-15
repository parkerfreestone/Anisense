import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RootRoute } from "./routes/RootRoute";
import { ErrorRoute } from "./routes/wildcard/ErrorRoute";
import { DiscoverRoute } from "./routes/DiscoverRoute";
import axios from "axios";

axios.interceptors.request.use(
  async (config) => {
    if (config.method === "post") {
      await axios.get("/api/sanctum/csrf-cookie");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRoute />,
    errorElement: <ErrorRoute />,
    children: [
      {
        path: "/discover",
        element: <DiscoverRoute />,
      },
      {
        path: "/profile",
        element: <h1>Profile Page</h1>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
