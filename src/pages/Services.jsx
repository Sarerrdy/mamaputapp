import { useEffect } from "react";

function Services() {
  useEffect(() => {
    document.title = "Services";
  }, []);
  return (
    <div className="container mx-auto py-5 min-vh-100 h-100">
      <div className="text-white text-6xl">Services</div>
    </div>
  );
}

export default Services;
