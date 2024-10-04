import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { OrderCtx } from "../contexts/OrderContext";

export default function OrderDetails() {
  const { getCartTotal } = useContext(CartContext);
  const auth = useAuth();
  const { returnedOrderDetails } = OrderCtx();
  const shippingCost = 500;

  return (
    <div className="container bg-body" id="order_summary">
      <div className="card  m-3">
        <div className="card-header text-success card-title fw-bold">
          Your Order was placed successfully!! Please check your order details
          below
        </div>
        <div className="card-body">
          <img className="card-img w-25" src="src/assets/images/Tick.png" />
        </div>

        <div className=" card-body">
          <div className="card-title card-header fw-bold">Order summary</div>
          <div className=" card-text">Order number: {returnedOrderDetails}</div>
          <div className=" card-text">Cost of Items: ₦ {getCartTotal()}</div>
          <div className=" card-text">Cost of delivery: ₦ {shippingCost}</div>
          <div className=" card-text text-danger fw-bold">
            Total: ₦ {getCartTotal() + shippingCost}
          </div>
          <div className=" card-text">Mode of payment: </div>
        </div>

        <div className="card-body">
          <div className="card-title card-header fw-bold">shipping summary</div>
          <div className="card-text">Shipping Address: {auth.address}</div>
          <div className="card-text">Order status: Received</div>
          <div className="card-text">Expected delivery date: No yet fixed</div>
          <div className="cartd-text mb-5">
            Thank you for shopping with us!!
          </div>
        </div>
        <div className=" card w-25 mb-3">
          <NavLink className="btn btn-lg btn-primary" to="/">
            return home
          </NavLink>
        </div>
      </div>
    </div>
  );
}
