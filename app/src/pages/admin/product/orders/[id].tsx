import Modal from "@/components/Modal";
import { UPDATE_ORDER } from "@/graphql/mutation/orders";
import { GET_ORDER } from "@/graphql/queries/orders";
import { GET_USER } from "@/graphql/queries/user";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  BsFillArrowLeftCircleFill,
  BsToggleOff,
  BsToggleOn,
} from "react-icons/bs";
import { FaTimes } from "react-icons/fa";

const UserSection = ({ idUser }: any) => {
  const { data: user, loading } = useQuery(GET_USER, {
    variables: {
      id: idUser,
    },
  });

  if (loading) return null;

  return (
    <div className="flex items-center">
      <div>
        <img src="/profile.png" className="w-16 h-16" alt="" />
      </div>
      <div className="ml-3">
        <span className="block text-slate-600">
          {user?.getUser?.name} {user?.getUser?.lastname}
        </span>
        <span className="block text-sm text-slate-400">
          {user?.getUser?.email}
        </span>
      </div>
    </div>
  );
};

const OrderItem: React.FC = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);

  const {
    data: order,
    loading,
    refetch,
  } = useQuery(GET_ORDER, {
    variables: {
      id: router?.query?.id,
    },
    fetchPolicy: "network-only",
  });

  const [updateOrder] = useMutation(UPDATE_ORDER);

  const newArrayProducts = order?.getListProduct?.products.map(
    (product: any) => {
      return {
        code: product.code,
        description: product.description.map((item: any) => {
          return {
            id: item.id,
            text: item.text,
          };
        }),
        idUser: product.idUser,
        image: product.image,
        name: product.name,
        price: product.price,
        qty: product.qty,
        quantity: product.quantity,
      };
    }
  );

  const handleUpdateStatusOrder = async () => {
    try {
      const response = await updateOrder({
        variables: {
          input: {
            id: order?.getListProduct?.id,
            status: !order?.getListProduct?.status,
            idUser: order?.getListProduct?.idUser,
            createdAt: order?.getListProduct?.createdAt,
            products: newArrayProducts,
          },
        },
      });
      refetch();

      if (!response?.data?.updateDataOrder.success) {
        toast.success(response?.data?.updateDataOrder?.message);
        return;
      }

      toast.success(response?.data?.updateDataOrder?.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex">
      <div className="px-12 pt-10">
        <button
          className="border border-slate-300 rounded flex items-center justify-center px-3 py-2 text-slate-500 mb-8 w-32"
          onClick={() => router.back()}
        >
          <span className="mr-2">
            <BsFillArrowLeftCircleFill />
          </span>
          <span>Back</span>
        </button>
      </div>

      <div className="p-10 w-full h-screen overflow-y-auto no-scrollbar">
        {loading ? (
          <span className="block">Cargando..</span>
        ) : (
          <div className="grid grid-cols-3 gap-x-10">
            <div className="col-start-1 col-end-3">
              <div className="grid grid-cols-[70px_4fr_1fr_1fr_1fr] border-b border-slate-200 pb-2 gap-x-8">
                <div>
                  <span className="block text-lg font-semibold text-slate-600 text-center">
                    Image
                  </span>
                </div>
                <div>
                  <span className="block text-lg font-semibold text-slate-600">
                    Description
                  </span>
                </div>
                <div>
                  <span className="block text-lg font-semibold text-slate-600 text-center">
                    Unit
                  </span>
                </div>
                <div>
                  <span className="block text-lg font-semibold text-slate-600 text-center">
                    Quantity
                  </span>
                </div>
                <div>
                  <span className="block text-lg font-semibold text-slate-600 text-center">
                    Price
                  </span>
                </div>
              </div>

              {order?.getListProduct?.products.map(
                (product: any, index: number) => (
                  <div
                    key={index}
                    className="grid grid-cols-[70px_4fr_1fr_1fr_1fr] border-b border-slate-200 py-2 items-center gap-x-8"
                  >
                    <div className="grid place-items-center">
                      <img
                        src={product.image}
                        className="w-10 h-10 rounded-full"
                        alt=""
                      />
                    </div>
                    <div>
                      <span className="block text-sm text-slate-600">
                        {product.name}
                      </span>
                    </div>
                    <div>
                      <span className="block text-sm text-slate-600 text-center">
                        ${product.price}
                      </span>
                    </div>
                    <div>
                      <span className="block text-sm text-center font-semibold text-slate-400">
                        {product.qty}
                      </span>
                    </div>
                    <div>
                      <span className="block text-sm text-center font-semibold text-slate-400">
                        ${product.price * product.qty}
                      </span>
                    </div>
                  </div>
                )
              )}

              <div className="grid grid-cols-[70px_4fr_1fr_1fr_1fr] py-3 gap-x-8">
                <div>
                  <span className="block text-center font-semibold uppercase">
                    Total
                  </span>
                </div>
                <div></div>
                <div></div>
                <div></div>
                <div>
                  <span className="block text-center font-semibold text-slate-600">
                    $
                    {order?.getListProduct?.products.reduce(
                      (a: any, b: any) => a.price * a.qty + b.price * b.qty
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <span className="block text-xl mb-2 font-semibold text-slate-600 uppercase">
                Buyer
              </span>
              <UserSection idUser={order?.getListProduct?.idUser} />
              <span className="block mb-2 text-slate-400 mt-4">
                Purchase Status
              </span>

              <div>
                {order?.getListProduct?.status ? (
                  <button
                    className="flex items-center"
                    onClick={() => setShowModal(true)}
                  >
                    <span className="block text-4xl text-green-600">
                      <BsToggleOn />
                    </span>
                    <span className="block ml-3 text-slate-600">Delivered</span>
                  </button>
                ) : (
                  <button
                    className="flex items-center"
                    onClick={() => setShowModal(true)}
                  >
                    <span className="block text-4xl text-slate-600">
                      <BsToggleOff />
                    </span>
                    <span className="block ml-3 text-slate-600">
                      Undelivered
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <Modal handleCloseModal={() => setShowModal(false)} showModal={showModal}>
        <div className="flex flex-col justify-center h-full">
          <header className="flex items-start justify-between">
            <span className="block text-lg font-semibold text-slate-600">
              ¿Desea actualizar la información?
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
                handleUpdateStatusOrder();
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
    </div>
  );
};

export default OrderItem;
