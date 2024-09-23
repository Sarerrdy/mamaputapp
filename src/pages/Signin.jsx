// // import React from "react";
// import Login from "../features/Login";

// function Signin() {
//   return (
//     <div className="container mx-auto py-5 min-vh-100 h-100">
//       <div className="text-white text-6xl">Sign-in</div>
//       <Login />
//     </div>
//   );
// }

// export default Signin;

import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const auth = useAuth();
  const handleSubmitEvent = (e) => {
    e.preventDefault();
    if (input.email !== "" && input.password !== "") {
      auth.loginAction(input);
      return;
    }
    alert("pleae provide a valid input");
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className=" container text-4xl">
      <form onSubmit={handleSubmitEvent}>
        <div className="form-control">
          <label htmlFor="user-email">Email:</label>
          <input
            className="form-control"
            type="email"
            id="user-email"
            name="email"
            placeholder="   example@yahoo.com"
            aria-describedby="user-email"
            aria-invalid="false"
            onChange={handleInput}
          />
          <div id="user-email" className="sr-only">
            Please enter a valid email. It must contain at least 6 characters.
          </div>
        </div>
        <div className="form-control">
          <label htmlFor="password">Password:</label>
          <input
            className="form-control"
            type="password"
            id="password"
            name="password"
            aria-describedby="user-password"
            aria-invalid="false"
            onChange={handleInput}
          />
          <div id="user-password" className="sr-only">
            your password should be more than 6 character
          </div>
        </div>
        <button className="input-group btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Login;
