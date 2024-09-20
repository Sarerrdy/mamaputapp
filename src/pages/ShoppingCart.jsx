// import React from 'react'

import Cart from "../features/Cart";

export default function ShoppingCart() {
  return (
    <div className=" container min-vh-100 h-100">
      <div className="text-white text-center mb-4">
        <p className=" text-lg-center font-bold uppercase">My Cart</p>
      </div>
      <Cart />
    </div>
  );
}
