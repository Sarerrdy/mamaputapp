import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Outlet } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCreateData } from "../hooks/useApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const notifyError = () =>
    toast.error(`Sign-in operation failed!!`, {
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

  const onSubmit = (data) => {
    const checkLoginStatus = async () => {
      try {
        const response = await createOrderMutation.mutateAsync({
          user: data,
        });
        if (response[1]["email"] == data["username"]) {
          notifySuccessful(response[1]["email"]);
          setTimeout(() => {
            handleSubmitEvent(response);
          }, 1000);
        }
        // reset();
      } catch (error) {
        console.error("something when wrong", error);
        notifyError();
      }
    };
    checkLoginStatus();
  };

  const handleSubmitEvent = (res) => {
    try {
      console.log("LOGIN-RES", res);

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
        auth.setUser(authUser);
        auth.setToken(authToken);
        auth.setAddress(authAdress);
        localStorage.setItem("site_user", JSON.stringify(authUser));
        localStorage.setItem("site_address", JSON.stringify(authAdress));
        localStorage.setItem("site_token", authToken);
        auth.setIsAuthenticated(true);
        // navigate("/");
        return <Outlet />;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
    return;
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
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
