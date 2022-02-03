import React from "react";
import { produce } from "immer";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";

import Loading from "@/components/Loading";
import client from "@/config/apollo";
import { GET_PLAN } from "@/graphql/queries/plan";
import { useMutation } from "@apollo/client";
import { UPDATE_PLAN_ITEM } from "@/graphql/mutation/plan";
import { BsFillArrowLeftCircleFill, BsTrash } from "react-icons/bs";

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
        fetchPolicy: "network-only",
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
    <div className="flex">
      <div className="px-12 pt-10">
        <button
          className="border border-slate-300 rounded flex items-center justify-center px-3 py-2 text-slate-500 mb-8 w-32"
          onClick={() => router.push("/admin/plan")}
        >
          <span className="mr-2">
            <BsFillArrowLeftCircleFill />
          </span>
          <span>Back</span>
        </button>
      </div>

      <div className="p-10 w-full h-screen overflow-y-auto no-scrollbar">
        <h1 className="text-3xl text-slate-600">Update product</h1>
        <div className="py-4">
          <span className="block text-sm mb-2 text-slate-500">Name:</span>
          <input
            type="text"
            className="w-full block border border-slate-300 rounded px-3 py-2 focus:border-slate-500 focus:outline-0 transition-all duration-300"
            value={data?.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </div>

        <div className="py-4">
          <span className="block text-sm mb-2 text-slate-500">Price:</span>
          <input
            type="number"
            className="w-full block border border-slate-300 rounded px-3 py-2 focus:border-slate-500 focus:outline-0 transition-all duration-300"
            value={data?.price}
            onChange={(e) => setData({ ...data, price: e.target.value })}
          />
        </div>

        <div className="py-4">
          <span className="block text-sm mb-2 text-slate-500">URL:</span>
          <input
            type="text"
            className="w-full block border border-slate-300 rounded px-3 py-2 focus:border-slate-500 focus:outline-0 transition-all duration-300"
            value={data?.url}
            onChange={(e) => setData({ ...data, url: e.target.value })}
          />
        </div>

        <div>
          <h3 className="text-slate-600 mt-4">Description:</h3>

          {dataItems.length === 0 ? (
            <span className="block py-4 text-slate-900">
              No Items available
            </span>
          ) : (
            dataItems.map((item: any, index: number) => (
              <div key={item.id} className="flex py-4">
                <input
                  className="w-full block border border-slate-300 rounded px-3 py-2 focus:border-slate-500 focus:outline-0 transition-all duration-300 resize-none"
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
                <div>
                  <button
                    className={`w-32 ml-4 p-2 block rounded ${
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
                  className="block p-2 text-2xl px-5 text-red-500 bg-slate-100 ml-4 rounded"
                  onClick={() => handleDeleteInputItem(item.id)}
                >
                  <BsTrash />
                </button>
              </div>
            ))
          )}
        </div>

        <button
          className="border border-slate-300 rounded block px-3 py-2 text-slate-500 mt-2 mb-8"
          onClick={handleAddInputItem}
        >
          Add plan item
        </button>
        <button
          className="bg-slate-700 text-white rounded block px-8 text-lg py-2 mt-8"
          onClick={handleUpdate}
        >
          Update
        </button>

        {error.status && <span className="block">{error.type}</span>}
      </div>
    </div>
  );
};

export default SlugPlanAdmin;
