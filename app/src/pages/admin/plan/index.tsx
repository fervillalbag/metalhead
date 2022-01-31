import React from "react";
import { produce } from "immer";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";

import Loading from "@/components/Loading";
import Modal from "@/components/Modal";
import client from "@/config/apollo";
import { GET_PLANS } from "@/graphql/queries/plan";
import { GET_PLAN_INFO } from "@/graphql/queries/planInfo";
import { DELETE_PLAN_ITEM } from "@/graphql/mutation/plan";
import { UPDATE_PLAN_INFO } from "@/graphql/mutation/planInfo";
import NavbarDashboard from "@/components/admin/Navbar";
import { BsTrash } from "react-icons/bs";

const PlanAdmin: React.FC = () => {
  const router = useRouter();

  const [data, setData] = React.useState<any>(null);
  const [dataItems, setDataItems] = React.useState<any>(null);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [itemDelete, setItemDelete] = React.useState<string>("");
  const [descriptionArray, setDescriptionArray] = React.useState<any>([]);
  const [error, setError] = React.useState<any>({
    type: "",
    status: false,
  });

  const [deletePlan] = useMutation(DELETE_PLAN_ITEM);
  const [updatePlanInfo] = useMutation(UPDATE_PLAN_INFO);

  React.useEffect(() => {
    (async () => {
      const { data: dataInfo } = await client.query({
        query: GET_PLAN_INFO,
      });

      const { data: dataPlans } = await client.query({
        query: GET_PLANS,
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
      console.log(res);
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
      setError({
        type: "El título es obligatorio",
        status: true,
      });
      return;
    }

    setError({
      type: "",
      status: false,
    });

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
      console.log(res);
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

            <div className="py-4">
              {descriptionArray.map((description: any, index: number) => (
                <div key={description.id} className="flex">
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
              ))}
            </div>

            <button
              className="border border-slate-300 rounded block px-3 py-2 text-slate-500 mb-8"
              onClick={handleAddInputDescription}
            >
              Add input description
            </button>

            <div className="border border-slate-200"></div>

            <button
              className="bg-slate-700 text-white rounded block px-8 text-lg py-2 mt-8"
              onClick={handleUpdate}
            >
              Update Info
            </button>

            {error.status && <span className="block">{error.type}</span>}

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

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10">
              {dataItems.map((plan: any, index: number) => (
                <div key={plan.id} className="border p-4">
                  <span className="block mb-2">{plan.name}</span>

                  <div className="grid grid-cols-2 gap-x-3">
                    <button
                      className="block p-2 w-full border"
                      onClick={() => router.push(`/admin/plan/${plan.slug}`)}
                    >
                      Editar
                    </button>
                    <button
                      className="block p-2 w-full border"
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
          </div>
        )}
      </section>
    </div>
  );
};

export default PlanAdmin;
