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
            <a
              className="flex text-sm mb-2"
              href={`https://wa.me/${client.phone}`}
              target="_blank"
            >
              <FaWhatsapp className="text-lg" />
              {client.phone}
            </a>
            <a
              className="flex text-sm mb-2"
              href={`https://www.instagram.com/${client.instagram}`}
              target="_blank"
            >
              <FaInstagram className="text-lg" />@{client.instagram}
            </a>
            <a
              className="flex text-sm mb-2"
              href={`https://www.facebook.com/${client.facebook}`}
              target="_blank"
            >
              <FaFacebook className="text-lg" />/{client.facebook}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
