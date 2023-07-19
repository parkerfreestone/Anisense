import { ReactNode, useEffect } from "react";
import useAuthContext from "../context/AuthenticationContext";
import { useNavigate } from "react-router-dom";
import { VerifyEmail } from "../routes/auth/VerifyEmail";

interface RequireEmailVerificationProps {
  children: ReactNode;
}

export const RequireAuthenticationLayout = ({
  children,
}: RequireEmailVerificationProps) => {
  const { user, isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !isAuthenticated) {
      navigate("/auth/login");
    }
  }, [user, isAuthenticated]);

  return <>{children}</>;
};
