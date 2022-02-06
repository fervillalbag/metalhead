import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { produce } from "immer";
import { BsFillArrowLeftCircleFill, BsTrash } from "react-icons/bs";

import Loading from "@/components/Loading";
import { GET_GROWTH_ITEM } from "@/graphql/queries/growthHome";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_GROWTH_ITEM } from "@/graphql/mutation/growthHome";

const GrowthId: React.FC = () => {
  const router = useRouter();

  const [data, setData] = React.useState<any>(null);
  const [descriptionArray, setDescriptionArray] = React.useState<any>([]);

  const [updateGrowthHome] = useMutation(UPDATE_GROWTH_ITEM);

  const { data: dataGrowthItem } = useQuery(GET_GROWTH_ITEM, {
    fetchPolicy: "network-only",
    variables: {
      id: router?.query?.id,
    },
  });

  useEffect(() => {
    setData(dataGrowthItem?.getGrowthHomeItem);
    setDescriptionArray(dataGrowthItem?.getGrowthHomeItem?.description);
  }, [router, dataGrowthItem]);

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

    if (data?.title === "" || !data?.title) {
      toast("El título es obligatorio!", {
        icon: "⚠️",
        style: {
          borderRadius: "10px",
          background: "#FFF",
          color: "#333",
        },
      });
      return;
    }

    if (newDescriptionArray.length === 0) {
      toast("La descripción es obligatoria!", {
        icon: "⚠️",
        style: {
          borderRadius: "10px",
          background: "#FFF",
          color: "#333",
        },
      });
      return;
    }

    const isDescriptionEmpty = newDescriptionArray.some(
      (description: any) => description.text === ""
    );

    if (isDescriptionEmpty) {
      toast("La descripción debe tener contenido!", {
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
      const response = await updateGrowthHome({
        variables: {
          input: {
            id: data?.id,
            title: data?.title,
            description: newDescriptionArray,
          },
        },
      });

      toast.success(response?.data?.updateGrowthHome?.message);
    } catch (error) {
      console.log(error);
    }
  };

  if (!data || !descriptionArray) return <Loading />;

  return (
    <div className="flex">
      <div className="px-12 pt-10">
        <button
          className="border border-slate-300 rounded flex items-center justify-center px-3 py-2 text-slate-500 mb-8 w-32"
          onClick={() => router.push("/admin/growth")}
        >
          <span className="mr-2">
            <BsFillArrowLeftCircleFill />
          </span>
          <span>Back</span>
        </button>
      </div>

      <section className="p-10 w-full h-screen overflow-y-auto no-scrollbar">
        <h1 className="text-3xl text-slate-600">Edit a growth item</h1>

        <div className="pt-8 pb-4">
          <div>
            <span className="block text-sm mb-2 text-slate-500">Title:</span>
            <input
              type="text"
              value={data?.title}
              className="w-full block border border-slate-300 rounded px-3 py-2 focus:border-slate-500 focus:outline-0 transition-all duration-300"
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
          </div>

          <div className="py-4">
            {descriptionArray.lenght === 0 ? (
              <span className="block py-4 text-slate-900">
                No description available
              </span>
            ) : (
              descriptionArray.map((description: any, index: number) => (
                <div key={description.id} className="flex py-4">
                  <textarea
                    className="w-full block border border-slate-300 rounded px-3 py-2 focus:border-slate-500 focus:outline-0 transition-all duration-300 resize-none h-32"
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
                    className="block p-2 text-2xl px-5 text-red-500 bg-slate-100 ml-4 rounded"
                    onClick={() => handleDeleteInputDescription(description.id)}
                  >
                    <BsTrash />
                  </button>
                </div>
              ))
            )}
          </div>

          <button
            className="border border-slate-300 rounded block px-3 py-2 text-slate-500 mb-8"
            onClick={handleAddInputDescription}
          >
            Add input description
          </button>

          <div className="border border-slate-200 mt-8"></div>

          <button
            className="bg-slate-700 text-white rounded block px-8 text-lg py-2 mt-8"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </section>
    </div>
  );
};

export default GrowthId;
