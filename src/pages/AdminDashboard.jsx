import { Link, Outlet } from "react-router-dom";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar for medium and larger screens */}
      <aside className="hidden md:flex bg-gray-800 text-gray-200 w-64 flex-shrink-0">
        <div className="p-4">
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
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
        </div>
      </aside>

      {/* Toggleable panel for small screens */}
      <Disclosure as="div" className="md:hidden">
        {({ open }) => (
          <>
            <div className="p-4 flex justify-between items-center bg-gray-800 text-gray-200">
              <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
              <DisclosureButton className="md:hidden">
                <span className="sr-only">Open sidebar</span>
                {open ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </DisclosureButton>
            </div>
            <DisclosurePanel className="bg-gray-800 text-gray-200">
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
            </DisclosurePanel>
          </>
        )}
      </Disclosure>

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
