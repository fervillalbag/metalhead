import React from "react";
import { produce } from "immer";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";
import { BsTrash } from "react-icons/bs";

import Loading from "@/components/Loading";
import Modal from "@/components/Modal";
import client from "@/config/apollo";
import { GET_PLANS } from "@/graphql/queries/plan";
import { GET_PLAN_INFO } from "@/graphql/queries/planInfo";
import { DELETE_PLAN_ITEM } from "@/graphql/mutation/plan";
import { UPDATE_PLAN_INFO } from "@/graphql/mutation/planInfo";
import NavbarDashboard from "@/components/admin/Navbar";
import toast from "react-hot-toast";

const PlanAdmin: React.FC = () => {
  const router = useRouter();

  const [data, setData] = React.useState<any>(null);
  const [dataItems, setDataItems] = React.useState<any>(null);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [itemDelete, setItemDelete] = React.useState<string>("");
  const [descriptionArray, setDescriptionArray] = React.useState<any>([]);

  const [deletePlan] = useMutation(DELETE_PLAN_ITEM);
  const [updatePlanInfo] = useMutation(UPDATE_PLAN_INFO);

  React.useEffect(() => {
    (async () => {
      const { data: dataInfo } = await client.query({
        query: GET_PLAN_INFO,
        fetchPolicy: "network-only",
      });

      const { data: dataPlans } = await client.query({
        query: GET_PLANS,
        fetchPolicy: "network-only",
      });

      setData(dataInfo?.getPlanInfo);
      setDataItems(dataPlans?.getPlans);
      setDescriptionArray(dataInfo?.getPlanInfo?.description);
    })();
  }, []);

  const newDescription = {
    id: uuidv4(),
    text: "",
  };

  const handleAddInputDescription = () => {
    setDescriptionArray((currentDescription: any) => [
      ...currentDescription,
      newDescription,
    ]);
  };

  const handleDeleteInputDescription = (id: string) => {
    setDescriptionArray((currentDescription: any) =>
      currentDescription.filter((x: any) => x.id !== id)
    );
  };

  const handleDeleteReviewItem = async (id: string) => {
    try {
      const res = await deletePlan({
        variables: {
          id,
        },
      });
      toast.success(res?.data?.deletePlan?.message);
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

    if (!data || data?.title === "") {
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

    if (newDescriptionArray[0].text === "") {
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
      const res = await updatePlanInfo({
        variables: {
          input: {
            id: data?.id,
            title: data?.title,
            description: newDescriptionArray,
          },
        },
      });
      toast.success(res?.data?.updatePlanInfo?.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex">
      <NavbarDashboard />

      <section className="p-10 w-full h-screen overflow-y-auto no-scrollbar">
        <h1 className="text-3xl text-slate-600">Plan Page</h1>

        {!data || !dataItems || !descriptionArray ? (
          <Loading />
        ) : (
          <div className="py-4">
            <div>
              <span className="block text-sm mb-2 text-slate-500">Title:</span>
              <input
                type="text"
                className="w-full block border border-slate-300 rounded px-3 py-2 focus:border-slate-500 focus:outline-0 transition-all duration-300"
                value={data?.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
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

            <button
              className="border border-slate-300 rounded block px-3 py-2 text-slate-500 mb-8"
              onClick={handleAddInputDescription}
            >
              Add input description
            </button>

            <h1 className="text-2xl text-slate-600 mt-8 mb-6">List of Plans</h1>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {dataItems.map((plan: any, index: number) => (
                <div
                  key={plan.id}
                  className="shadow-lg rounded border border-slate-200 px-4 py-3 h-36 flex flex-col justify-between"
                >
                  <span className="block mb-2 text-slate-600">{plan.name}</span>

                  <div className="grid grid-cols-2 gap-x-3">
                    <button
                      className="block w-full border border-slate-400 py-2 rounded"
                      onClick={() => router.push(`/admin/plan/${plan.slug}`)}
                    >
                      Editar
                    </button>
                    <button
                      className="block w-full bg-slate-500 py-2 rounded text-white"
                      onClick={() => {
                        setShowModal(true);
                        setItemDelete(plan.id);
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="border border-slate-300 rounded block px-3 py-2 text-slate-500 mt-6"
              onClick={() => router.push("/admin/create/plan")}
            >
              Add a new plan
            </button>

            <div className="border border-slate-200 mt-8"></div>

            <button
              className="bg-slate-700 text-white rounded block px-8 text-lg py-2 mt-8"
              onClick={handleUpdate}
            >
              Update Info
            </button>

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
          </div>
        )}
      </section>
    </div>
  );
};

export default PlanAdmin;
