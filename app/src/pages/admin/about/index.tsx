import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { BsTrash } from "react-icons/bs";
import { produce } from "immer";
import { useMutation, useQuery } from "@apollo/client";

import Loading from "@/components/Loading";
import NavbarDashboard from "@/components/admin/Navbar";
import { GET_ABOUT_PAGE } from "@/graphql/queries/aboutPage";
import { UPDATE_ABOUT_INFO } from "@/graphql/mutation/about";
import { Description } from "@/types/description";
import { AboutInfo } from "@/types/about";
import { FileType } from "@/types/file";

const AboutPageAdmin: React.FC = () => {
  const [data, setData] = React.useState<AboutInfo | null>(null);
  const [showAboutImage, setShowAboutImage] = React.useState<string | null>(
    null
  );
  const [fileAbout, setFileAbout] = React.useState<FileType | null | Blob>(
    null
  );
  const [descriptionArray, setDescriptionArray] = React.useState<Description[]>(
    []
  );

  const inputFileRef = React.useRef<HTMLInputElement | null>(null);
  const [updateAboutPage] = useMutation(UPDATE_ABOUT_INFO);

  const { data: aboutData } = useQuery(GET_ABOUT_PAGE, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    setData(aboutData?.getAboutPage);
    setDescriptionArray(aboutData?.getAboutPage?.description);
  }, [aboutData]);

  const handleHeaderFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget as HTMLInputElement;
    const file = target.files![0];
    const image = URL.createObjectURL(file);
    setShowAboutImage(image);
    setFileAbout(file);
  };

  const newDescription: Description = {
    id: uuidv4(),
    text: "",
  };

  const handleChangeImage = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const handleAddInputDescription = () => {
    setDescriptionArray([...descriptionArray, newDescription]);
  };

  const handleDeleteInputDescription = (id: string) => {
    const newValue = descriptionArray.filter(
      (item: Description) => item.id !== id
    );
    setDescriptionArray(newValue);
  };

  const handleUpdate = async () => {
    const newDescriptionArray = descriptionArray.map((item: Description) => {
      return {
        id: item.id,
        text: item.text,
      };
    });

    if (!data?.title || data?.title === "") {
      toast("El t??tulo es obligatorio!", {
        icon: "??????",
        style: {
          borderRadius: "10px",
          background: "#FFF",
          color: "#333",
        },
      });
      return;
    }

    if (newDescriptionArray.length === 0) {
      toast("La descripci??n es obligatoria!", {
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

    if (fileAbout) {
      const url = process.env.URL_CLOUDINARY_RES;
      const formData = new FormData();
      formData.append("file", fileAbout as string | Blob);
      formData.append(
        "upload_preset",
        process.env.CLOUDINARY_NAME_PRESET_ABOUT_HOME as string
      );
      const res = await fetch(url as string, {
        method: "post",
        body: formData,
      });
      const imageData = await res.json();

      const responseApi = await updateAboutPage({
        variables: {
          input: {
            id: data?.id,
            title: data?.title,
            description: newDescriptionArray,
            image: imageData?.secure_url,
          },
        },
      });

      toast.success(responseApi?.data?.updateAboutPage?.message);
    } else {
      const responseApi = await updateAboutPage({
        variables: {
          input: {
            id: data?.id,
            title: data?.title,
            description: newDescriptionArray,
            image: data?.image,
          },
        },
      });

      toast.success(responseApi?.data?.updateAboutPage?.message);
    }
  };

  return (
    <div className="flex">
      <NavbarDashboard />

      <section className="p-10 w-full h-screen overflow-y-auto no-scrollbar">
        <h1 className="text-3xl text-slate-600">About Page</h1>

        {!data || !descriptionArray ? (
          <Loading />
        ) : (
          <div className="py-6">
            <div>
              <span className="block text-sm mb-2 text-slate-500">Title:</span>
              <input
                type="text"
                className="w-full block border border-slate-300 rounded px-3 py-2 focus:border-slate-500 focus:outline-0 transition-all duration-300"
                value={data?.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
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
                {!showAboutImage ? (
                  <img src={data?.image} className="h-48" alt="" />
                ) : (
                  <img src={showAboutImage} className="h-48" alt="" />
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
                        className="w-full block border border-slate-300 rounded px-3 py-2 focus:border-slate-500 focus:outline-0 transition-all duration-300 resize-none h-32"
                        value={description.text}
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

            <div className="border border-slate-200"></div>

            <button
              className="bg-slate-700 text-white rounded block px-8 text-lg py-2 mt-8"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default AboutPageAdmin;
