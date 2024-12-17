import { useFetchData } from "../../hooks/useApi";
import { Link } from "react-router-dom";

const MenuList = () => {
  const { data: menus, isLoading, error } = useFetchData("menus");

  console.log("MenuList component rendered");
  console.log("Menus data:", menus);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading menus.</p>;

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-semibold mb-4">Menus</h1>
      <div className="flex flex-wrap -mx-2">
        {menus.map((menu) => (
          <div
            key={menu.menu_id}
            className="w-full md:w-1/2 lg:w-1/5 px-2 mb-4"
          >
            <div className="bg-white p-4 rounded-lg shadow-md">
              {console.log("URL: ", "/" + menu.menu_url)}
              <img
                src={"/" + menu.menu_url}
                alt={menu.name}
                className="w-full h-40 object-cover mb-4 rounded"
              />
              <h2 className="text-lg font-semibold">
                <strong>Name:</strong> {menu.name}
              </h2>
              <Link
                to={`/admin/menus/edit/${menu.menu_id}`}
                className="text-blue-600 hover:underline"
              >
                Edit
              </Link>
              <Link
                to={`/admin/menus/delete/${menu.menu_id}`}
                className="text-red-600 hover:underline ml-4"
              >
                Delete
              </Link>
              <p>
                <strong>Description:</strong> {menu.description}
              </p>
              <p>
                <strong>Price:</strong> N{menu.price}
              </p>
              <p>
                <strong>Stock:</strong> {menu.stock_quantity}
              </p>
              <p>
                <strong>Category ID:</strong> {menu.category_id}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuList;
