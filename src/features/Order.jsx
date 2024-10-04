import { useContext, useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
// import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartContext } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { OrderCtx } from "../contexts/OrderContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderDetails from "./OrderDetails";

export default function Order() {
  const { cartItems, getCartTotal } = useContext(CartContext);
  const [disable, setDisable] = useState(false);
  const hasExecuted = useRef(false);
  const auth = useAuth();
  const { postOrder, returnedOrderDetails } = OrderCtx();

  const shippingCost = 500;

  const notifyOrderSuccessful = (results) =>
    toast.success(`Your Order #${results} was placed sucessfully`, {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      style: {
        backgroundColor: "#05b858",
        color: "#ffffff",
      },
    });

  // const allnotifyRemovedFromCart = (results) =>
  //   toast.error(`something whent wrong..Your order wan not sucessful!!`, {
  //     position: "top-center",
  //     autoClose: 2000,
  //     hideProgressBar: true,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     theme: "colored",
  //     style: {
  //       backgroundColor: "#b9220e",
  //       color: "#fff",
  //     },
  //   });

  // let today = new Date();
  // let date =
  //   today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  // let time =
  //   "T" +
  //   today.getHours() +
  //   ":" +
  //   today.getMinutes() +
  //   ":" +
  //   today.getSeconds();
  // let dateTime = date + " " + time;

  // fetch order details from cartItems
  let order_details = [];
  cartItems.map((cartItem) => {
    order_details.push({
      // order_details_id: "",
      quantity: cartItem.quantity,
      discount: 0,
      price: cartItem.price,
      menu_id: cartItem.menu_id,
      order_id: 0,
    });
  });

  //ready order item
  let order = {
    // order_id: "",
    total_price: getCartTotal(),
    // date_ordered: dateTime,
    // expected_date_of_delivery: "",
    status: "available",
    user_id: auth.user.user_id,
  };

  useEffect(() => {
    if (returnedOrderDetails !== null && !hasExecuted.current) {
      notifyOrderSuccessful(returnedOrderDetails);
      setDisable(true);
      hasExecuted.current = true;
    } else if (returnedOrderDetails !== null) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [returnedOrderDetails]);

  console.log("orderDetails: ", returnedOrderDetails);

  return (
    <>
      <div className="container bg-body">
        <ToastContainer />
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
            <div>
              <button className="btn btn-primary">change address</button>
            </div>
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
          <button
            className="btn btn-danger btn-lg m-3 w-25"
            onClick={() => {
              if (returnedOrderDetails === null)
                postOrder({ order, order_details });
            }}
            disabled={disable}
          >
            {returnedOrderDetails == null ? "submit order" : "order submitted"}
          </button>
        </div>
      </div>
      <div>{returnedOrderDetails != null && <OrderDetails />}</div>
      {/* <div>{isVisible ? <OrderDetails /> : <></>}</div> */}
    </>
  );
}
