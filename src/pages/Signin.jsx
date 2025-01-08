import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCreateData } from "../hooks/useApi";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const auth = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const createOrderMutation = useCreateData("login");

  const onSubmit = async (data) => {
    try {
      await createOrderMutation.mutateAsync(
        {
          user: data,
        },
        {
          onSuccess(data) {
            auth.notifyOrderSuccessful(
              `Signin of ${data["email"]} was successful`
            );
            initializer(data);
          },
          onError: (error) => {
            auth.notifyOrderFailure(`Sign-in operation failed!!: ${error}`);
          },
        }
      );
    } catch (error) {
      auth.notifyOrderFailure(`Sign-in operation failed!!: ${error}`);
    }
  };

  const initializer = (res) => {
    try {
      let authToken = res[0];
      let authUser = res[1];
      let authRole = res[3];

      if (authUser) {
        auth.setUser(authUser);
        auth.setToken(authToken);
        auth.setRole(authRole);

        localStorage.setItem("site_user", JSON.stringify(authUser));
        localStorage.setItem("site_token", authToken);
        localStorage.setItem("site_role", authRole);

        auth.setIsAuthenticated(true);

        if (auth.returnUrl && auth.returnUrl !== "/") navigate(auth.returnUrl);
        else navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <div className="flex w-full items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-900">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-xl font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter email"
              {...register("username", { required: "Username is required" })}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 text-xl"
            />
            {errors.username && (
              <p className="mt-1 text-xl text-red-600">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="block text-xl font-medium text-gray-700"
            >
              Password:
            </label>
            <div
              className="relative w-full"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              tabIndex={-1}
              style={{ outline: "none" }}
            >
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                id="password"
                {...register("password", {
                  required: "Password is required",
                })}
                className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 text-xl"
              />
              {isFocused && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  {showPassword ? (
                    <EyeSlashIcon
                      className="h-6 w-6 text-gray-500 cursor-pointer"
                      onClick={toggleShowPassword}
                    />
                  ) : (
                    <EyeIcon
                      className="h-6 w-6 text-gray-500 cursor-pointer"
                      onClick={toggleShowPassword}
                    />
                  )}
                </div>
              )}
            </div>
            <div className="mt-2 text-right">
              <NavLink
                to="/forgot-password"
                className="text-xl text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </NavLink>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-xl"
            >
              Login
            </button>
          </div>
          <hr />
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <span className="text-xl text-gray-600">
              Don't own an account yet?
            </span>
            <NavLink
              className="mt-2 sm:mt-0 text-xl text-indigo-600 hover:text-indigo-500"
              to="/register"
            >
              Register new account
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
