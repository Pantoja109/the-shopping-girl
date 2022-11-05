import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { OAuth } from "../components/OAuth";

export function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const navigate = useNavigate();

  //Read input
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  //Submit form
  const onSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      if (userCredential.user) {
        toast.success("Bienvenid@");
        navigate("/");
      }
    } catch (error) {
      toast.error("Usuario o Contraseña invalido!");
    }
  };
  return (
    <div className="w-full h-1/2">
      <form className="form-control h-full justify-center" onSubmit={onSubmit}>
        <h2 className="text-center text-3xl font-bold">Bienvenid@!</h2>
        <input
          className="input w-full input-primary mt-10"
          type="email"
          placeholder="email"
          id="email"
          autoComplete="username"
          value={email}
          onChange={onChange}
        />
        <input
          className="input w-full input-primary mt-10"
          type="password"
          placeholder="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={onChange}
        />
        <button
          type="submit"
          className="btn btn-primary text-lg font-bold mt-16"
        >
          Iniciar
        </button>
      </form>
      <OAuth />
      <div className="text-center mt-4 font-semibold">
        <Link to="/sign-up" className="text-center">
          Registrarse...
        </Link>
      </div>
    </div>
  );
}
