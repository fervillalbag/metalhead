import React from "react";
import produce from "immer";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { useMutation } from "@apollo/client";

import client from "@/config/apollo";
import { GET_PRODUCT } from "@/graphql/queries/products";
import Loading from "@/components/Loading";
import { UPDATE_PRODUCT_ITEM } from "@/graphql/mutation/product";

const ProductItemAdmin: React.FC = () => {
  const router = useRouter();
  const queryId = router?.query?.id;

  const [data, setData] = React.useState<any>(null);
  const [showProductImage, setShowProductImage] = React.useState<any>(null);
  const [descriptionArray, setDescriptionArray] = React.useState<any>(null);
  const [fileProduct, setFileProduct] = React.useState<any>(null);
  const [error, setError] = React.useState<any>({
    type: "",
    status: false,
  });

  const [updateProduct] = useMutation(UPDATE_PRODUCT_ITEM);

  React.useEffect(() => {
    (async () => {
      if (queryId) {
        const { data: productId } = await client.query({
          query: GET_PRODUCT,
          variables: {
            id: queryId,
          },
        });
        setData(productId?.getProduct);
        setDescriptionArray(productId?.getProduct?.description);
      }
    })();
  }, [router]);

  const handleHeaderFileChange = (e: any) => {
    const file = e.currentTarget.files[0];
    const image = URL.createObjectURL(file);
    setShowProductImage(image);
    setFileProduct(file);
  };

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

  const handleUpdate = async () => {
    const newDescriptionArray = descriptionArray.map((description: any) => {
      return {
        id: description.id,
        text: description.text,
      };
    });

    if (
      data?.name === "" ||
      !data?.name ||
      data?.code === "" ||
      !data?.code ||
      data?.price === "" ||
      !data?.price
    ) {
      setError({
        type: "Todos los campos son obligatorios",
        status: true,
      });
      return;
    }

    if (fileProduct) {
      const url = "https://api.cloudinary.com/v1_1/dbp9am0cx/image/upload";
      const formData = new FormData();
      formData.append("file", fileProduct);
      formData.append("upload_preset", "products");
      const res = await fetch(url, { method: "post", body: formData });
      const imageData = await res.json();

      const responseApi = await updateProduct({
        variables: {
          input: {
            id: data?.id,
            name: data?.name,
            code: Number(data?.code),
            image: imageData?.secure_url,
            price: Number(data?.price),
            description: newDescriptionArray,
          },
        },
      });

      console.log(responseApi?.data);
    } else {
      const responseApi = await updateProduct({
        variables: {
          input: {
            id: data?.id,
            name: data?.name,
            code: Number(data?.code),
            image: data?.image,
            price: Number(data?.price),
            description: newDescriptionArray,
          },
        },
      });

      console.log(responseApi?.data);
    }
  };

  if (!data || !descriptionArray) return <Loading />;

  return (
    <div className="p-4">
      <div className="py-4">
        <input
          type="text"
          value={data?.name}
          className="w-11/12 border p-2"
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
      </div>
      <div className="py-4">
        <input
          type="number"
          value={data?.code}
          className="w-11/12 border p-2"
          onChange={(e) => setData({ ...data, code: e.target.value })}
        />
      </div>
      <div className="py-4">
        <input
          type="number"
          value={data?.price}
          className="w-11/12 border p-2"
          onChange={(e) => setData({ ...data, price: e.target.value })}
        />
      </div>

      <div className="py-4">
        <input type="file" onChange={handleHeaderFileChange} />
        <div className="pt-4">
          {!showProductImage ? (
            <img src={data?.image} width={100} alt="" />
          ) : (
            <img src={showProductImage} width={100} alt="" />
          )}
        </div>
      </div>

      <div className="py-4">
        {descriptionArray.map((description: any, index: number) => (
          <div key={description.id} className="flex py-4">
            <textarea
              value={description.text}
              className="border p-2 w-11/12"
              onChange={(e) => {
                const text = e.target.value;
                setDescriptionArray((currentDescription: any) =>
                  produce(currentDescription, (v: any) => {
                    v[index].text = text;
                  })
                );
              }}
            ></textarea>
            <button
              className="border p-2"
              onClick={() => handleDeleteInputDescription(description.id)}
            >
              delete
            </button>
          </div>
        ))}
      </div>

      <button
        className="block border p-2 mb-4"
        onClick={handleAddInputDescription}
      >
        agregar campo
      </button>
      <button className="block border p-2" onClick={handleUpdate}>
        actualizar
      </button>

      {error.status && <span className="block">{error.type}</span>}
    </div>
  );
};

export default ProductItemAdmin;
