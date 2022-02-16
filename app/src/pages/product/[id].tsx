import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { RiShoppingCartFill } from "react-icons/ri";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { motion } from "framer-motion";

import { GET_PRODUCT } from "@/graphql/queries/products";
import client from "@/config/apollo";
import Layout from "@/layout";
import Skeleton from "@/components/Skeleton";
import { useCart } from "@/hooks/useCart";
import { isAuth, isUserNotFound } from "utils/actions";
import { getToken } from "utils/helpers";

interface ProductIprops {
  dataProduct: any;
}

export const getServerSideProps = async ({ params }: { params: any }) => {
  const { data: dataProduct } = await client.query({
    query: GET_PRODUCT,
    variables: {
      id: `${params.id}`,
    },
  });

  return {
    props: {
      dataProduct,
    },
  };
};

const Product: React.FC<ProductIprops> = ({ dataProduct }) => {
  isUserNotFound();

  const productDataPage = dataProduct?.getProduct;

  useEffect(() => {
    const token = getToken();

    if (!token) {
      return;
    } else {
      isAuth();
    }
  }, []);

  const { handleAddCart } = useCart();

  return (
    <Layout>
      <div className="max-w-6xl w-11/12 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[500px_1fr] pt-10 pb-20  lg:py-24 gap-y-10 gap-x-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.3, duration: 0.3 },
            }}
            className="grid place-items-center"
          >
            {!productDataPage && (
              <div className="w-full h-[500px]">
                <Skeleton type="thumbnail" />
              </div>
            )}

            <LazyLoadImage
              src={productDataPage?.image}
              alt=""
              width={"300px"}
              height={"300px"}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.3, duration: 0.3 },
            }}
            className="lg:p-0"
          >
            {!productDataPage && (
              <div>
                <Skeleton type="title" />
              </div>
            )}

            <h3 className="font-bold text-VeryDarkBlue text-2xl">
              {productDataPage?.name}
            </h3>

            {!productDataPage && (
              <div>
                <Skeleton type="title" />
              </div>
            )}

            <div className="flex items-center mt-1">
              <span className="block text-DarkGrayishBlue text-sm font-regular mr-1">
                Code:
              </span>
              <span className="block text-DarkGrayishBlue text-sm font-regular">
                {productDataPage?.code}
              </span>
            </div>

            {!productDataPage && (
              <div className="w-32">
                <Skeleton type="title" />
              </div>
            )}

            <div>
              <span className="block text-DarkBlue text-3xl font-bold mt-3">
                ${productDataPage?.price}
              </span>
            </div>

            <div className="py-4">
              {productDataPage?.description.map((item: any) => (
                <div key={item.id}>
                  {!productDataPage && (
                    <div>
                      <Skeleton type="text" />
                      <Skeleton type="text" />
                      <Skeleton type="text" />
                    </div>
                  )}

                  <span className="block text-DarkGrayishBlue lg:w-9/12 mt-3">
                    {item?.text}
                  </span>
                </div>
              ))}
            </div>

            {!productDataPage && (
              <div className="w-32">
                <Skeleton type="title" />
              </div>
            )}

            <div className="flex items-center mb-2">
              <span className="block text-slate-800 text-sm font-regular mr-1">
                Available:
              </span>
              <span className="block text-slate-800 text-sm font-bold">
                {productDataPage?.quantity}
              </span>
            </div>

            <div className="flex items-center">
              <button className="bg-DarkBlue inline-block text-VeryPaleRed py-3 px-8 rounded-full font-medium mt-4 text-sm mr-3">
                Buy now
              </button>
              <button
                className="border-BrightRed border inline-block text-BrightRed py-3 px-8 rounded-full font-medium mt-4 text-xl"
                onClick={() => {
                  handleAddCart(productDataPage);
                  toast.success("Agregado al carrito");
                }}
              >
                <RiShoppingCartFill />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
