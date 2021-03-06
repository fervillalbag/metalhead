import React, { useContext } from "react";

import { FaPlus, FaMinus, FaTimes } from "react-icons/fa";
import { useRouter } from "next/router";
import { BsFillTrashFill } from "react-icons/bs";

import { useCart } from "@/hooks/useCart";
import { CartContextModal } from "@/context/CartContextModal";
import toast from "react-hot-toast";
import { Products } from "@/types/product";

const Cart: React.FC = () => {
  const router = useRouter();
  const { isShowModalCart, setIsShowModalCart } = useContext(CartContextModal);
  const { cart, handleAddCart, handleDeleteCart, handleDeleteAllProductCart } =
    useCart();

  return (
    <div>
      <div
        className={`w-screen h-screen bg-[rgba(0,0,0,0.5)] fixed top-0 left-0 z-[3000] ${
          isShowModalCart ? "block" : "hidden"
        }`}
        onClick={() => setIsShowModalCart(false)}
      ></div>
      <div
        className={`fixed top-0 w-full md:w-80 h-screen bg-white shadow-xl z-[3100] ${
          isShowModalCart ? "block" : "hidden"
        }`}
      >
        <div className="flex items-center justify-between py-6 px-6">
          <span className="block text-xl font-semibold text-VeryDarkBlue">
            Cart shopping
          </span>
          <div className="-mr-1">
            <button
              className="text-red-500 p-1 text-2xl md:text-xl"
              onClick={() => setIsShowModalCart(false)}
            >
              <FaTimes />
            </button>
          </div>
        </div>

        <div
          className={`flex flex-col justify-between px-6 h-[calc(100vh_-_76px_-_112px_-_52px)] overflow-y-scroll`}
        >
          <div>
            {!cart ? (
              <span className="block">Loading..</span>
            ) : cart.length === 0 ? (
              <span className="block">Cart is empty</span>
            ) : (
              cart.map((product: any) => (
                <article
                  key={product.id}
                  className="flex items-center mb-6 border-b pb-6 border-slate-200"
                >
                  <div className="w-10 h-full mr-3">
                    <button
                      className="py-3 px-3 block bg-red-500 text-white rounded text-center text-sm"
                      onClick={() => handleDeleteAllProductCart(product.id)}
                    >
                      <BsFillTrashFill />
                    </button>
                  </div>
                  <div
                    className="border border-slate-300 w-24 h-24 md:w-20 md:h-20 p-1"
                    onClick={() => {
                      router.push(`/product/${product.id}`);
                      setIsShowModalCart(false);
                    }}
                  >
                    <img
                      src={product.image}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                  <div className="ml-3 flex-1 md:flex-initial md:w-32 md:flex md:justify-between">
                    <div>
                      <span className="block text-sm text-slate-600">
                        {product?.name.slice(0, 30)}
                        {product?.name.length >= 30 && "..."}
                      </span>
                      <span className="block font-semibold text-sm mt-1">
                        ${product.price * product.qty}
                      </span>
                    </div>
                    <div className="mt-2 md:mt-0 md:ml-3 flex md:block">
                      <button
                        className="flex items-center justify-center text-xs w-8 h-8 md:w-6 md:h-6 rounded bg-BrightRed text-white"
                        onClick={() => handleDeleteCart(product)}
                      >
                        <FaMinus />
                      </button>
                      <span className="text-base md:text-sm block my-1 text-center px-3 md:px-0 font-semibold text-slate-600">
                        {product.qty}
                      </span>
                      <button
                        className="flex items-center justify-center text-xs w-8 h-8 md:w-6 md:h-6 rounded bg-BrightRed text-white"
                        onClick={() => handleAddCart(product)}
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>

        <div className="px-6 pt-6 flex justify-between w-full">
          <span className="block font-bold text-DarkBlue text-lg">Total</span>
          <span className="block text-DarkBlue">
            $
            {cart.length === 1
              ? cart.map((a: any) => a.price * a.qty)
              : cart.length > 1
              ? cart.reduce(
                  (a: Products, b: Products) =>
                    Number(a) + Number(b.price) * Number(b.qty),
                  0
                )
              : null}
          </span>
        </div>

        <div className="h-28 flex items-center px-6">
          <button
            className={`block w-full text-white py-3 rounded-md cursor-pointer ${
              cart.length === 0 ? "bg-slate-400 cursor-default" : "bg-DarkBlue"
            }`}
            onClick={() => {
              if (cart.length === 0) {
                toast.error("No tienes producto en el carrito");
                return;
              } else {
                router.push("/cart");
                setIsShowModalCart(false);
              }
            }}
          >
            Go to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
