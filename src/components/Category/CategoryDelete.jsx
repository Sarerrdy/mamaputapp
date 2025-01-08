import { useNavigate, useParams } from "react-router-dom";
import { useDeleteData } from "../../hooks/useApi";
import { useAuth } from "../../contexts/AuthContext";
import "react-toastify/dist/ReactToastify.css";

const CategoryDelete = () => {
  const auth = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const { mutateAsync: deleteCategory } = useDeleteData("categories");

  const handleDelete = async () => {
    await deleteCategory(id, {
      onSuccess: () => {
        auth.notifyOrderSuccessful("category deleted successfully");
      },
      onError: (error) => {
        auth.notifyOrderFailure(error.response.data.message);
      },
    }),
      setTimeout(() => {
        navigate("/admin/categories");
      }, 1000);
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-semibold mb-4">Delete Category</h1>
      <p>Are you sure you want to delete this category?</p>
      <button
        onClick={handleDelete}
        className="bg-red-600 text-white py-2 px-4 rounded"
      >
        Delete Category
      </button>
    </div>
  );
};

export default CategoryDelete;
