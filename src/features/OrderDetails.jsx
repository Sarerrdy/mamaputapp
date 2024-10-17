// import { useContext, useEffect, useState } from "react";
import { useEffect, Fragment } from "react";
import { NavLink } from "react-router-dom";
// import { CartContext } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
// import { OrderCtx } from "../contexts/OrderContext";

export default function OrderDetails({ data, error, isLoading }) {
  // const { getCartTotal, getTotalItems } = useContext(CartContext);
  const auth = useAuth();
  const shippingCost = 500;

  let orders = [];
  if (Array.isArray(data)) {
    orders = data;
  } else if (typeof data === "object") {
    orders = [data];
  }

  // useEffect(() => {}, []);

  return (
    <div
      className="container mx-auto lg:w-3/4 p-6 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg"
      id="order_summary"
    >
      <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-lg mb-6">
        <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-4">
          Your Order was placed successfully!! Please check your order details
          below
        </div>
        <div className="flex justify-center mb-6">
          <img
            className="w-24 h-24"
            src="./images/Tick.png"
            alt="Success Tick"
          />
        </div>
      </div>
      {orders.map((order) => (
        <Fragment key={order.order_id}>
          {/* summary begins */}

          <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-6">
            <div className="text-3xl font-bold mb-4">Order Summary</div>

            <table
              className="min-w-full bg-white border dark:bg-gray-800"
              key={order.order_id}
            >
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Item</th>
                  <th className="py-2 px-4 border-b">Price</th>
                  <th className="py-2 px-4 border-b">Quantity</th>
                  <th className="py-2 px-4 border-b">Cost</th>
                </tr>
              </thead>
              <tbody>
                {order.orderdetails?.map((detail, index) => (
                  <tr
                    key={detail.order_details_id}
                    className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                  >
                    <td className="py-2 px-4 text-xl">{detail.menu.name}</td>
                    <td className="py-2 px-4 text-xl">₦ {detail.menu.price}</td>
                    <td className="py-2 px-4 text-xl">{detail.quantity}</td>
                    <td className="py-2 px-4 text-xl">
                      ₦ {detail.price * detail.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <br />
            <hr />
            <br />
            <div className="flex-row">
              <div className="row bg-white dark:bg-gray-700">
                <div className="col-sm-3 py-2 px-4 text-xl">Order number:</div>
                <div className="col py-2 px-4 text-xl">#{order.order_id}</div>
              </div>
              <div className="row bg-gray-100 dark:bg-gray-700">
                <div className="col-sm-3 py-2 px-4 text-xl">Order status:</div>
                <div className="col py-2 px-4 text-xl">{order.status}</div>
              </div>
              <div className="row bg-white dark:bg-gray-700">
                <div className="col-sm-3 py-2 px-4 text-xl">
                  Total number of Items:
                </div>
                <div className="col py-2 px-4 text-xl">
                  {order.orderdetails.reduce(
                    (total, item) => total + item.quantity,
                    0
                  )}
                </div>
              </div>
              <div className="row bg-gray-100 dark:bg-gray-800">
                <div className="col-sm-3 py-2 px-4 text-xl">Cost of Items:</div>
                <div className="col py-2 px-4 text-xl">
                  ₦ {order.total_price}
                </div>
              </div>
              <div className="row bg-white dark:bg-gray-700">
                <div className="col-sm-3 py-2 px-4 text-xl">
                  Cost of delivery:
                </div>
                <div className="col py-2 px-4 text-xl">
                  ₦ {order.shipping_info.shipping_cost}
                </div>
              </div>
              <div className="row bg-gray-100 dark:bg-gray-700">
                <div className="col-sm-3 py-2 px-4 text-xl">
                  <strong>Total cost: </strong>
                </div>
                <div className="col py-2 px-4 text-decoration-underline text-xl">
                  <strong>
                    ₦ {order.total_price + order.shipping_info.shipping_cost}
                  </strong>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-lg mb-6">
            <div className="text-3xl font-bold mb-4">Payment Summary</div>
            <div className="flex-row">
              <div className="row bg-white dark:bg-gray-700">
                <div className="col-sm-3 py-2 px-4 text-xl">Payment Id:</div>
                <div className="col py-2 px-4 text-xl">
                  {order.payment.payment_id}
                </div>
              </div>
              <div className="row bg-gray-100 dark:bg-gray-700">
                <div className="col-sm-3 py-2 px-4 text-xl">Amount:</div>
                <div className="col py-2 px-4 text-xl">
                  {order.payment.amount}
                </div>
              </div>
              <div className="row bg-white dark:bg-gray-700">
                <div className="col-sm-3 py-2 px-4 text-xl">
                  Mode of payment:
                </div>
                <div className="col py-2 px-4 text-xl">
                  {order.payment.payment_Method}
                </div>
              </div>
              <div className="row bg-gray-100 dark:bg-gray-700">
                <div className="col-sm-3 py-2 px-4 text-xl">
                  Payment Status:
                </div>
                <div className="col py-2 px-4 text-xl">
                  {order.payment.payment_status}
                </div>
              </div>
              {order.payment.payment_status === "received" ? (
                <div className="row bg-white dark:bg-gray-700">
                  <div className="col-sm-3 py-2 px-4 text-xl">
                    Payment date:
                  </div>
                  <div className="col py-2 px-4 text-xl">
                    {order.payment.payment_date}
                  </div>
                </div>
              ) : (
                <div className="row bg-white dark:bg-gray-700">
                  <div className="col-sm-3 py-2 px-4 text-xl">
                    Payment date:
                  </div>
                  <div className="col py-2 px-4 text-xl">Pending</div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-lg mb-6">
            <div className="text-3xl font-bold mb-4">Shipping Summary</div>
            <div className="flex-row ">
              <div className="row bg-white dark:bg-gray-700">
                <div className="col-sm-3 py-2 px-4 text-xl">Shipping Id:</div>
                <div className="col py-2 px-4 text-xl">
                  {order.shipping_info.shipping_info_id}
                </div>
              </div>
              <div className="row bg-gray-100 dark:bg-gray-700">
                <div className="col-sm-3 py-2 px-4 text-xl">
                  Shipping Address:
                </div>
                <div className="col py-2 px-4 text-xl">
                  {order.shipping_info.address.address +
                    ", " +
                    order.shipping_info.address.landmark +
                    ", " +
                    order.shipping_info.address.town +
                    ", " +
                    order.shipping_info.address.lga +
                    ", " +
                    order.shipping_info.address.state}
                </div>
              </div>
              <div className="row bg-white dark:bg-gray-700">
                <div className="col-sm-3 py-2 px-4 text-xl">
                  Shipping Method:
                </div>
                <div className="col py-2 px-4 text-xl">
                  {order.shipping_info.shipping_Method}
                </div>
              </div>
              <div className="row bg-gray-100 dark:bg-gray-700">
                <div className="col-sm-3 py-2 px-4 text-xl">
                  Shipping status:
                </div>
                <div className="col py-2 px-4 text-xl">
                  {order.shipping_info.shipping_status}
                </div>
              </div>
              {order.shipping_info.shipping_status === "shipped" ? (
                <div className="row bg-white dark:bg-gray-700">
                  <div className="col-sm-3 py-2 px-4 text-xl">
                    Date shipped:
                  </div>
                  <div className="col py-2 px-4 text-xl">
                    {order.shipping_info.shipped_date}
                  </div>
                </div>
              ) : (
                <div className="row bg-white dark:bg-gray-700">
                  <div className="col-sm-3 py-2 px-4 text-xl">
                    Date shipped:
                  </div>
                  <div className="col py-2 px-4 text-xl">Pending</div>
                </div>
              )}

              <div className="row bg-gray-100 dark:bg-gray-700">
                <div className="col-sm-3 py-2 px-4 text-xl">
                  Expected date of delivery:
                </div>
                <div className="col py-2 px-4 text-xl">
                  {order.shipping_info.expected_delivery_date}
                </div>
              </div>
            </div>

            <div className="bg-white text-2xl mt-4">
              Thank you for shopping with us!!
            </div>
          </div>
        </Fragment>
      ))}
      <div className="flex justify-center">
        <NavLink
          className="px-6 py-3 bg-blue-600 text-white text-lg font-bold uppercase rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
          to="/"
        >
          Return Home
        </NavLink>
      </div>
    </div>
  );
}
