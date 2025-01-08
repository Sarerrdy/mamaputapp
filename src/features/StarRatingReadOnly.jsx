import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";

const StarRatingReadOnly = ({ rating }) => {
  return (
    <div className="star-rating-readonly flex">
      {[1, 2, 3, 4, 5].map((value) => {
        if (value <= rating) {
          return (
            <span key={value} className="star filled">
              <FontAwesomeIcon icon={faStar} className="text-gold" />
            </span>
          );
        } else if (value - 0.5 <= rating) {
          return (
            <span key={value} className="star half-filled">
              <FontAwesomeIcon icon={faStarHalfAlt} className="text-gold" />
            </span>
          );
        } else {
          return (
            <span key={value} className="star">
              <FontAwesomeIcon icon={faStar} className="text-gray-400" />
            </span>
          );
        }
      })}
    </div>
  );
};

StarRatingReadOnly.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default StarRatingReadOnly;
