import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setDoc, serverTimestamp, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { OAuth } from "../components/OAuth";

export function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;
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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      updateProfile(auth.currentUser, {
        displayName: name,
      });
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.createdAt = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), formDataCopy);
      toast.success("Register Exitoso!");
      navigate("/");
    } catch (error) {
      toast.error("Algo salio mal!");
    }
  };
  return (
    <div className="w-full h-1/2">
      <form className="form-control h-full justify-center" onSubmit={onSubmit}>
        <h2 className="text-center text-3xl font-bold">Bienvenid@!</h2>
        <input
          type="text"
          className="input w-full input-primary mt-10"
          placeholder="Name"
          id="name"
          value={name}
          onChange={onChange}
        />
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
          Registrar
        </button>
      </form>
      <OAuth />
      <div className="text-center mt-4 font-semibold">
        <Link to="/sign-in" className="text-center">
          Iniciar sesion..
        </Link>
      </div>
    </div>
  );
}
