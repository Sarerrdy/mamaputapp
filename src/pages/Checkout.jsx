import { useEffect } from "react";

import Order from "../features/Order";

export default function Checkout() {
  useEffect(() => {
    document.title = "Checkout";
  }, []);
  return (
    <div className="container min-h-screen h-full bg-body-secondary">
      <Order />
    </div>
  );
}
