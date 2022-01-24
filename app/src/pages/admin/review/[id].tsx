import React from "react";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";

import Loading from "@/components/Loading";
import client from "@/config/apollo";
import { GET_REVIEW_HOME_ITEM } from "@/graphql/queries/reviewHome";
import { useMutation } from "@apollo/client";
import { UPDATE_REVIEW_HOME_ITEM } from "@/graphql/mutation/reviewHome";

const ReviewItemId = () => {
  const router = useRouter();
  const queryId = router?.query?.id;

  const [data, setData] = React.useState<any>(null);
  const [descriptionArray, setDescriptionArray] = React.useState<any>([]);
  const [showHeaderImage, setShowHeaderImage] = React.useState<any>();
  const [fileHeader, setFileHeader] = React.useState<any>();

  const [updateReviewHome] = useMutation(UPDATE_REVIEW_HOME_ITEM);

  React.useEffect(() => {
    (async () => {
      if (queryId) {
        const { data: reviewItem } = await client.query({
          query: GET_REVIEW_HOME_ITEM,
          variables: {
            id: queryId,
          },
        });

        setData(reviewItem?.getReviewHomeItem);
        setDescriptionArray(reviewItem?.getReviewHomeItem?.description);
      }
    })();
  }, [router]);

  const newDescription = {
    id: uuidv4(),
    text: "",
  };

  const handleAddInputDescription = () => {
    setDescriptionArray([...descriptionArray, newDescription]);
  };

  const handleDeleteInputDescription = (id: string) => {
    const newValue = descriptionArray.filter((item: any) => item.id !== id);
    setDescriptionArray(newValue);
  };

  const handleHeaderFileChange = (e: any) => {
    const file = e.currentTarget.files[0];
    const image = URL.createObjectURL(file);
    setShowHeaderImage(image);
    setFileHeader(file);
  };

  const handleUpdate = async () => {
    const newDescriptionArray = descriptionArray.map((description: any) => {
      return {
        id: description.id,
        text: description.text,
      };
    });

    if (fileHeader) {
      const url = "https://api.cloudinary.com/v1_1/dbp9am0cx/image/upload";
      const formData = new FormData();
      formData.append("file", fileHeader);
      formData.append("upload_preset", "reviewItem");
      const res = await fetch(url, { method: "post", body: formData });
      const imageData = await res.json();

      const responseApi = await updateReviewHome({
        variables: {
          input: {
            id: data?.id,
            name: data?.name,
            description: newDescriptionArray,
            avatar: imageData?.secure_url,
          },
        },
      });

      console.log(responseApi?.data);
    } else {
      const responseApi = await updateReviewHome({
        variables: {
          input: {
            id: data?.id,
            name: data?.name,
            description: newDescriptionArray,
            avatar: data?.image,
          },
        },
      });

      console.log(responseApi?.data);
    }
  };

  if (!data || !descriptionArray) return <Loading />;

  return (
    <div className="p-4">
      <input
        className="w-11/12 border p-2"
        type="text"
        value={data?.name}
        onChange={(e) => setData({ ...data, name: e.target.value })}
      />

      <div className="py-4">
        <input type="file" onChange={handleHeaderFileChange} />
        <div className="pt-4">
          {!showHeaderImage ? (
            <img src={data?.avatar} width={100} alt="" />
          ) : (
            <img src={showHeaderImage} width={100} alt="" />
          )}
        </div>
      </div>

      <div className="py-4">
        {descriptionArray.map((description: any) => (
          <div key={description.id} className="flex">
            <textarea
              className="block w-11/12 border p-2"
              value={description.text}
              onChange={(e: any) =>
                setDescriptionArray((currentDescription: any) =>
                  currentDescription.map((x: any) =>
                    x.id === description.id ? { ...x, text: e.target.value } : x
                  )
                )
              }
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
        className="block p-2 border mb-4"
        onClick={handleAddInputDescription}
      >
        agregar campo
      </button>
      <button className="block p-2 border" onClick={handleUpdate}>
        Actualizar
      </button>
    </div>
  );
};

export default ReviewItemId;
