import { ReactNode, useEffect } from "react";
import useAuthContext from "../context/AuthenticationContext";
import { useNavigate } from "react-router-dom";
import { VerifyEmail } from "../routes/auth/VerifyEmail";

interface RequireEmailVerificationProps {
  children: ReactNode;
}

export const RequireEmailVerificationLayout = ({
  children,
}: RequireEmailVerificationProps) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !user.email_verified_at) {
      navigate("/auth/verify-email");
    }
  }, [user]);

  if (user && !user.email_verified_at) {
    return <VerifyEmail />;
  }

  return <>{children}</>;
};
