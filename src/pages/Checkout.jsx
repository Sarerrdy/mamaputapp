// import React from 'react'

import Order from "../features/Order";

export default function Checkout() {
  return (
    <div className=" container min-vh-100 h-100">
      <div className="text-white bg-black text-center mt-4">
        <p className=" text-lg-center font-bold uppercase">Check Out Now!!</p>
      </div>
      <Order />
    </div>
  );
}
