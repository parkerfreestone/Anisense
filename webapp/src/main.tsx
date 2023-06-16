import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RootRoute } from "./routes/RootRoute";
import { ErrorRoute } from "./routes/wildcard/ErrorRoute";
import { DiscoverRoute } from "./routes/DiscoverRoute";
import { LoginRoute } from "./routes/auth/LoginRoute";
import { Register } from "./routes/auth/RegisterRoute";
import { AuthProvider } from "./context/AuthenticationContext";

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
      {
        path: "/auth",
        children: [
          {
            path: "login",
            element: <LoginRoute />,
          },
          {
            path: "Register",
            element: <Register />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
