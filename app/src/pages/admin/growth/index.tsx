import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";

import client from "@/config/apollo";
import { GET_GROWTH_INFO_HOME } from "@/graphql/queries/growthInfo";
import { useMutation } from "@apollo/client";
import { UPDATE_GROWTH_INFO } from "@/graphql/mutation/growthInfo";
import { GET_GROWTH_HOME } from "@/graphql/queries/growthHome";
import Loading from "@/components/Loading";

const GrowthAdmin: React.FC = () => {
  const router = useRouter();

  const [data, setData] = React.useState<any>(null);
  const [dataItems, setDataItems] = React.useState<any>(null);
  const [descriptionArray, setDescriptionArray] = React.useState<any>([]);

  const [updateGrowthInfoHome] = useMutation(UPDATE_GROWTH_INFO);

  React.useEffect(() => {
    (async () => {
      const { data: growthData } = await client.query({
        query: GET_GROWTH_INFO_HOME,
      });

      const { data: growthDataItems } = await client.query({
        query: GET_GROWTH_HOME,
      });

      setData(growthData?.getGrowthInfoHome);
      setDescriptionArray(growthData?.getGrowthInfoHome?.description);
      setDataItems(growthDataItems?.getGrowthHome);
    })();
  }, []);

  const newDescription = {
    id: uuidv4(),
    text: "",
  };

  const handleAddNewInputDescription = async () => {
    setDescriptionArray([...descriptionArray, newDescription]);
  };

  const handleDeleteInputDescription = (id: string) => {
    const newValue = descriptionArray.filter(
      (description: any) => description.id !== id
    );
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
      const response = await updateGrowthInfoHome({
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

  if (!data || !dataItems || !descriptionArray) return <Loading />;

  return (
    <div className="p-4">
      <input
        type="text"
        value={data?.title}
        onChange={(e: any) => setData({ ...data, title: e.target.value })}
        className="w-11/12 border p-2"
      />

      {descriptionArray.map((description: any) => (
        <div className="flex py-4" key={description.id}>
          <textarea
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
            className="w-11/12 border p-2"
          ></textarea>
          <button
            className="block p-2 border"
            onClick={() => handleDeleteInputDescription(description.id)}
          >
            delete
          </button>
        </div>
      ))}

      <button className="block" onClick={handleAddNewInputDescription}>
        agregar campo
      </button>
      <button onClick={handleUpdate} className="block p-2 border">
        actualizar
      </button>

      <div className="grid grid-cols-3 mt-8 gap-x-6">
        {dataItems.map((item: any) => (
          <div className="border p-3" key={item.id}>
            <span className="block">{item.title}</span>

            <button
              className="border p-2 block mt-2"
              onClick={() => router.push(`/admin/growth/${item.id}`)}
            >
              Editar
            </button>
            <button
              className="border p-2 block mt-2"
              onClick={() => console.log("eliminar")}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GrowthAdmin;
