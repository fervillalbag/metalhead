import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";

import client from "@/config/apollo";
import Loading from "@/components/Loading";
import Modal from "@/components/Modal";
import { GET_GROWTH_INFO_HOME } from "@/graphql/queries/growthInfo";
import { UPDATE_GROWTH_INFO } from "@/graphql/mutation/growthInfo";
import { GET_GROWTH_HOME } from "@/graphql/queries/growthHome";
import { DELETE_GROWTH_ITEM } from "@/graphql/mutation/growthHome";
import NavbarDashboard from "@/components/admin/Navbar";
import { BsTrash } from "react-icons/bs";

const GrowthAdmin: React.FC = () => {
  const router = useRouter();

  const [data, setData] = React.useState<any>(null);
  const [dataItems, setDataItems] = React.useState<any>(null);
  const [descriptionArray, setDescriptionArray] = React.useState<any>([]);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [itemDelete, setItemDelete] = React.useState<string>("");

  const [updateGrowthInfoHome] = useMutation(UPDATE_GROWTH_INFO);
  const [deleteGrowthHome] = useMutation(DELETE_GROWTH_ITEM);

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

  const handleDeleteReviewItem = async (id: string) => {
    try {
      const response = await deleteGrowthHome({
        variables: {
          id,
        },
      });
      console.log(response);
      router.reload();
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
                    className="w-full block border border-slate-300 rounded px-3 py-2 focus:border-slate-500 focus:outline-0 transition-all duration-300 resize-none h-32"
                  ></textarea>
                  <button
                    className="block p-2 text-2xl px-5 text-red-500 bg-slate-100 ml-4 rounded"
                    onClick={() => handleDeleteInputDescription(description.id)}
                  >
                    <BsTrash />
                  </button>
                </div>
              ))}
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

            <div className="border border-slate-200"></div>

            <button
              onClick={handleUpdate}
              className="bg-slate-700 text-white rounded block px-8 text-lg py-2 mt-8"
            >
              Update
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
                    onClick={() => {
                      setShowModal(true);
                      setItemDelete(item.id);
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default GrowthAdmin;
