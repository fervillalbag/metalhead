import React from "react";
import { produce } from "immer";
import { v4 as uuidv4 } from "uuid";
import { useMutation } from "@apollo/client";
import { CREATE_REVIEW_HOME } from "@/graphql/mutation/reviewHome";
import Loading from "@/components/Loading";

const CreateReviewAdmin: React.FC = () => {
  const [data, setData] = React.useState<any>({
    name: "",
    avatar: "",
  });
  const [descriptionArray, setDescriptionArray] = React.useState<any>([
    {
      id: uuidv4(),
      text: "",
    },
  ]);
  const [showAvatarImage, setShowAvatarImage] = React.useState<any>("");
  const [fileAvatar, setFileAvatar] = React.useState<any>(null);
  const [error, setError] = React.useState<any>({
    type: "",
    status: false,
  });

  const [createReviewHome] = useMutation(CREATE_REVIEW_HOME);

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
    setShowAvatarImage(image);
    setFileAvatar(file);
  };

  const handleCreateReview = async () => {
    if (fileAvatar) {
      const url = "https://api.cloudinary.com/v1_1/dbp9am0cx/image/upload";
      const formData = new FormData();
      formData.append("file", fileAvatar);
      formData.append("upload_preset", "reviewItem");
      const res = await fetch(url, { method: "post", body: formData });
      const imageData = await res.json();

      const responseApi = await createReviewHome({
        variables: {
          input: {
            name: data?.name,
            description: descriptionArray,
            avatar: imageData?.secure_url,
          },
        },
      });

      console.log(responseApi?.data);
    } else {
      setError({
        type: "La imagen es obligatoria",
        status: true,
      });
    }
  };

  if (!data || !descriptionArray) return <Loading />;

  return (
    <div className="p-4">
      <input
        type="text"
        value={data?.name}
        className="border p-2 w-11/12"
        onChange={(e) => setData({ ...data, name: e.target.value })}
        placeholder="Introducir nombre"
      />

      {error.status && <span className="block">{error.type}</span>}

      <div className="py-4">
        <input type="file" onChange={handleHeaderFileChange} />
      </div>

      <div className="py-4">
        {showAvatarImage && <img src={showAvatarImage} alt="" width={100} />}
      </div>

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
              className="block border p-2"
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
      <button className="block border p-2 mb-4" onClick={handleCreateReview}>
        crear
      </button>
    </div>
  );
};

export default CreateReviewAdmin;
