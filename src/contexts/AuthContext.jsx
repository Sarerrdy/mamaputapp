import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFetchData } from "../hooks/useApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  //user
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("site_user")) || ""
  );
  // addresses object
  const [addresses, setAddresses] = useState(null);

  //fetch addresses

  //token
  const [token, setToken] = useState(localStorage.getItem("site_token") || "");
  const [address, setAddress] = useState(
    localStorage.getItem("site_address") || ""
  );

  //others
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
    // localStorage.removeItem("site_full_address");
    setIsAuthenticated(false);
    navigate("/signin");
  };

  ///Toast

  const notifyOrderSuccessful = (results) =>
    toast.success(`${results}`, {
      position: "top-center",
      autoClose: 2000,
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
      autoClose: 2000,
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
        addresses,
        setAddresses,
        address,
        setAddress,
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

export const useAuth = () => {
  return useContext(AuthContext);
};

// export default AuthProvider;
