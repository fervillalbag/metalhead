import React from "react";
import { produce } from "immer";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { useMutation } from "@apollo/client";

import Loading from "@/components/Loading";
import client from "@/config/apollo";
import { GET_PRODUCT_INFO } from "@/graphql/queries/productInfo";
import { UPDATE_PRODUCT_INFO } from "@/graphql/mutation/productInfo";
import { GET_PRODUCTS } from "@/graphql/queries/products";
import Modal from "@/components/Modal";
import { DELETE_PRODUCT_ITEM } from "@/graphql/mutation/product";
import NavbarDashboard from "@/components/admin/Navbar";
import { BsTrash } from "react-icons/bs";

const ProductAdmin = () => {
  const router = useRouter();

  const [data, setData] = React.useState<any>(null);
  const [dataItems, setDataItems] = React.useState<any>([]);
  const [descriptionArray, setDescriptionArray] = React.useState<any>([]);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [itemDelete, setItemDelete] = React.useState<string>("");
  const [error, setError] = React.useState<any>({
    type: "",
    status: false,
  });

  const [updateProductInfo] = useMutation(UPDATE_PRODUCT_INFO);
  const [deleteProduct] = useMutation(DELETE_PRODUCT_ITEM);

  React.useEffect(() => {
    (async () => {
      const { data: dataProductInfo } = await client.query({
        query: GET_PRODUCT_INFO,
      });
      setData(dataProductInfo?.getProductInfo);
      setDescriptionArray(dataProductInfo?.getProductInfo?.description);

      const { data: dataProducts } = await client.query({
        query: GET_PRODUCTS,
      });
      setDataItems(dataProducts?.getProducts);
    })();
  }, []);

  const newDescription = {
    id: uuidv4(),
    text: "",
  };

  const handleAddInputDescription = () => {
    setDescriptionArray((currentDescription: any) => [
      ...currentDescription,
      newDescription,
    ]);
  };

  const handleDeleteInputDescription = (id: string) => {
    setDescriptionArray((currentDescription: any) =>
      currentDescription.filter((x: any) => x.id !== id)
    );
  };

  const handleDeleteReviewItem = async (id: string) => {
    try {
      const response = await deleteProduct({
        variables: {
          id,
        },
      });
      console.log(response);
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    const newDescriptionArray = descriptionArray.map((description: any) => {
      return {
        id: description.id,
        text: description.text,
      };
    });

    if (!data?.title) {
      setError({
        type: "Todos los campos son obligatorios",
        status: true,
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

      console.log(response);
    } catch (error) {
      console.log(error);
    }

    setError({
      type: "",
      status: false,
    });
  };

  return (
    <div className="flex">
      <NavbarDashboard />

      <section className="p-10 w-full h-screen overflow-y-auto no-scrollbar">
        <h1 className="text-3xl text-slate-600">Product Info</h1>

        {!data || !descriptionArray || !dataItems ? (
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

              {descriptionArray.length === 0 ? (
                <span className="block py-4 text-slate-900">
                  No description available
                </span>
              ) : (
                descriptionArray.map((description: any, index: number) => (
                  <div key={description.id} className="flex py-4">
                    <textarea
                      className="w-full block border border-slate-300 rounded px-3 py-2 focus:border-slate-500 focus:outline-0 transition-all duration-300 resize-none h-32"
                      value={description.text}
                      onChange={(e) => {
                        const text = e.target.value;
                        setDescriptionArray((currentDescripton: any) =>
                          produce(currentDescripton, (v: any) => {
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
                ))
              )}
            </div>

            <button
              className="border border-slate-300 rounded block px-3 py-2 text-slate-500 mb-8"
              onClick={handleAddInputDescription}
            >
              Add input description
            </button>

            <h1 className="text-2xl text-slate-600 mt-8 mb-6">
              List of products
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6">
              {dataItems.length === 0 ? (
                <span className="block py-4 text-slate-900">
                  No products available
                </span>
              ) : (
                dataItems.map((product: any) => (
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

            <div className="border border-slate-200 mt-8"></div>

            <button
              className="bg-slate-700 text-white rounded block px-8 text-lg py-2 mt-8"
              onClick={handleUpdate}
            >
              Update Info
            </button>

            {error.status && <span className="block">{error.type}</span>}

            <Modal showModal={showModal}>
              <div className="flex flex-col justify-center h-full items-center">
                <h1>¿Desea eliminar?</h1>

                <div className="grid grid-cols-2 gap-x-4">
                  <button
                    className="block p-2 border"
                    onClick={() => {
                      handleDeleteReviewItem(itemDelete);
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
