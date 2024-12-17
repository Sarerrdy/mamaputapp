import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchData, useUpdateData } from "../../hooks/useApi";
import { useAuth } from "../../contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderEdit = () => {
  const { order_id } = useParams();
  const id = order_id;
  const auth = useAuth();
  const navigate = useNavigate();
  const { data: order, refetch } = useFetchData(`orders/${id}`);
  const { mutateAsync: updateOrder } = useUpdateData("orders");

  const [formState, setFormState] = useState({
    status: "",
  });

  useEffect(() => {
    if (order) {
      setFormState({
        status: order.status,
      });
    }
  }, [order]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let updatedData = { ...formState };

    await updateOrder(
      { id, updatedData },
      {
        onSuccess: () => {
          auth.notifyOrderSuccessful("Order status updated successfully");
          refetch();
        },
        onError: (error) => {
          const errorMessage =
            error.response?.data?.message || "An error occurred";
          auth.notifyOrderFailure(errorMessage);
        },
      }
    );

    setTimeout(() => {
      navigate("/admin/orders");
    }, 1000);
  };

  if (!order) return <p>Loading...</p>;

  return (
    <div className="container mx-auto py-6">
      <ToastContainer />
      <h1 className="text-2xl font-semibold mb-4">Change Order Status</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Status</label>
          <select
            name="status"
            value={formState.status}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="Received">Received</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded"
        >
          Update Status
        </button>
      </form>
    </div>
  );
};

export default OrderEdit;
