import { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartContext } from "../hooks/CartProviderHook";

const ShoppingCart = () => {
  const { cart } = useContext(CartContext);

  // const addToCart = (item) => {
  //   setCart([...cart, item]);
  // };

  return (
    <div className="container text-white">
      <h1>Shopping Cart</h1>
      <div className="row">
        {/* <div className="col-md-8">
          <h2>Products</h2>
          <button
            onClick={() => addToCart("Product 1")}
            className="btn btn-primary"
          >
            Add Product 1
          </button>
          <button
            onClick={() => addToCart("Product 2")}
            className="btn btn-primary"
          >
            Add Product 2
          </button>
        </div> */}
        <div className="col-md-4">
          <h2>Cart</h2>
          <ul className="list-group">
            {cart.map((item, index) => (
              <li key={index} className="list-group-item">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
