import MenuCard from "../features/MenuCard";
import "bootstrap/dist/css/bootstrap.min.css";
import { useFetchData } from "../hooks/useApi";

function Home() {
  const { data, error, isLoading } = useFetchData("menus");
  return (
    <div className="container bg-body-secondary px-20 min-vh-100">
      <MenuCard
        className=" w-4"
        data={data}
        error={error}
        isLoading={isLoading}
      ></MenuCard>
    </div>
  );
}

export default Home;
