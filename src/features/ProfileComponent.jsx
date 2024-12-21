import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AddNewAddress from "../ui/AddNewAddress";
import { useUpdateData, useCreateData, useDeleteData } from "../hooks/useApi";
import { useAuth } from "../contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";

const ProfileComponent = ({ user, address, stateAndLga }) => {
  //address
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState("");
  const [editingAddressId, setEditingAddressId] = useState(null); // manage edit address toggle state
  const [addressId, setAddressId] = useState(0);
  const [addresses, setAddresses] = useState(address);
  const [isChangingAddress, setIsChangingAddress] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  //phone
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [phone, setPhone] = useState(user.phone);
  const [prevPhone, setPrevPhone] = useState(phone);
  const [phoneError, setPhoneError] = useState(""); // Added state for phone error
  //password
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Added state for confirm password
  const [passwordError, setPasswordError] = useState(""); // Added state for password error

  //useApi hooks
  const { mutateAsync: updateUserAsync } = useUpdateData("users");
  const { mutateAsync: updateAddressAsync } = useUpdateData("addresses");
  const { mutateAsync: createAddressAsync } = useCreateData("addresses");
  const { mutateAsync: deleteAddressAsync } = useDeleteData("addresses");
  const auth = useAuth();

  //used by save phone and change password
  const UpdateUserData = async ({ user_id, userdata }) => {
    await updateUserAsync(
      { id: user_id, updatedData: userdata },
      {
        onSuccess: (data) => {
          auth.notifyOrderSuccessful(data.message);
          user;
        },
        onError: (error) => {
          setPhone(prevPhone); // restore previous phone in case of failure
          auth.notifyOrderFailure(error.response.data.message);
        },
      }
    );
  };

  // address
  const handleAddAddress = () => {
    setIsAddingAddress((prev) => !prev); // Toggle button
    setEditingAddress(""); // Clear the editing address state
    setEditingAddressId(null); // Clear the editing address ID
    setIsAddressModalOpen(true); // Open the modal
  };

  // const handleEditAddress = (address, editBtnId) => {
  const handleEditAddress = (address) => {
    setIsChangingAddress((prev) => !prev); // Toggle button
    if (editingAddressId === address.address_id) {
      setEditingAddressId(null); // Clear the editing address ID
      setIsAddressModalOpen(false); // Close the modal
    } else {
      setEditingAddressId(address.address_id); // Set the editing address ID
      const addressString = `${address.address}, ${address.landmark}, ${address.town}, ${address.lga}, ${address.state}`;
      setEditingAddress(addressString); // Set the editing address string
      setIsAddressModalOpen(true); // Open the modal
    }
  };

  const handleDeleteAddress = async (addr_id) => {
    try {
      const result = await deleteAddressAsync(addr_id);
      auth.notifyOrderSuccessful(result.message);
      setAddresses(addresses);
    } catch (error) {
      if (error.response && error.response.data) {
        auth.notifyOrderFailure(error.response.data.message);
      } else {
        auth.notifyOrderFailure("Unexpected error occurred.");
      }
    }
  };

  const handleSaveAddress = (data) => {
    const newAddr = {
      // address_id: addressId,
      address: data.newAddress,
      landmark: data.landmark,
      town: data.town,
      lga: data.lga,
      state: data.state,
      user_id: user.user_id,
    };
    if (addressId == 0) {
      // call useCreate address hook
      const CreateNewAddress = async (newaddress) => {
        await createAddressAsync(
          { newaddress },
          {
            onSuccess: (data) => {
              auth.notifyOrderSuccessful(data.message);
              // setAddresses([...addresses, data.data]);
              setAddresses(addresses);
            },
            onError: (error) => {
              auth.notifyOrderFailure(error.response.data.message);
            },
          }
        );
      };
      CreateNewAddress(newAddr);
      setIsAddingAddress(false);
    } else {
      // call useUpdate address hook
      const UpdateAddressData = async ({ addr_id, newAddr }) => {
        await updateAddressAsync(
          { id: addr_id, updatedData: newAddr },
          {
            onSuccess: (data) => {
              setAddresses(address);
              auth.notifyOrderSuccessful(data.message);
            },
            onError: (error) => {
              setPhone(prevPhone); // restore previous phone in case of failure
              auth.notifyOrderFailure(error.response.data.message);
            },
          }
        );
      };
      newAddr.address_id = addressId; // add address id
      UpdateAddressData({ addr_id: addressId, newAddr }); //update existing address
      setIsChangingAddress(false);
    }
    setIsAddressModalOpen(false); // Close the modal after saving
  };

  // phone
  const handlePhoneEdit = () => {
    setIsEditingPhone(!isEditingPhone);
  };

  const handlePhoneChange = (e) => {
    setPrevPhone(phone); //save previous phone
    setPhone(e.target.value);
    if (!/^\d{11}$/.test(e.target.value)) {
      setPhoneError("Phone number must be 11 digits");
    } else {
      setPhoneError("");
    }
  };

  const savePhone = () => {
    if (phoneError) {
      alert("Please correct the errors before saving");
      return;
    }
    // Save phone number logic here
    user.phone = phone;
    const user_id = user.user_id;
    UpdateUserData({ user_id, userdata: user });
    setIsEditingPhone(false);
  };

  // password
  const handlePasswordChange = () => {
    setIsChangingPassword(!isChangingPassword);
  };

  const saveNewPassword = () => {
    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirm password do not match");
      // setIsChangingPassword(false);
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      // setIsChangingPassword(false);
      return;
    }
    // Handle password save logic here
    const passwordchange = {
      currentPassword: currentPassword,
      newPassword: newPassword,
      email: user.email,
    };

    const user_id = user.user_id;
    console.log("PASSWORD: ", passwordchange);
    UpdateUserData({ user_id, userdata: passwordchange });
    setIsChangingPassword(false);
  };

  // useEffect

  useEffect(() => {
    setAddresses(address);
  }, [address]);

  return (
    <div className="container mx-auto lg:w-3/4 p-6 bg-gray-100 rounded-lg shadow-lg">
      <ToastContainer />
      <div className="mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex flex-col items-center p-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-xl rounded-lg">
          <h1 className="mt-4 text-4xl font-bold tracking-wide">
            {user.title} {user.first_name} {user.last_name}
          </h1>
          <p className="text-xl font-light">User ID: {user.user_id}</p>
          <p className="text-xl font-light">Email: {user.email}</p>
          <p className="text-xl font-light">Role: {auth.role}</p>
          <p className="text-xl font-light">Gender: {user.gender}</p>
          <p className="text-xl font-light">Joined on {user.join_date}</p>
          {isChangingPassword ? (
            <div className="mt-4 lg:w-1/2 flex flex-col items-center">
              <input
                type={"password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Current Password"
                className="text-black p-2 border rounded w-3/4 text-xl"
              />
              <input
                type={"password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                className="mt-2 text-black p-2 border rounded w-3/4 text-xl"
              />
              <input
                type={"password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="mt-2 text-black p-2 border rounded w-3/4 text-xl"
              />
              {passwordError && (
                <span className="text-red-500 mt-2">{passwordError}</span>
              )}
              <div className="mt-2 flex space-x-4">
                <button
                  onClick={saveNewPassword}
                  className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300 ease-in-out"
                >
                  Save
                </button>
                <button
                  onClick={handlePasswordChange}
                  className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition duration-300 ease-in-out"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={handlePasswordChange}
              className="mt-4 bg-indigo-700 text-white py-2 px-4 rounded-lg hover:bg-indigo-800 transition duration-300 ease-in-out transform hover:-translate-y-1 shadow-md"
            >
              Change Password
            </button>
          )}
          <div className="mt-4 w-full flex justify-center">
            {isEditingPhone ? (
              <div className="flex flex-col items-center lg:w-1/2">
                <input
                  type="number"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="text-black p-3 border rounded w-3/4 text-xl"
                />

                {phoneError && (
                  <span className="text-red-500 mt-2">{phoneError}</span>
                )}
                <div className="mt-2 flex space-x-4">
                  <button
                    onClick={savePhone}
                    className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition duration-300 ease-in-out"
                  >
                    Save
                  </button>
                  <button
                    onClick={handlePhoneEdit}
                    className="bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xl font-light">
                Phone: {phone}
                <button
                  onClick={handlePhoneEdit}
                  className="ml-4 text-white underline font-semibold hover:text-blue-200"
                >
                  Edit
                </button>
              </p>
            )}
          </div>
        </div>
        <div className="flex-row">
          <h2 className="text-4xl font-semibold m-4">Addresses</h2>
          {addresses.map((addr, index) => (
            <div
              key={index}
              className={
                index % 2 === 0
                  ? "bg-gray-100 row items-center mb-4 pl-16"
                  : "bg-white row items-center mb-4 pl-16"
              }
            >
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  {addr.address}, {addr.landmark}, {addr.town}, {addr.lga},{" "}
                  {addr.state}
                </div>
                <div className="flex space-x-2 m-4">
                  <a
                    href="#AddNewAddress"
                    // id={`editAddressBtn${index}`}
                    className="flex items-center text-primary hover:text-red-700"
                    onClick={
                      () => handleEditAddress(addr)
                      // handleEditAddress(addr, `editAddressBtn${index}`)
                    }
                  >
                    <PencilIcon className="h-6 w-6" />
                    <span className="ml-2">
                      {isChangingAddress && editingAddressId === addr.address_id
                        ? "Cancel"
                        : "Edit"}
                    </span>
                  </a>
                  <span> | </span>
                  <a
                    href="#"
                    // id={`deleteAddressBtn${index}`}
                    className="flex items-center text-red-600 hover:text-red-700"
                    onClick={() => handleDeleteAddress(addr.address_id)}
                  >
                    <TrashIcon className="h-6 w-6" />
                    <span className="ml-2">Delete</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
          <button
            className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
            onClick={handleAddAddress}
          >
            {isAddingAddress ? "Cancel" : "Add New Address"}
          </button>
        </div>
      </div>

      {(isChangingAddress && editingAddressId) || isAddingAddress ? (
        <AddNewAddress
          id="AddNewAddress"
          isOpen={isAddressModalOpen}
          onClose={() => setIsAddressModalOpen(false)}
          onSave={handleSaveAddress}
          initialAddress={editingAddress}
          stateAndLga={stateAndLga}
        />
      ) : null}
    </div>
  );
};

ProfileComponent.propTypes = {
  user: PropTypes.shape({
    user_id: PropTypes.number,
    title: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    gender: PropTypes.string,
    email: PropTypes.string,
    profilePicture: PropTypes.string,
    join_date: PropTypes.string,
    phone: PropTypes.number,
    state: PropTypes.string,
  }),
  address: PropTypes.arrayOf(
    PropTypes.shape({
      address_id: PropTypes.number,
      address: PropTypes.string,
      landmark: PropTypes.string,
      town: PropTypes.string,
      lga: PropTypes.string,
      state: PropTypes.string,
    })
  ),
  stateAndLga: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
  onSave: PropTypes.func,
  initialAddress: PropTypes.string,
};

export default ProfileComponent;
