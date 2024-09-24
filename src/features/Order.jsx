import { useContext } from "react";
import { NavLink } from "react-router-dom";
// import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartContext } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Order() {
  const { cartItems, getCartTotal } = useContext(CartContext);
  const auth = useAuth();

  const shippingCost = 500;

  return (
    <>
      <div className="container bg-body">
        <div className="card  m-3">
          <div className="card-title card-header fw-bold"> Order summary</div>
          <div className=" card-body">
            <div className=" card-text">
              Total number of Items: {cartItems.length}
            </div>
            <div className=" card-text">Cost of Items: ₦ {getCartTotal()}</div>
            <div className=" card-text">Cost of delivery: ₦ {shippingCost}</div>
            <div className=" card-text text-danger fw-bold">
              Total: ₦ {getCartTotal() + shippingCost}
            </div>
          </div>
        </div>
        <div className="card  m-3">
          <div className=" card-title card-header fw-bold">
            {" "}
            Delivery Address summary
          </div>
          <div className=" card-body">
            <div className=" card-text">
              <strong>Address:</strong> {auth.address}
            </div>
            <div className=" card-text mt-2">
              Do you want to ship to a different address?
            </div>
            <di>
              <button className="btn btn-primary">change address</button>
            </di>
          </div>
        </div>
        <div className="card  m-3">
          <div className=" card-header card-title fw-bold">
            {" "}
            Changed your mind?
          </div>
          <div className=" card-body">
            <div className=" card-text">
              <NavLink className="btn btn-primary" to="/shoppingcart">
                modify cart now
              </NavLink>
            </div>
          </div>
        </div>

        <div className="card">
          <button className="btn btn-danger btn-lg m-3 w-25">
            confirm order
          </button>
        </div>
      </div>

      <div className="container bg-body" id="order_summary" hidden>
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
            <div className=" card-text">Order number: </div>
            <div className=" card-text">Cost of Items: ₦ {getCartTotal()}</div>
            <div className=" card-text">Cost of delivery: ₦ {shippingCost}</div>
            <div className=" card-text text-danger fw-bold">
              Total: ₦ {getCartTotal() + shippingCost}
            </div>
            <div className=" card-text">Mode of payment: </div>
          </div>

          <div className="card-body">
            <div className="card-title card-header fw-bold">
              shipping summary
            </div>
            <div className="card-text">Shipping Address: {auth.address}</div>
            <div className="card-text">Order status: </div>
            <div className="card-text">Expected delivery date: </div>
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
    </>
  );
}
