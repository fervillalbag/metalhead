import React from "react";
import { produce } from "immer";
import { v4 as uuidv4 } from "uuid";

import Loading from "@/components/Loading";
import { useMutation } from "@apollo/client";
import { CREATE_PLAN_ITEM } from "@/graphql/mutation/plan";

const CreatePlanAdmin: React.FC = () => {
  const [data, setData] = React.useState<any>({
    slug: "",
    name: "",
    price: 0,
    status: true,
    url: "",
  });
  const [itemsData, setItemsData] = React.useState<any>([
    {
      id: uuidv4(),
      status: true,
      text: "",
    },
  ]);
  const [error, setError] = React.useState<any>({
    type: "",
    status: false,
  });

  const [createPlan] = useMutation(CREATE_PLAN_ITEM);

  const newItem = {
    id: uuidv4(),
    text: "",
    status: true,
  };

  const handleAddItem = () => {
    setItemsData((currentItem: any) => [...currentItem, newItem]);
  };

  const handleDeleteItem = (id: string) => {
    setItemsData((currentItem: any) =>
      currentItem.filter((x: any) => x.id !== id)
    );
  };

  const handleCreatePlan = async () => {
    if (
      !data?.slug ||
      data?.slug === "" ||
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
      const res = await createPlan({
        variables: {
          input: {
            slug: data?.slug,
            name: data?.name,
            price: Number(data?.price),
            status: data?.status,
            url: data?.url,
            items: itemsData,
          },
        },
      });

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  if (!data || !itemsData) return <Loading />;

  return (
    <div className="p-4">
      <div className="py-4">
        <input
          type="text"
          className="border p-2 w-11/12"
          value={data?.name}
          placeholder="Introduce un nombre"
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
      </div>
      <div className="py-4">
        <input
          type="text"
          className="border p-2 w-11/12"
          value={data?.slug}
          placeholder="Introduce un slug"
          onChange={(e) => setData({ ...data, slug: e.target.value })}
        />
      </div>
      <div className="py-4">
        <input
          type="number"
          className="border p-2 w-11/12"
          value={data?.price}
          placeholder="Introduce un precio"
          onChange={(e) => setData({ ...data, price: e.target.value })}
        />
      </div>
      <div className="py-4">
        <input
          type="text"
          className="border p-2 w-11/12"
          value={data?.url}
          placeholder="Introduce una url"
          onChange={(e) => setData({ ...data, url: e.target.value })}
        />
      </div>

      <span className="block text-2xl uppercase font-medium mt-4">Items</span>

      <div className="py-4">
        {itemsData.map((item: any, index: number) => (
          <div key={item.id} className="py-4 flex">
            <input
              type="text"
              value={item.text}
              className="border p-2 w-11/12"
              placeholder="Introduce un item"
              onChange={(e) => {
                const text = e.target.value;
                setItemsData((currentItem: any) =>
                  produce(currentItem, (v: any) => {
                    v[index].text = text;
                  })
                );
              }}
            />
            <div className="w-32">
              <button
                className={`border p-2 block w-full ${
                  item.status ? "bg-green-200" : "bg-red-200"
                }`}
                onClick={() =>
                  setItemsData((currentItem: any) =>
                    produce(currentItem, (v: any) => {
                      v[index].status = !item.status;
                    })
                  )
                }
              >
                {item?.status ? "on" : "off"}
              </button>
            </div>
            <button
              className="block p-2 border"
              onClick={() => handleDeleteItem(item.id)}
            >
              delete
            </button>
          </div>
        ))}
      </div>

      <button className="block border p-2 mb-4" onClick={handleAddItem}>
        agregar campo
      </button>
      <button className="block border p-2 mb-4" onClick={handleCreatePlan}>
        crear
      </button>

      {error.status && <span className="block">{error.type}</span>}
    </div>
  );
};

export default CreatePlanAdmin;
