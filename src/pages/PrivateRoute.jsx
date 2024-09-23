import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = () => {
  const user = useAuth();
  console.log("Private Route token", user.token);

  if (!user.token) return <Navigate to="/signin" />;
  return <Outlet />;
};

export default PrivateRoute;
