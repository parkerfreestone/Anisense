import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RootRoute } from "./routes/RootRoute";
import { ErrorRoute } from "./routes/wildcard/ErrorRoute";
import { DiscoverRoute } from "./routes/DiscoverRoute";
import { LoginRoute } from "./routes/auth/LoginRoute";
import { Register } from "./routes/auth/RegisterRoute";
import { ForgotPasswordRoute } from "./routes/auth/ForgotPasswordRoute";
import { ResetPasswordRoute } from "./routes/auth/ResetPasswordRoute";
import { HomeRoute } from "./routes/HomeRoute";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthenticationContext";
import { ProfileRoute } from "./routes/profile/ProfileRoute";
import { VerifyEmail } from "./routes/auth/VerifyEmail";
import { MaintenanceRoute } from "./routes/wildcard/MaintenanceRoute";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRoute />,
    errorElement: <ErrorRoute />,
    children: [
      {
        index: true,
        path: "/",
        element: <HomeRoute />,
      },
      {
        path: "/maintenance",
        element: <MaintenanceRoute />,
      },
      {
        path: "/discover",
        element: <DiscoverRoute />,
      },
      {
        path: "/profile",
        element: <ProfileRoute />,
      },
      {
        path: "/auth",
        children: [
          {
            path: "login",
            element: <LoginRoute />,
          },
          {
            path: "register",
            element: <Register />,
          },
          {
            path: "forgot-password",
            element: <ForgotPasswordRoute />,
          },
          {
            path: "password-reset/:token",
            element: <ResetPasswordRoute />,
          },
          {
            path: "verify-email",
            element: <VerifyEmail />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </AuthProvider>
  // </React.StrictMode>
);
