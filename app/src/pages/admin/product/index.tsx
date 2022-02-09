import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { produce } from "immer";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { useMutation, useQuery } from "@apollo/client";
import { BsTrash } from "react-icons/bs";

import Loading from "@/components/Loading";
import Modal from "@/components/Modal";
import NavbarDashboard from "@/components/admin/Navbar";
import { GET_PRODUCT_INFO } from "@/graphql/queries/productInfo";
import { UPDATE_PRODUCT_INFO } from "@/graphql/mutation/productInfo";
import { GET_PRODUCTS } from "@/graphql/queries/products";
import { DELETE_PRODUCT_ITEM } from "@/graphql/mutation/product";
import { ProductInfo, Products } from "@/types/product";
import { Description } from "@/types/description";
import { useCart } from "@/hooks/useCart";

const ProductAdmin = () => {
  const router = useRouter();
  const { handleDeleteCart } = useCart();

  const [data, setData] = React.useState<ProductInfo | null>(null);
  const [dataItems, setDataItems] = React.useState<Products[]>([]);
  const [descriptionArray, setDescriptionArray] = React.useState<Description[]>(
    []
  );
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [itemDelete, setItemDelete] = React.useState<string | undefined>(
    undefined
  );

  const [updateProductInfo] = useMutation(UPDATE_PRODUCT_INFO);
  const [deleteProduct] = useMutation(DELETE_PRODUCT_ITEM);

  const { data: dataProductInfo } = useQuery(GET_PRODUCT_INFO, {
    fetchPolicy: "network-only",
  });

  const { data: dataProducts, refetch: refetchDataProducts } = useQuery(
    GET_PRODUCTS,
    {
      fetchPolicy: "network-only",
    }
  );

  useEffect(() => {
    setData(dataProductInfo?.getProductInfo);
    setDataItems(dataProducts?.getProducts);
    setDescriptionArray(dataProductInfo?.getProductInfo?.description);
  }, [dataProductInfo, dataProducts]);

  const newDescription: Description = {
    id: uuidv4(),
    text: "",
  };

  const handleAddInputDescription = () => {
    setDescriptionArray((currentDescription: Description[]) => [
      ...currentDescription,
      newDescription,
    ]);
  };

  const handleDeleteInputDescription = (id: string) => {
    setDescriptionArray((currentDescription: Description[]) =>
      currentDescription.filter((x: Description) => x.id !== id)
    );
  };

  const handleDeleteProductItem = async (id: string | undefined) => {
    if (id) {
      try {
        const response = await deleteProduct({
          variables: {
            id,
          },
        });
        handleDeleteCart(id);
        refetchDataProducts();
        toast.success(response?.data?.deleteProduct?.message);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleUpdate = async () => {
    const newDescriptionArray = descriptionArray.map(
      (description: Description) => {
        return {
          id: description.id,
          text: description.text,
        };
      }
    );

    if (!data?.title) {
      toast("El nombre es obligatoria!", {
        icon: "⚠️",
        style: {
          borderRadius: "10px",
          background: "#FFF",
          color: "#333",
        },
      });
      return;
    }

    const isDescriptionEmpty = newDescriptionArray.some(
      (description: Description) => description.text === ""
    );

    if (isDescriptionEmpty) {
      toast("La descripción debe tener contenido!", {
        icon: "⚠️",
        style: {
          borderRadius: "10px",
          background: "#FFF",
          color: "#333",
        },
      });
      return;
    }

    try {
      const response = await updateProductInfo({
        variables: {
          input: {
            id: data?.id,
            title: data?.title,
            description: newDescriptionArray,
          },
        },
      });

      toast.success(response?.data?.updateProductInfo?.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex">
      <NavbarDashboard />

      <section className="p-10 w-full h-screen overflow-y-auto no-scrollbar">
        <h1 className="text-3xl text-slate-600">Product Info</h1>

        {!data || !descriptionArray ? (
          <Loading />
        ) : (
          <div className="py-4">
            <div>
              <span className="block text-sm mb-2 text-slate-500">Title:</span>
              <input
                type="text"
                value={data?.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
                className="w-full block border border-slate-300 rounded px-3 py-2 focus:border-slate-500 focus:outline-0 transition-all duration-300"
              />
            </div>

            <div>
              <h3 className="text-slate-600 mt-4">Description:</h3>

              {!descriptionArray ? (
                <span className="block py-4 text-slate-900">
                  There is an error
                </span>
              ) : descriptionArray.length === 0 ? (
                <span className="block py-4 text-slate-900">
                  No description available
                </span>
              ) : (
                descriptionArray.map(
                  (description: Description, index: number) => (
                    <div key={description.id} className="flex py-4">
                      <textarea
                        className="w-full block border border-slate-300 rounded px-3 py-2 focus:border-slate-500 focus:outline-0 transition-all duration-300 resize-none h-32"
                        value={description.text}
                        onChange={(e) => {
                          const text = e.target.value;
                          setDescriptionArray(
                            (currentDescripton: Description[]) =>
                              produce(currentDescripton, (v) => {
                                v[index].text = text;
                              })
                          );
                        }}
                      ></textarea>
                      <button
                        className="block p-2 text-2xl px-5 text-red-500 bg-slate-100 ml-4 rounded"
                        onClick={() =>
                          handleDeleteInputDescription(description.id)
                        }
                      >
                        <BsTrash />
                      </button>
                    </div>
                  )
                )
              )}
            </div>

            <button
              className="border border-slate-300 rounded block px-3 py-2 text-slate-500 mb-8"
              onClick={handleAddInputDescription}
            >
              Add input description
            </button>

            <button
              className="bg-slate-700 text-white rounded block px-8 text-lg py-2 mt-8"
              onClick={handleUpdate}
            >
              Update Info
            </button>

            <div className="border border-slate-200 mt-8"></div>

            <h1 className="text-2xl text-slate-600 mt-8 mb-6">
              List of products
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {!dataItems ? (
                <span className="block py-4 text-slate-900">
                  Ha ocurrido un error
                </span>
              ) : dataItems && dataItems.length === 0 ? (
                <span className="block py-4 text-slate-900">
                  No products available
                </span>
              ) : (
                dataItems.map((product: Products) => (
                  <div
                    key={product.id}
                    className="shadow-lg rounded border border-slate-200 px-4 py-3 h-72 flex flex-col justify-between"
                  >
                    <div>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-32 object-contain"
                      />
                    </div>

                    <div>
                      <span className="block mb-2 text-slate-600">
                        {product.name}
                      </span>
                      <div className="grid grid-cols-2 gap-x-3 py-2">
                        <button
                          className="block w-full border border-slate-400 py-2 rounded"
                          onClick={() =>
                            router.push(`/admin/product/${product.id}`)
                          }
                        >
                          Editar
                        </button>
                        <button
                          className="block w-full bg-slate-500 py-2 rounded text-white"
                          onClick={() => {
                            setItemDelete(product.id);
                            setShowModal(true);
                          }}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <button
              className="border border-slate-300 rounded block px-3 py-2 text-slate-500 mt-6"
              onClick={() => router.push("/admin/create/product")}
            >
              Add new product
            </button>

            <Modal showModal={showModal}>
              <div className="flex flex-col justify-center h-full items-center">
                <h1>¿Desea eliminar?</h1>

                <div className="grid grid-cols-2 gap-x-4">
                  <button
                    className="block p-2 border"
                    onClick={() => {
                      handleDeleteProductItem(itemDelete);
                      setShowModal(false);
                    }}
                  >
                    Si
                  </button>
                  <button
                    className="block p-2 border"
                    onClick={() => {
                      setShowModal(false);
                      setItemDelete("");
                    }}
                  >
                    No
                  </button>
                </div>
              </div>
            </Modal>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductAdmin;
