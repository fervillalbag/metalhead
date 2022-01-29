import React from "react";
import { useMutation } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";

import client from "@/config/apollo";
import { GET_HEADER_HOME } from "@/graphql/queries/headerHome";
import { UPDATE_HEADER_INFO } from "@/graphql/mutation/header";
import { HeaderInfo } from "@/types/header";
import { Description } from "@/types/description";
import Loading from "@/components/Loading";

const HeaderAdmin: React.FC = () => {
  const [data, setData] = React.useState<HeaderInfo | null>(null);
  const [descriptionArray, setDescriptionArray] = React.useState<any>([]);
  const [showHeaderImage, setShowHeaderImage] = React.useState<any>(null);
  const [fileHeader, setFileHeader] = React.useState<any>(null);
  const [error, setError] = React.useState<any>({
    type: "",
    status: false,
  });

  const [updateHeaderHome] = useMutation(UPDATE_HEADER_INFO);

  const newDescription = {
    id: uuidv4(),
    text: "",
  };

  const handleAddNewInputDescription = () => {
    setDescriptionArray([...descriptionArray, newDescription]);
  };

  const handleDeleteInputDescription = (id: string) => {
    const newValue = descriptionArray.filter((desc: any) => desc.id !== id);
    setDescriptionArray(newValue);
  };

  React.useEffect(() => {
    (async () => {
      const { data: headerData } = await client.query({
        query: GET_HEADER_HOME,
      });
      setData(headerData?.getHeaderHome);
      setDescriptionArray(headerData?.getHeaderHome.description);
    })();
  }, []);

  const handleHeaderFileChange = (e: any) => {
    const file = e.currentTarget.files[0];
    const image = URL.createObjectURL(file);
    setShowHeaderImage(image);
    setFileHeader(file);
  };

  const handleUpdate = async () => {
    const newDescriptionArray = descriptionArray.map((item: any) => {
      return {
        id: item.id,
        text: item.text,
      };
    });

    if (data?.title === "") {
      setError({
        type: "Todos los campos son requeridos",
        status: true,
      });
      return;
    }

    if (fileHeader) {
      const url = "https://api.cloudinary.com/v1_1/dbp9am0cx/image/upload";
      const formData = new FormData();
      formData.append("file", fileHeader);
      formData.append("upload_preset", "headerInfo");
      const res = await fetch(url, { method: "post", body: formData });
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

      console.log(responseApi?.data?.updateHeaderHome?.message);
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

      console.log(responseApi?.data?.updateHeaderHome?.message);
    }
  };

  if (!data || !descriptionArray) return <Loading />;

  return (
    <div className="p-4">
      <h1>Admin Page</h1>

      <hr />
      <section className="py-16">
        <span className="block">Header</span>

        <input
          type="text"
          value={data.title}
          className="w-11/12 border p-2"
          onChange={(e: any) => setData({ ...data, title: e.target.value })}
        />

        <div className="pt-4 flex flex-col">
          <input type="file" onChange={handleHeaderFileChange} />

          <div className="pt-4">
            {!showHeaderImage ? (
              <img src={data?.image} width={100} alt="" />
            ) : (
              <img src={showHeaderImage} width={100} alt="" />
            )}
          </div>
        </div>

        <div className="pt-4">
          {descriptionArray.map((item: Description) => (
            <div className="flex items-center" key={item.id}>
              <textarea
                value={item.text}
                className="w-11/12 border h-32 p-2"
                onChange={(e) =>
                  setDescriptionArray((currentDescription: any) =>
                    currentDescription?.map((x: any) =>
                      x.id === item.id
                        ? {
                            ...x,
                            text: e.target.value,
                          }
                        : x
                    )
                  )
                }
              ></textarea>
              <button
                onClick={() => handleDeleteInputDescription(item.id)}
                className="block p-2 border"
              >
                delete
              </button>
            </div>
          ))}
        </div>

        <button onClick={handleAddNewInputDescription}>agregar campo</button>
        <button onClick={handleUpdate} className="block border p-3">
          Actualizar
        </button>

        {error.status && <span className="block">{error.type}</span>}
      </section>
      <hr />
    </div>
  );
};

export default HeaderAdmin;
