import React from "react";
import { useRouter } from "next/router";
import client from "@/config/apollo";
import { GET_GROWTH_ITEM } from "@/graphql/queries/growthHome";
import { v4 as uuidv4 } from "uuid";
import { useMutation } from "@apollo/client";
import { UPDATE_GROWTH_ITEM } from "@/graphql/mutation/growthHome";

const GrowthId = () => {
  const router = useRouter();

  const [data, setData] = React.useState<any>(null);
  const [descriptionArray, setDescriptionArray] = React.useState<any>([]);
  const queryId = router.query.id;

  const [updateGrowthHome] = useMutation(UPDATE_GROWTH_ITEM);

  React.useEffect(() => {
    (async () => {
      if (queryId) {
        const { data: dataGrowthItem } = await client.query({
          query: GET_GROWTH_ITEM,
          variables: {
            id: router.query.id,
          },
        });
        setData(dataGrowthItem?.getGrowthHomeItem);
        setDescriptionArray(dataGrowthItem?.getGrowthHomeItem?.description);
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

  const handleUpdate = async () => {
    const newDescriptionArray = descriptionArray.map((description: any) => {
      return {
        id: description.id,
        text: description.text,
      };
    });

    try {
      const response = await updateGrowthHome({
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

  if (!data) return null;

  return (
    <div className="p-4">
      <input
        type="text"
        value={data?.title}
        className="border w-11/12 p-2"
        onChange={(e) => setData({ ...data, title: e.target.value })}
      />

      <div className="py-4">
        {descriptionArray.map((description: any) => (
          <div key={description.id} className="flex py-4">
            <textarea
              className="border p-2 w-11/12"
              value={description.text}
              onChange={(e: any) =>
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
              className="border p-2 block"
              onClick={() => handleDeleteInputDescription(description.id)}
            >
              delete
            </button>
          </div>
        ))}
      </div>

      <button
        className="border p-2 block mb-2"
        onClick={handleAddInputDescription}
      >
        agregar campo
      </button>
      <button className="border p-2 block" onClick={handleUpdate}>
        Actualizar
      </button>
    </div>
  );
};

export default GrowthId;
