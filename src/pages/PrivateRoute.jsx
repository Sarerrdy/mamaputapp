import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCreateData } from "../hooks/useApi";

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

  if (isLogin === null) {
    return <div>Loading...</div>;
  }

  return isLogin ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;

//   async function loginWithToken(data, endpoint) {
//     if (auth.token !== "") {
//       const res = await auth.fetchAction(data, endpoint);
//       if (res == true) navigate("/");
//     }
//   }
//   loginWithToken({ token: auth.token }, "token");
// }, []);
