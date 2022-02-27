import React, { useState } from "react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import dayjs from "dayjs";

import { GET_ORDERS } from "@/graphql/queries/orders";
import { GET_USER } from "@/graphql/queries/user";
import { DELETE_ORDER } from "@/graphql/mutation/orders";
import Modal from "@/components/Modal";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";

const OrderItem = ({ order, refetch }: any) => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const { data: user, loading } = useQuery(GET_USER, {
    variables: {
      id: order?.idUser,
    },
  });

  const [deleteOrder] = useMutation(DELETE_ORDER);

  const handleDeleteOrder = async () => {
    try {
      await deleteOrder({
        variables: {
          id: order.id,
        },
      });
      refetch();
      toast.success("Successfully removed");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`flex-1 grid grid-cols-5 border-2 items-center border-white px-2 ${
        order.status ? "bg-green-100" : "bg-red-100"
      }`}
    >
      <div className="border-r-4 border-white text-slate-700 py-3 pl-2">
        {dayjs(order.createdAt).format("YYYY-MM-DD")}
      </div>
      <div className="border-r-4 border-white text-slate-700 py-3 pl-2">
        {dayjs(order.createdAt).format("HH:mm")} hs
      </div>
      <div className="border-r-4 border-white text-slate-700 py-3 pl-2">
        {order.products.length} productos
      </div>
      <div className="border-r-4 border-white text-slate-700 py-3 pl-2">
        {loading ? null : user.getUser.name}{" "}
        {loading ? null : user.getUser.lastname}
      </div>
      <div className="py-2 pl-3 grid grid-cols-2 gap-x-3">
        <button
          onClick={() => router.push(`/admin/product/orders/${order.id}`)}
          className="block w-full bg-white text-slate-700 px-4 py-1 rounded-sm"
        >
          Open
        </button>
        <button
          className="block w-full bg-red-400 text-white px-4 py-1 rounded-sm"
          onClick={() => setShowModal(true)}
        >
          Delete
        </button>
      </div>

      <Modal handleCloseModal={() => setShowModal(false)} showModal={showModal}>
        <div className="flex flex-col justify-center h-full">
          <header className="flex justify-between items-center">
            <span className="block text-lg font-semibold text-slate-600">
              ¿Desea eliminar?
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
                handleDeleteOrder();
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

const Orders: React.FC = () => {
  const router = useRouter();

  const {
    data: orders,
    loading,
    refetch,
  } = useQuery(GET_ORDERS, {
    fetchPolicy: "network-only",
  });

  return (
    <div className="flex">
      <div className="px-12 pt-10">
        <button
          className="border border-slate-300 rounded flex items-center justify-center px-3 py-2 text-slate-500 mb-8 w-32"
          onClick={() => router.push("/admin/product")}
        >
          <span className="mr-2">
            <BsFillArrowLeftCircleFill />
          </span>
          <span>Back</span>
        </button>
      </div>

      <div className="p-10 w-full h-screen overflow-y-auto no-scrollbar">
        <div className="">
          {loading ? (
            <span className="block">Cargando..</span>
          ) : (
            orders?.getListProducts.map((order: any) => (
              <OrderItem key={order.id} order={order} refetch={refetch} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
