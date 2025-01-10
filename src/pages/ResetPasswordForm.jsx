import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { useCreateData } from "../hooks/useApi";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../contexts/AuthContext";
import { NavLink } from "react-router-dom";

const ResetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const resetPassword = useCreateData("reset-password");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const auth = useAuth();

  const onSubmit = async (data) => {
    try {
      await resetPassword.mutateAsync(
        { token, new_password: data.password },
        {
          onSuccess: (response) => {
            const successMessage =
              response?.message || "Your password has been reset successfully.";
            auth.notifyOrderSuccessful(successMessage);
            setMessage("Go to login and signin now");
          },
          onError: (error) => {
            const errorMessage =
              error.response?.data?.message ||
              error.message ||
              "Failed to reset password.";
            auth.notifyOrderFailure(`Error: ${errorMessage}`);
            setMessage(`Reset password failed. You can try again`);
          },
        }
      );
    } catch (error) {
      console.error(`An error occurred. Please try again: ${error}`);
    }
  };
  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  return (
    <div className="flex w-full items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="password"
              className="block text-xl font-medium text-gray-700"
            >
              New Password:
            </label>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your new password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                })}
                className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 text-xl"
              />
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
            </div>
            {errors.password && (
              <p className="mt-1 text-xl text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-xl font-medium text-gray-700"
            >
              Confirm Password:
            </label>
            <div className="relative w-full">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirm your new password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 text-xl"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                {showConfirmPassword ? (
                  <EyeSlashIcon
                    className="h-6 w-6 text-gray-500 cursor-pointer"
                    onClick={toggleShowConfirmPassword}
                  />
                ) : (
                  <EyeIcon
                    className="h-6 w-6 text-gray-500 cursor-pointer"
                    onClick={toggleShowConfirmPassword}
                  />
                )}
              </div>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-xl text-red-600">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-xl"
            >
              Reset Password
            </button>
          </div>
        </form>
        {message && (
          <p className="mt-4 text-center text-xl text-primary">{message}</p>
        )}
        <div className="mt-4 text-center">
          <NavLink
            to="/signin"
            className="text-xl text-indigo-600 hover:text-indigo-500"
          >
            Return to Sign In
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
