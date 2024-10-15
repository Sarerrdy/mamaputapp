import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { OrderCtx } from "../contexts/OrderContext";
import { useFetchData } from "../hooks/useApi";

export default function OrderDetails() {
  const { getCartTotal } = useContext(CartContext);
  const auth = useAuth();
  const { orderPlacedId } = OrderCtx();
  const shippingCost = 500;
  const { data: orderDetailsData } = useFetchData(
    `orderdetails?order_id=${orderPlacedId}`
  );

  useEffect(() => {
    console.log("ORDERDETAILS: ", orderDetailsData);
  }, []);

  return (
    <div
      className="container mx-auto p-6 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg"
      id="order_summary"
    >
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-4">
          Your Order was placed successfully!! Please check your order details
          below
        </div>
        <div className="flex justify-center mb-6">
          <img
            className="w-24 h-24"
            src="./images/Tick.png"
            alt="Success Tick"
          />
        </div>
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-inner mb-6">
          <div className="text-3xl font-bold mb-4">Order Summary</div>
          <table className="min-w-full bg-white dark:bg-gray-800">
            <tbody>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <td className="py-2 px-4 text-xl">Order number:</td>
                <td className="py-2 px-4 text-xl">{orderPlacedId}</td>
              </tr>
              <tr className="bg-white dark:bg-gray-700">
                <td className="py-2 px-4 text-xl">Total number of Items:</td>
                <td className="py-2 px-4 text-xl">NUMBER</td>
                {/* <td className="py-2 px-4 text-xl">{props.cartItems.length}</td> */}
              </tr>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <td className="py-2 px-4 text-xl">Cost of Items:</td>
                <td className="py-2 px-4 text-xl">
                  ₦ {getCartTotal() + shippingCost}
                </td>
              </tr>
              <tr className="bg-white dark:bg-gray-700">
                <td className="py-2 px-4 text-xl">Cost of delivery:</td>
                <td className="py-2 px-4 text-xl">₦{shippingCost}</td>
              </tr>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <td className="py-2 px-4 text-xl">Mode of payment: </td>
                <td className="py-2 px-4 text-xl">Pay on delivery</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-lg mb-6">
          <div className="text-3xl font-bold mb-4">Shipping Summary</div>
          <table className="min-w-full bg-white dark:bg-gray-800">
            <tbody>
              <tr className="bg-white dark:bg-gray-700">
                <td className="py-2 px-4 text-xl">Shipping Address: </td>
                <td className="py-2 px-4 text-xl"> {auth.address}</td>
              </tr>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <td className="py-2 px-4 text-xl">Order status: </td>
                <td className="py-2 px-4 text-xl"> Recieved</td>
              </tr>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <td className="py-2 px-4 text-xl">Expected delivery date: </td>
                <td className="py-2 px-4 text-xl"> pending</td>
              </tr>
            </tbody>
          </table>

          <div className="text-2xl mt-4">Thank you for shopping with us!!</div>
        </div>
        <div className="flex justify-center">
          <NavLink
            className="px-6 py-3 bg-blue-600 text-white text-lg font-bold uppercase rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
            to="/"
          >
            Return Home
          </NavLink>
        </div>
      </div>
    </div>
  );
}
