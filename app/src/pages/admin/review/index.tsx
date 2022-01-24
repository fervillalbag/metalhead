import React from "react";
import { v4 as uuidv4 } from "uuid";

import client from "@/config/apollo";
import { GET_REVIEW_INFO } from "@/graphql/queries/reviewInfo";
import { useMutation } from "@apollo/client";
import { UPDATE_REVIEW_INFO } from "@/graphql/mutation/reviewInfo";
import Loading from "@/components/Loading";
import { GET_REVIEW_HOME } from "@/graphql/queries/reviewHome";
import { useRouter } from "next/router";

const ReviewInfoAdmin = () => {
  const router = useRouter();

  const [data, setData] = React.useState<any>(null);
  const [descriptionArray, setDescriptionArray] = React.useState<any>([]);
  const [dataItems, setDataItems] = React.useState<any>(null);

  const [updateReviewHomeInfo] = useMutation(UPDATE_REVIEW_INFO);

  React.useEffect(() => {
    (async () => {
      const { data: reviewInfo } = await client.query({
        query: GET_REVIEW_INFO,
      });

      const { data: reviewItems } = await client.query({
        query: GET_REVIEW_HOME,
      });

      setData(reviewInfo?.getReviewInfoHome);
      setDataItems(reviewItems?.getReviewHome);
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

  if (!data || !descriptionArray || !dataItems) return <Loading />;

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

      <div className="grid grid-cols-3 gap-x-10 mt-8">
        {dataItems.map((item: any) => (
          <div key={item.id} className="border p-3">
            <span className="block">{item.name}</span>

            <button
              className="block border p-2 mt-4"
              onClick={() => router.push(`/admin/review/${item.id}`)}
            >
              Editar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewInfoAdmin;
