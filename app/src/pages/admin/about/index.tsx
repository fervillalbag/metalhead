import React from "react";
import { v4 as uuidv4 } from "uuid";
import { BsTrash } from "react-icons/bs";
import { produce } from "immer";

import Loading from "@/components/Loading";
import client from "@/config/apollo";
import { GET_ABOUT_PAGE } from "@/graphql/queries/aboutPage";
import { useMutation } from "@apollo/client";
import { UPDATE_ABOUT_INFO } from "@/graphql/mutation/about";
import NavbarDashboard from "@/components/admin/Navbar";

const AboutPageAdmin: React.FC = () => {
  const [data, setData] = React.useState<any>(null);
  const [showAboutImage, setShowAboutImage] = React.useState<any>(null);
  const [fileAbout, setFileAbout] = React.useState<any>(null);
  const [descriptionArray, setDescriptionArray] = React.useState<any>([]);

  const inputFileRef = React.useRef<any>(null);

  const [updateAboutPage] = useMutation(UPDATE_ABOUT_INFO);

  React.useEffect(() => {
    (async () => {
      const { data: aboutData } = await client.query({
        query: GET_ABOUT_PAGE,
      });
      setData(aboutData?.getAboutPage);
      setDescriptionArray(aboutData?.getAboutPage?.description);
    })();
  }, []);

  const handleHeaderFileChange = (e: any) => {
    const file = e.currentTarget.files[0];
    const image = URL.createObjectURL(file);
    setShowAboutImage(image);
    setFileAbout(file);
  };

  const newDescription = {
    id: uuidv4(),
    text: "",
  };

  const handleChangeImage = () => {
    inputFileRef.current.click();
  };

  const handleAddInputDescription = () => {
    setDescriptionArray([...descriptionArray, newDescription]);
  };

  const handleDeleteInputDescription = (id: string) => {
    const newValue = descriptionArray.filter((item: any) => item.id !== id);
    setDescriptionArray(newValue);
  };

  const handleUpdate = async () => {
    const newDescriptionArray = descriptionArray.map((item: any) => {
      return {
        id: item.id,
        text: item.text,
      };
    });

    if (fileAbout) {
      const url = "https://api.cloudinary.com/v1_1/dbp9am0cx/image/upload";
      const formData = new FormData();
      formData.append("file", fileAbout);
      formData.append("upload_preset", "aboutpage");
      const res = await fetch(url, { method: "post", body: formData });
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

      console.log(responseApi);
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

      console.log(responseApi);
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
