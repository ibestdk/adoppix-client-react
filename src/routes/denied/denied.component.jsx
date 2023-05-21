import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token === null) {
      navigate("/login");
    }
  }, [navigate, token]);

  if (token === null) {
    navigate("/login");
    return null; // Render nothing while redirecting
  }

  return children;
};