import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { OrderCtx } from "../contexts/OrderContext";
import { useAuth } from "../contexts/AuthContext";

const OrderHistory = ({ orders }) => {
  const { setOrderPlacedId } = OrderCtx();
  const auth = useAuth();
  // const completedOrders = orders.filter(
  //   (order) => order.status === "completed"
  // );
  // const currentOrders = orders.filter((order) => order.status !== "completed");

  return (
    <div className="container mx-auto overflow-x-auto lg:w-3/4 p-6 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold mb-4">Order History</h2>
      <table className="min-w-full bg-white border mb-6">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Order Id</th>
            <th className="py-2 px-4 border-b">Total Price</th>
            <th className="py-2 px-4 border-b">Order Status</th>
            <th className="py-2 px-4 border-b">Date Ordered</th>
            <th className="py-2 px-4 border-b">Expected Date of Delivery</th>
            <th className="py-2 px-4 border-b">view details</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.order_id}>
              <td className="py-2 px-4 text-xl">{order.order_id}</td>
              <td className="py-2 px-4 text-xl">₦ {order.total_price}</td>
              <td className="py-2 px-4 text-xl">{order.status}</td>
              <td className="py-2 px-4 text-xl">{order.date_ordered}</td>
              <td className="py-2 px-4 text-xl">
                {order.expected_date_of_delivery}
              </td>
              <td className="py-2 px-4 text-xl">
                <NavLink
                  onClick={() => {
                    setOrderPlacedId(order.order_id);
                    auth.setReturnUrl(window.location.pathname);
                  }}
                  to="/OrderSummary"
                >
                  view details
                </NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

OrderHistory.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      order_id: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default OrderHistory;
