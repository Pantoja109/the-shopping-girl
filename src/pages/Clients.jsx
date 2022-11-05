import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Spinner } from "../components/Spinner";
import { ClientItem } from "../components/ClientItem";
import { HiOutlineUserAdd } from "react-icons/hi";

export function Clients() {
  const [clients, setClients] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        //Get reference
        const clientsRef = collection(db, "clients");
        //Create a query
        const q = query(clientsRef, orderBy("createdAt", "desc"));
        //Execute Query
        const querySnap = await getDocs(q);
        const clientsArray = [];
        querySnap.forEach((doc) => {
          return clientsArray.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setClients(clientsArray);
        setLoading(false);
      } catch (error) {
        toast.error("Could not fetch Clients");
      }
    };
    fetchClients();
  }, []);
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : clients && clients.length > 0 ? (
        <>
          <div className="flex flex-row justify-evenly items-center">
            <div className="form-control">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Search…"
                  className="input input-bordered"
                />
                <button className="btn btn-square">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div>
              <Link to={"/new-client"}>
                <HiOutlineUserAdd className="text-3xl" />
              </Link>
            </div>
          </div>
          <section className="mt-8 grid grid-cols-2 gap-y-6 gap-x-2 md:grid-cols-3 lg:grid-cols-4">
            {clients.map((client) => (
              <ClientItem client={client.data} id={client.id} key={client.id} />
            ))}
          </section>
        </>
      ) : (
        <p> Aun no hay clientes registrados!</p>
      )}
    </div>
  );
}
