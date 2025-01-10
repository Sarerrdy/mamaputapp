import { useEffect } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

function AddNewAddress({ stateAndLga, onSave, initialAddress }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // Load initial address from props or localStorage
    const savedAddress = JSON.parse(localStorage.getItem("addressForm"));
    if (initialAddress) {
      const [newAddress, landmark, town, lga, state] =
        initialAddress.split(", ");
      setValue("newAddress", newAddress);
      setValue("landmark", landmark);
      setValue("town", town);
      setValue("state", state);
      setValue("lga", lga);
    } else if (savedAddress) {
      setValue("newAddress", savedAddress.newAddress);
      setValue("landmark", savedAddress.landmark);
      setValue("town", savedAddress.town);
      setValue("state", savedAddress.state);
      setValue("lga", savedAddress.lga);
    }
  }, [initialAddress, setValue]);

  const state = watch("state");

  const onSubmit = (data) => {
    localStorage.removeItem("addressForm"); // Clear localStorage on submit
    onSave(data);
  };

  const handleInputChange = () => {
    const formData = {
      newAddress: watch("newAddress"),
      landmark: watch("landmark"),
      town: watch("town"),
      state: watch("state"),
      lga: watch("lga"),
    };
    localStorage.setItem("addressForm", JSON.stringify(formData));
  };

  return (
    <div className="lg:w-1/2 mt-6 bg-gray-100 shadow-md rounded-lg p-6">
      <h3 className="text-2xl font-bold mb-4">Change Address</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            {...register("newAddress", { required: "Address is required" })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            onChange={handleInputChange}
          />
          {errors.newAddress && (
            <span className="text-red-600">{errors.newAddress.message}</span>
          )}
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">
            State
          </label>
          <select
            {...register("state", { required: "State is required" })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            onChange={handleInputChange}
          >
            <option value="">Select State</option>
            {Object.keys(stateAndLga).map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          {errors.state && (
            <span className="text-red-600">{errors.state.message}</span>
          )}
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Local Government Area (LGA)
          </label>
          <select
            {...register("lga", { required: "LGA is required" })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            disabled={!state} // Disable if state is not selected
            onChange={handleInputChange}
          >
            <option value="">Select LGA</option>
            {state &&
              stateAndLga[state]?.map((lga) => (
                <option key={lga} value={lga}>
                  {lga}
                </option>
              ))}
          </select>
          {errors.lga && (
            <span className="text-red-600">{errors.lga.message}</span>
          )}
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Town
          </label>
          <input
            type="text"
            {...register("town", { required: "Town is required" })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            onChange={handleInputChange}
          />
          {errors.town && (
            <span className="text-red-600">{errors.town.message}</span>
          )}
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Landmark(s)
          </label>
          <input
            type="text"
            {...register("landmark")}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            onChange={handleInputChange}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300"
        >
          Save Address
        </button>
      </form>
    </div>
  );
}

AddNewAddress.propTypes = {
  stateAndLga: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string))
    .isRequired,
  onSave: PropTypes.func.isRequired,
  initialAddress: PropTypes.string,
};

export default AddNewAddress;
