import React, { useEffect } from "react";
import Layout from "@/layout";
import { useCart } from "@/hooks/useCart";
import { getToken } from "utils/helpers";
import { isAuth, isUserNotFound } from "utils/actions";
import { FaMinus, FaPlus } from "react-icons/fa";
// import useAuth from "@/hooks/useAuth";

const Cart = () => {
  isUserNotFound();

  const { cart, handleAddCart, handleDeleteCart } = useCart();

  console.log(cart);

  useEffect(() => {
    const token = getToken();

    if (!token) {
      return;
    } else {
      isAuth();
    }
  }, []);

  return (
    <Layout>
      <div className="max-w-3xl mx-auto w-11/12">
        {cart.length !== 0 && (
          <div className="grid grid-cols-[70px_1fr_100px_80px] gap-x-6 mb-4 mt-10">
            <span className="font-semibold text-slate-700 block text-center"></span>
            <span className="font-semibold text-slate-700 block">Name</span>
            <span className="font-semibold text-slate-700 block text-center">
              Quantity
            </span>
            <span className="font-semibold text-slate-700 block text-center">
              Price
            </span>
          </div>
        )}

        {cart.length === 0 ? (
          <span className="block py-56 text-center">There are no products</span>
        ) : (
          cart.map((product: any) => (
            <div
              key={product.id}
              className="grid grid-cols-[70px_1fr_100px_80px] gap-x-6 mb-6 items-center border-b border-slate-200 pb-6"
            >
              <div>
                <img
                  src={product.image}
                  alt=""
                  className="w-[70px] h-[70px] object-cover border border-slate-200"
                />
              </div>
              <div>
                <span className="block text-slate-700 mb-1">
                  {product.name}
                </span>
                <span className="block text-slate-400 text-xs font-semibold">
                  {product.code}
                </span>
              </div>

              <div className="mt-2 md:mt-0 flex item-center">
                <button
                  className="flex items-center justify-center text-xs w-10 h-8 rounded bg-BrightRed text-white"
                  onClick={() => handleDeleteCart(product)}
                >
                  <FaMinus />
                </button>
                <span className="text-base md:text-sm block my-1 text-center px-4 md:px-0 font-semibold text-slate-600 mx-3">
                  {product.qty}
                </span>
                <button
                  className="flex items-center justify-center text-xs w-10 h-8 rounded bg-BrightRed text-white"
                  onClick={() => handleAddCart(product)}
                >
                  <FaPlus />
                </button>
              </div>

              <div>
                <span className="block text-slate-400 font-semibold text-center">
                  ${product.price}
                </span>
              </div>
            </div>
          ))
        )}

        {cart.length !== 0 && (
          <div className="grid grid-cols-[70px_1fr_100px_80px] gap-x-6 items-center pb-56">
            <span className="block text-xl font-semibold text-slate-700 uppercase">
              Total
            </span>
            <div></div>
            <div></div>
            <span className="block text-lg font-semibold text-slate-700 text-center">
              $
              {cart.length === 1
                ? cart.map((a: any) => a.price * a.qty)
                : cart.reduce(
                    (a: any, b: any) => a.price * a.qty + b.price * b.qty
                  )}
            </span>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
