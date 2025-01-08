import { useNavigate, useParams } from "react-router-dom";
import { useDeleteData } from "../../hooks/useApi";
import { useAuth } from "../../contexts/AuthContext";
import "react-toastify/dist/ReactToastify.css";

const MenuDelete = () => {
  const auth = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const deleteMenu = useDeleteData("menus");

  const handleDelete = async () => {
    await deleteMenu.mutateAsync(id, {
      onSuccess: () => {
        auth.notifyOrderSuccessful("menu item was deleted successfully");
      },
      onError: (error) => {
        auth.notifyOrderFailure(error.response.data.message);
      },
    }),
      setTimeout(() => {
        navigate("/admin/menus");
      }, 1000);
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-semibold mb-4">Delete Menu Item</h1>
      <p>Are you sure you want to delete this menu item?</p>
      <button
        onClick={handleDelete}
        className="bg-red-600 text-white py-2 px-4 rounded"
      >
        Delete
      </button>
      <button
        onClick={() => navigate("/admin/menus")}
        className="bg-gray-600 text-white py-2 px-4 rounded ml-2"
      >
        Cancel
      </button>
    </div>
  );
};

export default MenuDelete;
