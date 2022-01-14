import React from "react";
import { RiShoppingCartFill } from "react-icons/ri";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { GET_PRODUCTS, GET_PRODUCT } from "@/graphql/queries/products";
import client from "@/config/apollo";
import Layout from "@/layout";

interface ProductIprops {
  dataProduct: any;
}

export const getStaticPaths = async () => {
  const { data: dataProducts } = await client.query({
    query: GET_PRODUCTS,
  });

  const paths = dataProducts?.getProducts.map((item: any) => ({
    params: { id: item.id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: { params: any }) => {
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
        <div className="grid grid-cols-1 lg:grid-cols-2 pt-10 pb-20  lg:py-28 gap-y-10 items-center">
          <div className="grid place-items-center">
            <LazyLoadImage
              src={productDataPage?.image}
              alt=""
              width={"300px"}
              height={"300px"}
            />
          </div>
          <div className="px-3 lg:p-0">
            <h3 className="font-bold text-VeryDarkBlue text-2xl lg:text-4xl">
              {productDataPage?.name}
            </h3>
            <div className="flex items-center mt-1">
              <span className="block text-DarkGrayishBlue font-bold mr-2">
                Code:
              </span>
              <span className="block text-DarkGrayishBlue font-bold">
                {productDataPage?.code}
              </span>
            </div>
            {productDataPage?.description.map((item: any) => (
              <span
                key={item.id}
                className="block text-DarkGrayishBlue lg:w-9/12 mt-3"
              >
                {item?.text}
              </span>
            ))}
            <div>
              <span className="block text-3xl font-bold mt-3">
                ${productDataPage?.price}
              </span>
            </div>

            <div className="flex items-center">
              <button className="bg-DarkBlue inline-block text-VeryPaleRed py-3 px-8 rounded-full font-medium mt-4 text-sm mr-3">
                Buy now
              </button>
              <button className="bg-BrightRed inline-block text-VeryPaleRed py-3 px-8 rounded-full font-medium mt-4 text-xl">
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
