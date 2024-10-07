import { useContext, useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartContext } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { useCreateData1 } from "../hooks/useApi";
import { OrderCtx } from "../contexts/OrderContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderDetails from "./OrderDetails";
import { useFetchData } from "../hooks/useApi";

export default function Order() {
  const { cartItems, getCartTotal, getfetchToken, setGetFetchToken } =
    useContext(CartContext);
  const [disable, setDisable] = useState(false);
  const hasExecuted = useRef(false);
  const auth = useAuth();
  const [orderPlacedId, setOrderPlacedId] = useState(null);
  const navigate = useNavigate();
  //get order_details
  const { data: orderDetailsData } = useFetchData(
    `orderdetails?order_id=${orderPlacedId}`
  );
  const { data: verifyToken } = useFetchData(
    `orders?checkerToken=${getfetchToken}`
  );
  const { mutateAsync, data, error, isError, isSuccess } =
    useCreateData1("orders");

  const shippingCost = 500;

  const notifyOrderSuccessful = (results) =>
    toast.success(`Your Order #${results} was placed sucessfully`, {
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
  const notifyOrderFailure = (results) =>
    toast.success(
      `Your Order placement failed with the following error ${results}`,
      {
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
      }
    );

  // fetch order details from cartItems
  let order_details = [];
  cartItems.map((cartItem) => {
    order_details.push({
      // order_details_id: "",
      quantity: cartItem.quantity,
      discount: 0,
      price: cartItem.price,
      menu_id: cartItem.menu_id,
      order_id: 0,
    });
  });

  //ready order item
  let order = {
    total_price: getCartTotal(),
    status: "available",
    user_id: auth.user.user_id,
  };

  //post a new order
  const PostNewOrder = async (newOrder) => {
    await mutateAsync(
      { orders: newOrder },
      {
        onSuccess: (data) => {
          notifyOrderSuccessful(data);
          setDisable(true);
          setOrderPlacedId(data);
          //   setGetFetchToken("");
        },
        onError: (error) => {
          notifyOrderFailure(error);
        },
      }
    );
  };

  useEffect(() => {
    console.log("getfetchToken: ", getfetchToken);
    if (getfetchToken !== null || getfetchToken !== undefined) {
      setDisable(true);
    }
    setDisable(false);
    // navigate("/");

    // if (orderPlacedId) {
    //   // if (orderId === returnedOrderDetails && !hasExecuted.current) {
    //   // if (orderId === returnedOrderDetails) {
    //   setDisable(true);
    //   //   hasExecuted.current = true;
    //   // } else if (returnedOrderDetails !== null) {
    //   //   setDisable(true);
    // } else {
    //   setDisable(false);
    // }
  }, [getfetchToken, navigate, orderDetailsData, orderPlacedId, verifyToken]);

  //   useEffect(() => {
  //     console.log("getfetchToken: ", getfetchToken);
  //     if (getfetchToken !== null || getfetchToken !== undefined) {
  //       console.log("verifyToken: ", verifyToken);
  //       if (verifyToken) {
  //         console.log("orderPlacedId: ", orderPlacedId);
  //         if (orderPlacedId !== null || orderPlacedId !== undefined) {
  //           if (orderDetailsData !== null || orderDetailsData !== undefined) {
  //             setDisable(true);

  //             setDisable(false);
  //           }
  //         }
  //         setDisable(false);
  //       }
  //       setDisable(false);
  //       //   navigate("/");
  //     }
  //     setDisable(false);
  //     // navigate("/");

  //     // if (orderPlacedId) {
  //     //   // if (orderId === returnedOrderDetails && !hasExecuted.current) {
  //     //   // if (orderId === returnedOrderDetails) {
  //     //   setDisable(true);
  //     //   //   hasExecuted.current = true;
  //     //   // } else if (returnedOrderDetails !== null) {
  //     //   //   setDisable(true);
  //     // } else {
  //     //   setDisable(false);
  //     // }
  //   }, [getfetchToken, navigate, orderDetailsData, orderPlacedId, verifyToken]);

  return (
    <div className="container mx-auto max-w-screen-lg">
      <div className="container mx-auto p-6 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg">
        <ToastContainer />
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <div className="text-3xl font-bold mb-4">Order Summary</div>
          <table className="min-w-full bg-white dark:bg-gray-800">
            <tbody>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <td className="py-2 px-4 text-xl">Total number of Items:</td>
                <td className="py-2 px-4 text-xl">{cartItems.length}</td>
              </tr>
              <tr className="bg-white dark:bg-gray-800">
                <td className="py-2 px-4 text-xl">Cost of Items:</td>
                <td className="py-2 px-4 text-xl">₦{getCartTotal()}</td>
              </tr>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <td className="py-2 px-4 text-xl">Cost of delivery:</td>
                <td className="py-2 px-4 text-xl">₦{shippingCost}</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-6 p-4 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-inner">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Total:
            </div>
            <div className="text-4xl font-extrabold text-red-600 dark:text-red-400">
              ₦{getCartTotal() + shippingCost}
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <div className="text-3xl font-bold mb-4">
            Delivery Address Summary
          </div>
          <div className="text-xl mb-2">
            <strong>Address:</strong> {auth.address}
          </div>
          <div className="text-xl mb-4">
            Do you want to ship to a different address?
          </div>
          <button
            className={`px-4 py-2  text-white text-sm font-bold uppercase rounded ${
              disable
                ? "bg-gray-400"
                : "bg-blue-600 hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
            } m-3 w-1/4`}
            disabled={disable}
          >
            Change Address
          </button>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <div className="text-3xl font-bold mb-4">Changed your mind?</div>
          <NavLink
            className={`px-4 py-2  text-white text-sm font-bold uppercase rounded ${
              disable
                ? "bg-gray-400"
                : "bg-blue-600 hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
            } m-3 w-1/4`}
            to="/shoppingcart"
            style={{
              pointerEvents: disable ? "none" : "auto",
            }}
            disabled={disable}
          >
            Modify Cart Now
          </NavLink>
        </div>
        <div className="flex justify-center">
          <button
            className={`px-8 py-2 text-white text-lg font-bold uppercase rounded ${
              disable
                ? "bg-gray-400"
                : "bg-red-600 hover:bg-red-500 focus:outline-none focus:bg-red-500"
            } m-3 w-1/4`}
            onClick={() => {
              console.log("orderPlacedId", orderPlacedId);
              if (orderPlacedId === null || orderPlacedId === undefined)
                PostNewOrder({ order, order_details });
            }}
            disabled={disable}
          >
            {orderPlacedId == null ? "Submit Order" : "Order Submitted"}
          </button>
        </div>
      </div>
      <div>
        {orderPlacedId != null && <OrderDetails cartItems={cartItems} />}
      </div>
    </div>
  );
}
