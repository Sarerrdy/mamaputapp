import { createContext, useState, useContext } from "react";

const OrderContext = createContext();

export const OrderCtx = () => {
  return useContext(OrderContext);
};

//Define ctx provider
export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [orderPlacedId, setOrderPlacedId] = useState(0);

  return (
    <OrderContext.Provider
      value={{
        orders,
        setOrders,
        orderPlacedId,
        setOrderPlacedId,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
