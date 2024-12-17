import { useEffect } from "react";

function Contact() {
  useEffect(() => {
    document.title = "Contact";
  }, []);
  return (
    <div className="container mx-auto py-5 min-vh-100 h-100">
      <div className="text-white text-6xl">Contact Us</div>
    </div>
  );
}

export default Contact;
