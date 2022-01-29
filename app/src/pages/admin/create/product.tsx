import React from "react";
import { produce } from "immer";
import { v4 as uuidv4 } from "uuid";

import Loading from "@/components/Loading";
import { useMutation } from "@apollo/client";
import { CREATE_PRODUCT_ITEM } from "@/graphql/mutation/product";

const CreateProductAdmin: React.FC = () => {
  const [data, setData] = React.useState<any>({
    name: "",
    code: 0,
    image: "",
    price: 0,
  });
  const [descriptionArray, setDescriptionArray] = React.useState<any>([
    {
      id: uuidv4(),
      text: "",
    },
  ]);
  const [showProductImage, setShowProductImage] = React.useState<any>(null);
  const [fileProduct, setFileProduct] = React.useState<any>(null);
  const [error, setError] = React.useState<any>({
    type: "",
    status: false,
  });

  const [createProduct] = useMutation(CREATE_PRODUCT_ITEM);

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

  const handleHeaderFileChange = (e: any) => {
    const file = e.currentTarget.files[0];
    const image = URL.createObjectURL(file);
    setShowProductImage(image);
    setFileProduct(file);
  };

  const handleCreateProduct = async () => {
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

      const responseApi = await createProduct({
        variables: {
          input: {
            name: data?.name,
            code: Number(data?.code),
            price: Number(data?.price),
            image: imageData?.secure_url,
            description: descriptionArray,
          },
        },
      });

      console.log(responseApi?.data);
    } else {
      setError({ type: "La imagen es obligatoria", status: true });
    }
  };

  if (!data || !descriptionArray) return <Loading />;

  return (
    <div className="p-4">
      <div className="py-4">
        <input
          type="text"
          placeholder="Introduce nombre"
          value={data?.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          className="border p-2 w-11/12"
        />
      </div>
      <div className="py-4">
        <input
          type="number"
          placeholder="Introduce código"
          value={data?.code}
          onChange={(e) => setData({ ...data, code: e.target.value })}
          className="border p-2 w-11/12"
        />
      </div>
      <div className="py-4">
        <input
          type="number"
          placeholder="Introduce precio"
          value={data?.price}
          onChange={(e) => setData({ ...data, price: e.target.value })}
          className="border p-2 w-11/12"
        />
      </div>

      <div className="py-4">
        <input type="file" onChange={handleHeaderFileChange} />
      </div>

      {showProductImage && (
        <div className="py-4">
          <img src={showProductImage} alt="" width={100} />
        </div>
      )}

      <div className="py-4">
        {descriptionArray.map((description: any, index: number) => (
          <div key={description.id} className="flex py-4">
            <textarea
              className="border p-2 w-11/12"
              value={description.text}
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
              className="p-2 border block"
              onClick={() => handleDeleteInputDescription(description.id)}
            >
              delete
            </button>
          </div>
        ))}
      </div>

      <button
        className="border p-2 block mb-4"
        onClick={handleAddInputDescription}
      >
        agregar campo
      </button>
      <button className="border p-2 block mb-4" onClick={handleCreateProduct}>
        crear
      </button>

      {error.status && <span className="block">{error.type}</span>}
    </div>
  );
};

export default CreateProductAdmin;
