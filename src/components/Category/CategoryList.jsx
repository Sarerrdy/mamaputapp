import { useFetchData } from "../../hooks/useApi";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const { data: categories, isLoading, error } = useFetchData("categories");

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading categories.</p>;

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-semibold mb-4">Categories</h1>
      <div className="flex flex-wrap -mx-2">
        {categories.map((category) => (
          <div
            key={category.category_id}
            className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4"
          >
            <div className="bg-white p-4 rounded-lg shadow-md">
              <img
                src={category.category_url}
                alt={category.name}
                className="w-full h-40 object-cover mb-4 rounded"
              />
              <h2 className="text-lg font-semibold">{category.name}</h2>
              <Link
                to={`/admin/categories/edit/${category.category_id}`}
                className="text-blue-600 hover:underline"
              >
                Edit
              </Link>
              <Link
                to={`/admin/categories/delete/${category.category_id}`}
                className="text-red-600 hover:underline ml-4"
              >
                Delete
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
