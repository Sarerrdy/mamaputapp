import { useFetchData } from "../../hooks/useApi";
import { Link } from "react-router-dom";

const OrderList = () => {
  const { data: orders, isLoading, error } = useFetchData("orders");

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading orders.</p>;

  // Filter out completed orders and group orders by status
  const receivedOrders = orders.filter((order) => order.status === "Received");
  const otherOrders = orders.filter(
    (order) =>
      order.status !== "Received" &&
      order.status !== "Delivered" &&
      order.status !== "Cancelled"
  );

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-semibold mb-4">Orders</h1>

      <h2 className="text-xl font-semibold mb-4">Received Orders</h2>
      <div className="flex flex-wrap -mx-2">
        {receivedOrders.map((order) => (
          <div
            key={order.order_id}
            className="w-full md:w-1/2 lg:w-1/4 px-2 mb-4"
          >
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">
                <strong>Order ID:</strong> {order.order_id}
              </h2>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <Link
                to={`/admin/orders/edit/${order.order_id}`}
                className="text-blue-600 hover:underline"
              >
                Change Status
              </Link>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-4">Other Orders</h2>
      <div className="flex flex-wrap -mx-2">
        {otherOrders.map((order) => (
          <div
            key={order.order_id}
            className="w-full md:w-1/2 lg:w-1/4 px-2 mb-4"
          >
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">
                <strong>Order ID:</strong> {order.order_id}
              </h2>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <Link
                to={`/admin/orders/edit/${order.order_id}`}
                className="text-blue-600 hover:underline"
              >
                Change Status
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
