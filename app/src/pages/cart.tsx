import React, { useContext, useEffect, useState } from "react";
import Layout from "@/layout";
import { useCart } from "@/hooks/useCart";
import { getToken } from "utils/helpers";
import { isAuth, isUserNotFound } from "utils/actions";
import { FaMinus, FaPlus, FaTimes } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { CREATE_ORDER } from "@/graphql/mutation/orders";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { CartContext } from "@/context/CartContext";
import useAuth from "@/hooks/useAuth";
import Modal from "@/components/Modal";
import { motion } from "framer-motion";

// import useAuth from "@/hooks/useAuth";

const Cart = () => {
  isUserNotFound();

  const { user } = useAuth();
  const { setCart } = useContext(CartContext);
  const [showModal, setShowModal] = useState<boolean>(false);

  const router = useRouter();
  const { cart, handleAddCart, handleDeleteCart } = useCart();
  const [createListProducts] = useMutation(CREATE_ORDER);

  useEffect(() => {
    const token = getToken();

    if (!token) {
      return;
    } else {
      isAuth();
    }
  }, []);

  const arrayCart = cart.map((product: any) => {
    return {
      code: product.code,
      createdAt: product.createdAt,
      description: product.description.map((descriptionItem: any) => {
        return {
          id: descriptionItem.id,
          text: descriptionItem.text,
        };
      }),
      id: product.id,
      image: product.image,
      name: product.name,
      price: product.price,
      qty: product.qty,
      quantity: product.quantity,
    };
  });

  const handleCreateOrder = async () => {
    try {
      await createListProducts({
        variables: {
          input: {
            idUser: user?.id,
            products: arrayCart,
          },
        },
      });
      toast.success("Compra realizada correctamente");
      setCart([]);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 0.3, duration: 0.3 },
        }}
        className="max-w-3xl mx-auto w-11/12"
      >
        {cart.length !== 0 && (
          <div className="grid grid-cols-[60px_1fr_60px_80px] md:grid-cols-[70px_1fr_100px_80px] gap-x-6 mb-4 mt-10">
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
              className="grid grid-cols-[60px_1fr_60px_80px] md:grid-cols-[70px_1fr_100px_80px] gap-x-6 mb-6 items-center border-b border-slate-200 pb-6"
            >
              <div>
                <img
                  src={product.image}
                  alt=""
                  className="w-[60px] h-[60px] md:w-[70px] md:h-[70px] object-cover border border-slate-200"
                />
              </div>
              <div>
                <span className="block text-sm md:text-base text-slate-700 mb-1">
                  {product.name}
                </span>
                <span className="block text-slate-400 text-xs font-semibold">
                  {product.code}
                </span>
              </div>

              <div className="mt-2 md:mt-0 flex flex-col md:flex-row justify-center md:justify-start items-center">
                <button
                  className="flex items-center justify-center text-xs w-10 h-8 rounded bg-BrightRed text-white"
                  onClick={() => handleDeleteCart(product)}
                >
                  <FaMinus />
                </button>
                <span className="text-base md:text-sm block my-1 text-center md:px-3 font-semibold text-slate-600">
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
                  ${product.price * product.qty}
                </span>
              </div>
            </div>
          ))
        )}

        {cart.length !== 0 && (
          <div className="grid grid-cols-[60px_1fr_60px_80px] md:grid-cols-[70px_1fr_100px_80px] gap-x-6 items-center">
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

        {cart.length !== 0 && (
          <div className="flex justify-end py-20">
            <button
              className="bg-BrightRed text-white py-2 px-6 rounded"
              onClick={() => setShowModal(true)}
            >
              Make a purchase
            </button>
          </div>
        )}

        <Modal
          handleCloseModal={() => setShowModal(false)}
          showModal={showModal}
        >
          <div className="flex flex-col justify-center h-full">
            <header className="flex items-center justify-between">
              <span className="block text-lg font-semibold text-slate-600">
                ¿Desea realizar la compra?
              </span>
              <button
                className="bg-slate-100 text-slate-600 text-xl p-2 rounded-md"
                onClick={() => setShowModal(false)}
              >
                <FaTimes />
              </button>
            </header>

            <div className="grid grid-cols-2 gap-x-4 mt-6">
              <button
                className="block p-2 text-white rounded-md bg-slate-400"
                onClick={() => {
                  handleCreateOrder();
                  setShowModal(false);
                }}
              >
                Si
              </button>
              <button
                className="block p-2 rounded-md bg-white border border-slate-100 hover:bg-slate-100 transition duration-300"
                onClick={() => {
                  setShowModal(false);
                }}
              >
                No
              </button>
            </div>
          </div>
        </Modal>
      </motion.div>
    </Layout>
  );
};

export default Cart;
