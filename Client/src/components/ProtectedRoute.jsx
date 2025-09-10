import { Navigate } from "react-router-dom";
import { getToken, getRole } from "../utils/auth";

const ProtectedRoute = ({ children, allow }) => {
  const token = getToken();
  const role = getRole();
  if (!token) return <Navigate to="/login" replace />;

  if (allow && !allow.includes(role)) return <Navigate to={`/${role}-dashboard`} replace />;

  return children;
};

export default ProtectedRoute;
