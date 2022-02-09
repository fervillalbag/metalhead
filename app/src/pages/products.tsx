import React from "react";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { RiShoppingCartFill } from "react-icons/ri";
import { LazyLoadImage } from "react-lazy-load-image-component";

import Layout from "@/layout";
import client from "@/config/apollo";
import { GET_PRODUCTS } from "@/graphql/queries/products";
import Skeleton from "@/components/Skeleton";
import { useCart } from "@/hooks/useCart";

interface ProductsIprops {
  dataProducts: any;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: dataProducts } = await client.query({
    query: GET_PRODUCTS,
  });

  return {
    props: {
      dataProducts,
    },
  };
};

const Products: React.FC<ProductsIprops> = ({ dataProducts }) => {
  const dataProductsPage = dataProducts?.getProducts;

  const { handleAddCart } = useCart();

  return (
    <Layout>
      <div className="max-w-6xl w-11/12 mx-auto py-4 pb-16 min-h-[400px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-10">
          {dataProductsPage.map((item: any) => (
            <article key={item.id} className="">
              <Link href={`/product/${item.id}`}>
                <a>
                  <div className="border border-DarkGrayishBlue p-4 text-center">
                    {!dataProductsPage && (
                      <div className="w-64 h-64 mx-auto">
                        <Skeleton type="thumbnail" />
                      </div>
                    )}

                    <LazyLoadImage
                      src={item?.image}
                      alt=""
                      placeholderSrc="/imageload.png"
                      className="w-full h-64 object-cover align-top"
                    />
                  </div>
                </a>
              </Link>
              <div className="border border-t-0 border-DarkGrayishBlue p-4">
                {!dataProductsPage && (
                  <div className="mb-6">
                    <Skeleton type="text" />
                  </div>
                )}

                <span className="block font-medium text-DarkGrayishBlue">
                  Vendor code: {item?.code}
                </span>

                {!dataProductsPage && (
                  <div>
                    <Skeleton type="text" />
                  </div>
                )}

                <span className="block text-VeryDarkBlue font-medium mt-2 text-xl">
                  {item?.name}
                </span>

                <div className="flex items-center justify-between mt-4">
                  {!dataProductsPage && (
                    <div>
                      <Skeleton type="text" />
                    </div>
                  )}

                  <div>
                    <span className="block font-medium text-DarkGrayishBlue">
                      Price:
                    </span>
                    <span className="block text-xl text-VeryDarkBlue font-medium mt-1">
                      ${item?.price}
                    </span>
                  </div>
                  <div>
                    <button
                      className="text-2xl bg-BrightRed text-white w-12 h-12 flex items-center justify-center rounded-full cursor-pointer"
                      onClick={() => handleAddCart(item)}
                    >
                      <RiShoppingCartFill />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Products;
