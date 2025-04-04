
import { ReactNode, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: "patient" | "caregiver" | "healthcare";
}

export const ProtectedRoute = ({ 
  children, 
  requiredRole 
}: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Only redirect after auth has been checked (not during loading)
    if (!loading) {
      if (!user) {
        // Redirect to login if not authenticated
        navigate("/login", { 
          state: { from: location.pathname } 
        });
      } else if (requiredRole && user.role !== requiredRole) {
        // Redirect to dashboard if role doesn't match (user is still authenticated)
        navigate("/dashboard");
      }
    }
  }, [user, loading, navigate, location.pathname, requiredRole]);

  // Show nothing while loading or redirecting
  if (loading || !user) {
    return null;
  }

  // If role is required and user doesn't have it, show nothing (redirect happens in useEffect)
  if (requiredRole && user.role !== requiredRole) {
    return null;
  }

  // User is authenticated and has required role (if specified)
  return <>{children}</>;
};
