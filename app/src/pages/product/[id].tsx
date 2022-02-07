import React from "react";
import { RiShoppingCartFill } from "react-icons/ri";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { GET_PRODUCT } from "@/graphql/queries/products";
import client from "@/config/apollo";
import Layout from "@/layout";
import Skeleton from "@/components/Skeleton";

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
  const productDataPage = dataProduct?.getProduct;

  return (
    <Layout>
      <div className="max-w-6xl w-11/12 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[500px_1fr] pt-10 pb-20  lg:py-24 gap-y-10 gap-x-10 items-center">
          <div className="grid place-items-center">
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
          </div>
          <div className="lg:p-0">
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
              <button className="border-BrightRed border inline-block text-BrightRed py-3 px-8 rounded-full font-medium mt-4 text-xl">
                <RiShoppingCartFill />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
