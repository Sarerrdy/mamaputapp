import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useCreateData } from "../hooks/useApi";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const navigation = [
  { name: "Home", href: "/home", current: true },
  { name: "Services", href: "/services", current: false },
  { name: "About", href: "/about", current: false },
  { name: "Contact", href: "/contact", current: false },
  // { name: "AdminDashboard", href: "/admin", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TopNavBar() {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const createOrderMutation = useCreateData("token");

  const handleNavClick = (href) => {
    // Capture the previous location before navigating
    const from = location.pathname;
    navigate(href, { state: { from } });
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      if (auth.token) {
        try {
          await createOrderMutation.mutateAsync({
            token: auth.token,
          });
          auth.setIsAuthenticated(true);
        } catch (error) {
          auth.setIsAuthenticated(false);
        }
      }
    };
    checkLoginStatus();
  }, [auth.token]);

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-4">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
              <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
                <div className="flex flex-shrink-0 items-center cursor-pointer">
                  <NavLink to="/">
                    <img
                      alt="Mama Put"
                      // src="src/assets/images/mamaput_logo1.png"
                      src="./images/mamaput_logo1.png"
                      className="h-16 w-auto"
                    />
                  </NavLink>
                </div>
                <div className="hidden md:ml-6 md:block">
                  <div className="flex space-x-4 cursor-pointer">
                    {navigation.map((item) => (
                      <span
                        key={item.name}
                        onClick={() => handleNavClick(item.href)}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-200 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-xl lg:text-2xl font-medium"
                        )}
                      >
                        {item.name}
                      </span>
                    ))}
                    {auth.isAuthenticated &&
                      auth.role &&
                      Array.isArray(auth.role) &&
                      (auth.role.includes("Admin") ||
                        auth.role.includes("SuperAdmin")) && (
                        <span
                          key="AdminDashboard"
                          onClick={() => handleNavClick("/admin")}
                          className="text-gray-200 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-5lg lg:text-xl font-medium"
                        >
                          AdminDashboard
                        </span>
                      )}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="h-8 w-8" />
                </button>

                {/* Profile dropdown */}
                {auth.isAuthenticated ? (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex rounded-full lg:text-xl md:text-lg bg-gray-800 text-gray-200 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        profile
                      </MenuButton>
                    </div>
                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      <MenuItem>
                        <NavLink
                          to="/profile"
                          className="block px-4 py-2  text-gray-700 data-[focus]:bg-gray-100"
                        >
                          My Profile
                        </NavLink>
                      </MenuItem>
                      <MenuItem>
                        <NavLink
                          to="#"
                          className="block px-4 py-2  text-gray-700 data-[focus]:bg-gray-100"
                        >
                          my orders
                        </NavLink>
                      </MenuItem>
                      <MenuItem>
                        <button
                          className="block px-4 py-2 text-gray-700 data-[focus]:bg-gray-100"
                          onClick={() => auth.logOut()}
                        >
                          Sign out
                        </button>
                      </MenuItem>
                    </MenuItems>
                  </Menu>
                ) : (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex rounded-full lg:text-xl md:text-lg bg-gray-800 text-gray-200 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        Sign in
                      </MenuButton>
                    </div>
                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      <MenuItem>
                        <NavLink
                          to="/signin"
                          className="block px-4 py-2 text-gray-700 data-[focus]:bg-gray-100"
                        >
                          login
                        </NavLink>
                      </MenuItem>
                      <MenuItem>
                        <NavLink
                          to="/register"
                          className="block px-4 py-2 text-gray-700 data-[focus]:bg-gray-100"
                        >
                          sign up
                        </NavLink>
                      </MenuItem>
                    </MenuItems>
                  </Menu>
                )}
              </div>
            </div>
          </div>

          <DisclosurePanel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="NavLink"
                  to={item.href}
                  aria-current={item.current ? "page" : undefined}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-200 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                >
                  <span
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white cusor"
                        : "text-gray-200 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-lg lg:text-xl font-medium"
                    )}
                  >
                    {item.name}
                  </span>
                </DisclosureButton>
              ))}
              {auth.isAuthenticated &&
                auth.role &&
                Array.isArray(auth.role) &&
                (auth.role.includes("Admin") ||
                  auth.role.includes("SuperAdmin")) && (
                  <DisclosureButton
                    key="AdminDashboard"
                    as="span"
                    onClick={() => handleNavClick("/admin")}
                    className="text-gray-200 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                  >
                    AdminDashboard
                  </DisclosureButton>
                )}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
