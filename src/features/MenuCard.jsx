import { useContext } from "react";
// import { useState, useEffect, useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import PropTypes, { object } from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";
import {} from "@heroicons/react/24/outline";
import { Spinner } from "react-bootstrap";

// import Cart from "./Cart";

export default function MenuCard({ data, error, isLoading }) {
  // const [menus, setMenus] = useState([]);
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  // const [showModal, setShowModal] = useState(false);

  // const toggle = () => {
  //   setShowModal(!showModal);
  // };

  // async function getMenus() {
  //   // const response = await fetch("http://127.0.0.1:5001/api/menus"); // fetch the menus
  //   // "https://moray-large-vervet.ngrok-free.app/api/menus",
  //   const response = await fetch("http://127.0.0.1:5001/api/menus", {
  //     method: "get",
  //     headers: new Headers({
  //       "ngrok-skip-browser-warning": "69420",
  //     }),
  //   }); // fetch the menus
  //   const data = await response.json(); // convert the response to json
  //   setMenus(data); // set the menus in the state to the menus we fetched
  // }

  // useEffect(() => {
  //   setMenus(data);
  //   // getMenus();
  // }, []);

  const notifyAddedToCart = (item) =>
    toast.success(`1 ${item.name} added to cart!`, {
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

  const allnotifyRemovedFromCart = (item) =>
    toast.error(`All ${item.name} removed from cart!`, {
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

  const onenotifyRemovedFromCart = (item) =>
    toast.error(`1 ${item.name} removed from cart!`, {
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

  const allhandleRemoveFromCart = (menu) => {
    removeFromCart(menu);
    allnotifyRemovedFromCart(menu);
  };
  const onehandleRemoveFromCart = (menu) => {
    removeFromCart(menu);
    onenotifyRemovedFromCart(menu);
  };

  if (isLoading)
    return (
      <div className=" flex justify-between items-center px-20 m-7 mt-lg-5">
        <Spinner />
      </div>
    );
  if (error)
    return <div className=" container-fluid">Error: {error.message}</div>;

  return (
    <div className=" container">
      <ToastContainer />
      <div className="flex justify-between items-center px-20">
        <h1 className="text-2xl uppercase font-bold mt-10 text-center mb-10">
          Shop
        </h1>
        {/* {!showModal && (
          <button
            className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            onClick={toggle}
          >
            Cart ({cartItems.length})
            </button>
            )} */}
        <nav className="navbar navbar-light badge">
          <NavLink className="badge text-lg text-dark" to="/shoppingcart">
            Cart ({cartItems.length})
          </NavLink>
        </nav>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.map((menu) => (
          <div
            key={menu.menu_id}
            className="bg-white shadow-md justify-center items-center  rounded-lg px-10 py-10"
          >
            <div className="flex justify-center align-end">
              <img
                src={menu.menu_url}
                alt={menu.name}
                className="rounded-md w-75"
              />
            </div>
            <div className="mt-4">
              <h1 className="text-lg text-center uppercase font-bold">
                {menu.name}
              </h1>
              <p className="mt-2 text-gray-600 text-sm">
                {menu.description.slice(0, 120)}...
              </p>
              <p className="text-center mt-2 text-gray-600">₦{menu.price}</p>
            </div>
            <div className="mt-6 flex justify-center items-center">
              {!cartItems.find((item) => item.menu_id === menu.menu_id) ? (
                <button
                  className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                  onClick={() => {
                    addToCart(menu);
                    notifyAddedToCart(menu);
                  }}
                >
                  Add to cart
                </button>
              ) : (
                <div className="flex gap-4">
                  <button
                    className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                    onClick={() => {
                      addToCart(menu);
                      notifyAddedToCart(menu);
                    }}
                  >
                    +
                  </button>
                  <p className="text-gray-600">
                    {
                      cartItems.find((item) => item.menu_id === menu.menu_id)
                        .quantity
                    }
                  </p>
                  <button
                    className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                    onClick={() => {
                      const cartItem = cartItems.find(
                        (item) => item.menu_id === menu.menu_id
                      );
                      if (cartItem.quantity === 1) {
                        allhandleRemoveFromCart(menu);
                      } else {
                        onehandleRemoveFromCart(menu);
                      }
                    }}
                  >
                    -
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* <Cart showModal={showModal} toggle={toggle} /> */}
    </div>
  );
}

MenuCard.propTypes = {
  data: PropTypes.arrayOf(object),
  error: PropTypes.string,
  isLoading: PropTypes.bool,
};
