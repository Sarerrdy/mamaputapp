import { useState } from "react";
import { useForm } from "react-hook-form";
import statesAndLGAs from "../data/stateLGAList";
import { useCreateData } from "../hooks/useApi";
import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

//state and corresponding LGAs Array
const stateAndLga = statesAndLGAs;

const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
    useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [selectedState, setSelectedState] = useState("");
  const createOrderMutation = useCreateData("register");
  // const navigate = useNavigate();
  const auth = useAuth();

  const password = watch("password");

  //submit a post request for new registration
  const onSubmit = (data) => {
    const checkLoginStatus = async () => {
      try {
        const response = await createOrderMutation.mutateAsync({
          user: data,
        });

        if (response == data["email"]) {
          auth.notifyOrderSuccessful(
            `Registration of ${response} was sucessful`
          );
          reset();
          setTimeout(() => {
            auth.logOut();
          }, 1000);
        }
      } catch (error) {
        auth.notifyOrderFailure(`Registration failed. Error: ${error}`);
      }
    };
    checkLoginStatus();
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  //toggle show password
  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  //toggle show confirm password
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  return (
    <div className="max-w-5xl text-2xl mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">User Registration</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Title
          </label>
          <input
            {...register("title", { required: true })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.title && (
            <p className="text-red-500 text-base mt-1">Title is required</p>
          )}
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">
            First Name
          </label>
          <input
            {...register("first_name", { required: true })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.first_name && (
            <p className="text-red-500 text-base mt-1">
              First name is required
            </p>
          )}
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Last Name
          </label>
          <input
            {...register("last_name", { required: true })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.last_name && (
            <p className="text-red-500 text-base mt-1">Last name is required</p>
          )}
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Gender
          </label>
          <select
            {...register("gender", { required: true })}
            className="mt-1 block text-lg w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-base mt-1">Gender is required</p>
          )}
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.email && (
            <p className="text-red-500 text-base mt-1">Email is required</p>
          )}
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">
            Password
          </label>

          <div
            className="relative w-full"
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
            tabIndex={-1}
            style={{ outline: "none" }}
          >
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              {...register("password", { required: true })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {isPasswordFocused && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                {showPassword ? (
                  <EyeSlashIcon
                    className="h-8 w-8 text-gray-500 cursor-pointer"
                    onClick={toggleShowPassword}
                  />
                ) : (
                  <EyeIcon
                    className="h-8 w-8 text-gray-500 cursor-pointer"
                    onClick={toggleShowPassword}
                  />
                )}
              </div>
            )}
          </div>

          {errors.password && (
            <p className="text-red-500 text-base mt-1">Password is required</p>
          )}
        </div>

        <div className="mt-4">
          <label className="block text-lg font-medium text-gray-700">
            Confirm Password
          </label>
          <div
            className="relative w-full"
            onFocus={() => setIsConfirmPasswordFocused(true)}
            onBlur={() => setIsConfirmPasswordFocused(false)}
            tabIndex={-1}
            style={{ outline: "none" }}
          >
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {isConfirmPasswordFocused && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                {showConfirmPassword ? (
                  <EyeSlashIcon
                    className="h-8 w-8 text-gray-500 cursor-pointer"
                    onClick={toggleShowConfirmPassword}
                  />
                ) : (
                  <EyeIcon
                    className="h-8 w-8 text-gray-500 cursor-pointer"
                    onClick={toggleShowConfirmPassword}
                  />
                )}
              </div>
            )}
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-base mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Phone
          </label>
          <input
            type="number"
            {...register("phone", { required: true })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.phone && (
            <p className="text-red-500 text-base mt-1">
              Phone number is required
            </p>
          )}
        </div>

        <h2 className="text-2xl font-bold mt-6 mb-4 text-center">Address</h2>
        <div>
          <label className="block text-lg font-medium text-gray-700">
            State
          </label>
          <select
            {...register("state", { required: true })}
            className="mt-1 block text-lg w-full p-2 border border-gray-300 rounded-md"
            onChange={handleStateChange}
          >
            <option value="">Select State</option>
            {Object.keys(stateAndLga).map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          {errors.state && (
            <p className="text-red-500 text-base mt-1">State is required</p>
          )}
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">LGA</label>
          <select
            {...register("lga", { required: true })}
            className="mt-1 block text-lg w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select LGA</option>
            {selectedState &&
              stateAndLga[selectedState].map((lga) => (
                <option key={lga} value={lga}>
                  {lga}
                </option>
              ))}
          </select>
          {errors.lga && (
            <p className="text-red-500 text-base mt-1">LGA is required</p>
          )}
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Address
          </label>
          <input
            {...register("address", { required: true })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.address && (
            <p className="text-red-500 text-base mt-1">Address is required</p>
          )}
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Town
          </label>
          <input
            {...register("town", { required: true })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.town && (
            <p className="text-red-500 text-base mt-1">Town is required</p>
          )}
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Landmark
          </label>
          <input
            {...register("landmark")}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-50 bg-blue-500 text-white p-2 rounded-md mt-4 hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
