import { Link } from "react-router-dom";
export function Home() {
  return (
    <div className="w-full h-1/2 grid grid-cols-1 grid-rows-2 place-items-center">
      <Link to="/clientes" className="w-[80%]">
        <button className="btn btn-outline w-full  font-bold">
          Agregar cliente
        </button>
      </Link>
      <Link to="/clientes" className="w-[80%]">
        <button className="btn btn-outline w-full  font-bold">
          Ver Clientes
        </button>
      </Link>
    </div>
  );
}
