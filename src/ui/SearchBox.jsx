import { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import validator from "validator";
import { useAuth } from "../contexts/AuthContext"; // Import useAuth
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css";

const SearchBox = ({ onSearchResults, users, menus }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const auth = useAuth(); // Initialize useAuth
  const [hasNoResults, setHasNoResults] = useState(false); // Add state for no results

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]); // Reset search results when search query is cleared
      setHasNoResults(false); // Reset the no results state
    }
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      const trimmedSearchQuery = searchQuery.trim();
      const searchWords = trimmedSearchQuery
        .split(" ")
        .map((word) => word.toLowerCase());

      // Validate user input using validator.js
      if (!validator.isLength(trimmedSearchQuery, { min: 1, max: 50 })) {
        auth.notifyOrderFailure("Invalid search query length"); // Use toast notification
        return;
      }

      // Allow spaces in the search query
      const isValidQuery = searchWords.every((word) =>
        validator.isAlphanumeric(word, "en-US", { ignore: " " })
      );

      if (!isValidQuery) {
        auth.notifyOrderFailure("Invalid search query characters"); // Use toast notification
        return;
      }

      // Sanitize and escape search results using DOMPurify
      const sanitizedUsers = users
        ? users.map((user) => ({
            ...user,
            first_name: DOMPurify.sanitize(user.first_name),
            last_name: DOMPurify.sanitize(user.last_name),
            email: DOMPurify.sanitize(user.email),
          }))
        : [];

      const sanitizedMenus = menus
        ? menus.map((menu) => ({
            ...menu,
            name: DOMPurify.sanitize(menu.name),
            category: DOMPurify.sanitize(menu.category),
          }))
        : [];

      const combinedResults = [...sanitizedUsers, ...sanitizedMenus];

      const filteredResults = combinedResults.filter((result) => {
        const resultWords = [
          result.first_name && result.first_name.toLowerCase(),
          result.last_name && result.last_name.toLowerCase(),
          result.email && result.email.toLowerCase(),
          result.name && result.name.toLowerCase(),
          result.category && result.category.toLowerCase(),
        ].filter(Boolean);

        return searchWords.some((word) =>
          resultWords.some((resultWord) => resultWord.includes(word))
        );
      });

      setSearchResults(filteredResults);
      setHasNoResults(filteredResults.length === 0); // Update no results state
    }
  }, [searchQuery, users, menus]);

  useEffect(() => {
    onSearchResults(searchResults);
  }, [searchResults, onSearchResults]);

  return (
    <div className="relative">
      <input
        type="search"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        placeholder="Search..."
        className={`w-full p-2 border ${
          hasNoResults ? "border-red-500" : "border-gray-300"
        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        onClick={() => setSearchQuery("")}
      >
        &#x2715;
      </button>
      <ToastContainer /> {/* Add ToastContainer */}
      {/* {searchQuery.trim() !== "" && (
        <ul>
          {searchResults.map((result, index) => (
            <li key={index}>{result.first_name || result.name}</li>
          ))}
        </ul>
      )} */}
    </div>
  );
};

export default SearchBox;
