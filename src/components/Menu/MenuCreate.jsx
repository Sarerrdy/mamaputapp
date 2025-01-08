import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateData } from "../../hooks/useApi";
import { useAuth } from "../../contexts/AuthContext";
import "react-toastify/dist/ReactToastify.css";

const MenuCreate = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const createMenu = useCreateData("menus");

  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    price: "",
    stock_quantity: "",
    status: "",
    menu_url: "",
    category_id: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setFileError("Please select a valid file");
      return;
    }

    // Upload the file to the local server
    const fileFormData = new FormData();
    fileFormData.append("file", file);
    const response = await fetch("http://localhost:3000/upload", {
      method: "POST",
      body: fileFormData,
    });
    const result = await response.json();
    const filePath = result.filePath;

    const updatedFormState = {
      ...formState,
      menu_url: filePath,
    };

    await createMenu.mutateAsync(
      updatedFormState,

      {
        onSuccess: () => {
          auth.notifyOrderSuccessful("added a new menu item successfully");
        },
        onError: (error) => {
          auth.notifyOrderFailure(error.message);
        },
      }
    ),
      setTimeout(() => {
        navigate("/admin/menus");
      }, 1000);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (
      selectedFile &&
      (selectedFile.size < 50 * 1024 || selectedFile.size > 100 * 1024)
    ) {
      setFileError("File size should be between 50KB and 100KB");
      setFile(null);
    } else if (
      selectedFile &&
      !["image/jpeg", "image/jpg", "image/png"].includes(selectedFile.type)
    ) {
      setFileError("Only .jpg, .jpeg, and .png files are allowed");
      setFile(null);
    } else {
      setFileError("");
      setFile(selectedFile);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-semibold mb-4">Create New Menu Item</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formState.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={formState.description}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={formState.price}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Stock Quantity</label>
          <input
            type="number"
            name="stock_quantity"
            value={formState.stock_quantity}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Status</label>
          <input
            type="text"
            name="status"
            value={formState.status}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            Menu Image{" "}
            <strong>*(Image should be between 50KB and 100KB)</strong>
          </label>
          <input
            type="file"
            name="menu_url"
            accept=".jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {fileError && (
            <p className="text-red-500 text-sm mt-2">{fileError}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Category ID</label>
          <input
            type="number"
            name="category_id"
            value={formState.category_id}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded"
        >
          Create Menu Item
        </button>
      </form>
    </div>
  );
};

export default MenuCreate;
