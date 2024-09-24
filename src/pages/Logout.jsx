// import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

const Logout = () => {
  const auth = useAuth();
  return (
    <div className="container align-content-center mx-auto py-5 min-vh-100 h-100">
      <div className="text-white text-6xl">
        <h1>Hi! {auth.user.first_name + " " + auth.user.last_name}</h1>
        <h3>
          Do you wanna go? Click below to logout.. Hope to have you again you
          soon!!!1
        </h3>
        <button
          className="btn btn-primary btn-submit"
          onClick={() => auth.logOut()}
        >
          logout
        </button>
      </div>
    </div>
  );
};

export default Logout;
