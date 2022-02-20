import React, { useEffect } from "react";
import Layout from "@/layout";
import { useCart } from "@/hooks/useCart";
import { getToken } from "utils/helpers";
import { isAuth, isUserNotFound } from "utils/actions";
// import useAuth from "@/hooks/useAuth";

const Cart = () => {
  isUserNotFound();

  const { cart } = useCart();
  // const { user } = useAuth();

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
      <div className="max-w-2xl mx-auto w-11/12">
        {cart.length !== 0 && (
          <div className="grid grid-cols-[70px_1fr_80px_80px] gap-x-6 mb-4 mt-10">
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
              className="grid grid-cols-[70px_1fr_80px_80px] gap-x-6 mb-6 items-center border-b border-slate-200 pb-6"
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
              <div>
                <span className="block text-slate-400 font-semibold text-center">
                  {product.qty}
                </span>
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
          <div className="grid grid-cols-[70px_1fr_80px_80px] gap-x-6 items-center pb-56">
            <span className="block text-xl font-semibold text-slate-700 uppercase">
              Total
            </span>
            <div></div>
            <div></div>
            <span className="block text-lg font-semibold text-slate-700 text-center">
              $763
            </span>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
