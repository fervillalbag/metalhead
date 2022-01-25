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

const ProductAdmin = () => {
  const router = useRouter();

  const [data, setData] = React.useState<any>(null);
  const [dataItems, setDataItems] = React.useState<any>([]);
  const [descriptionArray, setDescriptionArray] = React.useState<any>([]);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [itemDelete, setItemDelete] = React.useState<string>("");

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
  };

  if (!data || !descriptionArray || !dataItems) return <Loading />;

  return (
    <div className="p-4">
      <input
        type="text"
        value={data?.title}
        onChange={(e) => setData({ ...data, title: e.target.value })}
        className="p-2 border w-11/12"
      />

      <div>
        {descriptionArray.map((description: any, index: number) => (
          <div key={description.id} className="flex py-4">
            <textarea
              className="p-2 border w-11/12"
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
              className="block p-2 border"
              onClick={() => handleDeleteInputDescription(description.id)}
            >
              delete
            </button>
          </div>
        ))}
      </div>

      <button
        className="border block p-2 mb-4"
        onClick={handleAddInputDescription}
      >
        agregar campo
      </button>
      <button className="border block p-2" onClick={handleUpdate}>
        actualizar
      </button>

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

      <h3 className="my-4">Lista de productos</h3>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {dataItems.map((product: any) => (
          <div key={product.id} className="border p-2">
            <div>
              <img src={product.image} alt="" className="w-full" />
            </div>
            <span className="block py-2">{product.name}</span>

            <div className="grid grid-cols-2 gap-x-3">
              <button
                className="border p-2 block w-full"
                onClick={() => router.push(`/admin/product/${product.id}`)}
              >
                Editar
              </button>
              <button
                className="border p-2 block w-full"
                onClick={() => {
                  setItemDelete(product.id);
                  setShowModal(true);
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductAdmin;
