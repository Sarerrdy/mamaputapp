import { useEffect } from "react";
import OrderDetails from "../features/OrderDetails";
import { OrderCtx } from "../contexts/OrderContext";
import { useFetchData } from "../hooks/useApi";
import { useNavigate } from "react-router-dom";

export default function OrderSummary() {
  const { orderPlacedId } = OrderCtx();
  const { data, error, isLoading } = useFetchData(`orders/${orderPlacedId}`);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      return (
        <div className="container min-h-screen h-full bg-body-secondary">
          <span className="flex-row">
            Something went wrong!! Here is the error: {error}
          </span>
          <span className="flex-row">
            <strong>
              Attention: Kindly check your order history before placing this
              order again!!!
            </strong>
          </span>
          {
            setTimeout(() => {
              navigate("/");
            }, 2000) // 1000 milliseconds = 1 seconds
          }
        </div>
      );
    }

    if (!orderPlacedId || orderPlacedId === 0) {
      return navigate("/");
    }
  }, [error, navigate, orderPlacedId]);

  return (
    <div className="container min-h-screen h-full bg-body-secondary">
      <OrderDetails
        data={data}
        error={error}
        isLoading={isLoading}
      ></OrderDetails>
    </div>
  );
}
