// import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

const Checkout = () => {
  const auth = useAuth();
  console.log("auth setUser", auth);
  return (
    <div className="container align-content-center mx-auto py-5 min-vh-100 h-100">
      <div className="text-white text-6xl">
        <h1>Welcome! {auth.user.first_name + " " + auth.user.last_name}</h1>
        <h2>Please proceed to checkout..</h2>
      </div>
    </div>
  );
};

export default Checkout;
