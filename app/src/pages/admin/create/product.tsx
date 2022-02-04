import React from "react";
import { produce } from "immer";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

import Loading from "@/components/Loading";
import { useMutation } from "@apollo/client";
import { CREATE_PRODUCT_ITEM } from "@/graphql/mutation/product";
import { BsFillArrowLeftCircleFill, BsTrash } from "react-icons/bs";
import { useRouter } from "next/router";

const CreateProductAdmin: React.FC = () => {
  const router = useRouter();

  const [data, setData] = React.useState<any>({
    name: "",
    code: 0,
    quantity: 0,
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

  const inputFileRef = React.useRef<any>(null);
  const [createProduct] = useMutation(CREATE_PRODUCT_ITEM);

  const newDescription = {
    id: uuidv4(),
    text: "",
  };

  const handleChangeImage = () => {
    inputFileRef.current.click();
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
      data?.quantity === "" ||
      !data?.quantity ||
      data?.price === "" ||
      !data?.price
    ) {
      toast("Todos los campos son obligatorios!", {
        icon: "⚠️",
        style: {
          borderRadius: "10px",
          background: "#FFF",
          color: "#333",
        },
      });
      return;
    }

    if (descriptionArray[0].text === "") {
      toast("La descripción es obligatoria!", {
        icon: "⚠️",
        style: {
          borderRadius: "10px",
          background: "#FFF",
          color: "#333",
        },
      });
      return;
    }

    if (!fileProduct) {
      toast("La imagen es obligatoria!", {
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
            quantity: Number(data?.quantity),
            price: Number(data?.price),
            image: imageData?.secure_url,
            description: descriptionArray,
          },
        },
      });

      toast.success(responseApi?.data?.createProduct?.message);
    } catch (error) {
      console.log(error);
    }

    router.push("/admin/product");
  };

  if (!data) return <Loading />;

  return (
    <div className="flex">
      <div className="px-12 pt-10">
        <button
          className="border border-slate-300 rounded flex items-center justify-center px-3 py-2 text-slate-500 mb-8 w-32"
          onClick={() => router.push("/admin/product")}
        >
          <span className="mr-2">
            <BsFillArrowLeftCircleFill />
          </span>
          <span>Back</span>
        </button>
      </div>

      <div className="p-10 w-full h-screen overflow-y-auto no-scrollbar">
        <h1 className="text-3xl text-slate-600">Create a new product</h1>

        <div className="pt-8 pb-3">
          <span className="block text-sm mb-2 text-slate-500">Name:</span>
          <input
            type="text"
            value={data?.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className="w-full block border border-slate-300 rounded px-3 py-2 focus:border-slate-500 focus:outline-0 transition-all duration-300"
          />
        </div>
        <div className="py-3">
          <span className="block text-sm mb-2 text-slate-500">Code:</span>
          <input
            type="number"
            placeholder="Introduce código"
            value={data?.code}
            onChange={(e) => setData({ ...data, code: e.target.value })}
            className="w-full block border border-slate-300 rounded px-3 py-2 focus:border-slate-500 focus:outline-0 transition-all duration-300"
          />
        </div>
        <div className="py-3">
          <span className="block text-sm mb-2 text-slate-500">Quantity:</span>
          <input
            type="number"
            placeholder="Introduce código"
            value={data?.quantity}
            onChange={(e) => setData({ ...data, quantity: e.target.value })}
            className="w-full block border border-slate-300 rounded px-3 py-2 focus:border-slate-500 focus:outline-0 transition-all duration-300"
          />
        </div>
        <div className="py-3">
          <span className="block text-sm mb-2 text-slate-500">Price:</span>
          <input
            type="number"
            placeholder="Introduce precio"
            value={data?.price}
            onChange={(e) => setData({ ...data, price: e.target.value })}
            className="w-full block border border-slate-300 rounded px-3 py-2 focus:border-slate-500 focus:outline-0 transition-all duration-300"
          />
        </div>

        <div className="pt-3">
          <button
            className="border border-slate-300 rounded block px-3 py-2 text-slate-500 mb-2"
            onClick={handleChangeImage}
          >
            Change image
          </button>
          <input
            ref={inputFileRef}
            type="file"
            className="hidden"
            onChange={handleHeaderFileChange}
          />
        </div>

        {showProductImage && (
          <div className="pt-4">
            <img src={showProductImage} alt="" width={100} />
          </div>
        )}

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
                    setDescriptionArray((currentDescription: any) =>
                      produce(currentDescription, (v: any) => {
                        v[index].text = text;
                      })
                    );
                  }}
                ></textarea>
                <button
                  className="block p-2 text-2xl px-5 text-red-500 bg-slate-100 ml-4 rounded"
                  onClick={() => handleDeleteInputDescription(description.id)}
                >
                  <BsTrash />
                </button>
              </div>
            ))
          )}
        </div>

        <button
          className="border border-slate-300 rounded block px-3 py-2 text-slate-500 mt-2 mb-8"
          onClick={handleAddInputDescription}
        >
          Add input description
        </button>
        <button
          className="bg-slate-700 text-white rounded block px-8 text-lg py-2 mt-8"
          onClick={handleCreateProduct}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateProductAdmin;
