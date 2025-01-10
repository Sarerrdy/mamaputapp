import { useState } from "react";
import { useForm } from "react-hook-form";
import statesAndLGAs from "../data/stateLGAList";
import { useCreateData } from "../hooks/useApi";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../contexts/AuthContext";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

//state and corresponding LGAs Array
const stateAndLga = statesAndLGAs;

const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
    useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [selectedState, setSelectedState] = useState("");
  const createOrderMutation = useCreateData("register");
  const auth = useAuth();

  const password = watch("password");

  //submit a post request for new registration
  const onSubmit = (data) => {
    const checkLoginStatus = async () => {
      setLoading(true);
      try {
        const response = await createOrderMutation.mutateAsync({
          user: data,
        });

        const successMessage =
          response.data?.message ||
          `Registration of ${data.email} was successful`;
        auth.notifyOrderSuccessful(successMessage);
        reset();
        setTimeout(() => {
          auth.logOut();
        }, 1000);
      } catch (error) {
        const errorMessage =
          error.response?.data.errors ||
          error.response?.data.message ||
          error.message ||
          "Registration failed. Please try again.";

        auth.notifyOrderFailure(
          `Registration Error: ${JSON.stringify(errorMessage)}`
        );
      } finally {
        setLoading(false);
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
    <div className="flex w-full items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-5xl p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          User Registration
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-xl font-medium text-gray-700">
              Title
            </label>
            <input
              {...register("title", {
                required: "Title is required",
                validate: (value) =>
                  value.trim() !== "" || "Title cannot be empty",
              })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.title && (
              <p className="text-red-500 text-base mt-1">
                {errors.title.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-xl font-medium text-gray-700">
              First Name
            </label>
            <input
              {...register("first_name", {
                required: "First name is required",
                validate: (value) =>
                  value.trim() !== "" || "First name cannot be empty",
              })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.first_name && (
              <p className="text-red-500 text-base mt-1">
                {errors.first_name.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-xl font-medium text-gray-700">
              Last Name
            </label>
            <input
              {...register("last_name", {
                required: "Last name is required",
                validate: (value) =>
                  value.trim() !== "" || "Last name cannot be empty",
              })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.last_name && (
              <p className="text-red-500 text-base mt-1">
                {errors.last_name.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-xl font-medium text-gray-700">
              Gender
            </label>
            <select
              {...register("gender", {
                required: "Gender is required",
                validate: (value) =>
                  value.trim() !== "" || "Gender cannot be empty",
              })}
              className="mt-1 block text-xl w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-base mt-1">
                {errors.gender.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-xl font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                validate: (value) =>
                  value.trim() !== "" || "Email cannot be empty",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.email && (
              <p className="text-red-500 text-base mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xl font-medium text-gray-700">
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
                {...register("password", {
                  required: "Password is required",
                  validate: (value) =>
                    value.trim() !== "" || "Password cannot be empty",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                  },
                })}
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
              <p className="text-red-500 text-base mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xl font-medium text-gray-700">
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
                  validate: {
                    notEmpty: (value) =>
                      value.trim() !== "" || "Confirm Password cannot be empty",
                    matchesPassword: (value) =>
                      value === password || "Passwords do not match",
                  },
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
            <label className="block text-xl font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              {...register("phone", {
                required: "Phone number is required",
                validate: (value) =>
                  value.trim() !== "" || "Phone number cannot be empty",
                pattern: {
                  value: /^[0-9]{10,15}$/,
                  message: "Invalid phone number",
                },
              })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.phone && (
              <p className="text-red-500 text-base mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <h2 className="text-3xl font-bold mt-6 mb-4 text-center">Address</h2>
          <div>
            <label className="block text-xl font-medium text-gray-700">
              State
            </label>
            <select
              {...register("state", {
                required: "State is required",
                validate: (value) =>
                  value.trim() !== "" || "State cannot be empty",
              })}
              className="mt-1 block text-xl w-full p-2 border border-gray-300 rounded-md"
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
              <p className="text-red-500 text-base mt-1">
                {errors.state.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-xl font-medium text-gray-700">
              LGA
            </label>
            <select
              {...register("lga", {
                required: "LGA is required",
                validate: (value) =>
                  value.trim() !== "" || "LGA cannot be empty",
              })}
              className="mt-1 block text-xl w-full p-2 border border-gray-300 rounded-md"
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
              <p className="text-red-500 text-base mt-1">
                {errors.lga.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-xl font-medium text-gray-700">
              Address
            </label>
            <input
              {...register("address", {
                required: "Address is required",
                validate: (value) =>
                  value.trim() !== "" || "Address cannot be empty",
              })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.address && (
              <p className="text-red-500 text-base mt-1">
                {errors.address.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-xl font-medium text-gray-700">
              Town
            </label>
            <input
              {...register("town", {
                required: "Town is required",
                validate: (value) =>
                  value.trim() !== "" || "Town cannot be empty",
              })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.town && (
              <p className="text-red-500 text-base mt-1">
                {errors.town.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-xl font-medium text-gray-700">
              Landmark
            </label>
            <input
              {...register("landmark")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md mt-4 hover:bg-blue-600 text-xl"
            disabled={loading}
          >
            {loading ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                Registering...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
