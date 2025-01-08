import { useState, useContext, useEffect } from "react";
import { CartContext } from "../contexts/CartContext";
import MenuList from "./MenuList";

export default function MenuCard({ data }) {
  const { cartItems, getTotalItems, addToCart, removeFromCart } =
    useContext(CartContext);

  const [searchResults, setSearchResults] = useState(data);

  useEffect(() => {
    setSearchResults(data);
  }, [data]);

  const handleSearchResults = (results) => {
    setSearchResults(results.length > 0 ? results : data);
  };

  return (
    <div className="container">
      <MenuList
        data={data}
        searchResults={searchResults}
        handleSearchResults={handleSearchResults}
        cartItems={cartItems}
        getTotalItems={getTotalItems}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
      />
    </div>
  );
}
