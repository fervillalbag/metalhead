import React from "react";
import { v4 as uuidv4 } from "uuid";

import client from "@/config/apollo";
import { GET_REVIEW_INFO } from "@/graphql/queries/reviewInfo";
import { useMutation } from "@apollo/client";
import { UPDATE_REVIEW_INFO } from "@/graphql/mutation/reviewInfo";
import Loading from "@/components/Loading";

const ReviewInfoAdmin = () => {
  const [data, setData] = React.useState<any>(null);
  const [descriptionArray, setDescriptionArray] = React.useState<any>([]);

  const [updateReviewHomeInfo] = useMutation(UPDATE_REVIEW_INFO);

  React.useEffect(() => {
    (async () => {
      const { data: reviewInfo } = await client.query({
        query: GET_REVIEW_INFO,
      });
      setData(reviewInfo?.getReviewInfoHome);
      setDescriptionArray(reviewInfo?.getReviewInfoHome?.description);
    })();
  }, []);

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

  const handleUpdate = async () => {
    const newDescriptionArray = descriptionArray.map((description: any) => {
      return {
        id: description.id,
        text: description.text,
      };
    });

    try {
      const response = await updateReviewHomeInfo({
        variables: {
          input: {
            id: data?.id,
            title: data?.title,
            description: newDescriptionArray,
          },
        },
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  if (!data || !descriptionArray) return <Loading />;

  return (
    <div className="p-4">
      <div>
        <input
          type="text"
          value={data?.title}
          className="border w-11/12 p-2"
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
      </div>

      <div className="py-4">
        {descriptionArray.map((description: any) => (
          <div key={description.id} className="flex py-4">
            <textarea
              className="border w-11/12 p-2"
              value={description.text}
              onChange={(e) =>
                setDescriptionArray((currentDescription: any) =>
                  currentDescription.map((x: any) =>
                    x.id === description.id
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
              className="block p-2 border"
              onClick={() => handleDeleteInputDescription(description.id)}
            >
              delete
            </button>
          </div>
        ))}
      </div>

      <button
        className="block border p-2 mb-3"
        onClick={handleAddInputDescription}
      >
        agregar campo
      </button>
      <button className="border block p-2" onClick={handleUpdate}>
        actualizar
      </button>
    </div>
  );
};

export default ReviewInfoAdmin;
