import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("site_user")) || ""
  );
  const [token, setToken] = useState(localStorage.getItem("site_token") || "");
  const [address, setAddress] = useState(
    localStorage.getItem("site_address") || ""
  );
  const [addressId, setAddressId] = useState(
    localStorage.getItem("site_address_id") || 0
  );
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [returnUrl, setReturnUrl] = useState("");

  const logOut = () => {
    setUser("");
    setToken("");
    localStorage.removeItem("site_token");
    localStorage.removeItem("site_user");
    localStorage.removeItem("site_address");
    localStorage.removeItem("site_address_id");
    setIsAuthenticated(false);
    navigate("/signin");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
        address,
        setAddress,
        addressId,
        setAddressId,
        logOut,
        isAuthenticated,
        setIsAuthenticated,
        returnUrl,
        setReturnUrl,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

// export default AuthProvider;
