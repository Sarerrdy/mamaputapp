import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateData } from "../../hooks/useApi";
import { useAuth } from "../../contexts/AuthContext";
import "react-toastify/dist/ReactToastify.css";

const CategoryCreate = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { mutateAsync: createCategory } = useCreateData("categories");

  const [formState, setFormState] = useState({
    name: "",
    category_url: "",
  });
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");

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
    const filePath = "/" + result.filePath;

    // Update formState with the file path
    const updatedFormState = { ...formState, category_url: filePath };

    await createCategory(updatedFormState, {
      onSuccess: () => {
        auth.notifyOrderSuccessful("Added a new category successfully");
      },
      onError: (error) => {
        auth.notifyOrderFailure(error.response.data.message);
      },
    });

    setTimeout(() => {
      navigate("/admin/categories");
    }, 1000);
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-semibold mb-4">Create New Category</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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
          <label className="block text-gray-700">
            Category Image{" "}
            <strong>*(Image should be between 50KB and 100KB)</strong>
          </label>
          <input
            type="file"
            name="category_url"
            accept=".jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {fileError && (
            <p className="text-red-500 text-sm mt-2">{fileError}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded"
        >
          Create Category
        </button>
      </form>
    </div>
  );
};

export default CategoryCreate;
