import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";
import { BsTrash } from "react-icons/bs";
import { produce } from "immer";

import Loading from "@/components/Loading";
import NavbarDashboard from "@/components/admin/Navbar";
import { GET_HEADER_HOME } from "@/graphql/queries/headerHome";
import { UPDATE_HEADER_INFO } from "@/graphql/mutation/header";
import { HeaderInfo } from "@/types/header";
import { Description } from "@/types/description";
import { FileType } from "@/types/file";

const HeaderAdmin: React.FC = () => {
  const [data, setData] = React.useState<HeaderInfo | null>(null);
  const [descriptionArray, setDescriptionArray] = React.useState<Description[]>(
    []
  );
  const [showHeaderImage, setShowHeaderImage] = React.useState<string | null>(
    null
  );
  const [fileHeader, setFileHeader] = React.useState<FileType | null | Blob>(
    null
  );

  const inputFileRef = React.useRef<HTMLInputElement | null>(null);
  const [updateHeaderHome] = useMutation(UPDATE_HEADER_INFO);

  const newDescription: Description = {
    id: uuidv4(),
    text: "",
  };

  const handleChangeImage = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const handleAddNewInputDescription = () => {
    setDescriptionArray([...descriptionArray, newDescription]);
  };

  const handleDeleteInputDescription = (id: string) => {
    const newValue = descriptionArray.filter(
      (description: Description) => description.id !== id
    );
    setDescriptionArray(newValue);
  };

  const { data: headerData } = useQuery(GET_HEADER_HOME, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    setData(headerData?.getHeaderHome);
    setDescriptionArray(headerData?.getHeaderHome.description);
  }, [headerData]);

  const handleHeaderFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget as HTMLInputElement;
    const file = target.files![0];
    const image = URL.createObjectURL(file);
    setShowHeaderImage(image);
    setFileHeader(file);
  };

  const handleUpdate = async () => {
    const newDescriptionArray = descriptionArray.map((item: Description) => {
      return {
        id: item.id,
        text: item.text,
      };
    });

    if (data?.title === "") {
      toast("El nombre es obligatorio!", {
        icon: "⚠️",
        style: {
          borderRadius: "10px",
          background: "#FFF",
          color: "#333",
        },
      });
      return;
    }

    if (newDescriptionArray.length === 0) {
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

    if (fileHeader) {
      const url = process.env.URL_CLOUDINARY_RES;
      const formData = new FormData();
      formData.append("file", fileHeader as string | Blob);
      formData.append(
        "upload_preset",
        process.env.CLOUDINARY_NAME_PRESET_HEADER_HOME as string
      );
      const res = await fetch(url as string, {
        method: "post",
        body: formData,
      });
      const imageData = await res.json();

      const responseApi = await updateHeaderHome({
        variables: {
          input: {
            id: data?.id,
            title: data?.title,
            description: newDescriptionArray,
            image: imageData?.secure_url,
          },
        },
      });

      toast.success(responseApi?.data?.updateHeaderHome?.message);
    } else {
      const responseApi = await updateHeaderHome({
        variables: {
          input: {
            id: data?.id,
            title: data?.title,
            description: newDescriptionArray,
            image: data?.image,
          },
        },
      });

      toast.success(responseApi?.data?.updateHeaderHome?.message);
    }
  };

  return (
    <div className="flex">
      <NavbarDashboard />

      <div className="p-10 w-full h-screen overflow-y-auto no-scrollbar">
        <h1 className="text-3xl text-slate-600">Header Section</h1>

        {!data || !descriptionArray ? (
          <Loading />
        ) : (
          <section className="py-8">
            <div>
              <span className="block text-sm mb-2 text-slate-500">Title:</span>
              <input
                type="text"
                value={data.title}
                className="w-full block border border-slate-300 rounded px-3 py-2 focus:border-slate-500 focus:outline-0 transition-all duration-300"
                onChange={(e) => setData({ ...data, title: e.target.value })}
              />
            </div>

            <div className="pt-4">
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
                {!showHeaderImage ? (
                  <img src={data?.image} className="h-48" alt="" />
                ) : (
                  <img src={showHeaderImage} className="h-48" alt="" />
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
                descriptionArray.map((item: Description, index: number) => (
                  <div className="flex py-4" key={item.id}>
                    <textarea
                      value={item.text}
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
                      onClick={() => handleDeleteInputDescription(item.id)}
                      className="block p-2 text-2xl px-5 text-red-500 bg-slate-100 ml-4 rounded"
                    >
                      <BsTrash />
                    </button>
                  </div>
                ))
              )}
            </div>

            <button
              onClick={handleAddNewInputDescription}
              className="border border-slate-300 rounded block px-3 py-2 text-slate-500 mb-8"
            >
              Add input description
            </button>

            <div className="border border-slate-200"></div>

            <button
              onClick={handleUpdate}
              className="bg-slate-700 text-white rounded block px-8 text-lg py-2 mt-8"
            >
              Update
            </button>
          </section>
        )}
      </div>
    </div>
  );
};

export default HeaderAdmin;
