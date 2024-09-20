import { useContext } from "react";
// import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartContext } from "../context/cart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// export default function Cart({ showModal, toggle }) {
export default function Cart() {
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } =
    useContext(CartContext);

  const notifyRemovedFromCart = (item) =>
    toast.error(`${item.title} removed from cart!`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      style: {
        backgroundColor: "#000",
        color: "#fff",
      },
    });

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
        backgroundColor: "#000",
        color: "#fff",
      },
    });

  const handleRemoveFromCart = (menu) => {
    removeFromCart(menu);
    notifyRemovedFromCart(menu);
  };

  return (
    // showModal && (
    <div className="flex-col flex items-center inset-0 left-1/4 bg-white dark:bg-black gap-8  p-10  text-black dark:text-white font-normal uppercase text-sm">
      <ToastContainer />
      <h1 className="text-2xl font-bold">Cart</h1>
      {/* <div className="absolute right-16 top-10">
        <button
          className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
          // onClick={toggle}
        >
          Close
        </button>
      </div> */}
      <div className="flex flex-col gap-4">
        {cartItems.map((item) => (
          <div
            className="flex justify-between items-center gap-4"
            key={item.menu_id}
          >
            <div className="flex gap-4">
              <img
                src={item.menu_url}
                alt={item.name}
                className="rounded-md w-24"
              />
              <div className="flex-col align-content-center gap-4">
                <h1 className="text-lg font-bold">{item.name}</h1>
              </div>
              <div className="flex-col align-content-center">
                <p className="text-gray-600">₦{item.price}</p>
              </div>
            </div>
            {/* <div className="flex flex-col"> */}
            <div className="flex gap-4">
              <button
                className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                onClick={() => {
                  addToCart(item);
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
                    handleRemoveFromCart(item);
                  } else {
                    removeFromCart(item);
                  }
                }}
              >
                -
              </button>
            </div>
            {/* </div> */}
          </div>
        ))}
      </div>
      {cartItems.length > 0 ? (
        <div className="flex flex-col justify-between items-center">
          <h1 className="text-lg font-bold">Total: ₦{getCartTotal()}</h1>
          <button
            className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            onClick={() => {
              clearCart();
              notifyCartCleared();
            }}
          >
            Clear cart
          </button>
        </div>
      ) : (
        <h1 className="text-lg font-bold">Your cart is empty</h1>
      )}

      <button className="px-8  py-2 bg-danger text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
        check out
      </button>
    </div>
  );
  // );
}

// Cart.propTypes = {
//   showModal: PropTypes.bool,
//   toggle: PropTypes.func,
// };

// export default Cart;
