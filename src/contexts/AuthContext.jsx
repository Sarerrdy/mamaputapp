import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFetchData } from "../hooks/useApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("site_user")) || ""
  );
  const [token, setToken] = useState(localStorage.getItem("site_token") || "");
  const [role, setRole] = useState(
    JSON.parse(localStorage.getItem("site_role")) || []
  );
  const [address, setAddresses] = useState(
    localStorage.getItem("site_address") || ""
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(
    JSON.parse(localStorage.getItem("site_isAdmin")) || false
  );
  const [returnUrl, setReturnUrl] = useState("/");

  const navigate = useNavigate();

  const logOut = () => {
    setUser("");
    setToken("");
    localStorage.removeItem("site_token");
    localStorage.removeItem("site_user");
    localStorage.removeItem("site_role");
    localStorage.removeItem("site_address");
    localStorage.removeItem("site_isAdmin");
    setIsAuthenticated(false);
    navigate("/signin");
  };

  const notifyOrderSuccessful = (results) =>
    toast.success(`${results}`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      style: {
        backgroundColor: "#05b858",
        color: "#ffffff",
      },
    });

  const notifyOrderFailure = (results) =>
    toast.error(`${results}`, {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      style: {
        backgroundColor: "#b9220e",
        color: "#fff",
      },
    });

  const { data: userAddressesData } = useFetchData(
    `addresses?user_id=${user.user_id}`
  );

  useEffect(() => {
    let addressesArr = [];
    if (Array.isArray(userAddressesData)) {
      addressesArr = userAddressesData;
    } else if (typeof userAddressesData === "object") {
      addressesArr = [userAddressesData];
    }
    setAddresses(addressesArr);
  }, [userAddressesData]);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
        role,
        setRole,
        isAdmin,
        setIsAdmin,
        address,
        setAddresses,
        logOut,
        isAuthenticated,
        setIsAuthenticated,
        returnUrl,
        setReturnUrl,
        notifyOrderSuccessful,
        notifyOrderFailure,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
