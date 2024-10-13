import { useContext } from "react";
import { NavLink } from "react-router-dom";
// import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartContext } from "../contexts/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFetchData } from "../hooks/useApi";
// import { OrderCtx } from "../contexts/OrderContext";

const Cart = (showModal) => {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getCartTotal,
    setOrderToken,
  } = useContext(CartContext);
  const { data: fetchToken } = useFetchData("checkerToken");

  //Added item Toast Notifications
  const notifyAddedToCart = (item) =>
    toast.success(`1 more ${item} added to cart!`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      style: {
        backgroundColor: "#05b858",
        color: "#ffffff",
      },
    });

  const oneNotifyRemovedFromCart = (item) =>
    toast.error(`1 ${item} item was removed from cart!`, {
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

  //Remove Toast Notifications
  const notifyLastItemRemovedFromCart = (item) =>
    toast.error(`All ${item}s have been removed from cart!`, {
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

  //Clear cart Toast Notifications
  const notifyCartCleared = () =>
    toast.error(`Cart cleared!`, {
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

  return (
    showModal && (
      <div className="container mx-auto max-w-screen-lg">
        <div className="flex flex-col items-center inset-0 left-1/4 bg-white gap-8 p-10 text-black dark:text-white font-normal uppercase text-sm shadow-lg rounded-lg">
          <ToastContainer />
          <h1 className="text-3xl font-bold mb-6">Cart</h1>
          <div className="flex flex-col gap-6 w-full">
            {cartItems.map((item) => (
              <div
                className="flex justify-between items-center gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md"
                key={item.menu_id}
              >
                <div className="flex gap-4">
                  <img
                    src={item.menu_url}
                    alt={item.name}
                    className="rounded-md w-24 h-24 object-cover"
                  />
                  <div className="flex flex-col justify-center">
                    <h1 className="text-lg font-bold">{item.name}</h1>
                    <p className="text-gray-600 dark:text-gray-400">
                      ₦{item.price}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                    onClick={() => {
                      addToCart(item);
                      notifyAddedToCart(item.name);
                    }}
                  >
                    +
                  </button>
                  <p>{item.quantity}</p>
                  <button
                    className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                    onClick={() => {
                      const cartItem = cartItems.find(
                        (menu) => menu.menu_id === item.menu_id
                      );
                      if (cartItem.quantity === 1) {
                        removeFromCart(item);
                        notifyLastItemRemovedFromCart(item.name);
                      } else {
                        removeFromCart(item);
                        oneNotifyRemovedFromCart(item.name);
                      }
                    }}
                  >
                    -
                  </button>
                </div>
              </div>
            ))}
          </div>
          {cartItems.length > 0 ? (
            <div className="flex flex-col items-center mt-6">
              <h1 className="text-lg font-bold mb-4">
                Total: ₦{getCartTotal()}
              </h1>
              <button
                className="px-4 py-2 bg-red-600 text-white text-xs font-bold uppercase rounded hover:bg-red-500 focus:outline-none focus:bg-red-500"
                onClick={() => {
                  clearCart();
                  notifyCartCleared();
                }}
              >
                Clear cart
              </button>
            </div>
          ) : (
            <h1 className="text-lg font-bold mt-6">Your cart is empty</h1>
          )}
          <div className="flex gap-4 mt-6">
            <NavLink
              className="px-4 py-2 bg-blue-600 text-white text-xs font-bold uppercase rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
              to="/"
            >
              Continue Shopping
            </NavLink>
            {cartItems.length > 0 && (
              <NavLink
                className="px-8 py-2 bg-green-600 text-white text-xs font-bold uppercase rounded hover:bg-green-500 focus:outline-none focus:bg-green-500"
                to="/checkout"
                onClick={() => {
                  const token = fetchToken;
                  setOrderToken(token);
                  localStorage.setItem("order_token", token);
                }}
              >
                Check Out
              </NavLink>
            )}
          </div>
        </div>
      </div>
    )
  );
};
export default Cart;
