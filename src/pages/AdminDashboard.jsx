import { Link, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  console.log("AdminDashboard component rendered");

  return (
    <div className="min-h-screen flex">
      <aside className="bg-gray-800 text-gray-200 w-64 flex-shrink-0">
        <div className="p-4">
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        </div>
        <nav>
          <ul className="space-y-2 p-4">
            <li>
              <Link
                to="/admin/categories"
                className="block px-4 py-2 bg-gray-900 hover:bg-gray-600 rounded"
              >
                View Categories
              </Link>
            </li>
            <li>
              <Link
                to="/admin/categories/create"
                className="block px-4 py-2 bg-gray-900 hover:bg-gray-600 rounded"
              >
                Create New Category
              </Link>
            </li>
            <li>
              <Link
                to="/admin/menus"
                className="block px-4 py-2 bg-gray-900 hover:bg-gray-600 rounded"
              >
                View Menus
              </Link>
            </li>
            <li>
              <Link
                to="/admin/menus/create"
                className="block px-4 py-2 bg-gray-900 hover:bg-gray-600 rounded"
              >
                Create New Menu Item
              </Link>
            </li>
            <li>
              <Link
                to="/admin/orders"
                className="block px-4 py-2 bg-gray-900 hover:bg-gray-600 rounded"
              >
                View Orders
              </Link>
            </li>
            <li>
              <Link
                to="/admin/roles"
                className="block px-4 py-2 bg-gray-900 hover:bg-gray-600 rounded"
              >
                Manage Roles
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="flex-grow bg-gray-100 p-6">
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-4xl font-semibold mb-4">
            Welcome to the Admin Dashboard
          </h2>
          <p className="text-gray-700 mb-4">
            This is where you can manage your application content. Use the
            navigation on the left to view, create, and manage categories and
            menu items.
          </p>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
