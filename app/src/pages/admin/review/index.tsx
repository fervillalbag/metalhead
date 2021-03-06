import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { useMutation, useQuery } from "@apollo/client";
import { produce } from "immer";
import { BsTrash } from "react-icons/bs";

import Loading from "@/components/Loading";
import Modal from "@/components/Modal";
import NavbarDashboard from "@/components/admin/Navbar";
import { GET_REVIEW_INFO } from "@/graphql/queries/reviewInfo";
import { UPDATE_REVIEW_INFO } from "@/graphql/mutation/reviewInfo";
import { GET_REVIEW_HOME } from "@/graphql/queries/reviewHome";
import { DELETE_REVIEW_HOME_ITEM } from "@/graphql/mutation/reviewHome";
import { ReviewData, ReviewInfo } from "@/types/review";
import { Description } from "@/types/description";
import { FaTimes } from "react-icons/fa";

const ReviewInfoAdmin = () => {
  const router = useRouter();

  const [data, setData] = React.useState<ReviewInfo | null>(null);
  const [descriptionArray, setDescriptionArray] = React.useState<Description[]>(
    []
  );
  const [dataItems, setDataItems] = React.useState<ReviewData[]>([]);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [itemDelete, setItemDelete] = React.useState<string | undefined>(
    undefined
  );

  const [updateReviewHomeInfo] = useMutation(UPDATE_REVIEW_INFO);
  const [deleteReviewHome] = useMutation(DELETE_REVIEW_HOME_ITEM);

  const { data: reviewInfo } = useQuery(GET_REVIEW_INFO, {
    fetchPolicy: "network-only",
  });

  const { data: reviewItems, refetch: refetchReviewItems } = useQuery(
    GET_REVIEW_HOME,
    {
      fetchPolicy: "network-only",
    }
  );

  useEffect(() => {
    setData(reviewInfo?.getReviewInfoHome);
    setDataItems(reviewItems?.getReviewHome);
    setDescriptionArray(reviewInfo?.getReviewInfoHome?.description);
  }, [reviewInfo, reviewItems]);

  const newDescription: Description = {
    id: uuidv4(),
    text: "",
  };

  const handleAddInputDescription = () => {
    setDescriptionArray([...descriptionArray, newDescription]);
  };

  const handleDeleteInputDescription = (id: string) => {
    const newValue = descriptionArray.filter(
      (item: Description) => item.id !== id
    );
    setDescriptionArray(newValue);
  };

  const handleDeleteReviewItem = async (id: string | undefined) => {
    try {
      const response = await deleteReviewHome({
        variables: {
          id,
        },
      });
      refetchReviewItems();
      toast.success(response?.data?.deleteReviewHome?.message);
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
      toast("El t??tulo es obligatorio!", {
        icon: "??????",
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
      toast("La descripci??n debe tener contenido!", {
        icon: "??????",
        style: {
          borderRadius: "10px",
          background: "#FFF",
          color: "#333",
        },
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

      toast.success(response?.data?.updateReviewHomeInfo?.message);
    } catch (error) {
      toast.error("An error has occurred");
      console.log(error);
    }
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

            <h1 className="text-2xl text-slate-600 mt-8 mb-6">
              List of Reviews
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {!dataItems ? (
                <span className="block py-4 text-slate-900">
                  Ha ocurrido un error
                </span>
              ) : dataItems.length === 0 ? (
                <span className="block py-4 text-slate-900">
                  No reviews available
                </span>
              ) : (
                dataItems.map((item: ReviewData) => (
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
                        Edit
                      </button>
                      <button
                        className="block w-full bg-slate-500 py-2 rounded text-white"
                        onClick={() => {
                          setShowModal(true);
                          setItemDelete(item.id);
                        }}
                      >
                        Delete
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

            <Modal
              handleCloseModal={() => setShowModal(false)}
              showModal={showModal}
            >
              <div className="flex flex-col justify-center h-full">
                <header className="flex items-center justify-between">
                  <span className="block text-lg font-semibold text-slate-600">
                    ??Desea eliminar?
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
      </div>
    </div>
  );
};

export default ReviewInfoAdmin;
