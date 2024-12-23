import { useState } from "react";
import { useFetchData, useUpdateDataWithoutId } from "../../hooks/useApi";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import SearchBox from "../../ui/SearchBox";
import "react-toastify/dist/ReactToastify.css";

const RoleManagement = () => {
  const auth = useAuth();
  const queryClient = useQueryClient();

  const {
    data: users,
    isLoading: usersLoading,
    error: usersError,
  } = useFetchData("users");

  const {
    data: roles,
    isLoading: rolesLoading,
    error: rolesError,
  } = useFetchData("roles");

  const { mutateAsync: assignRole } = useUpdateDataWithoutId("assign_role");
  const { mutateAsync: removeRole } = useUpdateDataWithoutId("remove_role");

  const isSuperAdmin = auth.role.includes("SuperAdmin");
  const isAdmin = auth.role.includes("Admin");

  const [searchResults, setSearchResults] = useState([]);
  const handleSearchResults = (searchResults) => {
    setSearchResults(searchResults);
  };

  const handleAssignRole = async (userId, roleName) => {
    if (roleName === "SuperAdmin" && !isSuperAdmin) {
      auth.notifyOrderFailure("Only SuperAdmin can assign SuperAdmin role");
      return;
    }
    if (roleName === "Admin" && !(isSuperAdmin || isAdmin)) {
      auth.notifyOrderFailure("Only SuperAdmin or Admin can assign Admin role");
      return;
    }

    const user = users.find((user) => user.user_id === userId);
    if (user.roles.find((role) => role.role_name === roleName)) {
      auth.notifyOrderFailure(`User already has the ${roleName} role`);
      return;
    }

    try {
      await assignRole({ userId, roleName });
      auth.notifyOrderSuccessful(
        `Role ${roleName} assigned to user ${userId} successfully`
      );
      queryClient.invalidateQueries("users");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      auth.notifyOrderFailure(errorMessage);
    }
  };

  const handleRemoveRole = async (userId, roleName) => {
    if (roleName === "SuperAdmin" && !isSuperAdmin) {
      auth.notifyOrderFailure("Only SuperAdmin can remove SuperAdmin role");
      return;
    }
    if (roleName === "Admin" && !(isSuperAdmin || isAdmin)) {
      auth.notifyOrderFailure("Only SuperAdmin or Admin can remove Admin role");
      return;
    }
    if (roleName === "User") {
      auth.notifyOrderFailure("User role cannot be removed");
      return;
    }

    try {
      await removeRole({ userId, roleName });
      auth.notifyOrderSuccessful(
        `Role ${roleName} removed from user ${userId} successfully`
      );
      queryClient.invalidateQueries("users");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      auth.notifyOrderFailure(errorMessage);
    }
  };

  if (usersLoading || rolesLoading) return <p>Loading...</p>;
  if (usersError) return <p>Error loading users.</p>;
  if (rolesError) return <p>Error loading roles.</p>;

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-6">Manage User Roles</h1>
      <div className="mb-6 lg:w-1/2">
        <SearchBox users={users} onSearchResults={handleSearchResults} />
      </div>
      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {searchResults.map((user) => (
            <div
              key={user.user_id}
              className="bg-gray-50 shadow-md rounded p-6"
            >
              <h2 className="text-2xl font-bold mb-4">
                {user.title} {user.first_name} {user.last_name} ({user.email})
              </h2>
              <div className="mb-4">
                {user.roles.map((role) => (
                  <span
                    key={role.role_id}
                    className="inline-block bg-blue-200 text-blue-800 text-sm font-bold mr-2 px-2.5 py-0.5 rounded"
                  >
                    {role.role_name}
                    {(role.role_name !== "SuperAdmin" || isSuperAdmin) && (
                      <button
                        className="ml-2 text-red-600 hover:text-red-800 font-bold"
                        onClick={() =>
                          handleRemoveRole(user.user_id, role.role_name)
                        }
                      >
                        Remove
                      </button>
                    )}
                  </span>
                ))}
              </div>
              <label
                htmlFor={`role-select-${user.user_id}`}
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Add New Role
              </label>
              <select
                id={`role-select-${user.user_id}`}
                className="block w-full p-2 border border-gray-300 rounded"
                onChange={(e) => handleAssignRole(user.user_id, e.target.value)}
              >
                <option value="">Select Role</option>
                {roles.map((role) => (
                  <option key={role.role_id} value={role.role_name}>
                    {role.role_name}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {users.map((user) => (
            <div
              key={user.user_id}
              className="bg-gray-50 shadow-md rounded p-6"
            >
              <h2 className="text-2xl font-bold mb-4">
                {user.title} {user.first_name} {user.last_name} ({user.email})
              </h2>
              <div className="mb-4">
                {user.roles.map((role) => (
                  <span
                    key={role.role_id}
                    className="inline-block bg-blue-200 text-blue-800 text-sm font-bold mr-2 px-2.5 py-0.5 rounded"
                  >
                    {role.role_name}
                    {(role.role_name !== "SuperAdmin" || isSuperAdmin) && (
                      <button
                        className="ml-2 text-red-600 hover:text-red-800 font-bold"
                        onClick={() =>
                          handleRemoveRole(user.user_id, role.role_name)
                        }
                      >
                        Remove
                      </button>
                    )}
                  </span>
                ))}
              </div>
              <label
                htmlFor={`role-select-${user.user_id}`}
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Add New Role
              </label>
              <select
                id={`role-select-${user.user_id}`}
                className="block w-full p-2 border border-gray-300 rounded"
                onChange={(e) => handleAssignRole(user.user_id, e.target.value)}
              >
                <option value="">Select Role</option>
                {roles.map((role) => (
                  <option key={role.role_id} value={role.role_name}>
                    {role.role_name}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};
export default RoleManagement;
