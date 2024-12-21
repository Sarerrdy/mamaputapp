import React, { useState, useEffect } from "react";

const SearchBox = ({ users, onSearchResults }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const trimmedSearchQuery = searchQuery.trim();
    const searchWords = trimmedSearchQuery
      .split(" ")
      .map((word) => word.toLowerCase());
    const timeoutId = setTimeout(() => {
      const filteredUsers = users.filter((user) => {
        const userWords = [
          user.first_name.toLowerCase(),
          user.last_name.toLowerCase(),
          user.email.toLowerCase(),
        ];
        return searchWords.some((word) =>
          userWords.some((userWord) => userWord.includes(word))
        );
      });
      setSearchResults(filteredUsers);
      onSearchResults(filteredUsers);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchQuery, users, onSearchResults]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex justify-center mb-4">
      <input
        type="search"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search by name or email"
        className="w-full p-3 pl-10 text-lg text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 absolute left-3 top-4 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
};

export default SearchBox;
