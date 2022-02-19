import { GET_ORDER } from "@/graphql/queries/orders";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React from "react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

const OrderItem: React.FC = () => {
  const router = useRouter();

  const { data: order, loading } = useQuery(GET_ORDER, {
    variables: {
      id: router?.query?.id,
    },
  });

  if (loading) return null;

  console.log(order?.getListProduct);

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

      <div className="p-10 w-full h-screen overflow-y-auto no-scrollbar"></div>
    </div>
  );
};

export default OrderItem;
