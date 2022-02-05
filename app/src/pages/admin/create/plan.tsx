import React from "react";
import { produce } from "immer";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

import Loading from "@/components/Loading";
import { useMutation } from "@apollo/client";
import { CREATE_PLAN_ITEM } from "@/graphql/mutation/plan";
import { BsFillArrowLeftCircleFill, BsTrash } from "react-icons/bs";

const CreatePlanAdmin: React.FC = () => {
  const router = useRouter();

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
      toast("Todos los campos son obligatorios!", {
        icon: "⚠️",
        style: {
          borderRadius: "10px",
          background: "#FFF",
          color: "#333",
        },
      });
      return;
    }

    if (itemsData.length === 0) {
      toast("Los ítems son obligatorios", {
        icon: "⚠️",
        style: {
          borderRadius: "10px",
          background: "#FFF",
          color: "#333",
        },
      });
      return;
    }

    if (itemsData[0].text === "") {
      toast("Los ítems deben tener contenido", {
        icon: "⚠️",
        style: {
          borderRadius: "10px",
          background: "#FFF",
          color: "#333",
        },
      });
      return;
    }

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

      toast.success(res?.data?.createPlan?.message);
      router.push("/admin/plan");
    } catch (error) {
      console.log(error);
    }
  };

  if (!data || !itemsData) return <Loading />;

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
        <h1 className="text-3xl text-slate-600">Create a new plan</h1>

        <div className="pt-8 pb-4">
          <input
            type="text"
            className="w-full block border border-slate-300 rounded px-3 py-2 focus:border-slate-500 focus:outline-0 transition-all duration-300"
            value={data?.name}
            placeholder="Introduce un nombre"
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </div>
        <div className="py-4">
          <input
            type="text"
            className="w-full block border border-slate-300 rounded px-3 py-2 focus:border-slate-500 focus:outline-0 transition-all duration-300"
            value={data?.slug}
            placeholder="Introduce un slug"
            onChange={(e) => setData({ ...data, slug: e.target.value })}
          />
        </div>
        <div className="py-4">
          <input
            type="number"
            className="w-full block border border-slate-300 rounded px-3 py-2 focus:border-slate-500 focus:outline-0 transition-all duration-300"
            value={data?.price}
            placeholder="Introduce un precio"
            onChange={(e) => setData({ ...data, price: e.target.value })}
          />
        </div>
        <div className="py-4">
          <input
            type="text"
            className="w-full block border border-slate-300 rounded px-3 py-2 focus:border-slate-500 focus:outline-0 transition-all duration-300"
            value={data?.url}
            placeholder="Introduce una url"
            onChange={(e) => setData({ ...data, url: e.target.value })}
          />
        </div>

        <div>
          <span className="block text-2xl uppercase font-medium mt-4">
            Items
          </span>

          {itemsData.map((item: any, index: number) => (
            <div key={item.id} className="py-4 flex">
              <input
                type="text"
                value={item.text}
                className="w-full block border border-slate-300 rounded px-3 py-2 focus:border-slate-500 focus:outline-0 transition-all duration-300 resize-none"
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
              <div>
                <button
                  className={`w-32 ml-4 p-2 block rounded ${
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
                className="block p-2 text-2xl px-5 text-red-500 bg-slate-100 ml-4 rounded"
                onClick={() => handleDeleteItem(item.id)}
              >
                <BsTrash />
              </button>
            </div>
          ))}
        </div>

        <button
          className="border border-slate-300 rounded block px-3 py-2 text-slate-500 mb-8 mt-2"
          onClick={handleAddItem}
        >
          Add item
        </button>

        <div className="border border-slate-200 mt-8"></div>

        <button
          className="bg-slate-700 text-white rounded block px-8 text-lg py-2 mt-8"
          onClick={handleCreatePlan}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreatePlanAdmin;
