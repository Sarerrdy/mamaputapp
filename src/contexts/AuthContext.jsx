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
  const loginAction = async (data) => {
    try {
      const response = await fetch("http://127.0.0.1:5001/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();

      let authToken = res[0];
      let authUser = res[1];
      let authAdress =
        res[2]["address"] +
        ", " +
        res[2]["landmark"] +
        ", " +
        res[2]["town"] +
        ", " +
        res[2]["lga"] +
        ", " +
        res[2]["state"];

      console.log("Address authContext", authAdress);

      if (authUser) {
        setUser(authUser);
        setToken(authToken);
        setAddress(authAdress);
        localStorage.setItem("site_user", JSON.stringify(authUser));
        localStorage.setItem("site_address", JSON.stringify(authAdress));
        localStorage.setItem("site_token", authToken);
        navigate("/");
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = () => {
    setUser("");
    setToken("");
    localStorage.removeItem("site_token");
    localStorage.removeItem("site_user");
    localStorage.removeItem("site_address");
    navigate("/signin");
  };

  return (
    <AuthContext.Provider value={{ token, user, address, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

// export default AuthProvider;
