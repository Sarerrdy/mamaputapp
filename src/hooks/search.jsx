// search.jsx
import { useState, useEffect } from "react";

const Search = ({ data, searchKey, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedSearchQuery === "") {
      setSearchResults([]);
    } else {
      const filteredData = data.filter((item) => {
        return item[searchKey]
          .toLowerCase()
          .includes(debouncedSearchQuery.toLowerCase());
      });
      setSearchResults(filteredData);
    }
  }, [debouncedSearchQuery, data]);

  const handleSearch = () => {
    if (debouncedSearchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    onSearch(debouncedSearchQuery);
  };

  return (
    <div>
      <input
        type="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search..."
        className="block w-full p-2 border border-gray-300 rounded"
      />
      {searchResults.length > 0 && (
        <div>
          {searchResults.map((result) => (
            <div key={result.id}>{result.name}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
