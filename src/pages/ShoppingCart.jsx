import { useEffect } from "react";

import Cart from "../features/Cart";

export default function ShoppingCart() {
  useEffect(() => {
    document.title = "Shopping Cart";
  }, []);
  return (
    <div className="container min-h-screen h-full bg-body-secondary">
      <Cart />
    </div>
  );
}
