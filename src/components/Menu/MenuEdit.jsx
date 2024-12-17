import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchData, useUpdateData } from "../../hooks/useApi";
import { useAuth } from "../../contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MenuEdit = () => {
  const { id } = useParams();
  const auth = useAuth();
  const navigate = useNavigate();
  const { data: menu, refetch } = useFetchData(`menus/${id}`);
  const { mutateAsync: updateMenu } = useUpdateData("menus");

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

  useEffect(() => {
    if (menu) {
      setFormState({
        name: menu.name,
        description: menu.description,
        price: menu.price,
        stock_quantity: menu.stock_quantity,
        status: menu.status,
        menu_url: menu.menu_url,
        category_id: menu.category_id,
      });
    }
  }, [menu]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let updatedData = { ...formState };

    if (file) {
      const fileFormData = new FormData();
      fileFormData.append("file", file);

      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: fileFormData,
      });

      const result = await response.json();
      const filePath = result.filePath;

      updatedData = { ...formState, menu_url: filePath };
    }

    await updateMenu(
      { id, updatedData },
      {
        onSuccess: () => {
          auth.notifyOrderSuccessful("Menu item updated successfully");
          refetch();
        },
        onError: (error) => {
          const errorMessage =
            error.response?.data?.message || "An error occurred";
          auth.notifyOrderFailure(errorMessage);
        },
      }
    );

    setTimeout(() => {
      navigate("/admin/menus");
    }, 1000);
  };

  return (
    <div className="container mx-auto py-6">
      <ToastContainer />
      <h1 className="text-2xl font-semibold mb-4">Edit Menu Item</h1>
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
          Update Menu Item
        </button>
      </form>
    </div>
  );
};

export default MenuEdit;
