import { createContext, useState, useContext } from "react";
import { useCreateData } from "../hooks/useApi";

const OrderContext = createContext();

export const OrderCtx = () => {
  return useContext(OrderContext);
};

//Define ctx provider
export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [returnedOrderDetails, setReturnedOrderDetails] = useState(null);

  const createOrderMutation = useCreateData("orders");

  //post orders
  const postOrder = async (newOrder) => {
    setOrders(newOrder);
    const data = await createOrderMutation.mutateAsync({
      orders: newOrder,
    });
    setReturnedOrderDetails(data);
  };

  return (
    <OrderContext.Provider
      value={{
        postOrder,
        orders,
        returnedOrderDetails,
        setReturnedOrderDetails,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
