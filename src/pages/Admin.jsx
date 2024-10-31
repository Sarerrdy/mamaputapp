import { useEffect } from "react";
function Admin() {
  useEffect(() => {
    document.title = "About Us";
  }, []);
  return (
    <div className="container mx-auto py-5 min-vh-100 h-100">
      <div className="text-white text-6xl">Admin Page</div>
    </div>
  );
}

export default Admin;
