import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCallback, useState, useEffect } from "react";
import MenuItemModal from "./MenuItemModal";
import { useFetchData } from "../hooks/useApi";
import StarRatingReadOnly from "./StarRatingReadOnly";

const MenuItem = ({ menu, cartItems, addToCart, removeFromCart }) => {
  const auth = useAuth();
  const [showModal, setShowModal] = useState(false);
  const { data: reviews } = useFetchData(`reviews/${menu.menu_id}`);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    if (reviews && reviews.length > 0) {
      const totalRating = reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      setAverageRating(totalRating / reviews.length);
      setTotalReviews(reviews.length);
    } else {
      setAverageRating(0);
      setTotalReviews(0);
    }
  }, [reviews]);

  const handleAddToCart = useCallback(
    (menu) => {
      addToCart(menu);
      auth.notifyOrderSuccessful(`1 ${menu.name} item was added into cart!`);
    },
    [addToCart, auth]
  );

  const handleRemoveFromCart = useCallback(
    (menu) => {
      const cartItem = cartItems.find((item) => item.menu_id === menu.menu_id);
      if (cartItem.quantity === 1) {
        removeFromCart(menu);
        auth.notifyOrderFailure(
          `All ${menu.name} items have been removed from cart!`
        );
      } else {
        removeFromCart(menu);
        auth.notifyOrderFailure(`1 ${menu.name} item was removed from cart!`);
      }
    },
    [cartItems, removeFromCart, auth]
  );

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="bg-white shadow-md justify-center items-center rounded-lg px-10 py-10 cursor-pointer">
      <div className="flex justify-center align-end" onClick={handleShowModal}>
        <img src={menu.menu_url} alt={menu.name} className="rounded-md w-75" />
      </div>
      <div className="mt-4">
        <h1 className="text-lg text-center uppercase font-bold">{menu.name}</h1>
        <p className="mt-2 text-gray-600 text-sm">
          {menu.description.slice(0, 120)}...
        </p>
        <p className="text-center mt-2 text-gray-600">₦{menu.price}</p>
        <div className="flex justify-center items-center mt-2">
          <StarRatingReadOnly rating={averageRating} />
          <p
            className="ml-2 text-gray-600 cursor-pointer"
            onClick={handleShowModal}
          >
            ({totalReviews} reviews)
          </p>
        </div>

        <div className="mt-6 flex justify-center items-center">
          {!cartItems.find((item) => item.menu_id === menu.menu_id) ? (
            <button
              className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(menu);
              }}
            >
              Add to cart
            </button>
          ) : (
            <div>
              <div className="flex gap-4">
                <button
                  className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(menu);
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
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFromCart(menu);
                  }}
                >
                  -
                </button>
              </div>
              {cartItems.length > 0 && (
                <div className="mt-6 flex justify-center items-center">
                  <NavLink
                    className="px-4 py-2 bg-green-600 text-white text-xs font-bold uppercase rounded hover:bg-green-500 focus:outline-none focus:bg-green-500"
                    to="/shoppingcart"
                  >
                    Check Out
                  </NavLink>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <MenuItemModal
        show={showModal}
        handleClose={handleCloseModal}
        menu={menu}
        cartItems={cartItems}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        notifyOrderSuccessful={auth.notifyOrderSuccessful}
        notifyOrderFailure={auth.notifyOrderFailure}
      />
    </div>
  );
};

MenuItem.propTypes = {
  menu: PropTypes.object.isRequired,
  cartItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

export default MenuItem;
