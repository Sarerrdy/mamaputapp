import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCreateData } from "../hooks/useApi";
import { Spinner } from "react-bootstrap";

const PrivateRoute = () => {
  const [isLogin, setIsLogin] = useState(null);
  const createOrderMutation = useCreateData("token");
  const auth = useAuth();

  useEffect(() => {
    // check a login check
    const checkLoginStatus = async () => {
      try {
        auth.setReturnUrl(window.location.pathname);
        const response = await createOrderMutation.mutateAsync({
          token: auth.token,
        });
        setIsLogin(response);
        auth.setIsAuthenticated(true);
      } catch (error) {
        setIsLogin(false);
      }
    };
    checkLoginStatus();
  }, []);

  // if (isLogin === null) {
  //   return <div>Loading...</div>;
  // }

  if (isLogin === null)
    return (
      <div className="flex flex-row text-white justify-center h-screen p-24">
        <div className="flex-row">Attempting to signin, please wait...</div>
        <br />
        <Spinner className="w-24 h-24" />
      </div>
    );

  return isLogin ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
