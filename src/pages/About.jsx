import { useEffect } from "react";

function About() {
  useEffect(() => {
    document.title = "About Us";
  }, []);
  return (
    <div className="container mx-auto py-5 min-vh-100 h-100">
      <div className="text-white text-6xl">About</div>
    </div>
  );
}

export default About;
