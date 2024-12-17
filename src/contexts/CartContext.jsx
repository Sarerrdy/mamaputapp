import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  //update the initial state of cart items to the cart items gotten from the browse
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );
  // const [getfetchToken, setGetFetchToken] = useState("");
  const [orderToken, setOrderToken] = useState(
    localStorage.getItem("order_token") || ""
  );

  //add item to cart
  const addToCart = (item) => {
    const isItemInCart = cartItems.find(
      (cartItem) => cartItem.menu_id === item.menu_id
    ); // check if the item is already in the cart

    if (isItemInCart) {
      setCartItems(
        cartItems.map(
          (
            cartItem // if the item is already in the cart, increase the quantity of the item
          ) =>
            cartItem.menu_id === item.menu_id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem // otherwise, return the cart item
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]); // if the item is not in the cart, add the item to the cart
    }
  };

  //renove item from cart
  const removeFromCart = (item) => {
    const isItemInCart = cartItems.find(
      (cartItem) => cartItem.menu_id === item.menu_id
    );

    if (isItemInCart.quantity === 1) {
      setCartItems(
        cartItems.filter((cartItem) => cartItem.menu_id !== item.menu_id)
      ); // if the quantity of the item is 1, remove the item from the cart
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.menu_id === item.menu_id
            ? { ...cartItem, quantity: cartItem.quantity - 1 } // if the quantity of the item is greater than 1, decrease the quantity of the item
            : cartItem
        )
      );
    }
  };

  //clear cart

  const clearCart = () => {
    setCartItems([]); // set the cart items to an empty array
  };

  // get the total price items in cart
  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ); // calculate the total price of the items in the cart
  };

  //get the number of items
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  //persist the cart state in the browser
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  //get items from the browser
  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      setCartItems(JSON.parse(cartItems));
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
        getTotalItems,
        orderToken,
        setOrderToken,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
