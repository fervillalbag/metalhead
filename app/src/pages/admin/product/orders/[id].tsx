import { GET_ORDER } from "@/graphql/queries/orders";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React from "react";
import {
  BsFillArrowLeftCircleFill,
  // BsToggleOff,
  // BsToggleOn,
} from "react-icons/bs";

const OrderItem: React.FC = () => {
  const router = useRouter();

  const { data: order, loading } = useQuery(GET_ORDER, {
    variables: {
      id: router?.query?.id,
    },
  });

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
              <div className="grid grid-cols-[70px_1fr_4fr_1fr_1fr] border-b border-slate-200 pb-2 gap-x-8">
                <div>
                  <span className="block font-semibold text-slate-600 text-center">
                    Image
                  </span>
                </div>
                <div>
                  <span className="block font-semibold text-slate-600 text-center">
                    Code
                  </span>
                </div>
                <div>
                  <span className="block font-semibold text-slate-600">
                    Description
                  </span>
                </div>
                <div>
                  <span className="block font-semibold text-slate-600 text-center">
                    Quantity
                  </span>
                </div>
                <div>
                  <span className="block font-semibold text-slate-600 text-center">
                    Price
                  </span>
                </div>
              </div>

              {order?.getListProduct?.products.map((product: any) => (
                <div
                  key={product.id}
                  className="grid grid-cols-[70px_1fr_4fr_1fr_1fr] border-b border-slate-200 py-2 items-center gap-x-8"
                >
                  <div className="grid place-items-center">
                    <img
                      src={product.image}
                      className="w-10 h-10 rounded-full"
                      alt=""
                    />
                  </div>
                  <div>
                    <span className="block text-sm text-slate-600 text-center">
                      {product.code}
                    </span>
                  </div>
                  <div>
                    <span className="block text-sm text-slate-600">
                      {product.name}
                    </span>
                  </div>
                  <div>
                    <span className="block text-sm text-center font-semibold text-slate-400">
                      {product.qty}
                    </span>
                  </div>
                  <div>
                    <span className="block text-sm text-center font-semibold text-slate-400">
                      ${product.price}
                    </span>
                  </div>
                </div>
              ))}

              <div className="grid grid-cols-[70px_1fr_4fr_1fr_1fr] py-3 gap-x-8">
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
                      (a: any, b: any) => a.price + b.price
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-slate-200"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderItem;
