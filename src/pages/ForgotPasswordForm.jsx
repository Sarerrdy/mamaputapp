import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateData } from "../hooks/useApi";
import { useAuth } from "../contexts/AuthContext";
import { NavLink } from "react-router-dom";

const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState("");
  const createPasswordReset = useCreateData("forgot-password");
  const auth = useAuth();

  const onSubmit = async (data) => {
    try {
      await createPasswordReset.mutateAsync(
        { email: data.email },
        {
          onSuccess: () => {
            auth.notifyOrderSuccessful(
              "Password reset link has been sent to your email."
            );
            setMessage("Password reset link has been sent to your email.");
          },
          onError: (error) => {
            auth.notifyOrderFailure("Failed to send password reset link.");
            setMessage("Failed to send password reset link.");
          },
        }
      );
    } catch (error) {
      auth.notifyOrderFailure("An error occurred. Please try again.");
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex w-full items-center justify-center min-h-screen bg-gray-100">
      <div className="w-1/4 p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-xl font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 text-xl"
            />
            {errors.email && (
              <p className="mt-1 text-xl text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-xl"
            >
              Send Reset Link
            </button>
          </div>
        </form>
        {message && (
          <p className="mt-4 text-center text-xl text-gray-600">{message}</p>
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

export default ForgotPasswordForm;
