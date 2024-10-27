import { useContext, useState, useEffect, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartContext } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { useCreateData } from "../hooks/useApi";
import { OrderCtx } from "../contexts/OrderContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFetchData } from "../hooks/useApi";
import apiClient from "../services/apiClient";
import statesAndLGAs from "../data/stateLGAList";
import AddNewAddress from "../ui/AddNewAddress";

//state and corresponding LGAs Array
const stateAndLga = statesAndLGAs;

export default function Order() {
  //general context, states, and hooks
  const auth = useAuth();
  const navigate = useNavigate();

  const { cartItems, getTotalItems, getCartTotal, orderToken, setOrderToken } =
    useContext(CartContext); //cart states

  const [disable, setDisable] = useState(false); // make an order button state

  auth.setReturnUrl("/"); // return home after completing order

  const { setOrderPlacedId } = OrderCtx(); //order id use to view fetch order details

  const { data: verifyToken } = useFetchData(
    `orders?checkerToken=${orderToken}`
  ); //verify token to manage order state

  const { mutateAsync: CreateAnOrderAsync, isLoading } =
    useCreateData("orders"); // create order hook

  const [loadIdentifier, setLoadIdentifier] = useState(0); //use to track page reload

  //payment states
  const [selectedPaymentOption, setSelectedPaymentOption] =
    useState("payondelivery");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [paymentDate, setPaymentDate] = useState("");

  //address states
  const [isChangingAddress, setIsChangingAddress] = useState(false);
  const [addressesArr] = useState(auth.addresses); // fetch list of user addresses from context
  const [addressId, setAddressId] = useState(0); // use to track new or existing address
  const [savedAddress, setSavedAddress] = useState(""); // manage newly generated address
  const [rawNewAddressData, setRawNewAddressData] = useState(""); // use to re-assign selected shipping address

  // selected address for shipping
  const [newAddress, setNewAddress] = useState("");
  const [town, setTown] = useState("");
  const [state, setState] = useState("");
  const [lga, setLga] = useState("");
  const [landmark, setLandmark] = useState("");

  const [selectedAddress, setSelectedAddress] = useState(""); // manage selected address state

  //shipping states
  const [selectedShippingOption, setSelectedShippingOption] =
    useState("express");
  const [shippingStatus, setShippingStatus] = useState("");
  const [shippedDate, setShippedDate] = useState("");
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState("");
  const [shippingCost, setShippingCost] = useState(0);

  //hides and unhides addNewAddress componet
  const handleChangeAddressClick = () => {
    setIsChangingAddress((prev) => !prev);
  };

  //handle new address generation
  const handleAddNewAddress = (data) => {
    const fullNewAddress = `${data.newAddress}, ${data.landmark}, ${data.town}, ${data.lga}, ${data.state}`;

    setAddressId(0);
    setNewAddress(data.newAddress);
    setLandmark(data.landmark);
    setTown(data.town);
    setLga(data.lga);
    setState(data.state);

    setRawNewAddressData(data); // use to re-format selected shipping address
    setSelectedAddress(fullNewAddress);
    setSavedAddress(fullNewAddress);
    setAddressId(0);
    setIsChangingAddress(false);
  };

  // handles changes in group of adresses radio button
  const handleAddressOptionChange = (e) => {
    setSelectedAddress(e.target.value);
  };

  //Generate new address
  const orderAddress = {
    address_id: addressId,
    address: newAddress,
    town: town,
    state: state,
    lga: lga,
    landmark: landmark,
    user_id: auth.user.user_id,
  };

  //handle changes in payment group of radio button
  const handlePaymentOptionChange = (e) => {
    setSelectedPaymentOption(e.target.value);
  };

  //handle changes in shipping group of radio button
  const handleShippingOptionChange = (e) => {
    setSelectedShippingOption(e.target.value);
  };

  //Generate payment details
  const payments = {
    payment_Method: selectedPaymentOption,
    amount: getCartTotal() + shippingCost,
    payment_status: paymentStatus,
    payment_date: paymentDate,
    order_id: 0,
  };

  //Generate shipping
  const shipping_info = {
    shipping_Method: selectedShippingOption,
    shipping_cost: shippingCost,
    shipping_status: shippingStatus,
    shipped_date: shippedDate,
    expected_delivery_date: expectedDeliveryDate,
    order_id: 0,
    address_id: 0,
  };

  //initialize shipping and payment state
  const shippingAndPaymentStateInitializer = useCallback(async () => {
    setPaymentDate("");
    setPaymentStatus("Pending");
    setShippingStatus("Pending");
    setShippedDate("");
    setExpectedDeliveryDate("");
  }, [
    setExpectedDeliveryDate,
    setPaymentDate,
    setPaymentStatus,
    setShippedDate,
    setShippingStatus,
  ]);

  // create orderDetails from cartItems
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

  //Generate an order
  let order = {
    total_price: getCartTotal(),
    status: "order received",
    user_id: auth.user.user_id,
  };

  //post a new order
  const PostNewOrder = async (newOrder) => {
    await CreateAnOrderAsync(
      { orders: newOrder },
      {
        onSuccess: (data) => {
          auth.notifyOrderSuccessful(
            `order was successfully placed with order number #${data}`
          );
          setDisable(true);
          setOrderPlacedId(data);
          setOrderToken("");
          localStorage.removeItem("order_token");
          localStorage.removeItem("cartItems");
          setTimeout(() => {
            navigate("/OrderSummary");
          }, 1000); // 1000 milliseconds = 1 seconds
        },
        onError: (error) => {
          auth.notifyOrderFailure(
            `order failed with the following error: ${error}`
          );
        },
      }
    );
  };

  // fetch and handle token to track an order session
  const verifyOrderToken = useCallback(async () => {
    try {
      const response = await apiClient.get(`orders?checkerToken=${orderToken}`);

      const verifiedStatus = response.data;
      if (orderToken && verifiedStatus !== undefined) {
        setDisable(false);
      } else {
        setDisable(true);
        navigate("/ShoppingCart");
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      setDisable(true);
      navigate("/ShoppingCart");
    }
  }, []);

  useEffect(() => {
    setLoadIdentifier((prev) => prev + 1); // Update the identifier on each load
  }, []);

  useEffect(() => {
    shippingAndPaymentStateInitializer();
    verifyOrderToken();
  }, [verifyOrderToken, loadIdentifier, shippingAndPaymentStateInitializer]); // Depend on loadIdentifier to force re-run

  //Temporarily sets the shipping price
  useEffect(() => {
    if (selectedShippingOption === "express") setShippingCost(700);
    if (selectedShippingOption === "standard") setShippingCost(500);
    if (selectedShippingOption === "pickup") setShippingCost(0);
  }, [selectedShippingOption]);

  return (
    <div className="container mx-auto max-w-screen-lg">
      <ToastContainer />
      <div className="container mx-auto p-6 bg-gray-100  rounded-lg shadow-lg">
        <div className="bg-white overflow-x-auto  p-6 rounded-lg shadow-md mb-6">
          <div className="text-3xl font-bold mb-4">Order Summary</div>

          {/* <div className="text-3xl font-bold mb-4">Order Summary</div> */}

          <table className="min-w-full bg-white border " key={order.order_id}>
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Item</th>
                <th className="py-2 px-4 border-b">Price</th>
                <th className="py-2 px-4 border-b">Quantity</th>
                <th className="py-2 px-4 border-b">Cost</th>
              </tr>
            </thead>
            <tbody>
              {cartItems?.map((item, index) => (
                <tr
                  key={item.order_details_id}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="py-2 px-4 text-xl">{item.name}</td>
                  <td className="py-2 px-4 text-xl">₦ {item.price}</td>
                  <td className="py-2 px-4 text-xl">{item.quantity}</td>
                  <td className="py-2 px-4 text-xl">
                    ₦ {item.price * item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <br />
          <br />

          <div className="lg:w-1/3">
            <table className="min-w-full bg-white ">
              <tbody>
                <tr className="bg-gray-100 ">
                  <td className="py-2 px-4 text-xl">Total number of Items:</td>
                  <td className="py-2 px-4 text-xl">
                    <strong>{getTotalItems()}</strong>
                  </td>
                </tr>
                <tr className="bg-white ">
                  <td className="py-2 px-4 text-xl">Cost of Items:</td>
                  <td className="py-2 px-4 text-xl">
                    <strong>₦{getCartTotal()}</strong>
                  </td>
                </tr>
                <tr className="bg-gray-100 ">
                  <td className="py-2 px-4 text-xl">Cost of delivery:</td>
                  <td className="py-2 px-4 text-xl">
                    <strong>₦{shippingCost}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-6 p-4 bg-gray-200  rounded-lg shadow-inner">
            <div className="text-2xl font-bold text-gray-900 ">Total:</div>
            <div className="text-4xl font-extrabold text-red-600">
              ₦{getCartTotal() + shippingCost}
            </div>
          </div>
        </div>

        <div className="bg-white  p-6 rounded-lg shadow-md mb-6">
          <div className="text-3xl font-bold mb-4">Changed your mind?</div>
          <NavLink
            className={`px-4 py-2  text-white text-base font-bold uppercase rounded ${
              disable
                ? "bg-gray-400"
                : "bg-blue-600 hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
            } m-3 w-1/4`}
            to="/shoppingcart"
            style={{
              pointerEvents: disable ? "none" : "auto",
            }}
            disabled={disable}
          >
            Modify Cart Now
          </NavLink>
        </div>

        {/* address section */}

        <div className="bg-white  p-6 rounded-lg shadow-md mb-6">
          <div className="text-3xl font-bold mb-4">
            Delivery Address Summary
          </div>
          <div className="text-xl mb-2">
            <strong>Addresses:</strong>
            <br />
            <br />
            <div className="space-y-4">
              {addressesArr?.map((addr, index) => (
                <label
                  key={index}
                  htmlFor={`authAddress${index}`}
                  className="flex items-center cursor-pointer shadow-lg p-4 rounded bg-white border border-gray-200"
                >
                  <input
                    type="radio"
                    id={`authAddress${index}`}
                    name="authAddress"
                    value={addr.address}
                    checked={selectedAddress === addr.address}
                    onChange={handleAddressOptionChange}
                    onClick={() => {
                      setAddressId(addr.address_id);
                      setNewAddress(addr.address);
                      setLandmark(addr.landmark);
                      setTown(addr.town);
                      setLga(addr.lga);
                      setState(addr.state);
                    }}
                    className="form-radio h-5 w-5 text-green-600"
                  />
                  <span className="ml-2 text-gray-700">
                    {`${addr.address}, ${addr.landmark}, ${addr.town}, ${addr.lga}, ${addr.state}`}
                  </span>
                </label>
              ))}

              <br />
              {savedAddress && (
                <label
                  htmlFor="savedAddress"
                  className="flex items-center cursor-pointer shadow-lg p-4 rounded bg-white border border-gray-200"
                >
                  <input
                    type="radio"
                    id="savedAddress"
                    value={savedAddress}
                    checked={selectedAddress === savedAddress}
                    onChange={handleAddressOptionChange}
                    onClick={() => {
                      setAddressId(0);
                      setNewAddress(rawNewAddressData.newAddress);
                      setLandmark(rawNewAddressData.landmark);
                      setTown(rawNewAddressData.town);
                      setLga(rawNewAddressData.lga);
                      setState(rawNewAddressData.state);
                    }}
                    className="form-radio h-5 w-5 text-green-600"
                  />
                  <span className="ml-2 text-gray-700">{savedAddress}</span>
                </label>
              )}
            </div>
            <br />
          </div>
          <div className="text-xl mb-4">
            <strong> Do you want to ship to a different address?</strong>
          </div>
          <button
            className={`px-4 py-2 text-white text-base font-bold uppercase rounded ${
              disable
                ? "bg-gray-500"
                : "bg-blue-600 hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
            } m-3 w-1/4`}
            disabled={disable}
            onClick={handleChangeAddressClick}
          >
            {isChangingAddress ? "Cancel" : "Change Address"}
          </button>
          {isChangingAddress && (
            <AddNewAddress
              stateAndLga={stateAndLga}
              onSave={handleAddNewAddress}
              initialAddress={savedAddress}
            />
          )}
        </div>

        {/* payment section */}
        <div className="bg-white  p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-3xl font-bold mb-4">Choose Method of Payment</h2>
          <div>
            <label
              htmlFor="creditCard"
              className="flex items-center cursor-pointer"
            >
              <input
                type="radio"
                id="creditCard"
                value="Credit Card"
                checked={selectedPaymentOption === "Credit Card"}
                onChange={handlePaymentOptionChange}
                className="form-radio h-5 w-5 text-green-600"
                disabled
              />
              <span className="ml-2 text-gray-700">Credit Card</span>
            </label>
          </div>

          <div>
            <label
              htmlFor="bankTransfer"
              className="flex items-center cursor-pointer"
            >
              <input
                type="radio"
                id="bankTransfer"
                value="Bank Transfer"
                checked={selectedPaymentOption === "Bank Transfer"}
                onChange={handlePaymentOptionChange}
                className="form-radio h-5 w-5 text-green-600"
                disabled
              />
              <span className="ml-2 text-gray-700">Bank Transfer</span>
            </label>
          </div>

          <div>
            <label
              htmlFor="payondelivery"
              className="flex items-center cursor-pointer"
            >
              <input
                type="radio"
                id="payondelivery"
                value="payondelivery"
                checked={selectedPaymentOption === "payondelivery"}
                onChange={handlePaymentOptionChange}
                className="form-radio h-5 w-5 text-green-600"
              />
              <span className="ml-2 text-gray-700">pay on Delivery</span>
            </label>
          </div>
        </div>

        {/* Shipping section */}
        <div className="bg-white  p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-3xl font-bold mb-4">Choose shipping Method</h2>
          <div>
            <label
              htmlFor="pickup"
              className="flex items-center cursor-pointer"
            >
              <input
                type="radio"
                id="pickup"
                value="pickup"
                checked={selectedShippingOption === "pickup"}
                onChange={handleShippingOptionChange}
                className="form-radio11 h-5 w-5 text-green-600"
              />
              <span className="ml-2 text-gray-700">Pickup</span>
            </label>
          </div>

          <div>
            <label
              htmlFor="standard"
              className="flex items-center cursor-pointer"
            >
              <input
                type="radio"
                id="standard"
                value="standard"
                checked={selectedShippingOption === "standard"}
                onChange={handleShippingOptionChange}
                className="form-radio h-5 w-5 text-green-600"
              />
              <span className="ml-2 text-gray-700">Standard delivery</span>
            </label>
          </div>

          <div>
            <label
              htmlFor="express"
              className="flex items-center cursor-pointer"
            >
              <input
                type="radio"
                id="express"
                value="express"
                checked={selectedShippingOption === "express"}
                onChange={handleShippingOptionChange}
                className="form-radio h-5 w-5 text-green-600"
              />
              <span className="ml-2 text-gray-700">Express delivery</span>
            </label>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            className={`px-8 py-2 text-white text-lg font-bold uppercase rounded ${
              disable
                ? "bg-gray-400"
                : "bg-green-600 hover:bg-green-500 focus:outline-none focus:bg-red-500"
            } m-3 w-1/4`}
            onClick={() => {
              const isValid = verifyToken;
              if (isValid) {
                if (orderAddress.address) {
                  PostNewOrder({
                    order,
                    order_details,
                    orderAddress,
                    payments,
                    shipping_info,
                  });
                } else {
                  auth.notifyOrderFailure(
                    "Please select or add a delivery address!!"
                  );
                }
              } else {
                navigate("/ShoppingCart");
              }
            }}
            disabled={disable}
          >
            {console.log("isLoading", isLoading)}
            {isLoading == true ? "processing..." : "proceed"}
          </button>
        </div>
      </div>
    </div>
  );
}
