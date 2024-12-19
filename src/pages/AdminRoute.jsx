import { useState, useEffect, useRef } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";
import { Spinner } from "react-bootstrap";
import { useCreateData } from "../hooks/useApi";

const AdminRoute = () => {
  const [isLoading, setIsLoading] = useState(true);
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const createOrderMutation = useCreateData("token");
  const previousLocation = location.state?.from || "/";
  const notificationRef = useRef(false);
  const authCheckRef = useRef(false);

  useEffect(() => {
    const checkAuthAndAdminStatus = async () => {
      console.log("BEFORE AUTHCHECKREF");

      if (authCheckRef.current) return;
      authCheckRef.current = true;

      // const storedToken = localStorage.getItem("site_token");
      // const storedRole = localStorage.getItem("site_role");
      const storedToken = auth.token;
      console.log("Token: ", storedToken);
      if (auth.role) console.log("RoleAdminPg: ", auth.role.role_name);

      if (!storedToken) {
        navigate("/signin");
        return;
      }

      try {
        const response = await createOrderMutation.mutateAsync({
          token: storedToken,
        });
        auth.setIsAuthenticated(response);
        console.log("Authentication Response:", response);

        if (response) {
          if (auth.role && auth.role.role_name === "Admin") {
            auth.setIsAdmin(true);
            // localStorage.setItem("site_returUrl", "/admin");
            auth.setReturnUrl("/admin");
            console.log("User is Admin, navigating to /admin");
            navigate("/admin");
          } else {
            if (!notificationRef.current) {
              auth.notifyOrderFailure("Access denied: Admins only.");
              notificationRef.current = true;
              setTimeout(() => {
                console.log(
                  "Not an Admin, navigating to previous location:",
                  previousLocation
                );
                navigate(previousLocation);
              }, 2000);
            }
            auth.setIsAdmin(false);
          }
        } else {
          if (!notificationRef.current) {
            auth.notifyOrderFailure("Authentication failed. Please sign in.");
            notificationRef.current = true;
            // localStorage.setItem("site_returUrl", previousLocation);
            auth.setReturnUrl(previousLocation);
            setTimeout(() => {
              console.log("Authentication failed, navigating to /signin");
              navigate("/signin");
            }, 2000);
          }
        }
      } catch (error) {
        if (!notificationRef.current) {
          auth.notifyOrderFailure("Authentication failed. Please try again.");
          notificationRef.current = true;
          //   localStorage.setItem("site_returUrl", previousLocation);
          auth.setReturnUrl(previousLocation);
          setTimeout(() => {
            console.log(
              "Catch Block: Authentication failed, navigating to /signin"
            );
            navigate("/signin");
          }, 2000);
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthAndAdminStatus();
  }, [auth, createOrderMutation, navigate, previousLocation]); // Dependencies

  return (
    <>
      <ToastContainer />
      {isLoading ? (
        <div className="flex flex-row text-white justify-center h-screen p-24">
          <div className="flex-row">
            Attempting to authenticate, please wait...
          </div>
          <br />
          <Spinner className="flex-row w-24 h-24" />
        </div>
      ) : (
        <>
          {console.log("Rendering Outlet, isAdmin:", auth.isAdmin)}
          {/* {auth.isAdmin && navigate("/admin")} */}
          {auth.isAdmin && <Outlet />}
        </>
      )}
    </>
  );
};

export default AdminRoute;
