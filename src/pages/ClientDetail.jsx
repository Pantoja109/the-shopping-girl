import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaUserEdit,
} from "react-icons/fa";
import { TbShoppingCartPlus } from "react-icons/tb";
import { IoBagAddSharp } from "react-icons/io5";
import {
  getDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import { Spinner } from "../components/Spinner";
import { PurchaseItem } from "../components/PurchaseItem";

export function ClientDetail() {
  const [purchases, setPurchases] = useState(null);
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        //Get reference
        const purchasesRef = collection(db, "sales");
        //Create a query
        const q = query(
          purchasesRef,
          where("client", "==", params.clientId),
          orderBy("purchaseAt", "desc"),
        );
        //Execute Query
        const querySnap = await getDocs(q);
        const purchasesArray = [];
        querySnap.forEach((doc) => {
          return purchasesArray.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setPurchases(purchasesArray);
        setLoading(false);
      } catch (error) {
        toast.error("No se pudieron obtener las compras!");
      }
    };
    const fetchClient = async () => {
      const docRef = doc(db, "clients", params.clientId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setClient(docSnap.data());
        setLoading(false);
      }
    };
    fetchClient();
    fetchPurchases();
  }, []);
  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="w-full">
      <div className="grid rounded-2xl grid-rows-3 grid-flow-col bg-base-200 shadow-xl">
        <div className="ml-6 my-4 row-span-3">
          <h2 className="card-title tracking-wider">
            {client.firstName} {client.lastName}
          </h2>
          <div className="flex items-center mt-4">
            <FaWhatsapp className="text-lg" />
            <a href={`https://wa.me/${client.phone}`} target="_blank">
              <p className="text-base-400 text-sm tracking-widest ml-2 font-semibold">
                {client.phone}
              </p>
            </a>
          </div>
          <div className="flex items-center mt-4">
            <FaInstagram className="text-lg" />
            <a
              href={`https://www.instagram.com/${client.instagram}`}
              target="_blank"
            >
              <p className="text-base-400 text-sm tracking-widest ml-2 font-semibold">
                @{client.instagram}
              </p>
            </a>
          </div>
          <div className="flex items-center mt-4">
            <FaFacebook className="text-lg" />
            <a
              href={`https://www.facebook.com/${client.facebook}`}
              target="_blank"
            >
              <p className="text-base-400 text-sm tracking-widest ml-2 font-semibold">
                /{client.facebook}
              </p>
            </a>
          </div>
        </div>
        <div className="my-4 text-2xl row-span-3 flex flex-col justify-between items-center">
          <FaUserEdit />
          <button type="button" className="btn btn-outline">
            Recibos
          </button>
        </div>
      </div>
      {/* Ventas */}
      {purchases.length > 0 ? (
        <div className="mt-8">
          <div className="flex justify-between items-center">
            <p className="text-xl font-semibold">Compras:</p>
            <button className="btn btn-secondary">
              <IoBagAddSharp className="text-xl" />
            </button>
          </div>
          <ul className="mt-6 grid grid-cols-1 gap-y-4">
            {purchases.map((purchase) => (
              <PurchaseItem
                purchase={purchase.data}
                id={purchase.id}
                key={purchase.id}
              />
            ))}
          </ul>
        </div>
      ) : (
        <div className="mt-12 flex flex-col items-center">
          <p className="text-xl text-center font-semibold">
            El cliente no ha realizado compras aun.
          </p>
          <Link to={`/clientes/${params.clientId}/add-purchase`}>
            <button className="mt-2 btn btn-secondary">Agregar compra</button>
          </Link>
        </div>
      )}
    </div>
  );
}
