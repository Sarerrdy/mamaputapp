import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const StarRatingInteractive = ({ rating, setRating }) => {
  const handleClick = (value) => {
    setRating(value);
  };

  return (
    <div className="star-rating flex">
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          className={`star ${value <= rating ? "filled" : ""} cursor-pointer`}
          onClick={() => handleClick(value)}
        >
          <FontAwesomeIcon
            icon={faStar}
            className={value <= rating ? "text-gold" : "text-gray-400"}
          />
        </span>
      ))}
    </div>
  );
};

StarRatingInteractive.propTypes = {
  rating: PropTypes.number.isRequired,
  setRating: PropTypes.func.isRequired,
};

export default StarRatingInteractive;
