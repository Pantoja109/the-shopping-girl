import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

export function ClientItem({ client, id }) {
  return (
    <>
      <div className="bg-base-200 shadow-xl rounded-2xl">
        <div>
          <h3 className="card-title mx-2 my-2 text-lg">
            <Link to={`/clientes/${id}`}>
              {client.firstName} {client.lastName}
            </Link>
          </h3>
          <div className="mt-4 ml-4 mb-4">
            <div className="flex flex-row text-sm mb-2">
              <FaWhatsapp className="text-lg" />
              {client.phone}
            </div>
            <div className="flex text-sm mb-2">
              <FaInstagram className="text-lg" />@{client.instagram}
            </div>
            <div className="flex text-sm mb-2">
              <FaFacebook className="text-lg" />/{client.facebook}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
