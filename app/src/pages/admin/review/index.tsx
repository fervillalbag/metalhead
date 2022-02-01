import React from "react";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { useMutation } from "@apollo/client";
import { produce } from "immer";

import client from "@/config/apollo";
import Loading from "@/components/Loading";
import Modal from "@/components/Modal";
import { GET_REVIEW_INFO } from "@/graphql/queries/reviewInfo";
import { UPDATE_REVIEW_INFO } from "@/graphql/mutation/reviewInfo";
import { GET_REVIEW_HOME } from "@/graphql/queries/reviewHome";
import { DELETE_REVIEW_HOME_ITEM } from "@/graphql/mutation/reviewHome";
import { BsTrash } from "react-icons/bs";
import NavbarDashboard from "@/components/admin/Navbar";

const ReviewInfoAdmin = () => {
  const router = useRouter();

  const [data, setData] = React.useState<any>(null);
  const [descriptionArray, setDescriptionArray] = React.useState<any>([]);
  const [dataItems, setDataItems] = React.useState<any>([]);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [itemDelete, setItemDelete] = React.useState<string>("");
  const [error, setError] = React.useState<any>({
    type: "",
    status: false,
  });

  const [updateReviewHomeInfo] = useMutation(UPDATE_REVIEW_INFO);
  const [deleteReviewHome] = useMutation(DELETE_REVIEW_HOME_ITEM);

  React.useEffect(() => {
    (async () => {
      const { data: reviewInfo } = await client.query({
        query: GET_REVIEW_INFO,
      });

      const { data: reviewItems } = await client.query({
        query: GET_REVIEW_HOME,
      });

      setData(reviewInfo?.getReviewInfoHome);
      setDataItems(reviewItems?.getReviewHome);
      setDescriptionArray(reviewInfo?.getReviewInfoHome?.description);
    })();
  }, []);

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

  const handleDeleteReviewItem = async (id: string) => {
    try {
      const response = await deleteReviewHome({
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

    if (!data || data?.title === "") {
      setError({
        type: "El título es obligatorio",
        status: true,
      });
      return;
    }

    try {
      const response = await updateReviewHomeInfo({
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

    setError({
      type: "",
      status: false,
    });
  };

  return (
    <div className="flex">
      <NavbarDashboard />

      <div className="p-10 w-full h-screen overflow-y-auto no-scrollbar">
        <h1 className="text-3xl text-slate-600">Review Section</h1>

        {!data || !descriptionArray ? (
          <Loading />
        ) : (
          <div className="py-8">
            <div>
              <span className="block text-sm mb-2 text-slate-500">Title:</span>
              <input
                type="text"
                value={data?.title}
                className="w-full block border border-slate-300 rounded px-3 py-2 focus:border-slate-500 focus:outline-0 transition-all duration-300"
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

            <h1 className="text-2xl text-slate-600 mt-8 mb-6">
              List of Reviews
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6">
              {!dataItems ? (
                <span className="block py-4 text-slate-900">
                  Ha ocurrido un error
                </span>
              ) : dataItems.length === 0 ? (
                <span className="block py-4 text-slate-900">
                  No reviews available
                </span>
              ) : (
                dataItems.map((item: any) => (
                  <div
                    key={item.id}
                    className="shadow-lg rounded border border-slate-200 px-4 py-3 h-36 flex flex-col justify-between"
                  >
                    <span className="block mb-2 text-slate-600">
                      {item.name}
                    </span>

                    <div className="grid grid-cols-2 gap-x-3">
                      <button
                        className="block w-full border border-slate-400 py-2 rounded"
                        onClick={() => router.push(`/admin/review/${item.id}`)}
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
              onClick={() => router.push("/admin/create/review")}
            >
              Add a new review
            </button>

            <div className="border border-slate-200 mt-8"></div>

            <button
              className="bg-slate-700 text-white rounded block px-8 text-lg py-2 mt-8"
              onClick={handleUpdate}
            >
              Update
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
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewInfoAdmin;
