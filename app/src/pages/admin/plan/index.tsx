import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { produce } from "immer";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";
import { BsTrash } from "react-icons/bs";

import Loading from "@/components/Loading";
import Modal from "@/components/Modal";
import NavbarDashboard from "@/components/admin/Navbar";
import { GET_PLANS } from "@/graphql/queries/plan";
import { GET_PLAN_INFO } from "@/graphql/queries/planInfo";
import { DELETE_PLAN_ITEM } from "@/graphql/mutation/plan";
import { UPDATE_PLAN_INFO } from "@/graphql/mutation/planInfo";
import { PlanInfo, PlanItem } from "@/types/plan";
import { Description } from "@/types/description";
import { FaTimes } from "react-icons/fa";

const PlanAdmin: React.FC = () => {
  const router = useRouter();

  const [data, setData] = React.useState<PlanInfo | null>(null);
  const [dataItems, setDataItems] = React.useState<PlanItem[] | null>(null);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [itemDelete, setItemDelete] = React.useState<string | undefined>(
    undefined
  );
  const [descriptionArray, setDescriptionArray] = React.useState<Description[]>(
    []
  );

  const [deletePlan] = useMutation(DELETE_PLAN_ITEM);
  const [updatePlanInfo] = useMutation(UPDATE_PLAN_INFO);

  const { data: dataInfo } = useQuery(GET_PLAN_INFO, {
    fetchPolicy: "network-only",
  });

  const { data: dataPlans, refetch: refetchDataPlans } = useQuery(GET_PLANS, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    setData(dataInfo?.getPlanInfo);
    setDataItems(dataPlans?.getPlans);
    setDescriptionArray(dataInfo?.getPlanInfo?.description);
  }, [dataInfo, dataPlans]);

  const newDescription: Description = {
    id: uuidv4(),
    text: "",
  };

  const handleAddInputDescription = () => {
    setDescriptionArray((currentDescription: Description[]) => [
      ...currentDescription,
      newDescription,
    ]);
  };

  const handleDeleteInputDescription = (id: string) => {
    setDescriptionArray((currentDescription: Description[]) =>
      currentDescription.filter((x: Description) => x.id !== id)
    );
  };

  const handleDeleteReviewItem = async (id: string | undefined) => {
    try {
      const res = await deletePlan({
        variables: {
          id,
        },
      });
      refetchDataPlans();
      toast.success(res?.data?.deletePlan?.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    const newDescriptionArray = descriptionArray.map(
      (description: Description) => {
        return {
          id: description.id,
          text: description.text,
        };
      }
    );

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

    const isDescriptionEmpty = newDescriptionArray.some(
      (description: Description) => description.text === ""
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
                descriptionArray.map(
                  (description: Description, index: number) => (
                    <div key={description.id} className="flex py-4">
                      <textarea
                        className="w-full block border border-slate-300 rounded px-3 py-2 focus:border-slate-500 focus:outline-0 transition-all duration-300 resize-none h-32"
                        value={description.text}
                        onChange={(e) => {
                          const text = e.target.value;
                          setDescriptionArray(
                            (currentDescription: Description[]) =>
                              produce(currentDescription, (v) => {
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
                  )
                )
              )}
            </div>

            <button
              className="border border-slate-300 rounded block px-3 py-2 text-slate-500 mb-8"
              onClick={handleAddInputDescription}
            >
              Add input description
            </button>

            <button
              className="bg-slate-700 text-white rounded block px-8 text-lg py-2 mt-8"
              onClick={handleUpdate}
            >
              Update Info
            </button>

            <div className="border border-slate-200 mt-8"></div>

            <h1 className="text-2xl text-slate-600 mt-8 mb-6">List of Plans</h1>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {dataItems.map((plan: PlanItem) => (
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
                      Edit
                    </button>
                    <button
                      className="block w-full bg-slate-500 py-2 rounded text-white"
                      onClick={() => {
                        setShowModal(true);
                        setItemDelete(plan.id);
                      }}
                    >
                      Delete
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

            <Modal
              handleCloseModal={() => setShowModal(false)}
              showModal={showModal}
            >
              <div className="flex flex-col justify-center h-full">
                <header className="flex items-center justify-between">
                  <span className="block text-lg font-semibold text-slate-600">
                    ¿Desea eliminar?
                  </span>
                  <button
                    className="bg-slate-100 text-slate-600 text-xl p-2 rounded-md"
                    onClick={() => setShowModal(false)}
                  >
                    <FaTimes />
                  </button>
                </header>

                <div className="grid grid-cols-2 gap-x-4 mt-6">
                  <button
                    className="block p-2 text-white rounded-md bg-slate-400"
                    onClick={() => {
                      handleDeleteReviewItem(itemDelete);
                      setShowModal(false);
                    }}
                  >
                    Si
                  </button>
                  <button
                    className="block p-2 rounded-md bg-white border border-slate-100 hover:bg-slate-100 transition duration-300"
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
