import PropTypes from "prop-types";
import { Spinner } from "react-bootstrap";
import MenuItem from "./MenuItem";
import SearchBox from "../ui/SearchBox";
import { NavLink } from "react-router-dom";

const MenuList = ({
  data,
  error,
  isLoading,
  searchResults,
  handleSearchResults,
  cartItems,
  getTotalItems,
  addToCart,
  removeFromCart,
}) => {
  if (!data) {
    return (
      <div className="flex justify-center h-screen p-24">
        <Spinner className="w-24 h-24" />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center H-screen p-24">
        <Spinner className="w-24 h-24" />
      </div>
    );
  }

  if (error) {
    return <div className=" container-fluid">Error: {error.message}</div>;
  }

  return (
    <div className="container">
      <div className="flex justify-between items-center px-20">
        <h1 className="text-2xl uppercase font-bold mt-10 text-center mb-10">
          Shop
        </h1>
        <nav className="navbar navbar-light badge">
          <NavLink className="badge text-lg text-dark" to="/shoppingcart">
            Cart ({getTotalItems()})
          </NavLink>
        </nav>
      </div>
      <SearchBox
        menus={data && Array.isArray(data) ? data : []}
        onSearchResults={handleSearchResults}
      />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {searchResults?.map((menu) => (
          <MenuItem
            key={menu.menu_id}
            menu={menu}
            cartItems={cartItems}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        ))}
      </div>
    </div>
  );
};

MenuList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  error: PropTypes.string,
  isLoading: PropTypes.bool,
  searchResults: PropTypes.arrayOf(PropTypes.object),
  handleSearchResults: PropTypes.func.isRequired,
  cartItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  getTotalItems: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

export default MenuList;
