import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import StarRatingReadOnly from "./StarRatingReadOnly";
import { parseISO, format } from "date-fns";

const RatingSummary = ({ reviews = [], ratingSummary, totalReviews }) => {
  return (
    <div className="mt-4 w-11/12 mx-auto">
      <h5>Rating Summary</h5>
      <ul>
        {Object.entries(ratingSummary).map(([stars, count]) => (
          <li key={stars} className="flex items-center mb-2">
            <span className="w-12 flex items-center">
              {stars}
              <FontAwesomeIcon
                icon={faStar}
                className={count > 0 ? "text-gold mr-1" : "text-gray-400 mr-1"}
              />
            </span>
            <div className="flex-1 mx-2">
              <div className="relative pt-1">
                <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                  <div
                    style={{ width: `${(count / totalReviews) * 100}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gold"
                  ></div>
                </div>
              </div>
            </div>
            <span>{count}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <h5>All Reviews</h5>
        {reviews && reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.review_id} className="mb-4">
              <StarRatingReadOnly rating={review.rating} />
              <p>{review.review}</p>
              <p className="text-gray-600 text-lg">{review.user_names}</p>
              <p className="text-gray-500 text-lg">
                {review.created_at
                  ? format(parseISO(review.created_at), "dd/MM/yyyy")
                  : "No date available"}
              </p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

RatingSummary.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      review_id: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      review: PropTypes.string,
      user_id: PropTypes.number.isRequired,
      user_names: PropTypes.string.isRequired,
      date: PropTypes.string, // Make date optional
    })
  ),
  ratingSummary: PropTypes.object.isRequired,
  totalReviews: PropTypes.number.isRequired,
};

export default RatingSummary;
