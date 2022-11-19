import {
  FaShoppingBag,
  FaDollarSign,
  FaCalendarAlt,
  FaHashtag,
  FaTag,
  FaMoneyBillAlt,
} from "react-icons/fa";
export function PurchaseItem({ purchase, id }) {
  //console.log(purchase.purchaseAt);
  const fechaCompra = new Date(purchase.purchaseAt.seconds * 1000);
  //console.log("fechaCompra", fechaCompra);
  const fechaFormated =
    fechaCompra.getDate() +
    "/" +
    (fechaCompra.getMonth() + 1) +
    "/" +
    fechaCompra.getFullYear();
  return (
    <div>
      <div className="bg-purple-300 rounded-xl py-4 px-8 h-52">
        <div className="h-full grid grid-rows-6 grid-cols-4">
          <div className="col-span-4">
            <article className="text-lg flex justify-center items-center">
              <FaShoppingBag />
              <p className="ml-4 font-semibold">{purchase.article}</p>
            </article>
          </div>
          {/* Quantity */}
          <article className="flex items-center justify-start col-span-2">
            <FaHashtag />
            <p className=" ml-2 font-medium text-sm">Articulos:</p>
          </article>
          <p className="font-medium text-sm place-self-center col-span-2">
            {purchase.quantity > 1
              ? `${purchase.quantity} piezas`
              : `${purchase.quantity} pieza`}{" "}
          </p>
          {/* Price */}
          <article className="flex items-center justify-start col-span-2">
            <FaMoneyBillAlt />
            <p className="ml-2 font-medium text-sm">Precio:</p>
          </article>
          <p className="flex items-center font-medium text-sm place-self-center col-span-2">
            $ {purchase.price.toFixed(2)}
          </p>
          {/* Total */}
          <article className="flex items-center justify-start col-span-2">
            <FaDollarSign />
            <p className="ml-2 font-medium text-sm">Total:</p>
          </article>
          <p className="font-medium text-sm place-self-center col-span-2">
            $ {purchase.total.toFixed(2)}
          </p>
          {/* Payments */}
          <article className="flex items-center justify-start col-span-2">
            <FaHashtag />
            <p className="ml-2 font-medium text-sm">Pagos:</p>
          </article>
          <p className="font-medium text-sm place-self-center col-span-2">
            {purchase.paymentNumbers} de ${" "}
            {(
              (purchase.total - purchase.setAsidePay) /
              purchase.paymentNumbers
            ).toFixed(2)}
          </p>
          {/* Date */}
          <article className="flex items-center justify-start col-span-2">
            <FaCalendarAlt />
            <p className="ml-2 font-medium text-sm">Fecha compra:</p>
          </article>
          <p className="font-medium text-sm place-self-center col-span-2">
            {fechaFormated}
          </p>
        </div>
      </div>
    </div>
  );
}
