import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "@mui/material";
import { useFetchData, useUpdateData, useCreateData } from "../hooks/useApi";
import StarRatingReadOnly from "./StarRatingReadOnly";
import StarRatingInteractive from "./StarRatingInteractive";
import RatingSummary from "./RatingSummary";
import { useAuth } from "../contexts/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";

const MenuItemModal = ({
  show,
  handleClose,
  menu,
  cartItems,
  addToCart,
  removeFromCart,
}) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState("");
  const { data: reviews = [], refetch } = useFetchData(
    `reviews/${menu.menu_id}`
  );
  const updateReview = useUpdateData(`reviews`);
  const createReview = useCreateData(`reviews/${menu.menu_id}`);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [hasRated, setHasRated] = useState(false);
  const [ratingSummary, setRatingSummary] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });

  useEffect(() => {
    if (reviews && reviews.length > 0) {
      const totalRating = reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      setAverageRating(totalRating / reviews.length);
      setTotalReviews(reviews.length);
      const userReview = reviews.find(
        (review) => review.user_id === auth.user.user_id
      );
      if (userReview) {
        // Case 1: The current user has an existing rating
        setUserRating(userReview.rating);
        setUserReview(userReview.review);
        setHasRated(true);
      } else {
        // Case 2: The current user has no existing rating but the menuItem has existing ratings from other users
        setUserRating(0);
        setUserReview("");
        setHasRated(false);
      }

      // Calculate rating summary
      const summary = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      reviews.forEach((review) => {
        summary[review.rating] += 1;
      });
      setRatingSummary(summary);
    } else {
      // Case 3: The menuItem has no existing rating both from the current user or other users
      setAverageRating(0);
      setTotalReviews(0);
      setUserRating(0);
      setUserReview("");
      setHasRated(false);
      setRatingSummary({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
    }
  }, [reviews, auth.user.user_id]);

  const handleSave = () => {
    if (!auth.isAuthenticated) {
      auth.notifyOrderFailure("You need to be logged in to submit a review.");
      navigate("/signin");
      return;
    }

    const reviewData = {
      rating: userRating,
      review: userReview,
      menu_id: menu.menu_id,
      user_id: auth.user.user_id,
      user_names: auth.user.first_name + " " + auth.user.last_name,
    };
    if (hasRated) {
      // Update existing review
      updateReview.mutate(
        { id: menu.menu_id, updatedData: reviewData },
        {
          onSuccess: () => {
            auth.notifyOrderSuccessful("Review updated successfully!");
            refetch();
            handleClose();
          },
          onError: () => {
            auth.notifyOrderFailure(
              "Failed to update review. Please try again."
            );
          },
        }
      );
    } else {
      // Create new review
      createReview.mutate(reviewData, {
        onSuccess: () => {
          auth.notifyOrderSuccessful("Review submitted successfully!");
          refetch();
          handleClose();
        },
        onError: () => {
          auth.notifyOrderFailure("Failed to submit review. Please try again.");
        },
      });
    }
  };

  const handleAddToCart = () => {
    addToCart(menu);
    auth.notifyOrderSuccessful(`1 ${menu.name} item was added into cart!`);
  };

  const handleRemoveFromCart = () => {
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
  };

  const cartItem = cartItems.find((item) => item.menu_id === menu.menu_id);

  return (
    <Modal open={show} onClose={handleClose}>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-5xl mx-auto my-auto overflow-y-auto h-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{menu.name}</h2>
          <Button onClick={handleClose} variant="contained" color="secondary">
            Close
          </Button>
        </div>
        <img
          src={menu.menu_url}
          alt={menu.name}
          className="rounded-md w-full mb-4"
        />
        <p className="text-lg text-gray-700">{menu.description}</p>
        <p className="text-xl font-semibold text-gray-800">
          Price: ₦{menu.price}
        </p>
        <p className="text-lg text-gray-700">
          Availability: {menu.availability ? "Available" : "Out of Stock"}
        </p>
        <div className="mt-4">
          {cartItem ? (
            <div className="flex gap-4">
              <Button
                onClick={handleAddToCart}
                variant="contained"
                color="primary"
              >
                +
              </Button>
              <p className="text-gray-600">{cartItem.quantity}</p>
              <Button
                onClick={handleRemoveFromCart}
                variant="contained"
                color="primary"
              >
                -
              </Button>
            </div>
          ) : (
            <Button
              onClick={handleAddToCart}
              variant="contained"
              color="primary"
            >
              Add to cart
            </Button>
          )}
          {cartItems.length > 0 && (
            <div className="mt-6 flex justify-center items-center">
              <NavLink
                className="px-4 py-2 bg-green-600 text-white text-xs font-bold uppercase rounded hover:bg-green-500 focus:outline-none"
                to="/shoppingcart"
              >
                Check Out
              </NavLink>
            </div>
          )}
        </div>
        <div className="flex justify-center items-center mt-2">
          <StarRatingReadOnly rating={averageRating} />
          <p className="ml-2 text-gray-600">({totalReviews} reviews)</p>
        </div>
        <div className="mt-4">
          <h5 className="text-lg font-semibold">Your Review</h5>
          <StarRatingInteractive
            rating={userRating}
            setRating={setUserRating}
          />
          <textarea
            value={userReview}
            onChange={(e) => setUserReview(e.target.value)}
            placeholder="Write your review here"
            className="form-control mt-2 p-2 border rounded-md"
            disabled={!userRating}
          />
          <div className="flex justify-end mt-4">
            <Button
              onClick={handleSave}
              variant="contained"
              color="primary"
              disabled={userRating === 0}
            >
              Save Changes
            </Button>
          </div>
        </div>
        <RatingSummary
          reviews={reviews}
          ratingSummary={ratingSummary}
          totalReviews={totalReviews}
        />
      </div>
    </Modal>
  );
};

MenuItemModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  menu: PropTypes.object.isRequired,
  cartItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

export default MenuItemModal;
