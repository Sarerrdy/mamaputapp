import { Link, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  console.log("AdminDashboard component rendered");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link to="/admin/categories" className="hover:underline">
                  View Categories ||
                </Link>
              </li>
              <li>
                <Link to="/admin/categories/create" className="hover:underline">
                  Create New Category ||
                </Link>
              </li>
              <li>
                <Link to="/admin/menus" className="hover:underline">
                  View Menus ||
                </Link>
              </li>
              <li>
                <Link to="/admin/menus/create" className="hover:underline">
                  Create New Menu Item ||
                </Link>
              </li>
              <li>
                {" "}
                <Link to="/admin/orders" className="hover:underline">
                  {" "}
                  View Orders ||
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Welcome to the Admin Dashboard
          </h2>
          <p className="text-gray-700 mb-4">
            This is where you can manage your application content. Use the
            navigation above to view, create, and manage categories and menu
            items.
          </p>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
