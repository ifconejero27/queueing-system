import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, department }) {
  const isLoggedIn = localStorage.getItem("employeeLoggedIn");
  const employeeDepartment = localStorage.getItem("employeeDepartment");

  if (!isLoggedIn) {
    return <Navigate to="/employee/login" replace />;
  }

  if (employeeDepartment !== department) {
    return <Navigate to="/employee/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
