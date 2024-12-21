import { useEffect } from "react";
import { Link } from "react-router-dom";

function Services() {
  useEffect(() => {
    document.title = "Services";
  }, []);
  return (
    <div className="container mx-auto py-5 min-vh-100 h-100">
      <div className="text-white text-6xl">Services</div>
      <div>
        <a href="/about">about a</a>
        <br />
        <a href="/admin">admin a</a>
        <br />
        <Link to="/admin">admin link-to</Link>
      </div>
    </div>
  );
}

export default Services;
