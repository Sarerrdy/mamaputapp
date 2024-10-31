import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OrderDetails from "../features/OrderDetails";
import { OrderCtx } from "../contexts/OrderContext";
import { useFetchData } from "../hooks/useApi";
import { useAuth } from "../contexts/AuthContext";

export default function OrderSummary() {
  const { orderPlacedId } = OrderCtx();
  const { data, error, isLoading } = useFetchData(`orders/${orderPlacedId}`);
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    if (!orderPlacedId || orderPlacedId === 0) {
      return navigate("/");
    }
  }, [auth.returnUrl, error, navigate, orderPlacedId]);

  return (
    <div className="container min-h-screen h-full bg-body-secondary">
      <OrderDetails
        data={data}
        error={error}
        isLoading={isLoading}
      ></OrderDetails>
      <div className="flex justify-center">
        {auth.returnUrl === "/profile" ? "" : auth.setReturnUrl("/")}
        <a
          className="px-6 py-3 bg-blue-600 text-white text-lg font-bold uppercase rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
          href={auth.returnUrl}
        >
          {auth.returnUrl === "/profile" ? "Return to Profile" : "Return Home"}
        </a>
      </div>
    </div>
  );
}
