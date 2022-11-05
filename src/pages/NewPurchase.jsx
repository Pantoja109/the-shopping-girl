import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { Spinner } from "../components/Spinner";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

export function NewPurchase() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    article: "",
    price: "",
    isSetAside: "",
    paymentNumbers: "",
    quantity: "",
    setAsidePay: "",
    freeShipping: "",
    purchaseAt: "",
  });

  const {
    article,
    price,
    isSetAside,
    paymentNumbers,
    quantity,
    freeShipping,
    setAsidePay,
    purchaseAt,
  } = formData;

  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const dateFormat = (date) => {
      date = date + " 12:00:00";
      date = Date.parse(date);
      return date;
    };
    const formDataCopy = {
      ...formData,
      client: params.clientId,
      isCleared: false,
      purchaseAt: new Timestamp(dateFormat(purchaseAt) / 1000, 0),
      total: price * quantity,
    };
    console.log("formDataCopy", formDataCopy);

    const docRef = await addDoc(collection(db, "sales"), formDataCopy);
    setLoading(false);
    toast.success("Venta creada!");
    navigate(`/clientes/${params.clientId}`);
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
          <h2 className="text-center text-2xl font-bold">
            Ingresa los datos de la venta
          </h2>
          <input
            className="input w-full input-primary mt-10"
            type="text"
            placeholder="Articulo"
            id="article"
            value={article}
            onChange={onMutate}
          />
          <input
            className="input w-full input-primary mt-10"
            type="text"
            placeholder="Cantidad"
            id="quantity"
            value={quantity}
            onChange={onMutate}
          />
          <input
            className="input w-full input-primary mt-10"
            type="number"
            placeholder="Precio"
            id="price"
            value={price}
            onChange={onMutate}
          />
          <input
            className="input w-full input-primary mt-10"
            type="text"
            placeholder="Apartado?"
            id="isSetAside"
            value={isSetAside}
            onChange={onMutate}
          />
          <input
            className="input w-full input-primary mt-10"
            type="number"
            placeholder="Monto apartado"
            id="setAsidePay"
            value={setAsidePay}
            onChange={onMutate}
          />
          <input
            className="input w-full input-primary mt-10"
            type="number"
            placeholder="Numero de pagos"
            id="paymentNumbers"
            value={paymentNumbers}
            onChange={onMutate}
          />
          <input
            className="input w-full input-primary mt-10"
            type="date"
            placeholder="Fecha de compra"
            id="purchaseAt"
            value={purchaseAt}
            onChange={onMutate}
          />

          <button
            type="submit"
            className="btn btn-primary text-lg font-bold mt-16"
          >
            Guardar
          </button>
          <button
            type="button"
            className="btn btn-secondary text-lg font-bold mt-2"
          >
            <Link to={`/clientes/${params.clientId}`}>Cancelar</Link>
          </button>
        </form>
      </div>
    </div>
  );
}
