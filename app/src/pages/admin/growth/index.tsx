import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import { produce } from "immer";
import { BsTrash } from "react-icons/bs";

import Loading from "@/components/Loading";
import Modal from "@/components/Modal";
import NavbarDashboard from "@/components/admin/Navbar";
import { GET_GROWTH_INFO_HOME } from "@/graphql/queries/growthInfo";
import { UPDATE_GROWTH_INFO } from "@/graphql/mutation/growthInfo";
import { GET_GROWTH_HOME } from "@/graphql/queries/growthHome";
import { DELETE_GROWTH_ITEM } from "@/graphql/mutation/growthHome";

const GrowthAdmin: React.FC = () => {
  const router = useRouter();

  const [data, setData] = React.useState<any>(null);
  const [dataItems, setDataItems] = React.useState<any>(null);
  const [descriptionArray, setDescriptionArray] = React.useState<any>([]);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [itemDelete, setItemDelete] = React.useState<string>("");

  const [updateGrowthInfoHome] = useMutation(UPDATE_GROWTH_INFO);
  const [deleteGrowthHome] = useMutation(DELETE_GROWTH_ITEM);

  const { data: growthData } = useQuery(GET_GROWTH_INFO_HOME, {
    fetchPolicy: "network-only",
  });

  const { data: growthDataItems, refetch: refetchGrowthDataItems } = useQuery(
    GET_GROWTH_HOME,
    {
      fetchPolicy: "network-only",
    }
  );

  useEffect(() => {
    setData(growthData?.getGrowthInfoHome);
    setDescriptionArray(growthData?.getGrowthInfoHome?.description);
    setDataItems(growthDataItems?.getGrowthHome);
  }, [growthData, growthDataItems]);

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

  const handleDeleteReviewItem = async (id: string) => {
    try {
      const response = await deleteGrowthHome({
        variables: {
          id,
        },
      });
      refetchGrowthDataItems();
      toast.success(response?.data?.deleteGrowthHome?.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    const newDescriptionArray = descriptionArray.map((description: any) => {
      return {
        id: description.id,
        text: description.text,
      };
    });

    if (!data?.title || data?.title === "") {
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
      const response = await updateGrowthInfoHome({
        variables: {
          input: {
            id: data?.id,
            title: data?.title,
            description: newDescriptionArray,
          },
        },
      });

      toast.success(response?.data?.updateGrowthInfoHome?.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex">
      <NavbarDashboard />

      <section className="p-10 w-full h-screen overflow-y-auto no-scrollbar">
        <h1 className="text-3xl text-slate-600">Growth Section</h1>

        {!data || !dataItems || !descriptionArray ? (
          <Loading />
        ) : (
          <div className="py-6">
            <div>
              <span className="block text-sm mb-2 text-slate-500">Title:</span>
              <input
                type="text"
                value={data?.title}
                onChange={(e: any) =>
                  setData({ ...data, title: e.target.value })
                }
                className="w-full block border border-slate-300 rounded px-3 py-2 focus:border-slate-500 focus:outline-0 transition-all duration-300"
              />
            </div>

            <div>
              <h3 className="text-slate-600 mt-4">Description:</h3>
              {descriptionArray.length === 0 ? (
                <span className="block py-4 text-slate-900">
                  No description available
                </span>
              ) : (
                descriptionArray.map((description: any, index: number) => (
                  <div className="flex py-4" key={description.id}>
                    <textarea
                      value={description.text}
                      onChange={(e) => {
                        const text = e.target.value;
                        setDescriptionArray((currentDescription: any) =>
                          produce(currentDescription, (v: any) => {
                            v[index].text = text;
                          })
                        );
                      }}
                      className="w-full block border border-slate-300 rounded px-3 py-2 focus:border-slate-500 focus:outline-0 transition-all duration-300 resize-none h-32"
                    ></textarea>
                    <button
                      className="block p-2 text-2xl px-5 text-red-500 bg-slate-100 ml-4 rounded"
                      onClick={() =>
                        handleDeleteInputDescription(description.id)
                      }
                    >
                      <BsTrash />
                    </button>
                  </div>
                ))
              )}
            </div>

            <Modal showModal={showModal}>
              <div className="flex flex-col justify-center h-full items-center">
                <h1>¿Desea eliminar?</h1>

                <div className="grid grid-cols-2 gap-x-4">
                  <button
                    className="block p-2 border"
                    onClick={() => {
                      handleDeleteReviewItem(itemDelete);
                      setShowModal(false);
                    }}
                  >
                    Si
                  </button>
                  <button
                    className="block p-2 border"
                    onClick={() => {
                      setShowModal(false);
                      setItemDelete("");
                    }}
                  >
                    No
                  </button>
                </div>
              </div>
            </Modal>

            <button
              className="border border-slate-300 rounded block px-3 py-2 text-slate-500 mb-8"
              onClick={handleAddNewInputDescription}
            >
              Add input description
            </button>

            <h1 className="text-2xl text-slate-600 mt-8 mb-6">List of Items</h1>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {dataItems.length === 0 ? (
                <span className="block py-4 text-slate-900">
                  No items available
                </span>
              ) : (
                dataItems.map((item: any) => (
                  <div
                    className="shadow-lg rounded border border-slate-200 px-4 py-3 h-44 flex flex-col justify-between"
                    key={item.id}
                  >
                    <span className="block mb-2 text-slate-600">
                      {item.title}
                    </span>

                    <div className="grid grid-cols-2 gap-x-3 py-2">
                      <button
                        className="block w-full border border-slate-400 py-2 rounded"
                        onClick={() => router.push(`/admin/growth/${item.id}`)}
                      >
                        Editar
                      </button>
                      <button
                        className="block w-full bg-slate-500 py-2 rounded text-white"
                        onClick={() => {
                          setShowModal(true);
                          setItemDelete(item.id);
                        }}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <button
              className="border border-slate-300 rounded block px-3 py-2 text-slate-500 mt-6"
              onClick={() => router.push("/admin/create/growth")}
            >
              Add a new item
            </button>

            <div className="border border-slate-200 mt-8"></div>

            <button
              onClick={handleUpdate}
              className="bg-slate-700 text-white rounded block px-8 text-lg py-2 mt-8"
            >
              Update
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default GrowthAdmin;
