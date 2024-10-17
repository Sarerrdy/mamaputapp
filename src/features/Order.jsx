import { useContext, useState, useEffect, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartContext } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { useCreateData } from "../hooks/useApi";
import { OrderCtx } from "../contexts/OrderContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFetchData } from "../hooks/useApi";
import apiClient from "../services/apiClient";
import statesAndLGAs from "../data/stateLGAList";
import AddNewAddress from "../ui/AddNewAddress";

//state and corresponding LGAs Array
const stateAndLga = statesAndLGAs;

export default function Order() {
  const { cartItems, getTotalItems, getCartTotal, orderToken, setOrderToken } =
    useContext(CartContext);
  const [disable, setDisable] = useState(false);
  const auth = useAuth();
  const { setOrderPlacedId } = OrderCtx();
  const navigate = useNavigate();

  const { data: verifyToken } = useFetchData(
    `orders?checkerToken=${orderToken}` //verify token state
  );
  const { mutateAsync, isLoading } = useCreateData("orders");
  const [loadIdentifier, setLoadIdentifier] = useState(0);
  //payment states
  const [selectedPaymentOption, setSelectedPaymentOption] =
    useState("payondelivery");
  const [selectedShippingOption, setSelectedShippingOption] =
    useState("express");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  //address states
  const [isChangingAddress, setIsChangingAddress] = useState(false);
  const [address, setAddress] = useState(auth.address);
  const [addressId, setAddressId] = useState(auth.addressId);
  const [savedAddress, setSavedAddress] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [town, setTown] = useState("");
  const [state, setState] = useState("");
  const [lga, setLga] = useState("");
  const [landmark, setLandmark] = useState("");
  //shipping states
  const [shippingStatus, setShippingStatus] = useState("");
  const [shippedDate, setShippedDate] = useState("");
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState("");
  const [shippingCost, setShippingCost] = useState(0);

  // const [newAddress, town, state, lga, landmark] = fullAddress.split(", ");

  const handleChangeAddressClick = () => {
    setIsChangingAddress((prev) => !prev);
  };

  const handleAddNewAddress = (data) => {
    const fullNewAddress = `${data.newAddress}, ${data.landmark}, ${data.town}, ${data.lga}, ${data.state}`;
    setNewAddress(data.newAddress);
    setLandmark(data.landmark);
    setTown(data.town);
    setLga(data.lga);
    setState(data.state);
    // const addr = `${data.newAddress}, ${data.town}, ${data.state}, ${data.lga}, ${data.landmark}`;
    // setFullAddress(addr);
    setAddress(fullNewAddress);
    setSavedAddress(fullNewAddress);
    setAddressId(0);
    setIsChangingAddress(false);
  };

  //payment
  const handleOptionChange = (e) => {
    setSelectedPaymentOption(e.target.value);
    setAddress(e.target.value);
  };
  //payment
  const handleShippingOptionChange = (e) => {
    setSelectedShippingOption(e.target.value);
  };
  ///Toast

  const notifyOrderSuccessful = (results) =>
    toast.success(`Your Order #${results} was placed sucessfully`, {
      position: "top-center",
      autoClose: 2000,
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

  const notifyOrderFailure = (results) =>
    toast.error(
      `Your Order placement failed with the following error ${results}`,
      {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        style: {
          backgroundColor: "#b9220e",
          color: "#fff",
        },
      }
    );

  //Generate new address
  const addresses = {
    address_id: addressId,
    address: newAddress,
    town: town,
    state: state,
    lga: lga,
    landmark: landmark,
    user_id: auth.user.user_id,
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
    await mutateAsync(
      { orders: newOrder },
      {
        onSuccess: (data) => {
          notifyOrderSuccessful(data);
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
          notifyOrderFailure(error);
        },
      }
    );
  };

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

  useEffect(() => {
    if (selectedShippingOption === "express") setShippingCost(700);
    if (selectedShippingOption === "standard") setShippingCost(500);
    if (selectedShippingOption === "pickup") setShippingCost(0);
  }, [selectedShippingOption]);

  return (
    <div className="container mx-auto max-w-screen-lg">
      <ToastContainer />
      <div className="container mx-auto p-6 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <div className="text-3xl font-bold mb-4">Order Summary</div>
          <table className="min-w-full bg-white dark:bg-gray-800">
            <tbody>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <td className="py-2 px-4 text-xl">Total number of Items:</td>
                <td className="py-2 px-4 text-xl">{getTotalItems()}</td>
              </tr>
              <tr className="bg-white dark:bg-gray-800">
                <td className="py-2 px-4 text-xl">Cost of Items:</td>
                <td className="py-2 px-4 text-xl">₦{getCartTotal()}</td>
              </tr>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <td className="py-2 px-4 text-xl">Cost of delivery:</td>
                <td className="py-2 px-4 text-xl">₦{shippingCost}</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-6 p-4 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-inner">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Total:
            </div>
            <div className="text-4xl font-extrabold text-red-600 dark:text-red-400">
              ₦{getCartTotal() + shippingCost}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
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

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <div className="text-3xl font-bold mb-4">
            Delivery Address Summary
          </div>
          <div className="text-xl mb-2">
            <strong>Address(s):</strong>
            <br />
            <br />
            <div className="space-y-4">
              <label
                htmlFor="authAddress"
                className="flex items-center cursor-pointer shadow-lg p-4 rounded bg-white border border-gray-200"
              >
                <input
                  type="radio"
                  id="authAddress"
                  value={auth.address}
                  checked={address === auth.address}
                  onChange={handleOptionChange}
                  className="form-radio h-5 w-5 text-green-600"
                />
                <span className="ml-2 text-gray-700">{auth.address}</span>
              </label>
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
                    checked={address === savedAddress}
                    onChange={handleOptionChange}
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
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
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
                onChange={handleOptionChange}
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
                onChange={handleOptionChange}
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
                onChange={handleOptionChange}
                className="form-radio h-5 w-5 text-green-600"
              />
              <span className="ml-2 text-gray-700">pay on delivery</span>
            </label>
          </div>
          {/* <button
            onClick={handleSubmit}
            className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300"
          >
            Proceed
          </button> */}
        </div>

        {/* Shipping section */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
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
              console.log("IsValid", isValid);
              if (isValid) {
                PostNewOrder({
                  order,
                  order_details,
                  addresses,
                  payments,
                  shipping_info,
                });
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
