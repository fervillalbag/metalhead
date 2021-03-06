import React, { useEffect } from "react";
import produce from "immer";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { useMutation, useQuery } from "@apollo/client";
import toast from "react-hot-toast";

import { GET_PRODUCT } from "@/graphql/queries/products";
import Loading from "@/components/Loading";
import { UPDATE_PRODUCT_ITEM } from "@/graphql/mutation/product";
import { BsFillArrowLeftCircleFill, BsTrash } from "react-icons/bs";
import { Products } from "@/types/product";
import { Description } from "@/types/description";
import { FileType } from "@/types/file";

const ProductItemAdmin: React.FC = () => {
  const router = useRouter();

  const [data, setData] = React.useState<Products | null>(null);
  const [showProductImage, setShowProductImage] = React.useState<string | null>(
    null
  );
  const [descriptionArray, setDescriptionArray] = React.useState<Description[]>(
    []
  );
  const [fileProduct, setFileProduct] = React.useState<FileType | null | Blob>(
    null
  );

  const inputFileRef = React.useRef<HTMLInputElement | null>(null);
  const [updateProduct] = useMutation(UPDATE_PRODUCT_ITEM);

  const { data: productId } = useQuery(GET_PRODUCT, {
    fetchPolicy: "network-only",
    variables: {
      id: router?.query?.id,
    },
  });

  useEffect(() => {
    setData(productId?.getProduct);
    setDescriptionArray(productId?.getProduct?.description);
  }, [router, productId]);

  const handleChangeImage = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const handleHeaderFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget as HTMLInputElement;
    const file = target.files![0];
    const image = URL.createObjectURL(file);
    setShowProductImage(image);
    setFileProduct(file);
  };

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

  const handleUpdate = async () => {
    const newDescriptionArray = descriptionArray.map(
      (description: Description) => {
        return {
          id: description.id,
          text: description.text,
        };
      }
    );

    if (
      data?.name === "" ||
      !data?.name ||
      data?.code === 0 ||
      !data?.code ||
      !data?.quantity ||
      data?.price === 0 ||
      !data?.price
    ) {
      toast("Todos los campos son obligatorios!", {
        icon: "??????",
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
      toast("La descripci??n debe tener contenido!", {
        icon: "??????",
        style: {
          borderRadius: "10px",
          background: "#FFF",
          color: "#333",
        },
      });
      return;
    }

    if (newDescriptionArray[0].text === "") {
      toast("La descripci??n debe tener contenido!", {
        icon: "??????",
        style: {
          borderRadius: "10px",
          background: "#FFF",
          color: "#333",
        },
      });
      return;
    }

    if (fileProduct) {
      const url = process.env.URL_CLOUDINARY_RES;

      try {
        const formData = new FormData();
        formData.append("file", fileProduct as string | Blob);
        formData.append(
          "upload_preset",
          process.env.CLOUDINARY_NAME_PRESET_PRODUCTS_HOME as string
        );
        const res = await fetch(url as string, {
          method: "post",
          body: formData,
        });
        const imageData = await res.json();

        const responseApi = await updateProduct({
          variables: {
            input: {
              id: data?.id,
              name: data?.name,
              code: Number(data?.code),
              quantity: Number(data?.quantity),
              image: imageData?.secure_url,
              price: Number(data?.price),
              description: newDescriptionArray,
            },
          },
        });
        toast.success(responseApi?.data?.updateProduct?.message);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const responseApi = await updateProduct({
          variables: {
            input: {
              id: data?.id,
              name: data?.name,
              code: Number(data?.code),
              quantity: Number(data?.quantity),
              image: data?.image,
              price: Number(data?.price),
              description: newDescriptionArray,
            },
          },
        });

        toast.success(responseApi?.data?.updateProduct?.message);
      } catch (error) {
        console.log(error);
      }
    }

    router.push("/admin/product");
  };

  if (!data || !descriptionArray) return <Loading />;

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
        <h1 className="text-3xl text-slate-600">Update product</h1>

        <div>
          <div className="pt-8 pb-4">
            <span className="block text-sm mb-2 text-slate-500">Name:</span>
            <input
              type="text"
              value={data?.name}
              className="w-full block border border-slate-300 rounded px-3 py-2 focus:border-slate-500 focus:outline-0 transition-all duration-300"
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>
          <div className="py-4">
            <span className="block text-sm mb-2 text-slate-500">Code:</span>
            <input
              type="number"
              value={data?.code}
              className="w-full block border border-slate-300 rounded px-3 py-2 focus:border-slate-500 focus:outline-0 transition-all duration-300"
              onChange={(e) =>
                setData({ ...data, code: Number(e.target.value) })
              }
            />
          </div>
          <div className="py-4">
            <span className="block text-sm mb-2 text-slate-500">Quantity:</span>
            <input
              type="number"
              value={data?.quantity}
              className="w-full block border border-slate-300 rounded px-3 py-2 focus:border-slate-500 focus:outline-0 transition-all duration-300"
              onChange={(e) =>
                setData({ ...data, quantity: Number(e.target.value) })
              }
            />
          </div>
          <div className="py-4">
            <span className="block text-sm mb-2 text-slate-500">Price:</span>
            <input
              type="number"
              value={data?.price}
              className="w-full block border border-slate-300 rounded px-3 py-2 focus:border-slate-500 focus:outline-0 transition-all duration-300"
              onChange={(e) =>
                setData({ ...data, price: Number(e.target.value) })
              }
            />
          </div>

          <div className="py-4">
            <button
              className="border border-slate-300 rounded block px-3 py-2 text-slate-500 mb-2"
              onClick={handleChangeImage}
            >
              Change image
            </button>
            <input
              ref={inputFileRef}
              type="file"
              onChange={handleHeaderFileChange}
              className="hidden"
            />

            <div className="pt-4">
              {!showProductImage ? (
                <img src={data?.image} width={100} alt="" />
              ) : (
                <img src={showProductImage} width={100} alt="" />
              )}
            </div>
          </div>

          <div>
            <h3 className="text-slate-600 mt-4">Description:</h3>

            {descriptionArray.length === 0 ? (
              <span className="block py-4 text-slate-900">
                No description available
              </span>
            ) : (
              descriptionArray.map(
                (description: Description, index: number) => (
                  <div key={description.id} className="flex py-4">
                    <textarea
                      value={description.text}
                      className="w-full block border border-slate-300 rounded px-3 py-2 focus:border-slate-500 focus:outline-0 transition-all duration-300 resize-none h-32"
                      onChange={(e) => {
                        const text = e.target.value;
                        setDescriptionArray(
                          (currentDescription: Description[]) =>
                            produce(currentDescription, (v) => {
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
            className="border border-slate-300 rounded block px-3 py-2 text-slate-500 mt-2 mb-8"
            onClick={handleAddInputDescription}
          >
            Add input description
          </button>
          <button
            className="bg-slate-700 text-white rounded block px-8 text-lg py-2 mt-8"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItemAdmin;
