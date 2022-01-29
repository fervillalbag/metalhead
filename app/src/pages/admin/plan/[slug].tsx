import React from "react";
import { produce } from "immer";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";

import Loading from "@/components/Loading";
import client from "@/config/apollo";
import { GET_PLAN } from "@/graphql/queries/plan";
import { useMutation } from "@apollo/client";
import { UPDATE_PLAN_ITEM } from "@/graphql/mutation/plan";

const SlugPlanAdmin: React.FC = () => {
  const router = useRouter();
  const slug = router?.query?.slug;

  const [data, setData] = React.useState<any>(null);
  const [dataItems, setDataItems] = React.useState<any>(null);
  const [error, setError] = React.useState<any>({
    type: "",
    status: false,
  });

  const [updatePlan] = useMutation(UPDATE_PLAN_ITEM);

  React.useEffect(() => {
    (async () => {
      const { data: dataItem } = await client.query({
        query: GET_PLAN,
        variables: {
          slug,
        },
      });
      setData(dataItem?.getPlan);
      setDataItems(dataItem?.getPlan?.items);
    })();
  }, [router]);

  const newInputItem = {
    id: uuidv4(),
    text: "",
    status: false,
  };

  const handleAddInputItem = () => {
    setDataItems((currentItem: any) => [...currentItem, newInputItem]);
  };

  const handleDeleteInputItem = (id: string) => {
    setDataItems((currentItem: any) =>
      currentItem.filter((x: any) => x.id !== id)
    );
  };

  const handleUpdate = async () => {
    const newItem = dataItems.map((item: any) => {
      return {
        id: item.id,
        text: item.text,
        status: item.status,
      };
    });

    if (
      !data?.name ||
      data?.name === "" ||
      data?.price === "" ||
      !data?.url ||
      data?.url === ""
    ) {
      setError({
        type: "Todos los campos son obligatorios",
        status: true,
      });
      return;
    }

    setError({
      type: "",
      status: false,
    });

    try {
      const res = await updatePlan({
        variables: {
          input: {
            id: data?.id,
            name: data?.name,
            price: Number(data?.price),
            status: data?.status,
            url: data?.url,
            items: newItem,
          },
        },
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  if (!data || !dataItems) return <Loading />;

  return (
    <div className="p-4">
      <input
        type="text"
        className="border p-2 w-11/12"
        value={data?.name}
        onChange={(e) => setData({ ...data, name: e.target.value })}
      />

      <div className="mt-6">
        <input
          type="number"
          className="border p-2 w-11/12"
          value={data?.price}
          onChange={(e) => setData({ ...data, price: e.target.value })}
        />
      </div>

      <div className="mt-6">
        <input
          type="text"
          className="border p-2 w-11/12"
          value={data?.url}
          onChange={(e) => setData({ ...data, url: e.target.value })}
        />
      </div>

      <div className="py-4">
        {dataItems.map((item: any, index: number) => (
          <div key={item.id} className="flex py-4">
            <input
              type="text"
              className="border p-2 w-11/12"
              value={item?.text}
              onChange={(e) => {
                const text = e.target.value;
                setDataItems((currentItem: any) =>
                  produce(currentItem, (v: any) => {
                    v[index].text = text;
                  })
                );
              }}
            />
            <div className="w-32 flex items-center justify-center">
              <button
                className={`border p-2 block w-full ${
                  item.status ? "bg-green-200" : "bg-red-200"
                }`}
                onClick={() => {
                  setDataItems((currentItem: any) =>
                    produce(currentItem, (v: any) => {
                      v[index].status = !item.status;
                    })
                  );
                }}
              >
                {item.status ? "on" : "off"}
              </button>
            </div>
            <button
              className="block border p-2"
              onClick={() => handleDeleteInputItem(item.id)}
            >
              delete
            </button>
          </div>
        ))}
      </div>

      <button className="block border p-2 mb-4" onClick={handleAddInputItem}>
        agregar campo
      </button>
      <button className="block border p-2" onClick={handleUpdate}>
        actualizar
      </button>

      {error.status && <span className="block">{error.type}</span>}
    </div>
  );
};

export default SlugPlanAdmin;
