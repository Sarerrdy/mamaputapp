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
  const { cartItems, getCartTotal, orderToken, setOrderToken } =
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
  const shippingCost = 500;
  const [selectedPaymentOption, setSelectedPaymentOption] =
    useState("payondelivery");
  const [isChangingAddress, setIsChangingAddress] = useState(false);
  const [address, setAddress] = useState(auth.address);
  const [savedAddress, setSavedAddress] = useState("");

  const handleChangeAddressClick = () => {
    setIsChangingAddress((prev) => !prev);
  };

  const handleAddNewAddress = (fullNewAddress) => {
    setAddress(fullNewAddress);
    setSavedAddress(fullNewAddress);
    setIsChangingAddress(false);
  };

  //payment
  const handleOptionChange = (e) => {
    setSelectedPaymentOption(e.target.value);
    setAddress(e.target.value);
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

  // fetch order details from cartItems
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

  //ready order item
  let order = {
    total_price: getCartTotal(),
    status: "available",
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
          setTimeout(() => {
            setOrderToken("");
            localStorage.removeItem("order_token");
            navigate("/OrderSummary");
          }, 2000); // 2000 milliseconds = 2 seconds
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
      console.log("useFetchApi-VERIFIED: ", response.data);
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
  }, [navigate, orderToken]);

  useEffect(() => {
    setLoadIdentifier((prev) => prev + 1); // Update the identifier on each load
  }, []);

  useEffect(() => {
    verifyOrderToken();
  }, [verifyOrderToken, loadIdentifier]); // Depend on loadIdentifier to force re-run

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
                <td className="py-2 px-4 text-xl">{cartItems.length}</td>
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
        {/* address section */}

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <div className="text-3xl font-bold mb-4">
            Delivery Address Summary
          </div>
          <div className="text-xl mb-2">
            <strong>Address(s):</strong>
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
                PostNewOrder({ order, order_details });
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
