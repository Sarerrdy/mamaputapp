import { useEffect } from "react";
import OrderHistory from "../features/OrderHistory";
import ProfileComponent from "../features/ProfileComponent";
import { useFetchData } from "../hooks/useApi";
import { useAuth } from "../contexts/AuthContext";
import statesAndLGAs from "../data/stateLGAList";

const Profile = () => {
  const auth = useAuth();
  const { data } = useFetchData(`orders?user_id=${auth.user.user_id}`); //fetch orders
  const { data: userAddressesData } = useFetchData(
    `addresses?user_id=${auth.user.user_id}`
  ); //fetch addresses

  //state and corresponding LGAs Array
  const stateAndLga = statesAndLGAs;

  let userOrders = [];
  if (Array.isArray(data)) {
    userOrders = data;
  } else if (typeof data === "object") {
    userOrders = [data];
  }
  let addresses = [];
  if (Array.isArray(userAddressesData)) {
    addresses = userAddressesData;
  } else if (typeof userAddressesData === "object") {
    addresses = [userAddressesData];
  }

  useEffect(() => {
    document.title = "Profile";
  }, []);
  return (
    <div className="container min-h-screen h-full bg-body-secondary">
      <div className="text-6xl text-center">User Profile</div>
      <ProfileComponent
        user={auth.user}
        address={addresses}
        stateAndLga={stateAndLga}
      />
      <OrderHistory orders={userOrders} />
    </div>
  );
};

export default Profile;
