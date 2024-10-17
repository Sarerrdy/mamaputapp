import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCreateData } from "../hooks/useApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";

const LoginForm = () => {
  //try token authentication first
  const auth = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const createOrderMutation = useCreateData("login");

  const notifySuccessful = (results) =>
    toast.success(`Signin of ${results} was sucessful`, {
      position: "top-center",
      autoClose: 4000,
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

  const notifyError = (error) =>
    toast.error(`Sign-in operation failed!!: ${error}`, {
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

  const onSubmit = async (data) => {
    try {
      await createOrderMutation.mutateAsync(
        {
          user: data,
        },
        {
          onSuccess(data) {
            notifySuccessful(data["email"]);
            initializer(data);
          },
          onError: (error) => {
            console.error("LOGIN-ERROR", error);
            notifyError(error);
          },
        }
      );
    } catch (error) {
      console.error("LOGIN-ERROR", error);
      notifyError(error);
    }
  };

  const initializer = (res) => {
    try {
      let authToken = res[0];
      let authUser = res[1];
      let authAddress =
        res[2]["address"] +
        ", " +
        res[2]["landmark"] +
        ", " +
        res[2]["town"] +
        ", " +
        res[2]["lga"] +
        ", " +
        res[2]["state"];
      let authAddressId = res[2]["address_id"];

      if (authUser) {
        auth.setUser(authUser);
        auth.setToken(authToken);
        auth.setAddress(authAddress);
        auth.setAddressId(authAddressId);
        localStorage.setItem("site_user", JSON.stringify(authUser));
        localStorage.setItem("site_address", JSON.stringify(authAddress));
        localStorage.setItem("site_token", authToken);
        localStorage.setItem("site_address_id", authAddressId);
        auth.setIsAuthenticated(true);
        // if (auth.returnUrl == "/checkout") navigate("/shoppingcart");
        if (auth.returnUrl !== "") navigate(auth.returnUrl);
        if (auth.returnUrl == "") navigate("/");
        // return <Outlet />;
      }
      // throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
    // return;
  };

  return (
    <div className="container py-5 min-vh-100 bg-body-secondary rounded-lg shadow-md">
      <ToastContainer />
      <div className="max-w-5xl text-2xl mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              {...register("username", { required: "Username is required" })}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-600">
                {errors.username.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
          <hr />
          <div className="flex flex-col sm:flex-row">
            <span className="mr-12"> Don't own an account yet?</span>
            <NavLink
              className=" px-4 py-2 font-medium text-center text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
