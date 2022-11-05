import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../components/Spinner";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

export function NewClient() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    instagram: "",
    facebook: "",
    phone: "",
  });

  const { firstName, lastName, instagram, facebook, phone } = formData;

  const auth = getAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    setLoading(true);
    const formDataCopy = {
      ...formData,
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, "clients"), formDataCopy);
    setLoading(false);
    toast.success("Cliente creado!");
    // navigate(`/client/${docRef.id}`);
  };

  const onMutate = (e) => {
    //Text/booleans/numbers
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }));
    }
  };
  if (loading) {
    return <Spinner />;
  }
  return (
    <div>
      <div className="w-full h-1/2">
        <form
          className="form-control h-full justify-center"
          onSubmit={onSubmit}
        >
          <h2 className="text-center text-3xl font-bold">Ingresa los datos</h2>
          <input
            className="input w-full input-primary mt-10"
            type="text"
            placeholder="Nombre"
            id="firstName"
            value={firstName}
            onChange={onMutate}
          />
          <input
            className="input w-full input-primary mt-10"
            type="text"
            placeholder="Apellido"
            id="lastName"
            value={lastName}
            onChange={onMutate}
          />
          <input
            className="input w-full input-primary mt-10"
            type="phone"
            placeholder="Telefono"
            id="phone"
            value={phone}
            onChange={onMutate}
          />
          <input
            className="input w-full input-primary mt-10"
            type="text"
            placeholder="Facebook"
            id="facebook"
            value={facebook}
            onChange={onMutate}
          />
          <input
            className="input w-full input-primary mt-10"
            type="text"
            placeholder="Instagram"
            id="instagram"
            value={instagram}
            onChange={onMutate}
          />
          <button
            type="submit"
            className="btn btn-primary text-lg font-bold mt-16"
          >
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}
