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
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // fetch function
  async function fetchAction(data, endpoint) {
    const response = await fetch("http://127.0.0.1:5001/api/" + endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const jsonResult = await response.json();
    console.log("AUTH-JSON-RESPONSE", jsonResult);
    return jsonResult;
  }

  const logOut = () => {
    setUser("");
    setToken("");
    localStorage.removeItem("site_token");
    localStorage.removeItem("site_user");
    localStorage.removeItem("site_address");
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
        fetchAction,
        logOut,
        isAuthenticated,
        setIsAuthenticated,
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
