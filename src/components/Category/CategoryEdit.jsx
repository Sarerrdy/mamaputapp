import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchData, useUpdateData } from "../../hooks/useApi";
import { useAuth } from "../../contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CategoryEdit = () => {
  const { id } = useParams();
  const auth = useAuth();
  const navigate = useNavigate();
  const { data: category, refetch } = useFetchData(`categories/${id}`);
  const { mutateAsync: updateCategory } = useUpdateData("categories");

  const [formState, setFormState] = useState({
    name: "",
    category_url: "",
  });
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");

  useEffect(() => {
    if (category) {
      setFormState({
        name: category.name,
        category_url: category.category_url,
      });
    }
  }, [category]);

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
      const filePath = "/" + result.filePath;

      updatedData = { ...formState, category_url: filePath };
    }

    await updateCategory(
      { id, updatedData },
      {
        onSuccess: () => {
          auth.notifyOrderSuccessful("Category updated successfully");
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
      navigate("/admin/categories");
    }, 1000);
  };

  return (
    <div className="container mx-auto py-6">
      <ToastContainer />
      <h1 className="text-2xl font-semibold mb-4">Edit Category</h1>
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
          Update Category
        </button>
      </form>
    </div>
  );
};

export default CategoryEdit;
