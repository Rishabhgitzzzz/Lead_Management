import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token } = useAuth(); // reads from context
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
