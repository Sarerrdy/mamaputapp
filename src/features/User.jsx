import {
  useFetchData,
  //   useCreateData,
  //   useUpdateData,
  //   useDeleteData,
} from "../hooks/useApi";

const MyComponent = () => {
  const { data, error, isLoading } = useFetchData("menus");
  //   const createData = useCreateData("items");
  //   const updateData = useUpdateData("items");
  //   const deleteData = useDeleteData("items");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Items</h1>

      {data.map((item) => (
        <ul key={item.menu_id}>
          <li>{item.menu_id}</li>
          <li>{item.name}</li>
        </ul>
      ))}

      {/* Add buttons or forms to create, update, and delete items */}
    </div>
  );
};

export default MyComponent;
