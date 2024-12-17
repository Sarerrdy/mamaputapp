// import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { OrderCtx } from "../contexts/OrderContext";
import { ToastContainer } from "react-toastify";
// import PropTypes from "prop-types";

const PaymentForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setOrderPlacedId } = OrderCtx(); //order id use to view fetch order details
  const auth = useAuth();
  const { email, amount, reference, order_id } = location.state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const { email, amount, reference } = paymentDetails;
    const paystackHandler = window.PaystackPop.setup({
      key: "pk_test_9aa60ea87de363aa2e0f1d01bc852f0bdb360f19",
      email,
      amount,
      ref: reference,
      callback: function (response) {
        if (response.status === "success") {
          auth.notifyOrderSuccessful(`Payment received for order #${order_id}`);
          setOrderPlacedId(order_id);
          //   setOrderToken("");
          localStorage.removeItem("order_token");
          localStorage.removeItem("cartItems");
          setTimeout(() => {
            navigate("/OrderSummary");
          }, 1000); //
        } else {
          auth.notifyOrderFailure(
            "Payment verification failed! Please check your order history before place another order"
          );
          setTimeout(() => {
            navigate("/");
          }, 1000); //
        }
      },
      onClose: () => {
        auth.notifyOrderFailure("Payment window closed");
      },
    });
    paystackHandler.openIframe();
  };

  const handleCancel = () => {
    // window.PaystackPop.closeIframe();
    auth.notifyOrderFailure("Payment cancelled");
    setTimeout(() => {
      navigate("/");
    }, 2000); //
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="text-5xl font-bold mb-10">Pay using Paystack</div>
      <form
        onSubmit={handleSubmit}
        className="w-25 bg-white p-8 rounded-lg shadow-md space-y-4"
      >
        <label className="block">
          <span className="text-gray-700">Email:</span>
          <input
            type="email"
            name="email"
            value={email}
            // onChange={handleChange}
            required
            readOnly
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Amount:</span>
          <input
            type="number"
            name="amount"
            value={amount}
            // onChange={handleChange}
            required
            readOnly
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </label>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Pay Now
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="w-full px-4 py-2 bg-red-500 text-white font-semibold rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Cancel Payment
        </button>
      </form>
    </div>
  );
};

// PaymentForm.propTypes = {
//   email: PropTypes.string.isRequired,
//   amount: PropTypes.number.isRequired,
//   reference: PropTypes.string.isRequired,
// };

export default PaymentForm;
