import React, { useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { RiShoppingCartFill } from "react-icons/ri";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { motion } from "framer-motion";

import Layout from "@/layout";
import { GET_PRODUCTS } from "@/graphql/queries/products";
import Skeleton from "@/components/Skeleton";
import { useCart } from "@/hooks/useCart";
import { isAuth, isUserNotFound } from "utils/actions";
import { getToken } from "utils/helpers";
import { useQuery } from "@apollo/client";

const Products: React.FC = () => {
  isUserNotFound();

  const { data: dataProducts } = useQuery(GET_PRODUCTS, {
    fetchPolicy: "network-only",
  });
  const dataProductsPage = dataProducts?.getProducts;

  const { handleAddCart } = useCart();

  useEffect(() => {
    const token = getToken();

    if (!token) {
      return;
    } else {
      isAuth();
    }
  }, []);

  return (
    <Layout>
      <div className="max-w-6xl w-11/12 mx-auto py-4 pb-16 min-h-[400px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-10">
          {dataProductsPage &&
            dataProductsPage.map((item: any, index: number) => (
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: index * 0.3, duration: 0.5 },
                }}
                key={item.id}
              >
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

                  <span className="block font-medium text-sm text-DarkGrayishBlue">
                    Vendor code: {item?.code}
                  </span>

                  {!dataProductsPage && (
                    <div>
                      <Skeleton type="text" />
                    </div>
                  )}

                  <span className="block text-VeryDarkBlue font-medium mt-2">
                    {item?.name.slice(0, 30)}
                    {item?.name.length >= 30 && "..."}
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
                        onClick={() => {
                          handleAddCart(item);
                          toast.success("Agregado al carrito");
                        }}
                      >
                        <RiShoppingCartFill />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default Products;
