import { useEffect } from "react";
import RegistrationForm from "../features/RegistrationForm";

export default function Register() {
  useEffect(() => {
    document.title = "Register";
  }, []);
  return (
    <div className=" container bg-body-secondary">
      <RegistrationForm />
    </div>
  );
}
